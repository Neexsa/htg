<template>
  <div class="user">
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
                          <span class="text-h7 white--text  v-card--material__title pr-15">{{user.nome}}</span>
                        </v-col>
                      </v-row>
                    </div>
                </v-theme-provider>
                </v-sheet>
              </v-card-title>
              <v-card class="card-funcao">
                <v-container class="py-0">
                  <v-row class="pt-9 justify-center">
                    <v-avatar
                      color="primary"
                      size="100"
                    >
                      <span class="white--text text-h3">{{user.nome ? user.nome.substr(0, 1) : ''}}</span>
                    </v-avatar>
                  </v-row>
                  <v-row class="pt-0 justify-center">
                    <template>
                      <v-col
                        cols="12"
                        sm="5"
                        md="5"
                        lg="5"
                        xs="5"
                      >
                        <v-text-field
                          label="Email"
                          v-model="user.email"
                          readonly
                        >
                        </v-text-field>
                      </v-col>
                    </template>
                  </v-row>
                  <v-row class="py-0 justify-center">
                    <template>
                      <v-col
                        cols="12"
                        sm="5"
                        md="5"
                        lg="5"
                        xs="5"
                      >
                        <v-text-field
                          label="Senha"
                          v-model="senha"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, rules.min]"
                          :type="show1 ? 'text' : 'password'"
                          name="input-10-1"
                          counter
                          @click:append="show1 = !show1"
                          readonly
                        >
                        </v-text-field>
                      </v-col>
                    </template>
                  </v-row>
                  <v-row class="py-0 justify-center">
                    <v-col
                        cols="12"
                        sm="5"
                        md="5"
                        lg="5"
                        xs="5"
                        class="text-center pb-5"
                      >
                      <v-btn
                        color="primary"
                        @click="dialogUser = true"
                      >
                        Mudar Senha
                      </v-btn>
                    </v-col>
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
              >Mudar Senha</v-toolbar>
              <v-card-text>
                <v-row class="pt-8 justify-center">
                  <template>
                    <v-col
                      cols="12"
                      sm="8"
                      md="8"
                      lg="8"
                      xs="8"
                    >
                      <v-text-field
                        label="Nova Senha"
                        v-model="novaSenha"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show2 ? 'text' : 'password'"
                        name="input-10-1"
                        counter
                        @click:append="show2 = !show2"
                      >
                      </v-text-field>
                    </v-col>
                  </template>
                </v-row>
                <v-row class="py-0 justify-center">
                  <template>
                    <v-col
                      cols="12"
                      sm="8"
                      md="8"
                      lg="8"
                      xs="8"
                    >
                      <v-text-field
                        label="Digite Novamente a Senha"
                        v-model="novaSenhaDigitada"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show3 ? 'text' : 'password'"
                        name="input-10-1"
                        counter
                        @click:append="show3 = !show3"
                      >
                      </v-text-field>
                    </v-col>
                  </template>
                </v-row>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                  text
                  @click="dialogUser = false"
                >Close</v-btn>
                <v-btn
                  color="green"
                  text
                  @click="salvarNovaSenha()"
                >Salvar</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-container>

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

    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import ModalRespostaErro from '../ComponeteGlobal/ModalRespostaErro.vue'
import ModalRespostaCorreto from '../ComponeteGlobal/ModalRespostaCorreto.vue'
export default {
  components: { ModalRespostaErro, ModalRespostaCorreto },
  name: 'User',
  computed: {
    ...mapState('auth', ['user'])
  },
  data: () => ({
    // urlProd: 'https://htgneexsa.cf/api_htg/',
    urlProd: 'http://localhost:4040/api_htg/',
    senha: '',
    snackbar: false,
    colorSnackbar: '',
    mensagem: '',
    dialogoRespostaErro: false,
    dialogoRespostaCorreto: false,
    novaSenha: '',
    novaSenhaDigitada: '',
    dialogUser: false,
    show1: false,
    show2: false,
    show3: false,
    password: 'Password',
    rules: {
      required: value => !!value || 'Obrigatório!!!',
      min: v => v.length >= 8 || 'Minimo 8 caracteres'
    }
  }),
  created () {
    try {
      this.getSenha()
    } catch (err) {
      this.dialogoRespostaErro = true
      console.log(err)
    }
  },
  methods: {
    returnHome () {
      this.$router.push({ name: 'Home' })
    },

    async getSenha () {
      try {
        const params = {
          nomeUser: this.user.nome,
          emailUser: this.user.email
        }
        const senha = await axios({
          method: 'POST',
          url: `${this.urlProd}get-senha`,
          data: params
        })
        this.senha = senha.data.senha
      } catch (err) {
        this.dialogoRespostaErro = true
        console.log(err)
      }
    },

    async salvarNovaSenha () {
      if (this.novaSenha.length < 8 || this.novaSenhaDigitada.length < 8) {
        this.snackbar = true
        this.colorSnackbar = 'red'
        this.mensagem = 'Favor digitar corretamente as senhas!!!'
      } else {
        if (this.novaSenha === this.novaSenhaDigitada) {
          const params = {
            nomeUser: this.user.nome,
            emailUser: this.user.email,
            novaSenha: this.novaSenha
          }
          console.log(params)
          try {
            await axios({
              method: 'POST',
              url: `${this.urlProd}nova-senha`,
              data: params
            })
            this.dialogUser = false
            this.getSenha()
            this.dialogoRespostaCorreto = true
          } catch (err) {
            this.dialogoRespostaErro = true
            console.log(err)
          }
        } else {
          this.snackbar = true
          this.colorSnackbar = 'red'
          this.mensagem = 'Senhas Não Compativeis'
          console.log('Senhas Não Compativeis')
        }
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
