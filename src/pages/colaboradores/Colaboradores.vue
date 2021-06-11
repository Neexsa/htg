<template>
  <div class="colaboradores">
      <v-container v-if="showColaboradores">
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
                    <div class="text-h7 white--text pa-3 v-card--material__title"> Colaboradores </div>
                  </v-theme-provider>
                </v-sheet>
              </v-card-title>
              <v-card class="card-colaboradores">
                <v-container class="py-0">
                  <v-row class="pt-9 px-5">
                    <template>
                      <v-col
                        cols="12"
                        sm="4"
                        md="4"
                        lg="4"
                        xs="4"
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
                        sm="2"
                        md="2"
                        lg="2"
                        xs="2"
                        style="text-align:right"
                      >
                        <v-switch
                          v-model="switchColaborador"
                          label="Mudar Status"
                        >Status</v-switch>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="4"
                        md="4"
                        lg="2"
                        xs="2"
                        style="text-align:right"
                      >
                        <v-btn color="blue-grey" class="white--text" @click="getColaboradores()">Pesquisar</v-btn>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="4"
                        md="4"
                        lg="4"
                        xs="4"
                        style="text-align:right"
                      >
                        <v-btn color="blue" class="white--text" @click="newColaborador()">Adicionar Colaborador</v-btn>
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
                          <template v-slot:[`item.editar`]="{ item }">
                            <v-btn
                              width="30px"
                              height="30px"
                              fab
                              dark
                              small
                              color="primary"
                              @click="editarColaborador(item)"
                            >
                            <v-icon dark small>
                              mdi-pencil
                            </v-icon>{{ item.editar }}
                            </v-btn>
                          </template>
                          <template v-slot:[`item.desativar`]="{ item }">
                            <v-btn
                              width="30px"
                              height="30px"
                              fab
                              dark
                              small
                              :color="item.status === 'ativo' ? 'red' : 'green'"
                              @click="alterarStatusColaborador(item)"
                            >
                            <v-icon dark small>
                              {{item.status === 'ativo' ? 'mdi-close' : 'mdi-play'}}
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
      <criar-colaborador
        v-if="showCriarColaborador"
        v-on:voltar="voltarColaborador()"
        :tipoColaborador="tipoColaborador"
        :colaboradorEdit="colaboradorEdit"
      />
    </div>
</template>

<script>
import axios from 'axios'
import CriarColaborador from './componentes/CriarColaborador.vue'
export default {
  components: { CriarColaborador },
  name: 'Colaboradores',
  data: () => ({
    urlProd: 'https://htgneexsa.cf/api_htg/',
    // urlProd: 'http://localhost:4040/api_htg/',
    tipoColaborador: '',
    colaboradorEdit: [],
    showCriarColaborador: false,
    clientes: [],
    showColaboradores: true,
    showProjetos: false,
    nomeCliente: '',
    novoNomeCliente: '',
    snackbar: false,
    mensagem: '',
    colorSnackbar: '',
    nomePesquisa: '',
    switchColaborador: true,
    headers: [
      {
        text: 'Reg',
        align: 'start',
        sortable: false,
        value: 'reg'
      },
      {
        text: 'Nome',
        value: 'nome',
        align: 'center'
      },
      {
        text: 'Email',
        value: 'email',
        align: 'center'
      },
      {
        text: 'CPF',
        value: 'cpf',
        align: 'center'
      },
      {
        text: 'Status',
        value: 'status',
        align: 'center'
      },
      {
        text: 'Editar',
        value: 'editar',
        align: 'center'
      },
      {
        text: 'Desativar / Ativar',
        value: 'desativar',
        align: 'center'
      }
    ],
    desserts: []
  }),
  created () {
    this.getColaboradores()
  },
  methods: {
    async getColaboradores () {
      const params = {
        textoPesquisar: this.nomePesquisa ? this.nomePesquisa : '',
        status: this.switchColaborador ? 'ativo' : 'inativo'
      }
      const result = await axios({
        method: 'POST',
        url: `${this.urlProd}colaboradores`,
        data: params
      })
      this.desserts = result.data
      console.log(this.desserts)
    },
    voltarColaborador () {
      this.showColaboradores = true
      this.showCriarColaborador = false
      this.getColaboradores()
    },
    newColaborador () {
      this.showColaboradores = false
      this.showCriarColaborador = true
    },
    editarColaborador (item) {
      this.colaboradorEdit = item
      this.tipoColaborador = 'editar'
      this.showColaboradores = false
      this.showCriarColaborador = true
    },

    async alterarStatusColaborador (item) {
      console.log(item)
      const params = {
        reg: item.reg,
        dataCriacao: item.dataCriacao,
        nomeColaborador: item.nome,
        emailColaborador: item.email ? item.email : '',
        telefoneColaborador: item.telefone ? item.telefone : 0,
        cpfColaborador: item.cpf ? item.cpf : 0,
        funcaoColaborador: item.funcao ? item.funcao : '',
        status: this.switchColaborador ? 'inativo' : 'ativo'
      }
      try {
        const resultColaborador = await axios({
          method: 'POST',
          url: `${this.urlProd}alterar-status-colaborador`,
          data: params
        })
        this.snackbar = true
        this.mensagem = resultColaborador.data.mensagem
        this.colorSnackbar = 'green'
        this.getColaboradores()
      } catch (err) {
        console.log(err)
        this.snackbar = true
        this.mensagem = 'Erro ao salvar!!!'
        this.colorSnackbar = 'red'
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

  .card-colaboradores{
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
</style>
