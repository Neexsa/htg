<template>
  <div class="home" >
    <v-container v-if="showAssinatura">
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
                    :label="`Buscar RDO ${switchStatusRdo ? 'Em Andamento' : 'Assinada'}`"
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

                    <template v-slot:[`item.assinarRDO`]="{ item }">
                      <v-btn
                        v-if="item.rdo.status === 'Enviado'"
                        width="30px"
                        height="30px"
                        fab
                        dark
                        small
                        color="orange"
                        @click="assinarRdo(item)"
                      >
                      <v-icon dark small>
                        mdi-pencil
                      </v-icon>{{ item.assinarRDO }}
                      </v-btn>
                      <span v-else>RDO Assinada</span>
                    </template>

                    <template v-slot:[`item.download`]="{ item }">
                      <v-btn
                        v-if="item.rdo.status === 'Assinado'"
                        width="30px"
                        height="30px"
                        fab
                        dark
                        small
                        color="primary"
                        @click="downloadPdf(item.rdo.id_rdo)"
                      >
                      <v-icon dark small>
                        mdi-file-pdf
                      </v-icon>
                      {{ item.download }}
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

    <novo-rdo
      v-if="showNovoRdo"
      v-on:voltarAssinatura="voltarAssinatura()"
      :tipoRdo="tipoRdo"
      :rdoEdit="rdoEdit"
      :rdoCopi="rdoCopi"
      :rdoAssinatura="rdoAssinatura"
    />

  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import moment from 'moment'
import ModalRespostaErro from '../ComponeteGlobal/ModalRespostaErro.vue'
import ModalRespostaCorreto from '../ComponeteGlobal/ModalRespostaCorreto.vue'
import NovoRdo from '../rdo/componente/NovoRdo.vue'
export default {
  components: { ModalRespostaErro, ModalRespostaCorreto, NovoRdo },
  name: 'Assinatura',
  computed: {
    ...mapState('auth', ['user'])
  },
  data: () => ({
    dialogAssinatura: false,
    dialogoRespostaErro: false,
    dialogoRespostaCorreto: false,
    tipoRdo: '',
    showAssinatura: true,
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
    rdoCopi: [],
    rdoAssinatura: [],
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
        text: 'Sequência',
        value: 'rdo.sequencia',
        align: 'center'
      },
      {
        text: 'Status',
        value: 'rdo.status',
        align: 'center'
      },
      {
        text: 'Assinar',
        value: 'assinarRDO',
        align: 'center'
      },
      {
        text: 'RDO Assinada',
        value: 'download',
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
      console.log(result.data)
      this.resultArray = result.data.map(item => {
        return {
          ...item,
          dataIncioConfig: moment(item.rdo.dataInicio).format('DD/MM/YYYY')
        }
      })
      const arrayNovo = this.resultArray.filter(x => x.rdo.status === 'Enviado')
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

    mudarStatus () {
      const switarray = this.resultArray
      console.log(switarray)
      let switStatus = ''
      // console.log(this.switchStatusRdo)
      if (this.switchStatusRdo) {
        switStatus = 'Assinado'
      } else {
        switStatus = 'Enviado'
      }
      // console.log(switStatus)
      this.desserts = switarray.filter(item => { return item.rdo.status === switStatus })
      console.log('desserts', this.desserts)
    },

    assinarRdo (item) {
      console.log(item)
      this.rdoAssinatura = item
      this.showAssinatura = false
      this.showNovoRdo = true
      this.tipoRdo = 'assinatura'
    },
    voltarAssinatura () {
      this.showAssinatura = true
      this.showNovoRdo = false
      this.getRDO()

      this.rdoEdit = []
      this.rdoCopi = []
      this.rdoAssinatura = []
      this.tipoRdo = ''
      // this.$router.push({ name: 'RDO' })
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
