<template>
  <div class="home">
      <v-container v-if="showRdo">
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
                        <span class="text-h7 white--text  v-card--material__title pr-15">RDO</span>
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
                    lg="2"
                    xs="2"
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
                    style="text-align:center"
                  >
                    <v-btn color="blue-grey" class="white--text" @click="getRDO()">Pesquisar</v-btn>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="3"
                    md="3"
                    lg="2"
                    xs="2"
                    class="mt-7"
                    style="text-align:center"
                  >
                    <v-btn color="primary" @click="newRdo()">Adicionar RDO</v-btn>
                  </v-col>
                </v-row>
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
                      <template v-slot:[`item.editar`]="{ item }">
                        <v-btn
                          width="30px"
                          height="30px"
                          fab
                          dark
                          small
                          color="primary"
                          @click="editarRdo(item)"
                        >
                        <v-icon dark small>
                          mdi-pencil
                        </v-icon>{{ item.editar }}
                        </v-btn>
                      </template>

                      <template v-slot:[`item.download`]="{ item }">
                        <span v-if="item.rdo.status !== 'Assinado'">{{statusRDO(item.rdo.status)}}</span>
                        <v-btn
                          v-else
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

                      <template v-slot:[`item.copiar`]="{ item }">
                        <v-btn
                          width="30px"
                          height="30px"
                          fab
                          dark
                          small
                          color="red"
                          @click="copiarRDO(item)"
                        >
                        <v-icon dark small>
                          mdi-cached
                        </v-icon>{{ item.copiar }}
                        </v-btn>
                      </template>

                      <template v-slot:[`item.qtdColaboradores`]="{ item }">
                        <v-btn
                          width="30px"
                          height="30px"
                          fab
                          dark
                          small
                          color="green"
                          @click="showColaboradores(item.efetivos)"
                        >{{ item.qtdColaboradores }}
                        </v-btn>
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
        v-model="modalColaboradores"
        transition="dialog-top-transition"
        max-width="400"
      >
        <template>
          <v-card>
            <v-toolbar
              color="primary"
              dark
              class="mb-6"
            >CARGO COLABORADORES</v-toolbar>
            <v-card-text
              v-for="item in arrayEfetivo"
              :key="item.cargo"
              class="px-3 py-0"
            >
            <v-text-field
              class="text-h6"
              :label="item.cargo + ': ' + item.qtd"
              solo
              readonly
            >
            </v-text-field>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="modalColaboradores = false"
              >Fechar</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>

      <novo-rdo
        v-if="showNovoRdo"
        v-on:voltar="voltarRDO()"
        :tipoRdo="tipoRdo"
        :rdoEdit="rdoEdit"
        :rdoCopi="rdoCopi"
      />
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import NovoRdo from './componente/NovoRdo.vue'
export default {
  components: { NovoRdo },
  data: () => ({
    modalColaboradores: false,
    tipoRdo: '',
    showRdo: true,
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
    rdoCopi: [],
    rdoAssinatura: [],
    arrayEfetivo: [],
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
        text: 'QTD Colaborador',
        value: 'qtdColaboradores',
        align: 'center'
      },
      {
        text: 'Status',
        value: 'rdo.status',
        align: 'center'
      },
      {
        text: 'Editar',
        value: 'editar',
        align: 'center'
      },
      {
        text: 'Download  RDO',
        value: 'download',
        align: 'center'
      },
      {
        text: 'Copiar  RDO',
        value: 'copiar',
        align: 'center'
      }
    ],
    desserts: []
  }),
  async created () {
    await this.getRDO()
    await this.getClientes()
    await this.getProjetos()
  },

  methods: {

    returnHome () {
      this.$router.push({ name: 'Home' })
    },

    statusRDO (status) {
      if (status === 'Criado') {
        return 'Finalizar RDO'
      } else if (status === 'Enviado') {
        return 'Assinar RDO'
      } else {
        return ''
      }
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
        nomeProjetos: this.nomeProjetos
      }
      const result = await axios({
        method: 'POST',
        url: `${this.urlProd}rdos`,
        data: params
      })
      this.desserts = result.data.map(item => {
        return {
          ...item,
          dataIncioConfig: moment(item.rdo.dataInicio).format('DD/MM/YYYY'),
          qtdColaboradores: item.efetivos.length
        }
      })
      console.log(this.desserts)
    },

    newRdo () {
      this.showRdo = false
      this.showNovoRdo = true
      this.tipoRdo = 'criar'
    },

    voltarRDO () {
      this.showRdo = true
      this.showNovoRdo = false
      this.getRDO()

      this.rdoEdit = []
      this.rdoCopi = []
      this.rdoAssinatura = []
      this.tipoRdo = ''
      // this.$router.push({ name: 'RDO' })
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

    editarRdo (item) {
      this.rdoEdit = item
      this.showNovoRdo = true
      this.showRdo = false
      this.tipoRdo = 'editar'
    },

    copiarRDO (item) {
      console.log(item)
      this.rdoCopi = item
      this.showNovoRdo = true
      this.showRdo = false
      this.tipoRdo = 'copiar'
    },

    showColaboradores (item) {
      this.modalColaboradores = true
      this.arrayEfetivo = []
      const cargos = item.map(x => { return x.funcaoEfetivo })
      const cargosUnique = [...new Set(cargos)]
      console.log('cargos', cargosUnique)
      cargosUnique.forEach(element => {
        let filterItem = []
        filterItem = item.filter(y => { return y.funcaoEfetivo === element })
        const cargosEfet = {
          cargo: element,
          qtd: filterItem.length
        }
        this.arrayEfetivo.push(cargosEfet)
      })
      console.log(this.arrayEfetivo)
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
