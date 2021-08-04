<template>
  <div class="colaboradores">
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
                    <slot name="heading" />
                    <div class="py-3">
                      <v-row class="px-5 d-flex">
                        <v-col
                          cols="1"
                          sm="1"
                          md="1"
                          lg="1"
                          xs="1"
                          class="text-left"
                        >
                          <v-btn
                            depressed
                            color="transparent"
                            class="text-left"
                            @click="returnHome"
                          >
                            <v-icon dark small>
                              mdi-arrow-left-bold-circle mdi-36px
                            </v-icon>
                          </v-btn>
                        </v-col>
                        <v-col
                          cols="11"
                          sm="11"
                          md="11"
                          lg="11"
                          xs="11"
                          class="text-center"
                        >
                          <span class="text-h7 white--text  v-card--material__title pr-15"> Novo Acesso </span>
                        </v-col>
                      </v-row>
                    </div>
                </v-theme-provider>
                </v-sheet>
              </v-card-title>
              <v-card class="card-colaboradores">
                <v-container class="py-0">
                  <v-row class="pt-9 px-5">
                    <template>
                      <v-col
                        cols="12"
                        sm="5"
                        md="5"
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
                        sm="5"
                        md="5"
                        lg="5"
                        xs="5"
                        style="text-align:center"
                      >
                        <v-btn color="blue-grey" class="white--text" @click="getColaboradores()">Pesquisar</v-btn>
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
                          <template v-slot:[`item.criarAcesso`]="{ item }">
                            <v-btn
                              width="30px"
                              height="30px"
                              fab
                              dark
                              small
                              color="primary"
                              @click="abrirModal(item)"
                            >
                            <v-icon dark small>
                              mdi-account-plus
                            </v-icon>{{ item.criarAcesso }}
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
        v-model="dialogNewAccess"
          transition="dialog-top-transition"
          max-width="800"
        >
          <template>
            <v-card>
              <v-toolbar
                color="primary"
                dark
              >Novo Acesso</v-toolbar>
              <v-card-text>
                <div class="text-h4 px-12 py-5">Deseja criar um novo acesso para o(a) {{colaborador.nome ? (colaborador.nome).toUpperCase() : ''}} ?</div>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                  text
                  @click="dialogNewAccess = false"
                >Fechar</v-btn>
                <v-btn
                  color="green"
                  text
                  @click="criarAcesso()"
                >Criar</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>

        <v-dialog
          v-model="dialogoRespostaErro"
          width="500"
        >
        <modal-resposta-erro
          v-if="dialogoRespostaErro"
        />
      </v-dialog>

      <v-dialog
          v-model="dialogoRespostaCorreto"
          width="500"
        >
        <modal-resposta-correto
          v-if="dialogoRespostaCorreto"
        />
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
import ModalRespostaErro from '../ComponeteGlobal/ModalRespostaErro.vue'
import ModalRespostaCorreto from '../ComponeteGlobal/ModalRespostaCorreto.vue'
export default {
  components: { ModalRespostaErro, ModalRespostaCorreto },
  name: 'NewUser',
  data: () => ({
    urlProd: 'https://htgneexsa.cf/api_htg/',
    // urlProd: 'http://localhost:4040/api_htg/',
    dialogoRespostaErro: false,
    dialogoRespostaCorreto: false,
    dialogNewAccess: false,
    snackbar: false,
    mensagem: '',
    colorSnackbar: '',
    nomePesquisa: '',
    switchColaborador: true,
    colaborador: [],
    headers: [
      {
        text: 'Matricula',
        align: 'start',
        sortable: false,
        value: 'matricula'
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
        text: 'Criar Acesso',
        value: 'criarAcesso',
        align: 'center'
      }
    ],
    desserts: []
  }),
  created () {
    this.getColaboradores()
  },
  methods: {
    returnHome () {
      this.$router.push({ name: 'Home' })
    },
    async getColaboradores () {
      const params = {
        textoPesquisar: this.nomePesquisa ? this.nomePesquisa : '',
        status: this.switchColaborador ? 'ativo' : 'inativo'
      }
      const result = await axios({
        method: 'POST',
        url: `${this.urlProd}user-colaboradores`,
        data: params
      })
      this.desserts = result.data
      console.log(this.desserts)
    },

    abrirModal (item) {
      this.colaborador = []
      this.colaborador = item
      this.dialogNewAccess = true
    },

    async criarAcesso () {
      console.log(this.colaborador)
      const params = {
        cpf: this.colaborador.cpf.toString(),
        email: this.colaborador.email,
        nome: this.colaborador.nome
      }
      console.log(params)
      try {
        await axios({
          method: 'POST',
          url: `${this.urlProd}criar-acesso`,
          data: params
        })
        this.dialogNewAccess = false
        this.dialogoRespostaCorreto = true
        this.getColaboradores()
      } catch (err) {
        console.log(err)
        this.dialogoRespostaErro = true
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
