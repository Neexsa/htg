<template>
  <div class="home">
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
                        <span class="text-h7 white--text  v-card--material__title pr-15">Assinatura</span>
                      </v-col>
                    </v-row>
                  </div>
                </v-theme-provider>
            </v-sheet>
          </v-card-title>
          <v-card class="card-home">
            <v-container class="py-0">
              <v-row class="px-5">
                <v-col
                  cols="6"
                  sm="3"
                  md="3"
                  lg="2"
                  xs="2"
                  class="mt-7"
                >
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="date"
                        label="Escolha a Data"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="date"
                      :first-day-of-week="0"
                      locale="pt-bt"
                      no-title
                      scrollable
                      @input="menu = false"
                    >
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col
                  cols="6"
                  sm="3"
                  md="3"
                  lg="4"
                  xs="4"
                  class="mt-7"
                >
                  <v-text-field
                  v-model="textoPesquisar"
                    clearable
                    label="Pesquisar"
                    append-icon="mdi-magnify"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="6"
                  sm="3"
                  md="3"
                  lg="2"
                  xs="2"
                  class="mt-7"
                >
                  <v-autocomplete
                    v-model="nomeCliente"
                    :items="clientes"
                    label="Cliente"
                    clearable
                    @change="getFiltroProjeto(nomeCliente)"
                  ></v-autocomplete>
                </v-col>
                <v-col
                  cols="6"
                  sm="3"
                  md="3"
                  lg="2"
                  xs="2"
                  class="mt-7"
                >
                  <v-autocomplete
                    v-model="nomeProjetos"
                    :items="arrayProjetos"
                    label="Projetos"
                    clearable
                    :disabled="nomeCliente ? false : true"
                  ></v-autocomplete>
                </v-col>
                <v-col
                  cols="12"
                  sm="3"
                  md="3"
                  lg="2"
                  xs="2"
                  class="mt-7"
                  style="text-align:end"
                >
                  <v-btn color="blue-grey" class="white--text" @click="getRDO()">Pesquisar</v-btn>
                </v-col>
              </v-row>

              <v-row>

              </v-row>
                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                  lg="12"
                  xs="12"
                  style="text-align:right"
                  class="py-0"
                >
                  <v-switch
                    class="pl-3"
                    style="text-align:right"
                    v-model="switchStatusRdo"
                    :label="`Buscar RDO ${switchStatusRdo ? 'Em Andamento' : 'Finalizado'}`"
                    @click="mudarStatus()"
                  >
                  </v-switch>
                </v-col>
              <v-row>
                <v-col
                  cols="12"
                  md="12"
                  lg="12"
                  sm="12"
                  xs="12"
                  class="mt-7"
                >
                  <template>
                    <v-data-table
                      :headers="headers"
                      :items="desserts"
                      :items-per-page="5"
                      class="elevation-1 color-table"
                    >

                    <template v-slot:[`item.download`]="{ item }">
                      <v-btn
                        width="30px"
                        height="30px"
                        fab
                        dark
                        small
                        color="orange"
                        @click="downloadPdf(item.rdo.id_rdo)"
                      >
                      <v-icon dark small>
                        mdi-file-pdf
                      </v-icon>{{ item.download }}
                      </v-btn>
                    </template>

                    <template v-slot:[`item.assinar`]="{ item }">
                      <v-btn
                        width="30px"
                        height="30px"
                        fab
                        dark
                        small
                        color="primary"
                        @click="sendRdo(item.rdo.id_rdo)"
                      >
                      <v-icon dark small>
                        mdi-send mdi-rotate-315
                      </v-icon>
                      {{ item.assinar }}
                      </v-btn>
                    </template>

                    <template v-slot:[`item.dowloadFinalizado`]="{ item }">
                      <v-btn
                        v-if="item.rdo.status === 'Finalizado'"
                        width="30px"
                        height="30px"
                        fab
                        dark
                        small
                        color="red"
                        @click="downloadRDOFinalizados(item.rdo.id_rdo)"
                      >
                      <v-icon dark small>
                        mdi-file-pdf
                      </v-icon>{{ item.dowloadFinalizado }}
                      </v-btn>
                      <span v-else>Assinar RDO</span>
                    </template>

                    </v-data-table>
                  </template>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
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
            >ENVIAR DOCUMENTO ASSINADO</v-toolbar>
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

  </div>
</template>

