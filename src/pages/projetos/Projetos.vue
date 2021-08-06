<template>
  <div class="projetos">
      <v-container v-if="showProjetos">
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
                        <span class="text-h7 white--text  v-card--material__title pr-15">Projetos</span>
                      </v-col>
                    </v-row>
                  </div>
                </v-theme-provider>
                </v-sheet>
              </v-card-title>
              <v-card class="card-projetos">
                <v-container class="py-0">
                  <v-row class="pt-9 px-5">
                    <template>
                      <v-col
                        cols="12"
                        sm="4"
                        md="4"
                        lg="2"
                        xs="2"
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
                              v-model="dateFormatted"
                              label="Data Inicio"
                              prepend-icon="mdi-calendar"
                              readonly
                              clearable
                              v-bind="attrs"
                              @blur="date = parseDate(dateFormatted)"
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
                        cols="12"
                        sm="6"
                        md="6"
                        lg="3"
                        xs="3"
                        >
                          <v-text-field
                            v-model="textoPesquisar"
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
                        >
                          <v-autocomplete
                            v-model="nomeCliente"
                            :items="clientes"
                            label="Cliente"
                            clearable
                          ></v-autocomplete>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="12"
                        md="2"
                        lg="2"
                        xs="2"
                        style="text-align:right"
                      >
                          <v-btn color="blue-grey" class="white--text" @click="getProjetos()">Pesquisar</v-btn>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="12"
                        md="3"
                        lg="3"
                        xs="3"
                        style="text-align:right"
                      >
                          <v-btn color="blue" class="white--text" @click="newProjeto()">Adicionar Projeto</v-btn>
                      </v-col>
                      </template>
                    </v-row>

                    <v-row>
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
                          v-model="switchProjetos"
                          :label="`Buscar Status ${switchProjetos ? 'Ativo' : 'Pausado'}`"
                          @click="mudarStatus()"
                        >
                        </v-switch>
                      </v-col>
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
                              @click="editarProjeto(item)"
                            >
                              <v-icon dark small>mdi-pencil</v-icon>
                            </v-btn>
                          </template>
                          <template v-slot:[`item.pausado`]="{ item }">
                            <v-btn
                              width="30px"
                              height="30px"
                              fab
                              dark
                              small
                              :color="item.pausado ? 'green' : 'red' "
                              @click="alterarStatusProjeto(item.nome, item.pausado, item.cliente)"
                            >
                              <v-icon dark small v-if="item.pausado">mdi-play</v-icon>
                              <v-icon dark small v-else>mdi-pause</v-icon>
                            </v-btn>
                          </template>
                        </v-data-table>
                        </v-col>
                      </template>
                    </v-row>
                </v-container>
              </v-card>
          </v-flex>
        </v-layout>
      </v-container>

      <novo-projeto
        v-if="showCriarProjeto"
        v-on:voltar="voltarProjeto()"
        :tipoProjeto="tipoProjeto"
        :projetoEdit="projetoEdit"
      />

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
import NovoProjeto from './componente/NovoProjeto.vue'
export default {
  components: { NovoProjeto },
  data: vm => ({
    urlProd: 'https://htgneexsa.cf/api_htg/',
    // urlProd: 'http://localhost:4040/api_htg/',
    date: '',
    dateFormatted: '',
    menu: false,
    switchProjetos: false,
    resultArray: [],
    projetos: [],
    desserts: [],
    clientes: [],
    headers: [
      {
        text: 'ID',
        align: 'start',
        sortable: false,
        value: 'idProjeto'
      },
      {
        text: 'Nome dos Projetos',
        align: 'center',
        sortable: false,
        value: 'nome'
      },
      {
        text: 'Cliente',
        value: 'cliente',
        align: 'start'
      },
      {
        text: 'Data Início',
        value: 'dataIncioConfig',
        align: 'center'
      },
      {
        text: 'Data Fim',
        value: 'dataFimConfig',
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
        text: 'Pausar / Ativar',
        value: 'pausado',
        align: 'center'
      }
    ],
    dataInicio: '',
    showRdoProjeto: false,
    mensagem: '',
    colorSnackbar: '',
    novoNomeProjeto: '',
    snackbar: false,
    textoPesquisar: '',
    nomeCliente: '',
    showProjetos: true,
    showCriarProjeto: false,
    tipoProjeto: '',
    projetoEdit: [],
    rules: {
      name: [val => (val || '').length > 0 || 'Preencher o Nome do Cliente']
    }
  }),
  created () {
    this.$root.$emit('Sppinner::show')
    this.getProjetos()
    this.getClientes()
    this.$root.$emit('Sppinner::hide')
  },
  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    }
  },
  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
    }
  },
  methods: {
    returnHome () {
      this.$router.push({ name: 'Home' })
    },
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    async getClientes () {
      const result = await axios({
        method: 'GET',
        url: `${this.urlProd}dominio/clientes-ativos`
      })
      this.clientes = result.data
    },
    async getProjetos () {
      const params = {
        nomeCliente: this.nomeCliente ? this.nomeCliente : '',
        dataInicio: this.dateFormatted ? moment(this.dateFormatted).valueOf() : null,
        textoPesquisar: this.textoPesquisar ? this.textoPesquisar : ''
      }
      try {
        const result = await axios({
          method: 'POST',
          url: `${this.urlProd}projetos`,
          data: params
        })
        console.log(result.data)
        this.resultArray = result.data.map(item => {
          return {
            ...item,
            dataIncioConfig: moment(item.dataInicioInter).format('DD/MM/YYYY'),
            dataFimConfig: moment(item.dataFimInter).format('DD/MM/YYYY'),
            status: item.ativo ? 'Ativo' : 'Desativo'
          }
        })
        const arrayNovo = this.resultArray.filter(x => x.pausado === this.switchProjetos)
        this.desserts = arrayNovo
      } catch (err) {
        console.log(err)
        this.snackbar = true
        this.mensagem = 'Erro ao carregar Projetos'
        this.colorSnackbar = 'red'
      }
    },

    async alterarStatusProjeto (nome, status, cliente) {
      const statusAgora = !status
      const params = {
        nomeCliente: cliente,
        nomeProjeto: nome,
        status: statusAgora
      }
      try {
        const result = await axios({
          method: 'POST',
          url: `${this.urlProd}alterar-status-projeto`,
          data: params
        })
        console.log(result)
        if (result.data.cliente && result.data.cliente.length > 0) {
          this.snackbar = true
          this.mensagem = result.data.mensagem + ': ' + result.data.cliente
          this.colorSnackbar = 'red'
        } else {
          this.snackbar = true
          this.mensagem = result.data.mensagem
          this.colorSnackbar = 'green'
          this.getProjetos()
        }
      } catch (err) {
        console.log(err)
        this.snackbar = true
        this.mensagem = 'Não foi possivel alterar o statis do projeto'
        this.colorSnackbar = 'red'
      }
    },

    mudarStatus () {
      const switarray = this.resultArray
      this.desserts = switarray.filter(item => { return item.pausado === this.switchProjetos })
    },

    voltarProjeto () {
      this.showProjetos = true
      this.showCriarProjeto = false
      this.getProjetos()
    },

    newProjeto () {
      this.showProjetos = false
      this.showCriarProjeto = true
      this.tipoProjeto = 'criar'
    },

    editarProjeto (item) {
      this.showProjetos = false
      this.showCriarProjeto = true
      this.tipoProjeto = 'editar'
      this.projetoEdit = item
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

  .card-projetos{
    margin-top: -30px;
    z-index: 0;
  }

  .color-row{
    background-color: var(--light-gray)!important;
  }

  .color-table {
    background-color: var(--light-gray)!important;
  }
</style>
