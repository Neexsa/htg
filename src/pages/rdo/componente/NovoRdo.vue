<template>
  <div class="home">
      <v-container>
        <v-layout row wrap>
          <v-flex sm12 xs12 md12 lg12 class="mt-10">
            <v-card-title class="align-start">
              <v-sheet
              color="green"
              width="100%"
              class="overflow-hidden mt-n9 transition-swing v-card--material__sheet"
              style="z-index: 2"
              elevation="6"
              max-width="100%"
              rounded
              >
                <v-theme-provider dark>
                  <slot name="heading" />
                  <div class="text-h7 white--text pa-3 v-card--material__title"> Criar RDO </div>
                </v-theme-provider>
              </v-sheet>
            </v-card-title>
            <v-card class="card-home">
              <v-container class="py-0">
                <v-row class="px-5">
                  <v-col
                    cols="12"
                    sm="4"
                    md="4"
                    lg="3"
                    xs="3"
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
                    cols="12"
                    sm="4"
                    md="4"
                    lg="4"
                    xs="4"
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
                    sm="4"
                    md="4"
                    lg="3"
                    xs="3"
                    class="mt-7"
                  >
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                      disabled
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="dateFormatted"
                          label="Data Inicio"
                          prepend-icon="mdi-calendar"
                          readonly
                          disabled
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
                        disabled
                      >
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="4"
                    md="4"
                    lg="2"
                    xs="2"
                    class="mt-7"
                  >
                    <v-text-field
                      label="ID / RDO"
                      v-model="dataIDRDO"
                      disabled
                    >
                    </v-text-field>
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
                  <v-btn @click="salvarRDO()" color="green" class="mr-3 white--text">Salvar</v-btn>
                  <v-btn @click="returnRDO()" color="primary">Voltar</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
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
  data: vm => ({
    clientes: [],
    nomeCliente: '',
    projetos: [],
    projetosCliente: [],
    arrayProjetos: [],
    nomeProjetos: '',
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu: false,
    dataIDRDO: moment(new Date()).valueOf(),
    mensagem: '',
    snackbar: false,
    colorSnackbar: ''
  }),
  async created () {
    await this.getClientes()
    await this.getProjetos()
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
        url: 'http://localhost:4040/api_htg/dominio/clientes'
      })
      this.clientes = result.data
    },
    async getProjetos () {
      const result = await axios({
        method: 'GET',
        url: 'http://localhost:4040/api_htg/dominio/projetosClientes'
      })
      this.projetos = result.data
    },

    getFiltroProjeto (nome) {
      this.projetosCliente = this.projetos.filter(item => { return item.cliente.nome === nome })

      this.arrayProjetos = this.projetosCliente.map(x => { return x.projeto.nome })
    },

    async salvarRDO () {
      if (this.nomeCliente && this.nomeProjetos) {
        try {
          const params = {
            nomeCliente: this.nomeCliente ? this.nomeCliente : '',
            nomeProjetos: this.nomeProjetos ? this.nomeProjetos : '',
            dateFormatted: this.dateFormatted ? moment(this.dateFormatted).valueOf() : moment(new Date()).valueOf(),
            dataIDRDO: this.dataIDRDO ? this.dataIDRDO : moment(new Date()).valueOf()
          }
          const result = await axios({
            method: 'POST',
            url: 'http://localhost:4040/api_htg/novo-rdo',
            data: params
          })
          this.snackbar = true
          this.mensagem = result.data.mensagem
          this.colorSnackbar = 'green'
          location.reload()
        } catch (err) {
          console.log(err)
          this.snackbar = true
          this.mensagem = 'Erro ao salvar!!!'
          this.colorSnackbar = 'red'
        }
      } else {
        this.snackbar = true
        this.mensagem = 'Preencha os Campo Obrigatórios!!!'
        this.colorSnackbar = 'red'
      }
    },

    returnRDO () {
      this.$emit('voltar')
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
</style>