<script>
import { mapState } from 'vuex'
import AWS from 'aws-sdk'
import axios from 'axios'
import moment from 'moment'
import ModalRespostaErro from '../ComponeteGlobal/ModalRespostaErro.vue'
import ModalRespostaCorreto from '../ComponeteGlobal/ModalRespostaCorreto.vue'
export default {
  components: { ModalRespostaErro, ModalRespostaCorreto },
  name: 'Assinatura',
  computed: {
    ...mapState('auth', ['user'])
  },
  data: () => ({
    dialogAssinatura: false,
    dialogoRespostaErro: false,
    dialogoRespostaCorreto: false,
    file: '',
    fileName: '',
    tipoRdo: '',
    showNovoRdo: false,
    clientes: [],
    nomeCliente: '',
    projetos: [],
    projetosCliente: [],
    arrayProjetos: [],
    nomeProjetos: '',
    textoPesquisar: '',
    date: '',
    menu: false,
    rdoEdit: [],
    idRdo: '',
    urlProd: 'https://htgneexsa.cf/api_htg/',
    // urlProd: 'http://localhost:4040/api_htg/',
    headers: [
      {
        text: 'DataInicio',
        align: 'start',
        sortable: false,
        value: 'dataIncioConfig'
      },
      {
        text: 'ID RDO',
        value: 'rdo.id_rdo',
        align: 'center'
      },
      {
        text: 'Cliente',
        value: 'rdo.cliente',
        align: 'center'
      },
      {
        text: 'Projeto',
        value: 'rdo.projeto',
        align: 'center'
      },
      {
        text: 'Status',
        value: 'rdo.status',
        align: 'center'
      },
      {
        text: 'Download  RDO',
        value: 'download',
        align: 'center'
      },
      {
        text: 'Enviar RDO Assinado',
        value: 'assinar',
        align: 'center'
      },
      {
        text: 'RDO Finalizada',
        value: 'dowloadFinalizado',
        align: 'center'
      }
    ],
    desserts: [],
    resultArray: [],
    switchStatusRdo: false
  }),
  async created () {
    try {
      await this.getRDO()
      await this.getClientes()
      await this.getProjetos()
    } catch (err) {
      this.dialogoRespostaErro = true
    }
  },

  methods: {

    returnHome () {
      this.$router.push({ name: 'Home' })
    },

    async downloadPdf (id) {
      console.log(id)
      const params = {
        id: id
      }
      const result = await axios({
        method: 'POST',
        url: `${this.urlProd}aws-pdf`,
        data: params
      })

      window.open(result.data, '_blank')
    },

    async downloadRDOFinalizados (id) {
      console.log(id)
      const params = {
        id: id
      }
      const result = await axios({
        method: 'POST',
        url: `${this.urlProd}aws-pdf-finalizado`,
        data: params
      })

      window.open(result.data, '_blank')
    },

    async getRDO () {
      if (this.nomeCliente) {
        this.nomeProjetos = ''
      }
      const params = {
        dataInicio: moment(this.date).valueOf(),
        textoPesquisar: this.textoPesquisar,
        nomeCliente: this.nomeCliente,
        nomeProjetos: this.nomeProjetos,
        nomeUser: this.user.nome
      }
      const result = await axios({
        method: 'POST',
        url: `${this.urlProd}rdos-user`,
        data: params
      })
      this.resultArray = result.data.map(item => {
        return {
          ...item,
          dataIncioConfig: moment(item.rdo.dataInicio).format('DD/MM/YYYY'),
          status: item.rdo.status === 'Finalizado' ? 'Finalizado' : 'Em Andamento'
        }
      })
      const arrayNovo = this.resultArray.filter(x => x.status === 'Em Andamento')
      this.desserts = arrayNovo
      console.log(this.desserts)
    },
    async getClientes () {
      const result = await axios({
        method: 'GET',
        url: `${this.urlProd}dominio/clientes-ativos`
      })
      this.clientes = result.data
    },

    async getProjetos () {
      const result = await axios({
        method: 'GET',
        url: `${this.urlProd}dominio/projetos-clientes`
      })
      this.projetos = result.data
    },

    getFiltroProjeto (nome) {
      this.projetosCliente = this.projetos.filter(item => { return item.cliente.nome === nome })

      this.arrayProjetos = this.projetosCliente.map(x => { return x.projeto.nome })
    },

    sendRdo (id) {
      this.dialogAssinatura = true
      this.idRdo = id
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

      var photoKey = this.idRdo.toString() + '.pdf'
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

      try {
        const params = {
          idRDO: this.idRdo,
          status: 'Finalizado',
          dataFinalizado: moment(new Date()).valueOf()
        }
        await axios({
          method: 'POST',
          url: `${this.urlProd}finalizar-rdo`,
          data: params
        })
        this.getRDO()
        this.dialogAssinatura = false
        this.dialogoRespostaCorreto = true
      } catch (err) {
        console.log(err)
        this.dialogoRespostaErro = true
      }
    },

    sucesses () {
      this.dialogAssinatura = false
      this.dialogoRespostaCorreto = true
    },

    handleFileUpload () {
      this.file = this.$refs.file.files[0]
    },

    mudarStatus () {
      const switarray = this.resultArray
      let switStatus = ''
      console.log(this.switchStatusRdo)
      if (this.switchStatusRdo) {
        switStatus = 'Finalizado'
      } else {
        switStatus = 'Em Andamento'
      }
      this.desserts = switarray.filter(item => { return item.status === switStatus })
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

  .card-home{
    margin-top: -30px;
    z-index: 0;
  }

  .color-table {
    background-color: var(--light-gray)!important;
  }
</style>
