<template>
  <div class="novoProjeto">
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
                          @click="voltarProjeto()"
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
                        <span class="text-h7 white--text  v-card--material__title pr-15">Criar Projeto</span>
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
                      <v-menu
                        ref="menuProjeto"
                        v-model="menuProjeto"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="dateProjeto"
                            label="Data Início"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="dateProjeto"
                          :first-day-of-week="0"
                          locale="pt-bt"
                          no-title
                          scrollable
                          @input="menuProjeto = false"
                          @change="ajusteInformacoes()"
                        >
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col
                      cols="6"
                      sm="4"
                      md="2"
                      lg="2"
                      xs="2"
                      class="mt-7"
                    >
                      <v-menu
                        ref="menuProjeto2"
                        v-model="menuProjeto2"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="dateProjeto2"
                            label="Data Fim"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="dateProjeto2"
                          :first-day-of-week="0"
                          locale="pt-bt"
                          no-title
                          scrollable
                          @input="menuProjeto2 = false"
                          @change="ajusteInformacoes()"
                        >
                        </v-date-picker>
                      </v-menu>
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
                        label="ID Projeto"
                        v-model="idProjeto"
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
                          <h4>Informações do Projeto:</h4>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                            lg="6"
                            xs="6"
                            class="pt-5"
                          >
                            <span>Clientes</span>
                            <v-autocomplete
                              v-model="nomeClienteAdicionar"
                              :items="clientes"
                              label="Cliente"
                              solo
                              clearable
                            ></v-autocomplete>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                            lg="6"
                            xs="6"
                            class="pt-5"
                          >
                            <span>Nome Projeto</span>
                            <v-text-field
                                v-model="novoNomeProjeto"
                                :rules="[rules.required]"
                                type="nome"
                                solo
                                label="Nome Projeto"
                                hint="Nome Projeto"
                              >
                            </v-text-field>
                          </v-col>
                        </v-row>

                        <v-row class="px-5 d-flex justify-center pt-5">
                          <v-col
                            cols="12"
                            sm="4"
                            md="4"
                            lg="2"
                            xs="2"
                          >
                            <span>Prazo Da Atividade</span>
                            <v-text-field
                              v-model="prazoAtividade"
                              label="Prazo Da Atividade"
                              solo
                              class="pt-2"
                              readonly
                            >
                            </v-text-field>
                          </v-col>

                          <v-col
                            cols="12"
                            sm="4"
                            md="4"
                            lg="2"
                            xs="2"
                          >
                            <span>Dias Decorridos</span>
                            <v-text-field
                              v-model="diasDecorridos"
                              label="Dias Decorridos"
                              solo
                              class="pt-2"
                              readonly
                            >
                            </v-text-field>
                          </v-col>

                          <v-col
                            cols="12"
                            sm="4"
                            md="4"
                            lg="2"
                            xs="2"
                          >
                            <span>Prorrogação</span>
                            <v-text-field
                              v-model="prorrogacao"
                              label="Prorrogação"
                              solo
                              class="pt-2"
                              @change="ajusteInformacoes()"
                            >
                            </v-text-field>
                          </v-col>

                          <v-col
                            cols="12"
                            sm="4"
                            md="4"
                            lg="2"
                            xs="2"
                          >
                            <span>Dias Restantes</span>
                            <v-text-field
                              v-model="diasRestantes"
                              label="Dias Restantes"
                              solo
                              class="pt-2"
                              readonly
                            >
                            </v-text-field>
                          </v-col>

                          <v-col
                            cols="12"
                            sm="4"
                            md="4"
                            lg="2"
                            xs="2"
                          >
                            <span>Dias De Atrazo</span>
                            <v-text-field
                              v-model="diasDeAtrazos"
                              label="Dias De Atrazo"
                              solo
                              class="pt-2"
                              readonly
                            >
                            </v-text-field>
                          </v-col>
                        </v-row>
                        <v-row class="px-5 d-flex justify-center pt-5">
                          <v-col
                            cols="12"
                            sm="12"
                            md="12"
                            lg="12"
                            xs="12"
                            style="text-align:center"
                          >
                          <span>ATIVIDADES DO PROJETO</span>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="4"
                            md="4"
                            lg="4"
                            xs="4"
                            style="text-align:center"
                          >
                            <v-text-field
                              v-model="labelAtividades"
                              solo
                              label="Atividades do Projeto"
                              hint="Digite as Atividades do Projeto"
                            >
                            </v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="1"
                            md="1"
                            lg="1"
                            xs="1"
                            style="text-align:center"
                          >
                          <v-btn
                            class="mx-2"
                            fab
                            dark
                            small
                            color="indigo"
                            @click="adicionarProjeto()"
                          >
                            <v-icon dark>
                              mdi-plus
                            </v-icon>
                          </v-btn>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="7"
                            md="7"
                            lg="7"
                            xs="7"
                          >
                          <v-chip
                            v-for="item in atividadesProjeto"
                            :key="item"
                            class="ma-2"
                            close
                            color="primary"
                            @click:close="closeChip(item)"
                          >
                          {{item}}
                          </v-chip>
                          </v-col>
                        </v-row>
                        <v-row class="px-5 d-flex justify-center pt-5">
                          <v-col
                            cols="12"
                            sm="12"
                            md="12"
                            lg="12"
                            xs="12"
                          >
                          <v-data-table
                            :headers="headers"
                            :items="desserts"
                            class="elevation-1"
                            style="text-align:center"
                          >
                            <template v-slot:[`item.editarTabela`]="{ item }">
                              <v-btn
                                width="30px"
                                height="30px"
                                fab
                                dark
                                small
                                color="primary"
                                @click="editarAtividades(item)"
                              >
                                <v-icon dark small>mdi-pencil</v-icon>
                              </v-btn>
                            </template>
                          </v-data-table>
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
                    <v-btn @click="verificarFormulario()" color="green" class="mr-3 white--text">Salvar</v-btn>
                    <v-btn @click="voltarProjeto()" color="primary">Voltar</v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </div>
          </v-flex>
        </v-layout>
      </v-container>

      <v-dialog
        v-model="modalAtividades"
        transition="dialog-top-transition"
        max-width="600"
      >
        <template>
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >EDITAR ATIVIDADE</v-toolbar>
            <v-card-text>
              <v-form
                ref="form"
              >
                  <v-container fluid>
                  <v-row class="pt-5">
                    <v-col
                      cols="12"
                      sm="2"
                      md="2"
                    >
                    <h4>Item</h4>
                    <v-text-field
                      v-model="itemAtividade.item"
                      readonly
                    ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="8"
                      md="8"
                    >
                    <h4>Atividade</h4>
                    <v-text-field
                      v-model="itemAtividade.descricao"
                      readonly
                    ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      md="2"
                    >
                    <h4>Unidade</h4>
                    <v-text-field
                      v-model="itemAtividade.unidade"
                    ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="4"
                      md="4"
                    >
                    <h4>Quant. Contratada</h4>
                    <v-text-field
                      v-model="itemAtividade.qtdCont"
                      @change="totalMedido()"
                    ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="4"
                      md="4"
                    >
                    <h4>Valor Unidade</h4>
                    <v-text-field
                      v-model="itemAtividade.valorUnit"
                      @change="totalMedido()"
                    ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="4"
                      md="4"
                    >
                    <h4>Total Medido</h4>
                    <v-text-field
                      disabled
                      v-model="itemAtividade.totalMed"
                    ></v-text-field>
                    </v-col>
                  </v-row>
                  </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="modalAtividades = false"
              >Fechar</v-btn>
              <v-btn
                color="green"
                text
                @click="salvarAtividade(itemAtividade)"
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
            Fechar
          </v-btn>
        </template>
      </v-snackbar>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  props: ['tipoProjeto', 'projetoEdit'],
  mounted () {
    console.log(this.tipoProjeto, this.projetoEdit)
    if (this.tipoProjeto === 'editar') {
      this.dateProjeto = new Date(this.projetoEdit.dataInicioInter).toISOString().substr(0, 10)
      this.dateProjeto2 = new Date(this.projetoEdit.dataFimInter).toISOString().substr(0, 10)
      this.idProjeto = this.projetoEdit.idProjeto
      this.nomeClienteAdicionar = this.projetoEdit.cliente
      this.novoNomeProjeto = this.projetoEdit.nome
      this.prorrogacao = this.projetoEdit.prorrogacao
      this.atividadesProjeto = this.projetoEdit.atividadesProjeto
      this.desserts = this.projetoEdit.atividades
      this.ajusteInformacoes()
    }
  },
  data: vm => ({
    urlProd: 'https://htgneexsa.cf/api_htg/',
    // urlProd: 'http://localhost:4040/api_htg/',
    mensagem: '',
    snackbar: false,
    colorSnackbar: '',
    idProjeto: moment(new Date()).valueOf(),
    menuProjeto: false,
    dateProjeto: new Date().toISOString().substr(0, 10),
    menuProjeto2: false,
    dateProjeto2: new Date().toISOString().substr(0, 10),
    nomeClienteAdicionar: '',
    novoNomeProjeto: '',
    prazoAtividade: 0,
    diasDecorridos: 0,
    prorrogacao: 0,
    diasRestantes: 0,
    diasDeAtrazos: 0,
    clientes: [],
    camposVerificados: [],
    atividadesProjeto: [],
    labelAtividades: '',
    modalAtividades: false,
    itemAtividade: [],
    editedIndex: 0,
    headers: [
      {
        text: 'Item',
        align: 'start',
        value: 'item'
      },
      { text: 'Descrição', value: 'descricao' },
      { text: 'UN', align: 'center', value: 'unidade' },
      { text: 'QTD. CONT.', align: 'center', value: 'qtdCont' },
      { text: 'VALOR UNIT', align: 'center', value: 'valorUnit' },
      { text: 'TOTAL MED', align: 'center', value: 'totalMed' },
      { text: 'Editar', align: 'center', value: 'editarTabela' }
    ],
    desserts: [],
    rules: {
      required: value => !!value || 'Obrigatório.',
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      }
    }
  }),
  created () {
    this.getClientes()
    this.ajusteInformacoes()
  },
  methods: {
    voltarProjeto () {
      this.$emit('voltar')
    },

    async getClientes () {
      const result = await axios({
        method: 'GET',
        url: `${this.urlProd}dominio/clientes-ativos`
      })
      this.clientes = result.data
    },

    verificarFormulario () {
      this.camposVerificados = []

      if (this.novoNomeProjeto.length < 1) {
        this.camposVerificados.push('Nome Projeto')
      }

      if (this.nomeClienteAdicionar.length < 1) {
        this.camposVerificados.push('Nome Cliente')
      }

      if (this.atividadesProjeto.length < 1) {
        this.camposVerificados.push('Atividades do Projeto')
      }
      this.salvarProjeto()
    },

    async salvarProjeto () {
      const dataInicio = moment(this.dateProjeto).valueOf()
      const dataFim = moment(this.dateProjeto2).valueOf()
      if (this.camposVerificados.length < 1) {
        const params = {
          nomeCliente: this.nomeClienteAdicionar,
          novoNomeProjeto: this.novoNomeProjeto,
          dataInicio: dataInicio,
          dataFim: dataFim,
          prorrogacao: this.prorrogacao ? this.prorrogacao : 0,
          idProjeto: this.idProjeto,
          atividadesProjeto: this.atividadesProjeto,
          atividadesObj: this.desserts
        }
        if (this.tipoProjeto === 'editar') {
          try {
            const result = await axios({
              method: 'POST',
              url: `${this.urlProd}editar-projeto`,
              data: params
            })
            this.snackbar = true
            this.mensagem = result.data.mensagem
            this.colorSnackbar = 'green'
            this.voltarProjeto()
          } catch (err) {
            this.snackbar = true
            this.mensagem = 'Já existe um projeto com esse nome'
            this.colorSnackbar = 'red'
          }
        } else {
          try {
            const result = await axios({
              method: 'POST',
              url: `${this.urlProd}novo-projeto`,
              data: params
            })
            this.snackbar = true
            this.mensagem = result.data.mensagem
            this.colorSnackbar = 'green'
            this.voltarProjeto()
          } catch (err) {
            this.snackbar = true
            this.mensagem = 'Já existe um projeto com esse nome'
            this.colorSnackbar = 'red'
          }
        }
      } else {
        this.snackbar = true
        this.mensagem = `Preencha os Campos: ${this.camposVerificados}`
        this.colorSnackbar = 'red'
      }
    },

    ajusteInformacoes () {
      const dataAgora = moment(new Date()).valueOf()
      // eslint-disable-next-line quote-props
      const momentAgora = moment(this.dateProjeto).set({ 'hour': 0, 'minute': 0, 'seconds': 0 }).valueOf()
      // eslint-disable-next-line quote-props
      const momentDepois = moment(this.dateProjeto2).set({ 'hour': 23, 'minute': 59, 'seconds': 59 }).valueOf()
      console.log(momentAgora, momentDepois)
      const tempoProrrogacao = this.prorrogacao * 1000 * 3600 * 24
      const momentProrrogacao = this.prorrogacao ? momentDepois + tempoProrrogacao : momentDepois

      // Prazo atividade
      this.prazoAtividade = this.calculaInformacoes(momentAgora, momentProrrogacao)

      // Dias Decorridos
      this.diasDecorridos = this.calculaInformacoes(momentAgora, dataAgora)

      if (momentDepois > dataAgora) {
        // Dias Restantes
        this.diasRestantes = this.calculaInformacoes(dataAgora, momentProrrogacao)
      } else {
        this.diasRestantes = 0
      }

      if (momentDepois > dataAgora) {
        this.diasDeAtrazos = 0
      } else {
        // Dias Atrazo
        this.diasDeAtrazos = this.calculaInformacoes(momentProrrogacao, dataAgora)
      }
    },

    calculaInformacoes (dateAntes, dateDepois) {
      var timeDiff = Math.abs(dateAntes - dateDepois)
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
      return diffDays
    },

    adicionarProjeto () {
      const array = this.atividadesProjeto.map(x => { return x.toUpperCase() })
      if (array.includes(this.labelAtividades.toUpperCase())) {
        this.snackbar = true
        this.mensagem = 'Atividade já adicionada'
        this.colorSnackbar = 'red'
        this.labelAtividades = ''
      } else if (this.labelAtividades === '') {
        this.snackbar = true
        this.mensagem = 'Atividade vazia'
        this.colorSnackbar = 'red'
        this.labelAtividades = ''
      } else {
        this.atividadesProjeto.push(this.labelAtividades)
        this.ajustarTabela()
        this.labelAtividades = ''
      }
    },
    closeChip (item) {
      console.log(item)
      this.atividadesProjeto.splice(this.atividadesProjeto.indexOf(item), 1)
      console.log(this.atividadesProjeto)
      this.ajustarTabela()
    },
    ajustarTabela () {
      this.desserts = []
      let aux = 0
      let auxDec = 0
      for (const item of this.atividadesProjeto) {
        aux = aux + 1
        auxDec = 0
        console.log(item)
        const arrayDesc = ['Hora normal diurna', 'Hora extra diurna', 'Hora normal noturna', 'Hora extra noturna', 'Hora extra diurna fim de semana/feriado', 'Hora extra noturna fim de semanasemana/feriado']
        for (const itemDesc of arrayDesc) {
          auxDec = auxDec + 1
          const auxItem = `${aux}.${auxDec}`
          const params = {
            item: parseFloat(auxItem),
            descricao: `${itemDesc} - ${item}`,
            atividade: item,
            unidade: 'HH',
            qtdCont: 0,
            valorUnit: 0,
            totalMed: 0
          }
          console.log(params)
          this.desserts.push(params)
        }
      }
    },

    editarAtividades (item) {
      this.itemAtividade = []
      this.editedIndex = 0
      this.itemAtividade = item
      this.editedIndex = this.desserts.indexOf(item)
      this.modalAtividades = true
    },

    totalMedido () {
      this.itemAtividade.qtdCont = this.itemAtividade.qtdCont * 1
      this.itemAtividade.valorUnit = this.itemAtividade.valorUnit * 1
      this.itemAtividade.totalMed = this.itemAtividade.qtdCont * this.itemAtividade.valorUnit
    },

    salvarAtividade (item) {
      Object.assign(this.desserts[this.editedIndex], item)
      this.modalAtividades = false
    }
  }
}
</script>

<style lang="scss">
  .color-card {
    background-color: var(--light-gray)!important;
  }
</style>
