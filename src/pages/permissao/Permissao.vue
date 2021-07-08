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
                        <span class="text-h7 white--text  v-card--material__title pr-15">Colaboradores</span>
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
                        sm="4"
                        md="4"
                        lg="2"
                        xs="2"
                        style="text-align:right"
                      >
                        <v-btn color="blue-grey" class="white--text" @click="getUser()">Pesquisar</v-btn>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                        lg="6"
                        xs="6"
                        style="text-align:right"
                      >
                        <v-btn color="blue" class="white--text" @click="dialogPermissao = true">Adicionar Permissão</v-btn>
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
                          <template v-slot:[`item.definirPermissoes`]="{ item }">
                            <v-btn
                              width="30px"
                              height="30px"
                              fab
                              dark
                              small
                              color="primary"
                              @click="acionarModal(item)"
                            >
                            <v-icon dark small>
                              mdi-pencil
                            </v-icon>{{ item.definirPermissoes }}
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
          v-model="dialogUser"
          transition="dialog-top-transition"
          max-width="600"
        >
          <template>
            <v-card>
              <v-toolbar
                color="primary"
                dark
              >Adicionar Permissões</v-toolbar>
              <v-card-text class="pb-0">
                <v-autocomplete
                  v-model="arrayPermissao"
                  :items="dominioResult"
                  label="Permissões"
                  multiple
                  clearable
                  solo
                  class="mt-7"
                ></v-autocomplete>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                  text
                  @click="dialogUser = false"
                >Close</v-btn>
                <v-btn
                  color="green"
                  text
                  @click="adicionarPermissao()"
                >Salvar</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>

        <v-dialog
          v-model="dialogPermissao"
          transition="dialog-top-transition"
          max-width="600"
        >
          <template>
            <v-card>
              <v-toolbar
                color="primary"
                dark
              >Adicionar Permissões</v-toolbar>
              <v-card-text class="pb-0">
                <v-text-field
                  v-model="newPermissao"
                  label="Adicionar Permissao"
                  class="mt-7"
                  solo
                ></v-text-field>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                  text
                  @click="dialogPermissao = false"
                >Close</v-btn>
                <v-btn
                  color="green"
                  text
                  @click="novaPermissao()"
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

      </v-container>
    </div>
</template>

<script>
import axios from 'axios'
import ModalRespostaErro from '../ComponeteGlobal/ModalRespostaErro.vue'
import ModalRespostaCorreto from '../ComponeteGlobal/ModalRespostaCorreto.vue'
export default {
  components: { ModalRespostaErro, ModalRespostaCorreto },
  name: 'Permissao',
  data: () => ({
    urlProd: 'https://htgneexsa.cf/api_htg/',
    // urlProd: 'http://localhost:4040/api_htg/',
    dialogoRespostaErro: false,
    dialogoRespostaCorreto: false,
    dialogUser: false,
    userPermisson: [],
    dominioResult: [],
    arrayPermissao: [],
    dialogPermissao: false,
    newPermissao: '',
    snackbar: false,
    mensagem: '',
    colorSnackbar: '',
    nomePesquisa: '',
    switchColaborador: true,
    headers: [
      {
        text: 'Nome',
        value: 'nome',
        align: 'start',
        sortable: false
      },
      {
        text: 'Email',
        value: 'email',
        align: 'center'
      },
      {
        text: 'Permissao',
        value: 'permissao',
        align: 'center'
      },
      {
        text: 'Definir Permissões',
        value: 'definirPermissoes',
        align: 'center'
      }
    ],
    desserts: []
  }),
  created () {
    this.getUser()
    this.dominioPermissao()
  },
  methods: {
    returnHome () {
      this.$router.push({ name: 'Home' })
    },
    async getUser () {
      const params = {
        textoPesquisar: this.nomePesquisa ? this.nomePesquisa : ''
      }
      const result = await axios({
        method: 'POST',
        url: `${this.urlProd}get-user`,
        data: params
      })
      this.desserts = result.data
      console.log(this.desserts)
    },

    acionarModal (item) {
      this.dialogUser = true
      this.userPermisson = item
    },

    async adicionarPermissao () {
      const params = {
        email: this.userPermisson.email,
        permissoes: this.arrayPermissao
      }
      console.log(params)
      try {
        await axios({
          method: 'POST',
          url: `${this.urlProd}set-permissao`,
          data: params
        })
        this.dialogUser = false
        this.getUser()
        this.dialogoRespostaCorreto = true
      } catch (err) {
        this.dialogoRespostaErro = true
      }
    },

    async dominioPermissao () {
      try {
        const result = await axios({
          method: 'GET',
          url: `${this.urlProd}dominio/permissao`
        })
        console.log(result.data)
        this.dominioResult = result.data
      } catch (err) {
        console.log(err)
        this.snackbar = true
        this.mensagem = 'Erro ao carregar Funções'
        this.colorSnackbar = 'red'
      }
    },

    async novaPermissao () {
      console.log(this.newPermissao)
      const params = {
        novaPermissao: this.newPermissao
      }
      console.log(params)
      try {
        await axios({
          method: 'POST',
          url: `${this.urlProd}new-permissao`,
          data: params
        })
        this.dialogPermissao = false
        this.dominioPermissao()
        this.dialogoRespostaCorreto = true
      } catch (err) {
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
