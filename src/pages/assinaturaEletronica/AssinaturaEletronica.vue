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
                  <v-row class="py-9 justify-center">
                    <v-col
                      cols="12"
                      md="12"
                      lg="12"
                      sm="12"
                      xs="12"
                    >
                      <v-card class="color-card">
                        <v-row class="px-5">
                          <template>
                            <v-col
                              cols="12"
                              sm="12"
                              md="12"
                              lg="12"
                              xs="12"
                              class="text-center pb-5"
                            >
                              <h2>Assinatura Atual</h2>
                            </v-col>
                          </template>
                        </v-row>
                        <v-row class="px-5 justify-center">
                          <v-col
                            cols="12"
                            md="3"
                            lg="3"
                            sm="3"
                            xs="3"
                            class="text-center"
                          >
                          <v-img
                            max-height="149"
                            max-width="250"
                            :src="urlAssinatura"
                            position="center"
                          ></v-img>
                          </v-col>
                        </v-row>
                        <v-row class="px-5 justify-center">
                          <template>
                            <v-col
                              cols="12"
                              sm="12"
                              md="12"
                              lg="12"
                              xs="12"
                              class="text-center pb-5"
                            >
                              <v-btn
                                color="primary"
                                @click="dialogAssinatura = true"
                              >
                                Mudar Assinatura
                              </v-btn>
                            </v-col>
                          </template>
                        </v-row>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
          </v-flex>
        </v-layout>
      </v-container>

      <v-dialog
        v-model="dialogAssinatura"
        transition="dialog-top-transition"
        max-width="600"
      >
        <template>
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >NOVA ASSINATURA</v-toolbar>
            <v-card-text>
              <div class="text-h4 pa-5">Selecione o Arquivo que Deseja Enviar</div>
              <input
                type="file"
                id="file"
                ref= "file"
                class="pa-5"
                @change="handleFileUpload()"
              />
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="dialogAssinatura = false"
              >Close</v-btn>
              <v-btn
                color="green"
                text
                @click="submitFile()"
              >Enviar</v-btn>
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

    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import ModalRespostaErro from '../ComponeteGlobal/ModalRespostaErro.vue'
import ModalRespostaCorreto from '../ComponeteGlobal/ModalRespostaCorreto.vue'
import AWS from 'aws-sdk'
export default {
  components: { ModalRespostaErro, ModalRespostaCorreto },
  name: 'User',
  computed: {
    ...mapState('auth', ['user'])
  },
  data: () => ({
    urlProd: 'https://htgneexsa.cf/api_htg/',
    // urlProd: 'http://localhost:4040/api_htg/',
    senha: '',
    snackbar: false,
    colorSnackbar: '',
    mensagem: '',
    dialogoRespostaErro: false,
    dialogoRespostaCorreto: false,
    show1: false,
    urlAssinatura: '',
    dialogAssinatura: false,
    file: '',
    fileName: '',
    idAws: 0
  }),
  created () {
    try {
      this.assinaturaAws()
    } catch (err) {
      this.dialogoRespostaErro = true
      console.log(err)
    }
  },
  methods: {
    returnHome () {
      this.$router.push({ name: 'Home' })
    },

    async assinaturaAws () {
      console.log(this.user.email)

      const params = {
        emailFiscal: this.user.email
      }
      const result = await axios({
        method: 'POST',
        url: `${this.urlProd}aws-assinatura-user`,
        data: params
      })

      console.log('assinatura', result.data.url)
      this.urlAssinatura = result.data.url
      this.idAws = result.data.id
    },

    async submitFile () {
      var albumBucketName = 'neexsa-htg-pdfs-finalizados'
      var bucketRegion = 'sa-east-1'
      var IdentityPoolId = 'sa-east-1:5b531b25-81be-487d-a257-e748a8129073'

      AWS.config.update({
        region: bucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: IdentityPoolId
        })
      })

      var photoKey = this.idAws.toString() + '.pdf'
      console.log(photoKey)

      // Use S3 ManagedUpload class as it supports multipart uploads
      var upload = new AWS.S3.ManagedUpload({
        params: {
          Bucket: albumBucketName,
          Key: photoKey,
          Body: this.file
        }
      })

      var promise = upload.promise()

      promise.then(
        function (data) {
          return alert('Salvo com sucesso!!!')
        },
        function (err) {
          console.log(err)
          return alert('Erro ao salvar: ', err)
        }
      )

      this.dialogAssinatura = false
    },

    handleFileUpload () {
      this.file = this.$refs.file.files[0]
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
  .color-card {
    background-color: var(--light-gray)!important;
  }
</style>
