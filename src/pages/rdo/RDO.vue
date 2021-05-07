<template>
  <div class="home">
      <v-container v-if="showRdo">
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
                  <div class="text-h7 white--text pa-3 v-card--material__title"> RDO </div>
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
                    cols="12"
                    sm="4"
                    md="4"
                    lg="5"
                    xs="5"
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
                    cols="12"
                    sm="3"
                    md="2"
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
                    md="2"
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
                        class="elevation-1"
                      >
                      <template v-slot:items="props">
                        <tr>
                          <td>{{props.item.cliente}}</td>
                        </tr>
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
      <novo-rdo
        v-if="showNovoRdo"
        v-on:voltar="voltarRDO()"
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
    showRdo: true,
    showNovoRdo: false,
    textoPesquisar: '',
    date: '',
    menu: false,
    headers: [
      {
        text: 'DataInicio',
        align: 'start',
        sortable: false,
        value: 'dataIncioConfig'
      },
      {
        text: 'ID RDO',
        value: 'id_rdo'
      },
      {
        text: 'Cliente',
        value: 'cliente'
      },
      {
        text: 'Projeto',
        value: 'projeto'
      }
    ],
    desserts: []
  }),
  async created () {
    await this.getRDO()
  },

  methods: {
    async getRDO () {
      const params = {
        dataInicio: moment(this.date).valueOf(),
        textoPesquisar: this.textoPesquisar
      }
      const result = await axios({
        method: 'POST',
        url: 'http://localhost:4040/api_htg/rdos',
        data: params
      })
      this.desserts = result.data.map(item => {
        return {
          ...item,
          dataIncioConfig: moment(item.dataInicioInter).format('DD/MM/YYYY')
        }
      })
      console.log(this.desserts)
    },

    newRdo () {
      this.showRdo = false
      this.showNovoRdo = true
    },

    voltarRDO () {
      this.showRdo = true
      this.showNovoRdo = false
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
