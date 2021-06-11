<template>
  <div class="funcao">
      <v-container>
        <v-layout row wrap>
          <v-flex sm12 xs12 md12 lg12 class="mt-10">
              <v-card-title class="align-start">
                <v-sheet
                color="brown"
                width="100%"
                class="overflow-hidden mt-n9 transition-swing v-card--material__sheet"
                style="z-index: 2"
                elevation="6"
                max-width="100%"
                rounded
                >
                  <v-theme-provider dark>
                    <div class="text-h7 white--text pa-3 v-card--material__title"> Função </div>
                  </v-theme-provider>
                </v-sheet>
              </v-card-title>
              <v-card class="card-funcao">
                <v-container class="py-0">
                  <v-row class="pt-9 px-5">
                    <template>
                      <v-col
                        cols="12"
                        sm="4"
                        md="4"
                        lg="5"
                        xs="5"
                      >
                        <v-text-field
                        v-model="nomePesquisa"
                          clearable
                          label="Pesquisar"
                          append-icon="mdi-magnify"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="4"
                        md="4"
                        lg="2"
                        xs="2"
                        style="text-align:right"
                      >
                        <v-btn color="blue-grey" class="white--text" @click="getCliente()">Pesquisar</v-btn>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="4"
                        md="4"
                        lg="5"
                        xs="5"
                        style="text-align:right"
                      >
                        <v-btn color="blue" class="white--text" @click="dialogCliente = true">Adicionar Função</v-btn>
                      </v-col>
                    </template>
                  </v-row>
                  <v-row>
                    <template>
                      <v-col
                        cols="12"
                        md="12"
                        lg="12"
                        sm="12"
                        xs="12"
                      >
                        <template>
                          <v-data-table
                            :headers="headers"
                            :items="desserts"
                            :items-per-page="5"
                            class="elevation-1 color-table"
                          >
                          <template v-slot:[`item.deletar`]="{ item }">
                            <v-btn
                              width="30px"
                              height="30px"
                              class="mr-5"
                              fab
                              dark
                              small
                              color="red"
                              @click="deletarFuncao(item)"
                            >
                            <v-icon dark small>
                              mdi-close
                            </v-icon>{{ item.editar }}
                            </v-btn>
                          </template>
                          </v-data-table>
                        </template>
                      </v-col>
                      </template>
                  </v-row>
                </v-container>
              </v-card>
          </v-flex>
        </v-layout>

        <v-dialog
        v-model="dialogCliente"
          transition="dialog-top-transition"
          max-width="600"
        >
          <template>
            <v-card>
              <v-toolbar
                color="primary"
                dark
              >Adicionar Função</v-toolbar>
              <v-card-text>
                <v-form
                  ref="form"
                >
                    <v-container fluid>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="12"
                      >
                      <v-text-field
                        v-model="novoNomeFuncao"
                        :rules="rules.name"
                        label="Nome da Função"
                        required
                        clearable
                      ></v-text-field>
                      </v-col>
                    </v-row>
                    </v-container>
                </v-form>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                  text
                  @click="dialogCliente = false"
                >Close</v-btn>
                <v-btn
                  color="green"
                  text
                  @click="verificarFormulario()"
                >Salvar</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>

        <v-snackbar
          v-model="snackbar"
          :color="colorSnackbar"
        >
          {{ mensagem }}

          <template v-slot:action="{ attrs }">
            <v-btn
              color="white"
              text
              v-bind="attrs"
              @click="snackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-container>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Funcao',
  data: () => ({
    urlProd: 'https://htgneexsa.cf/api_htg/',
    // urlProd: 'http://localhost:4040/api_htg/',
    clientes: [],
    showClientes: true,
    showProjetos: false,
    nomeCliente: '',
    showRdo: false,
    novoNomeFuncao: '',
    snackbar: false,
    dialogCliente: false,
    mensagem: '',
    colorSnackbar: '',
    nomePesquisa: '',
    desserts: [],
    headers: [
      {
        text: 'Nome',
        align: 'start',
        sortable: false,
        value: 'nome'
      },
      {
        text: 'Deletar',
        value: 'deletar',
        align: 'right',
        sortable: true,
        class: 'class-btn'
      }
    ],
    rules: {
      name: [val => (val || '').length > 0 || 'Preencher o Nome do Cliente']
    }
  }),
  created () {
    this.getFuncao()
  },
  methods: {
    async getFuncao () {
      const params = {
        nomePesquisa: this.nomePesquisa ? this.nomePesquisa : ''
      }
      const result = await axios({
        method: 'POST',
        url: `${this.urlProd}funcao`,
        data: params
      })
      this.desserts = result.data
      console.log(this.desserts)
    },

    async verificarFormulario () {
      if (this.novoNomeFuncao) {
        const params = {
          novoNomeFuncao: this.novoNomeFuncao
        }
        const result = await axios({
          method: 'POST',
          url: `${this.urlProd}nova-funcao`,
          data: params
        })
        if (result.data.qtd > 0) {
          this.snackbar = true
          this.mensagem = result.data.mensagem
          this.colorSnackbar = 'red'
        } else {
          this.snackbar = true
          this.mensagem = result.data.mensagem
          this.colorSnackbar = 'green'
          this.dialogCliente = false
          this.novoNomeFuncao = ''
          this.getFuncao()
        }
      } else {
        this.snackbar = true
        this.mensagem = 'Preencha o Campo Nome do Cliente'
        this.colorSnackbar = 'red'
      }
    },

    async deletarFuncao (nome) {
      const params = {
        nomeFuncao: nome
      }
      const result = await axios({
        method: 'POST',
        url: `${this.urlProd}delete-funcao`,
        data: params
      })
      console.log(result)
      if (result.status === 500) {
        this.snackbar = true
        this.mensagem = result.data.mensagem
        this.colorSnackbar = 'red'
        this.dialogCliente = false
      } else {
        this.snackbar = true
        this.mensagem = result.data.mensagem
        this.colorSnackbar = 'green'
        this.dialogCliente = false
        this.getFuncao()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .color-icon {
    color: var(--dark);
  }

.icon-alien {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .ajuste-sheet{
    margin-top: -54px;
  }

  .card-funcao{
    margin-top: -30px;
    z-index: 0;
  }

  .color-row{
    background-color: var(--light-gray)!important;
  }

  .click-projetos {
    cursor: pointer;
  }

  .color-table {
    background-color: var(--light-gray)!important;
  }
  .class-btn {
    width: 10x!important;
  }
</style>
