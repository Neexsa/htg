<template>
  <div class="criarColaborador">
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
                          @click="returnColaborador"
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
                        <span class="text-h7 white--text  v-card--material__title pr-15">Criar Colaboradores</span>
                      </v-col>
                    </v-row>
                  </div>
                </v-theme-provider>
              </v-sheet>
            </v-card-title>
            <div id='photo' ref="printMe">
              <v-card class="card-home">
                <v-container class="py-0">
                  <v-row class="px-5 d-flex justify-center">
                    <v-col
                      cols="6"
                      sm="4"
                      md="2"
                      lg="2"
                      xs="2"
                      class="mt-7"
                    >
                      <v-text-field
                          v-model="dataCriacao"
                          readonly
                          label="Data Criação"
                        >
                      </v-text-field>
                    </v-col>
                    <v-col
                      cols="6"
                      sm="4"
                      md="2"
                      lg="2"
                      xs="2"
                      class="mt-7"
                    >
                      <v-text-field
                        label="Registro"
                        v-model="reg"
                        readonly
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="px-5 py-2">
                    <v-col
                      cols="12"
                      md="12"
                      lg="12"
                      sm="12"
                      xs="12"
                    >
                      <v-card class="color-card">
                        <v-row class="px-5">
                          <v-col
                            cols="12"
                            sm="12"
                            md="12"
                            lg="12"
                            xs="12"
                            class="pt-5 pb-0"
                          >
                          <h4>Informações do Colaborador:</h4>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                            lg="6"
                            xs="6"
                            class="pt-5"
                          >
                            <span>Nome Colaborador</span>
                            <v-text-field
                                v-model="nomeColaborador"
                                :rules="[rules.required]"
                                :readonly="this.tipoColaborador === 'editar' ? true : false"
                                type="nome"
                                solo
                                label="Nome Colaborador"
                                hint="Nome Colaborador"
                              >
                            </v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                            lg="6"
                            xs="6"
                            class="pt-5"
                          >
                            <span>Numero de Matricula</span>
                            <v-text-field
                                v-model="numeroMatricula"
                                :rules="[rules.required]"
                                type="matricula"
                                solo
                                label="Numero de Matricula"
                                hint="Numero de Matricula"
                              >
                            </v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                            lg="6"
                            xs="6"
                            class="pt-5"
                          >
                            <span>Email Colaborador</span>
                            <v-text-field
                                v-model="emailColaborador"
                                :rules="[rules.email]"
                                type="email"
                                solo
                                label="Email Colaborador"
                                hint="Email Colaborador"
                              >
                            </v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                            lg="6"
                            xs="6"
                            class="pt-5"
                          >
                            <span>CPF Colaborador</span>
                            <v-text-field
                                v-model="cpfColaborador"
                                type="cpf"
                                solo
                                label="CPF Colaborador"
                                hint="CPF Colaborador"
                                return-masked-value
                              >
                            </v-text-field>
                          </v-col>

                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                            lg="6"
                            xs="6"
                            class="pt-5"
                          >
                            <span>Telefone Colaborador</span>
                            <v-text-field
                                v-model="telefoneColaborador"
                                type="telefone"
                                solo
                                label="Telefone Colaborador"
                                hint="Telefone Colaborador"
                                return-masked-value
                              >
                            </v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                            lg="6"
                            xs="6"
                            class="pt-5"
                          >
                            <span>Função Colaborador</span>
                            <v-autocomplete
                              v-model="funcaoColaborador"
                              :items="funcao"
                              label="Função Colaborador"
                              hint="Função Colaborador"
                              clearable
                              solo
                            ></v-autocomplete>
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-col>
                  </v-row>
                  <v-row class="px-5">
                    <v-col
                      cols="12"
                      md="12"
                      lg="12"
                      sm="12"
                      xs="12"
                      class="mt-7 text-right"
                    >
                    <v-btn @click="tipoColaborador === 'editar' ? editarColaborar() : verificarCampos()" color="green" class="mr-3 white--text">Salvar</v-btn>
                    <v-btn @click="returnColaborador()" color="primary">Voltar</v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
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
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  props: ['tipoColaborador', 'colaboradorEdit'],
  mounted () {
    console.log(this.tipoColaborador, this.colaboradorEdit)
    if (this.tipoColaborador === 'editar') {
      console.log(this.tipoColaborador)
      this.reg = this.colaboradorEdit.reg
      this.dataCriacao = this.colaboradorEdit.dataCriacao
      this.nomeColaborador = this.colaboradorEdit.nome
      this.emailColaborador = this.colaboradorEdit.email
      this.telefoneColaborador = this.colaboradorEdit.telefone
      this.cpfColaborador = this.colaboradorEdit.cpf
      this.funcaoColaborador = this.colaboradorEdit.funcao
      this.numeroMatricula = this.colaboradorEdit.matricula
    }
  },
  data: vm => ({
    urlProd: 'https://htgneexsa.cf/api_htg/',
    // urlProd: 'http://localhost:4040/api_htg/',
    mensagem: '',
    snackbar: false,
    colorSnackbar: '',
    funcao: [],
    reg: moment(new Date()).valueOf(),
    dataCriacao: moment(new Date()).format('L'),
    nomeColaborador: '',
    emailColaborador: '',
    telefoneColaborador: '',
    cpfColaborador: '',
    funcaoColaborador: '',
    numeroMatricula: 0,
    camposVerificados: [],
    rules: {
      required: value => !!value || 'Obrigatório.',
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      }
    }
  }),
  created () {
    this.getFuncao()
  },
  methods: {
    returnColaborador () {
      this.$emit('voltar')
    },

    async getFuncao () {
      try {
        const result = await axios({
          method: 'GET',
          url: `${this.urlProd}dominio/funcao`
        })
        console.log(result.data)
        this.funcao = result.data
      } catch (err) {
        console.log(err)
        this.snackbar = true
        this.mensagem = 'Erro ao carregar Funções'
        this.colorSnackbar = 'red'
      }
    },

    verificarCampos () {
      this.camposVerificados = []
      if (this.nomeColaborador.length < 1) {
        this.camposVerificados.push('Nome Colaborador')
      }

      if (this.numeroMatricula.length < 1 || this.numeroMatricula === 0) {
        this.camposVerificados.push('Numero de Matricula')
      }

      if (this.emailColaborador.length < 1) {
        this.camposVerificados.push('Email Colaborador')
      }

      if (this.cpfColaborador.length < 1) {
        this.camposVerificados.push('CPF Colaborador')
      }

      if (this.funcaoColaborador.length < 1) {
        this.camposVerificados.push('Função Colaborador')
      }

      this.salvarColaborar()
    },

    async salvarColaborar () {
      if (this.camposVerificados.length === 0) {
        const params = {
          reg: this.reg,
          dataCriacao: this.dataCriacao,
          nomeColaborador: this.nomeColaborador,
          matricula: this.numeroMatricula * 1,
          emailColaborador: this.emailColaborador ? this.emailColaborador : '',
          telefoneColaborador: this.telefoneColaborador ? this.telefoneColaborador : 0,
          cpfColaborador: this.cpfColaborador ? this.cpfColaborador : 0,
          funcaoColaborador: this.funcaoColaborador ? this.funcaoColaborador : ''
        }
        try {
          const resultColaborador = await axios({
            method: 'POST',
            url: `${this.urlProd}novo-colaborador`,
            data: params
          })
          console.log(resultColaborador)
          if (resultColaborador.data.qtd) {
            this.snackbar = true
            this.mensagem = resultColaborador.data.mensagem
            this.colorSnackbar = 'red'
          } else {
            this.snackbar = true
            this.mensagem = resultColaborador.data.mensagem
            this.colorSnackbar = 'green'
            this.returnColaborador()
          }
        } catch (err) {
          console.log(err)
          this.snackbar = true
          this.mensagem = 'Erro ao salvar!!!'
          this.colorSnackbar = 'red'
        }
        console.log(params)
      } else {
        this.snackbar = true
        this.mensagem = 'Preencher o(s) campo(s): ' + this.camposVerificados.join(', ')
        this.colorSnackbar = 'red'
      }
    },

    async editarColaborar () {
      const params = {
        reg: this.reg,
        dataCriacao: this.dataCriacao,
        nomeColaborador: this.nomeColaborador,
        matricula: this.numeroMatricula * 1,
        emailColaborador: this.emailColaborador ? this.emailColaborador : '',
        telefoneColaborador: this.telefoneColaborador ? this.telefoneColaborador : 0,
        cpfColaborador: this.cpfColaborador ? this.cpfColaborador : 0,
        funcaoColaborador: this.funcaoColaborador ? this.funcaoColaborador : ''
      }
      try {
        const resultColaborador = await axios({
          method: 'POST',
          url: `${this.urlProd}editar-colaborador`,
          data: params
        })
        this.snackbar = true
        this.mensagem = resultColaborador.data.mensagem
        this.colorSnackbar = 'green'
        this.returnColaborador()
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

<style lang="scss">
  .color-card {
    background-color: var(--light-gray)!important;
  }
</style>
