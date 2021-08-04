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
                          @click="returnRDO"
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
                        <span class="text-h7 white--text  v-card--material__title pr-15">Criar RDO</span>
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
                      v-if="tipoRdo === 'editar' || tipoRdo === 'assinatura'"
                      cols="12"
                      sm="4"
                      md="4"
                      lg="2"
                      xs="2"
                      class="mt-7"
                    >
                      <v-text-field
                          v-model="dataRdoInicio"
                          readonly
                          label="Data Inicio"
                        >
                      </v-text-field>
                    </v-col>
                    <v-col
                      v-else
                      cols="12"
                      sm="4"
                      md="4"
                      lg="2"
                      xs="2"
                      class="mt-7"
                    >
                      <v-menu
                      ref="menu10"
                      v-model="menu10"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="dataRdoInicio"
                          label="Escolha a Data"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="dataRdoInicio"
                        :first-day-of-week="0"
                        locale="pt-bt"
                        no-title
                        scrollable
                        @input="menu = false"
                        :max="dateNow"
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
                        v-model="diaSemana"
                        readonly
                        label="Dia da Semana"
                      >
                      </v-text-field>
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
                      class="mt-7"
                    >
                      <v-text-field
                        label="Seguencia RDO"
                        v-model="seguencia"
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
                            sm="4"
                            md="4"
                            lg="4"
                            xs="4"
                          >
                            <v-autocomplete
                              v-if="tipoRdo !== 'editar' && tipoRdo !== 'assinatura'"
                              v-model="nomeCliente"
                              :items="clientes"
                              label="Cliente"
                              clearable
                              solo

                              @change="getFiltroProjeto(nomeCliente)"
                            ></v-autocomplete>
                            <v-text-field
                              v-if="tipoRdo === 'editar' || tipoRdo === 'assinatura'"
                              v-model="nomeCliente"
                              label="Cliente"
                              solo
                              disabled
                            >
                            </v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="4"
                            md="4"
                            lg="4"
                            xs="4"
                          >
                            <v-autocomplete
                              v-if="tipoRdo !== 'editar' && tipoRdo !== 'assinatura'"
                              v-model="nomeProjetos"
                              :items="arrayProjetos"
                              label="Projetos"
                              clearable
                              solo

                              :disabled="nomeCliente ? false : true"
                              @change="buscarSeguencial()"
                            ></v-autocomplete>
                            <v-text-field
                              v-if="tipoRdo === 'editar' || tipoRdo === 'assinatura'"
                              v-model="nomeProjetos"
                              label="Projetos"
                              solo
                              disabled
                            >
                            </v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="4"
                            md="4"
                            lg="4"
                            xs="4"
                          >
                            <v-text-field
                              v-model="areaAtuacao"
                              label="Area de Atuação"
                              solo
                              :disabled="tipoRdo === 'assinatura' ? true : false"
                            >
                            </v-text-field>
                          </v-col>
                        </v-row >

                        <v-row class="px-5">
                          <v-col
                            cols="12"
                            sm="4"
                            md="4"
                            lg="4"
                            xs="4"
                          >
                            <v-text-field
                              v-model="cartaChamada"
                              label="Carta Chamada"
                              solo
                              :disabled="tipoRdo === 'assinatura' ? true : false"
                            >
                            </v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="4"
                            md="4"
                            lg="4"
                            xs="4"
                          >
                            <v-autocomplete
                              v-model="nomeFiscal"
                              :items="arrayFiscal"
                              label="Fiscal"
                              clearable
                              solo
                              :disabled="tipoRdo === 'assinatura' ? true : false"
                            ></v-autocomplete>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="4"
                            md="4"
                            lg="4"
                            xs="4"
                          >
                            <v-autocomplete
                              v-model="nomeEncarregado"
                              :items="arrayColaboradores"
                              label="Encarregado"
                              clearable
                              solo
                              :disabled="tipoRdo === 'assinatura' ? true : false"
                            ></v-autocomplete>
                          </v-col>
                        </v-row>
                        <v-divider class="mx-5"></v-divider>
                        <v-row class="px-5 d-flex justify-center pt-5">
                          <v-col
                            cols="12"
                            sm="12"
                            md="12"
                            lg="12"
                            xs="12"
                            class="pb-0"
                          >
                          <h4>Informações do Projeto:</h4>
                          </v-col>
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
                              :disabled="tipoRdo === 'assinatura' ? true : false"
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
                              :disabled="tipoRdo === 'assinatura' ? true : false"
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
                              :disabled="tipoRdo === 'assinatura' ? true : false"
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
                              :disabled="tipoRdo === 'assinatura' ? true : false"
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
                              :disabled="tipoRdo === 'assinatura' ? true : false"
                            >
                            </v-text-field>
                          </v-col>
                        </v-row>
                        <v-divider class="mx-5"></v-divider>
                        <v-row class="px-5 d-flex justify-center pt-5">
                          <v-col
                            cols="12"
                            sm="12"
                            md="12"
                            lg="12"
                            xs="12"
                            class="pb-0"
                          >
                          <h4>Condição do Tempo:</h4>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="3"
                            md="3"
                            lg="2"
                            xs="2"
                            style="text-align:center"
                          >
                          <h4>Manhã</h4>
                          <v-select
                            v-model="condicaoManha"
                            label="Condição"
                            :items="condicao"
                            :disabled="tipoRdo === 'assinatura' ? true : false"
                            solo
                            clearable
                            class="pt-2"
                          >
                          </v-select>
                          </v-col>

                          <v-col
                            cols="12"
                            sm="3"
                            md="3"
                            lg="2"
                            xs="2"
                            style="text-align:center"
                          >
                          <h4>Tarde</h4>
                          <v-select
                            v-model="condicaoTarde"
                            label="Condição"
                            :items="condicao"
                            :disabled="tipoRdo === 'assinatura' ? true : false"
                            solo
                            clearable
                            class="pt-2"
                          >
                          </v-select>
                          </v-col>

                          <v-col
                            cols="12"
                            sm="3"
                            md="3"
                            lg="2"
                            xs="2"
                            style="text-align:center"
                          >
                          <h4>Noite</h4>
                          <v-select
                            v-model="condicaoNoite"
                            label="Condição"
                            :items="condicao"
                            :disabled="tipoRdo === 'assinatura' ? true : false"
                            solo
                            clearable
                            class="pt-2"
                          >
                          </v-select>
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-col>
                  </v-row>

                  <v-row class="px-5 py-2" >
                    <v-col
                      cols="12"
                      md="12"
                      lg="12"
                      sm="12"
                      xs="12"
                    >
                      <v-card class="color-card">
                        <v-row>
                          <v-col
                            cols="12"
                            md="12"
                            lg="12"
                            sm="12"
                            xs="12"
                            class="text-center"
                          >
                            <h4>EFETIVOS</h4>
                          </v-col>
                        </v-row>
                        <v-row class="px-5" v-if="tipoRdo !== 'assinatura'">
                          <v-col
                            cols="10"
                            md="10"
                            lg="10"
                            sm="10"
                            xs="10"
                            class="text-center"
                          >
                            <v-autocomplete
                              v-model="efetivosArray"
                              :items="arrayColaboradores"
                              label="Adicionar Encarregado"
                              hint="Adicionar os Encarregados"
                              persistent-hint
                              clearable
                              solo
                            ></v-autocomplete>
                          </v-col>
                          <v-col
                            cols="2"
                            md="2"
                            lg="2"
                            sm="2"
                            xs="2"
                            class="text-right"
                          >
                          <v-btn
                            color="primary"
                            dark
                            class="mt-1"
                            @click="adiconarColaboradores()"
                          >
                            ADICIONAR
                          </v-btn>
                          </v-col>
                        </v-row>
                        <v-row class="px-5">
                          <v-col
                            cols="12"
                            md="12"
                            lg="12"
                            sm="12"
                            xs="12"
                            class="text-center"
                          >
                          <v-simple-table>
                            <template v-slot:default>
                              <thead>
                                <tr>
                                  <th class="text-left">
                                    ID
                                  </th>
                                  <th class="text-left">
                                    Nome
                                  </th>
                                  <th class="text-left">
                                    Cargo
                                  </th>
                                  <th class="text-center">
                                    Horario Normal
                                  </th>
                                  <th class="text-center">
                                    Hora Extra Sag/Sáb
                                  </th>
                                  <th class="text-center">
                                    Horario Normal Noturna
                                  </th>
                                  <th class="text-center">
                                    Horario Extra Noturna
                                  </th>
                                  <th class="text-center">
                                    Horario Extra Dom/Feri
                                  </th>
                                  <th class="text-center" v-if="tipoRdo !== 'assinatura'">
                                    Adicionar Horas
                                  </th>
                                  <th class="text-center" v-if="tipoRdo !== 'assinatura'">
                                    Repetir Config
                                  </th>
                                  <th class="text-center" v-if="tipoRdo !== 'assinatura'">
                                    Deletar
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="item in desserts"
                                  :key="item.nome"
                                >
                                  <td class="text-left">{{ item.idEfetivo }}</td>
                                  <td class="text-left">{{ item.nomeEfetivo }}</td>
                                  <td class="text-left">{{ item.funcaoEfetivo }}</td>
                                  <td class="text-center">{{ item.horaNormalTotal }}</td>
                                  <td class="text-center">{{ item.horaNormalExtraTotal }}</td>
                                  <td class="text-center">{{ item.horaNormalNoturnaTotal }}</td>
                                  <td class="text-center">{{ item.horaExtraNoturnaTotal }}</td>
                                  <td class="text-center">{{ item.horaExtraFdsTotal }}</td>
                                  <td v-if="tipoRdo !== 'assinatura'">
                                    <v-btn
                                      fab
                                      dark
                                      x-small
                                      color="primary"
                                      @click="adicionarHoras(item)"
                                    >
                                      <v-icon dark>
                                        mdi-plus
                                      </v-icon>
                                    </v-btn>
                                  </td>

                                  <td v-if="tipoRdo !== 'assinatura'">
                                    <v-btn
                                      fab
                                      dark
                                      x-small
                                      color="orange"
                                      @click="repetirConfiguracoes(item)"
                                    >
                                      <v-icon dark>
                                        mdi-cached
                                      </v-icon>
                                    </v-btn>
                                  </td>

                                  <td v-if="tipoRdo !== 'assinatura'">
                                    <v-btn
                                      fab
                                      dark
                                      x-small
                                      color="red"
                                      @click="deleteEfetivos(item)"
                                    >
                                      <v-icon dark>
                                        mdi-delete
                                      </v-icon>
                                    </v-btn>
                                  </td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-col>
                  </v-row>

                  <v-row class="px-5 py-2">
                    <v-col
                      cols="12"
                      sm="12"
                      md="12"
                      lg="12"
                      xs="12"
                    >
                    <v-card class="color-card px-5">
                        <v-row>
                          <v-col
                            cols="12"
                            md="12"
                            lg="12"
                            sm="12"
                            xs="12"
                          >
                            <h4>Observações</h4>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="8"
                            md="8"
                            lg="8"
                            xs="8"
                            class="py-0"
                          >
                            <v-text-field
                              label="Houve DDS neste dia?"
                              solo
                              disabled
                            >
                            </v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="4"
                            md="4"
                            lg="4"
                            xs="4"
                            class="py-0"
                          >
                            <v-select
                            v-model="opcoesDDS"
                            label="Sim / Não"
                            :items="opcoes"
                            solo
                            clearable
                            :disabled="tipoRdo === 'assinatura' ? true : false"
                          >
                          </v-select>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="8"
                            md="8"
                            lg="8"
                            xs="8"
                            class="py-0"
                          >
                            <v-text-field
                              label="Houve algum prejuízo material ou de equipamento neste dia?"
                              solo
                              disabled
                            >
                            </v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="4"
                            md="4"
                            lg="4"
                            xs="4"
                            class="py-0"
                          >
                            <v-select
                            v-model="opcoesPrejuizo"
                            label="Sim / Não"
                            :items="opcoes"
                            solo
                            clearable
                            :disabled="tipoRdo === 'assinatura' ? true : false"
                          >
                          </v-select>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="8"
                            md="8"
                            lg="8"
                            xs="8"
                            class="py-0"
                          >
                            <v-text-field
                              label="Houve violações de segurança neste dia?"
                              solo
                              disabled
                            >
                            </v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="4"
                            md="4"
                            lg="4"
                            xs="4"
                            class="py-0"
                          >
                            <v-select
                            v-model="opcoesViolacao"
                            label="Sim / Não"
                            :items="opcoes"
                            solo
                            clearable
                            :disabled="tipoRdo === 'assinatura' ? true : false"
                          >
                          </v-select>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="8"
                            md="8"
                            lg="8"
                            xs="8"
                            class="py-0"
                          >
                            <v-text-field
                              label="Houve ociosidade ocorrida por acidentes neste dia?"
                              solo
                              disabled
                            >
                            </v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="4"
                            md="4"
                            lg="4"
                            xs="4"
                            class="py-0"
                          >
                            <v-select
                            v-model="opcoesOciosidade"
                            label="Sim / Não"
                            :items="opcoes"
                            solo
                            clearable
                            :disabled="tipoRdo === 'assinatura' ? true : false"
                          >
                          </v-select>
                          </v-col>
                        </v-row>
                    </v-card>
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
                            md="12"
                            lg="12"
                            sm="12"
                            xs="12"
                            class="text-center"
                          >
                            <h4>ATIVIDADES EM EXECUÇÃO</h4>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="4"
                            md="4"
                            lg="4"
                            xs="4"
                          >
                            <span class="pl-2">Serviço: </span>
                            <v-text-field
                              v-model="servico"
                              label="Serviço"
                              class="pt-2"
                              solo
                              :disabled="tipoRdo === 'assinatura' ? true : false"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="4"
                            md="4"
                            lg="2"
                            xs="2"
                          >
                          <span class="pl-2">Início Previsto: </span>
                          <v-menu
                            ref="menu"
                            v-model="menu2"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="inicioPrevisto"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                            :disabled="tipoRdo === 'assinatura' ? true : false"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                solo
                                v-model="inicioPrevisto"
                                class="pt-2"
                                label="0"
                                prepend-inner-icon="mdi-clock-time-four-outline"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                              v-if="menu2"
                              format="24hr"
                              v-model="inicioPrevisto"
                              full-width
                              @click:minute="$refs.menu.save(inicioPrevisto)"
                            ></v-time-picker>
                          </v-menu>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="4"
                            md="4"
                            lg="2"
                            xs="2"
                          >
                          <span class="pl-2">Termino Previsto: </span>
                          <v-menu
                            ref="menu3"
                            v-model="menu4"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="terminoPrevisto"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                            :disabled="tipoRdo === 'assinatura' ? true : false"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                solo
                                v-model="terminoPrevisto"
                                label="0"
                                class="pt-2"
                                prepend-inner-icon="mdi-clock-time-four-outline"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                              v-if="menu4"
                              format="24hr"
                              v-model="terminoPrevisto"
                              full-width
                              @click:minute="$refs.menu3.save(terminoPrevisto)"
                            ></v-time-picker>
                          </v-menu>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="4"
                            md="4"
                            lg="2"
                            xs="2"
                          >
                          <span class="pl-2">Início Real: </span>
                          <v-menu
                            ref="menu5"
                            v-model="menu6"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="inicioReal"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                            :disabled="tipoRdo === 'assinatura' ? true : false"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                solo
                                v-model="inicioReal"
                                label="0"
                                class="pt-2"
                                prepend-inner-icon="mdi-clock-time-four-outline"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                              v-if="menu6"
                              format="24hr"
                              v-model="inicioReal"
                              full-width
                              @click:minute="$refs.menu5.save(inicioReal)"
                            ></v-time-picker>
                          </v-menu>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="4"
                            md="4"
                            lg="2"
                            xs="2"
                          >
                          <span class="pl-2">Termino Real: </span>
                          <v-menu
                            ref="menu7"
                            v-model="menu8"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="terminoReal"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                            :disabled="tipoRdo === 'assinatura' ? true : false"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                solo
                                v-model="terminoReal"
                                label="0"
                                class="pt-2"
                                prepend-inner-icon="mdi-clock-time-four-outline"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                              v-if="menu8"
                              format="24hr"
                              v-model="terminoReal"
                              full-width
                              @click:minute="$refs.menu7.save(terminoReal)"
                            ></v-time-picker>
                          </v-menu>
                          </v-col>
                        </v-row>

                        <v-row class="px-5">
                          <v-col
                            cols="12"
                            sm="12"
                            md="12"
                            lg="12"
                            xs="12"
                            class="text-center"
                          >
                          <v-data-table
                            :headers="headersAtividade"
                            :items="dessertsAtividade"
                            sort-by="horaNormalInicio"
                            class="elevation-1"
                          >
                            <template v-slot:top>
                              <v-toolbar
                                flat
                              >
                                <v-toolbar-title>Mão de obra direta</v-toolbar-title>
                                <v-divider
                                  class="mx-4"
                                  inset
                                  vertical
                                ></v-divider>
                                <v-spacer></v-spacer>
                                <v-dialog
                                  v-model="dialogAtividade"
                                  max-width="700px"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                      color="primary"
                                      dark
                                      class="mb-2"
                                      v-bind="attrs"
                                      v-on="on"
                                      @click="changeId()"
                                      v-if="tipoRdo !== 'assinatura'"
                                    >
                                      Adicionar Atividade
                                    </v-btn>
                                  </template>
                                  <v-card>
                                    <v-card-title>
                                      <span class="headline">{{ formTitleAtividade }}</span>
                                    </v-card-title>

                                    <v-card-text>
                                      <v-container>
                                        <v-row>
                                          <v-col
                                            cols="12"
                                            sm="10"
                                            md="10"
                                          >
                                            <v-text-field
                                              v-model="editedItemAtividade.descricao"
                                              label="DESCRIÇÃO DO SERVIÇO"
                                              clearable
                                            ></v-text-field>
                                          </v-col>
                                          <v-col
                                            cols="12"
                                            sm="2"
                                            md="2"
                                          >
                                            <v-text-field
                                              v-model="editedItemAtividade.id "
                                              label="Id"
                                              readonly
                                            ></v-text-field>
                                          </v-col>
                                          <v-col
                                            cols="12"
                                            sm="4"
                                            md="4"
                                          >
                                            <v-text-field
                                              v-model="editedItemAtividade.quantCont"
                                              label="QUANT. CONT."
                                            ></v-text-field>
                                          </v-col>
                                          <v-col
                                            cols="12"
                                            sm="4"
                                            md="4"
                                          >
                                            <v-text-field
                                              v-model="editedItemAtividade.realAcum"
                                              label="REAL ACUM."
                                            ></v-text-field>
                                          </v-col>
                                          <v-col
                                            cols="12"
                                            sm="4"
                                            md="4"
                                          >
                                            <v-text-field
                                              v-model="editedItemAtividade.quantReal"
                                              label="QUANT. REAL"
                                            ></v-text-field>
                                          </v-col>
                                          <v-col
                                            cols="12"
                                            sm="6"
                                            md="4"
                                          >
                                            <v-text-field
                                              v-model="editedItemAtividade.saldoCont"
                                              label="SALDO QUANT."
                                            ></v-text-field>
                                          </v-col>
                                          <v-col
                                            cols="12"
                                            sm="6"
                                            md="4"
                                          >
                                            <v-text-field
                                              v-model="editedItemAtividade.unidade"
                                              label="Unidade"
                                            ></v-text-field>
                                          </v-col>
                                          <v-col
                                            cols="12"
                                            sm="6"
                                            md="4"
                                          >
                                            <v-text-field
                                              v-model="editedItemAtividade.referencia"
                                              label="Referência"
                                            ></v-text-field>
                                          </v-col>
                                        </v-row>
                                      </v-container>
                                    </v-card-text>

                                    <v-card-actions v-if="tipoRdo !== 'assinatura'">
                                      <v-spacer></v-spacer>
                                      <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="closeAtividade"
                                      >
                                        Cancel
                                      </v-btn>
                                      <v-btn
                                        color="green darken-1"
                                        text
                                        @click="saveAtividade"
                                      >
                                        Salvar
                                      </v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                                <v-dialog v-model="dialogDeleteAtividade" max-width="500px">
                                  <v-card>
                                    <v-card-title class="headline">Tem certeza que vai excluir?</v-card-title>
                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn color="blue darken-1" text @click="closeDeleteAtividade">Cancel</v-btn>
                                      <v-btn color="blue darken-1" text @click="deleteItemConfirmAtividade">OK</v-btn>
                                      <v-spacer></v-spacer>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                              </v-toolbar>
                            </template>
                            <template v-slot:[`item.actions`]="{ item }" v-if="tipoRdo !== 'assinatura'">
                              <v-icon
                                small
                                class="mr-2"
                                @click="editItemAtividade(item)"
                              >
                                mdi-pencil
                              </v-icon>
                              <v-icon
                                small
                                @click="deleteItemAtividade(item)"
                              >
                                mdi-delete
                              </v-icon>
                            </template>
                          </v-data-table>
                          </v-col>
                        </v-row>
                      </v-card>
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
                            md="12"
                            lg="12"
                            sm="12"
                            xs="12"
                            class="text-center"
                          >
                          <h4>COMENTÁRIOS  CONTRATADA</h4>
                          </v-col>
                          <v-col
                            cols="12"
                            md="12"
                            lg="12"
                            sm="12"
                            xs="12"
                            class="text-center"
                          >
                            <v-textarea
                              solo
                              v-model="comentarios"
                              label="Comentários"
                              auto-grow
                              clearable
                              rows="4"
                              :disabled="tipoRdo === 'assinatura' ? true : false"
                            ></v-textarea>
                          </v-col>
                        </v-row>
                      </v-card>
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
                      <v-card class="color-card" v-if="tipoRdo === 'assinatura'">
                        <v-row class="px-5">
                          <v-col
                            cols="12"
                            md="12"
                            lg="12"
                            sm="12"
                            xs="12"
                            class="text-center"
                          >
                          <h4>COMENTÁRIOS  CONTRATANTE</h4>
                          </v-col>
                          <v-col
                            cols="12"
                            md="12"
                            lg="12"
                            sm="12"
                            xs="12"
                            class="text-center"
                          >
                            <v-textarea
                              solo
                              v-model="comentariosContratante"
                              label="Comentários"
                              auto-grow
                              clearable
                              rows="4"
                            ></v-textarea>
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-col>
                  </v-row>

                  <v-row class="px-5 py-2 d-flex justify-center" v-if="tipoRdo === 'assinatura'">
                    <v-col
                      cols="12"
                      md="12"
                      lg="12"
                      sm="12"
                      xs="12"
                    >
                      <v-card class="color-card">
                        <v-row class="px-5 d-flex justify-center">
                          <v-col
                            cols="12"
                            md="3"
                            lg="3"
                            sm="3"
                            xs="3"
                            class="text-center"
                          >
                          <h4>ASSINATURA CONTRATANTE</h4>
                          </v-col>
                        </v-row>
                        <v-row class="px-5 d-flex flex-column justify-space-between align-center">
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
                      v-if="tipoRdo !== 'assinatura'"
                    >
                    <v-btn @click="salvarRDO('salvar')" color="green" class="mr-3 white--text">Salvar</v-btn>
                    <v-btn @click="modalFinalizado = true" class="mr-3 white--text" color="orange darken-4">Finalizar</v-btn>
                    <v-btn @click="returnRDO()" color="primary">Voltar</v-btn>
                    </v-col>

                    <v-col
                      cols="12"
                      md="12"
                      lg="12"
                      sm="12"
                      xs="12"
                      class="mt-7 text-right"
                      v-if="tipoRdo === 'assinatura'"
                    >
                    <v-btn @click="verificarAssinatura()" color="green" class="mr-3 white--text">Assinar</v-btn>
                    <v-btn @click="returnAssinatura()" color="primary">Voltar</v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </div>
          </v-flex>
        </v-layout>
      </v-container>

      <v-dialog
        v-model="dialogHoraEfetivo"
        transition="dialog-top-transition"
        max-width="600"
      >
        <template>
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >Adicionar Hora Efetivo</v-toolbar>
            <v-card-text>
              <v-form
                ref="form"
              >
                  <v-container fluid>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="12"
                      md="12"
                    >
                    <h4>Hora Normal</h4>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.horaNormalInicio"
                        label="Início"
                        @change="horaNormal()"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.horaNormalTermino"
                        label="Término"
                        @change="horaNormal()"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.horaNormalTotal"
                        label="Total"
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      md="12"
                    >
                      <h4>Hora Extra Seg A Sáb</h4>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.horaNormalExtraInicio"
                        label="Início"
                        @change="horaNormalExtra()"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.horaNormalExtraTermino"
                        label="Termino"
                        @change="horaNormalExtra()"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.horaNormalExtraTotal"
                        label="Total"
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      md="12"
                    >
                      <h4>Hora Normal Noturna</h4>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.horaNormalNoturnaInicio"
                        label="Início"
                        @change="horaNormalNoturna()"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.horaNormalNoturnaTermino"
                        label="Termino"
                        @change="horaNormalNoturna()"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.horaNormalNoturnaTotal"
                        label="Total"
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      md="12"
                    >
                      <h4>Hora Extra Noturna</h4>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.horaExtraNoturnaInicio"
                        label="Início"
                        @change="horaExtraNoturna()"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.horaExtraNoturnaTermino"
                        label="Termino"
                        @change="horaExtraNoturna()"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.horaExtraNoturnaTotal"
                        label="Total"
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      md="12"
                    >
                      <h4>Hora Extra Dom e Feriado</h4>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.horaExtraFdsInicio"
                        label="Início"
                        @change="horaExtraFds()"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.horaExtraFdsTermino"
                        label="Termino"
                        @change="horaExtraFds()"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.horaExtraFdsTotal"
                        label="Total"
                        disabled
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="dialogHoraEfetivo = false"
              >Close</v-btn>
              <v-btn
                color="green"
                text
                @click="salvarHoraEfetivo()"
              >Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>

      <v-dialog
        v-model="modalFinalizado"
        transition="dialog-top-transition"
        max-width="600"
      >
        <template>
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >ENVIAR RDO PARA O FISCAL</v-toolbar>
            <v-card-text>
              <div class="text-h4 pa-5">Deseja enviar essa RDO para o fiscal ?</div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="modalFinalizado = false"
              >Fechar</v-btn>
              <v-btn
                color="green"
                text
                @click="salvarRDO('finalizar')"
              >Enviar</v-btn>
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
            Close
          </v-btn>
        </template>
      </v-snackbar>

      <v-dialog v-model="dialogDeleteEfetivo" max-width="500px">
        <v-card>
          <v-card-title class="headline">Tem certeza que vai excluir?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="deleteEfetivoConfirm">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
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

    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import ModalRespostaErro from '../../ComponeteGlobal/ModalRespostaErro.vue'
import ModalRespostaCorreto from '../../ComponeteGlobal/ModalRespostaCorreto.vue'
export default {
  components: { ModalRespostaErro, ModalRespostaCorreto },
  props: ['tipoRdo', 'rdoEdit', 'rdoCopi', 'rdoAssinatura'],
  mounted () {
    console.log(this.tipoRdo)
    if (this.tipoRdo === 'editar') {
      this.dataRdoInicio = moment(this.rdoEdit.rdo.dataInicio).toISOString().substr(0, 10)
      this.nomeCliente = this.rdoEdit.rdo.cliente
      this.nomeProjetos = this.rdoEdit.rdo.projeto
      this.dataIDRDO = this.rdoEdit.rdo.id_rdo
      this.areaAtuacao = this.rdoEdit.rdo.areaAtuacao
      this.cartaChamada = this.rdoEdit.rdo.cartaChamada
      this.nomeFiscal = this.rdoEdit.rdo.nomeFiscal
      this.nomeEncarregado = this.rdoEdit.rdo.nomeEncarregado
      this.condicaoManha = this.rdoEdit.rdo.condicaoManha
      this.condicaoTarde = this.rdoEdit.rdo.condicaoTarde
      this.condicaoNoite = this.rdoEdit.rdo.condicaoNoite
      this.prazoAtividade = this.rdoEdit.rdo.prazoAtividade
      this.diasDecorridos = this.rdoEdit.rdo.diasDecorridos
      this.prorrogacao = this.rdoEdit.rdo.prorrogacao
      this.diasRestantes = this.rdoEdit.rdo.diasRestantes
      this.diasDeAtrazos = this.rdoEdit.rdo.diasDeAtrazos
      this.opcoesDDS = this.rdoEdit.rdo.opcoesDDS
      this.opcoesPrejuizo = this.rdoEdit.rdo.opcoesPrejuizo
      this.opcoesViolacao = this.rdoEdit.rdo.opcoesViolacao
      this.opcoesOciosidade = this.rdoEdit.rdo.opcoesOciosidade
      this.servico = this.rdoEdit.rdo.servico
      this.inicioReal = this.rdoEdit.rdo.inicioReal
      this.terminoReal = this.rdoEdit.rdo.terminoReal
      this.inicioPrevisto = this.rdoEdit.rdo.inicioPrevisto
      this.terminoPrevisto = this.rdoEdit.rdo.terminoPrevisto
      this.comentarios = this.rdoEdit.rdo.comentarios
      this.dataCriacao = this.rdoEdit.rdo.dataCriacao
      this.seguencia = this.rdoEdit.rdo.sequencia

      console.log(this.rdoEdit)
    } else if (this.tipoRdo === 'copiar') {
      this.areaAtuacao = this.rdoCopi.rdo.areaAtuacao
      this.cartaChamada = this.rdoCopi.rdo.cartaChamada
      this.nomeFiscal = this.rdoCopi.rdo.nomeFiscal
      this.nomeEncarregado = this.rdoCopi.rdo.nomeEncarregado
      this.condicaoManha = this.rdoCopi.rdo.condicaoManha
      this.condicaoTarde = this.rdoCopi.rdo.condicaoTarde
      this.condicaoNoite = this.rdoCopi.rdo.condicaoNoite
      this.prazoAtividade = this.rdoCopi.rdo.prazoAtividade
      this.diasDecorridos = this.rdoCopi.rdo.diasDecorridos
      this.prorrogacao = this.rdoCopi.rdo.prorrogacao
      this.diasRestantes = this.rdoCopi.rdo.diasRestantes
      this.diasDeAtrazos = this.rdoCopi.rdo.diasDeAtrazos
      this.opcoesDDS = this.rdoCopi.rdo.opcoesDDS
      this.opcoesPrejuizo = this.rdoCopi.rdo.opcoesPrejuizo
      this.opcoesViolacao = this.rdoCopi.rdo.opcoesViolacao
      this.opcoesOciosidade = this.rdoCopi.rdo.opcoesOciosidade
      this.servico = this.rdoCopi.rdo.servico
      this.inicioReal = this.rdoCopi.rdo.inicioReal
      this.terminoReal = this.rdoCopi.rdo.terminoReal
      this.inicioPrevisto = this.rdoCopi.rdo.inicioPrevisto
      this.terminoPrevisto = this.rdoCopi.rdo.terminoPrevisto
      this.comentarios = this.rdoCopi.rdo.comentarios
      this.dataCriacao = this.rdoCopi.rdo.dataCriacao

      console.log(this.rdoCopi)
    } else if (this.tipoRdo === 'assinatura') {
      this.dataRdoInicio = moment(this.rdoAssinatura.rdo.dataInicio).toISOString().substr(0, 10)
      this.nomeCliente = this.rdoAssinatura.rdo.cliente
      this.nomeProjetos = this.rdoAssinatura.rdo.projeto
      this.dataIDRDO = this.rdoAssinatura.rdo.id_rdo
      this.areaAtuacao = this.rdoAssinatura.rdo.areaAtuacao
      this.cartaChamada = this.rdoAssinatura.rdo.cartaChamada
      this.nomeFiscal = this.rdoAssinatura.rdo.nomeFiscal
      this.nomeEncarregado = this.rdoAssinatura.rdo.nomeEncarregado
      this.condicaoManha = this.rdoAssinatura.rdo.condicaoManha
      this.condicaoTarde = this.rdoAssinatura.rdo.condicaoTarde
      this.condicaoNoite = this.rdoAssinatura.rdo.condicaoNoite
      this.prazoAtividade = this.rdoAssinatura.rdo.prazoAtividade
      this.diasDecorridos = this.rdoAssinatura.rdo.diasDecorridos
      this.prorrogacao = this.rdoAssinatura.rdo.prorrogacao
      this.diasRestantes = this.rdoAssinatura.rdo.diasRestantes
      this.diasDeAtrazos = this.rdoAssinatura.rdo.diasDeAtrazos
      this.opcoesDDS = this.rdoAssinatura.rdo.opcoesDDS
      this.opcoesPrejuizo = this.rdoAssinatura.rdo.opcoesPrejuizo
      this.opcoesViolacao = this.rdoAssinatura.rdo.opcoesViolacao
      this.opcoesOciosidade = this.rdoAssinatura.rdo.opcoesOciosidade
      this.servico = this.rdoAssinatura.rdo.servico
      this.inicioReal = this.rdoAssinatura.rdo.inicioReal
      this.terminoReal = this.rdoAssinatura.rdo.terminoReal
      this.inicioPrevisto = this.rdoAssinatura.rdo.inicioPrevisto
      this.terminoPrevisto = this.rdoAssinatura.rdo.terminoPrevisto
      this.comentarios = this.rdoAssinatura.rdo.comentarios
      this.dataCriacao = this.rdoAssinatura.rdo.dataCriacao
      this.seguencia = this.rdoAssinatura.rdo.sequencia

      console.log(this.rdoAssinatura)

      this.assinaturaAws()
    }
  },
  data: vm => ({
    urlProd: 'https://htgneexsa.cf/api_htg/',
    // urlProd: 'http://localhost:4040/api_htg/',
    menu10: false,
    dataRdoInicio: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    dateNow: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    dialogoRespostaErro: false,
    dialogoRespostaCorreto: false,
    modalFinalizado: false,
    clientes: [],
    projetos: [],
    projetosCliente: [],
    arrayProjetos: [],
    colaboradores: [],
    arrayFiscal: [],
    arrayColaboradores: [],
    menu: false,
    mensagem: '',
    snackbar: false,
    colorSnackbar: '',
    diaSemana: '',
    condicao: ['Bom', 'Chuva', 'Ruim'],
    opcoes: ['Sim', 'Não'],

    menu2: false,
    menu4: false,
    menu6: false,
    menu8: false,

    dialog: false,
    dialogDelete: false,
    dialogAtividade: false,
    dialogDeleteAtividade: false,
    headers: [
      {
        text: 'Id',
        align: 'start',
        sortable: false,
        value: 'idEfetivo'
      },
      { text: 'Nome', value: 'nomeEfetivo', align: 'center', sortable: true },
      { text: 'Funcao', value: 'funcaoEfetivo', align: 'center', sortable: true },
      { text: 'Horario Normal', value: 'horaNormalTotal', align: 'center', sortable: true },
      { text: 'Hora Extra Sag/Sáb', value: 'horaNormalExtraTotal', align: 'center', sortable: true },
      { text: 'Horario Normal Noturna', value: 'horaNormalNoturnaTotal', align: 'center', sortable: true },
      { text: 'Horario Extra Noturna', value: 'horaExtraNoturnaTotal', align: 'center', sortable: true },
      { text: 'Horario Extra Dom/Feri', value: 'horaExtraFdsTotal', align: 'center', sortable: true },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    headersAtividade: [
      {
        text: 'ID',
        align: 'start',
        sortable: false,
        value: 'id'
      },
      { text: 'Descrição do Serviso', value: 'descricao', align: 'center', sortable: true },
      { text: 'QUANT. CONT.', value: 'quantCont', align: 'center', sortable: true },
      { text: 'REAL ACUM.', value: 'realAcum', align: 'center', sortable: true },
      { text: 'QUANT. REAL', value: 'quantReal', align: 'center', sortable: true },
      { text: 'SALDO CONT.', value: 'saldoCont', align: 'center', sortable: true },
      { text: 'UNIDADE', value: 'unidade', align: 'center', sortable: true },
      { text: 'REFERÊNCIA', value: 'referencia', align: 'center', sortable: true },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    desserts: [],
    dessertsAtividade: [],
    editedIndex: -1,
    editedIndexAtividade: -1,
    editedItem: {
      name: '',
      idEfetivo: '',
      nomeEfetivo: '',
      funcaoEfetivo: '',
      horaNormalInicio: 0,
      horaNormalTermino: 0,
      horaNormalTotal: 0,
      horaNormalExtraInicio: 0,
      horaNormalExtraTermino: 0,
      horaNormalExtraTotal: 0,
      horaNormalNoturnaInicio: 0,
      horaNormalNoturnaTermino: 0,
      horaNormalNoturnaTotal: 0,
      horaExtraNoturnaInicio: 0,
      horaExtraNoturnaTermino: 0,
      horaExtraNoturnaTotal: 0,
      horaExtraFdsInicio: 0,
      horaExtraFdsTermino: 0,
      horaExtraFdsTotal: 0
    },
    editedItemAtividade: {
      descricao: '',
      id: 0,
      quantCont: 0,
      realAcum: 0,
      quantReal: 0,
      saldoCont: 0,
      unidade: '',
      referencia: ''
    },
    defaultItem: {
      name: '',
      idEfetivo: '',
      nomeEfetivo: '',
      funcaoEfetivo: '',
      horaNormalInicio: 0,
      horaNormalTermino: 0,
      horaNormalTotal: 0,
      horaNormalExtraInicio: 0,
      horaNormalExtraTermino: 0,
      horaNormalExtraTotal: 0,
      horaNormalNoturnaInicio: 0,
      horaNormalNoturnaTermino: 0,
      horaNormalNoturnaTotal: 0,
      horaExtraNoturnaInicio: 0,
      horaExtraNoturnaTermino: 0,
      horaExtraNoturnaTotal: 0,
      horaExtraFdsInicio: 0,
      horaExtraFdsTermino: 0,
      horaExtraFdsTotal: 0
    },

    defaultItemAtividade: {
      descricao: '',
      id: 0,
      quantCont: 0,
      realAcum: 0,
      quantReal: 0,
      saldoCont: 0,
      unidade: '',
      referencia: ''
    },

    nomeCliente: '',
    nomeProjetos: '',
    dataIDRDO: moment(new Date()).valueOf(),
    // dataRdoInicio: moment(new Date()).locale('pt-br').format('L'),
    areaAtuacao: '',
    cartaChamada: '',
    nomeFiscal: '',
    nomeEncarregado: '',
    condicaoManha: '',
    condicaoTarde: '',
    condicaoNoite: '',
    prazoAtividade: 0,
    diasDecorridos: 0,
    prorrogacao: 0,
    diasRestantes: 0,
    diasDeAtrazos: 0,
    opcoesDDS: '',
    opcoesPrejuizo: '',
    opcoesViolacao: '',
    opcoesOciosidade: '',
    servico: '',
    inicioReal: 0,
    terminoReal: 0,
    inicioPrevisto: 0,
    terminoPrevisto: 0,
    comentarios: '',

    efetivosArray: '',
    dialogHoraEfetivo: false,
    dialogDeleteEfetivo: false,
    seguencia: 0,
    comentariosContratante: '',
    urlAssinatura: '',

    maxHoraNormalTotal: 0,
    maxHoraNormalExtraTotal: 0,
    maxHoraNormalNoturnaTotal: 0,
    maxHoraExtraNoturnaTotal: 0,
    maxHoraExtraFdsTotal: 0
  }),
  async created () {
    await this.getClientes()
    await this.getProjetos()
    await this.getColaboradores()
    await this.diaDaSemana()
    await this.initialize()
    await this.initializeAtividade()
  },
  computed: {
    /* computedDateFormatted () {
      return this.formatDate(this.date)
    }, */

    formTitle () {
      return this.editedIndex === -1 ? 'Adicionar Colaborador' : 'Editar Colaborador'
    },

    formTitleAtividade () {
      return this.editedIndexAtividade === -1 ? 'Adicionar Atividade' : 'Editar Atividade'
    }
  },
  watch: {
    /* date (val) {
      this.dataRdoInicio = this.formatDate(this.date)
    }, */
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },

    dialogAtividade (valAtividade) {
      valAtividade || this.closeAtividade()
    },
    dialogDeleteAtividade (valAtividade) {
      valAtividade || this.closeDeleteAtividade()
    }
  },
  methods: {
    /* formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [day, month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }, */
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

    async getColaboradores () {
      const result = await axios({
        method: 'GET',
        url: `${this.urlProd}dominio/colaboradores`
      })
      this.colaboradores = result.data

      // Fiscal
      const fiscal = this.colaboradores.filter(item => { return item.funcao === 'Fiscal' })
      this.arrayFiscal = fiscal.map(x => {
        return x.matricula + ' - ' + x.nome
      })

      this.arrayColaboradores = this.colaboradores.map(y => {
        return y.matricula + ' - ' + y.nome + ' - ' + y.funcao
      })

      console.log(this.arrayColaboradores)
    },

    async buscarSeguencial () {
      const params = {
        nomeCliente: this.nomeCliente ? this.nomeCliente : '',
        nomeProjetos: this.nomeProjetos ? this.nomeProjetos : ''
      }
      const result = await axios({
        method: 'POST',
        url: `${this.urlProd}get-seguencia-rdo`,
        data: params
      })
      this.seguencia = result.data.numSeguencia
    },

    diaDaSemana () {
      const semana = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado']
      const d = new Date()
      this.diaSemana = semana[d.getDay()]
      console.log(this.diaSemana)
    },

    getFiltroProjeto (nome) {
      console.log(this.projetos)
      this.projetosCliente = this.projetos.filter(item => {
        return item.cliente.nome === nome && item.projeto.ativo === true && item.projeto.pausado === false
      })

      this.arrayProjetos = this.projetosCliente.map(x => { return x.projeto.nome })
    },

    async calculaTotalEfetivo (efetivos) {
      for (const item of efetivos) {
        this.maxHoraNormalTotal = this.maxHoraNormalTotal + item.horaNormalTotal
        this.maxHoraNormalExtraTotal = this.maxHoraNormalExtraTotal + item.horaNormalExtraTotal
        this.maxHoraNormalNoturnaTotal = this.maxHoraNormalNoturnaTotal + item.horaNormalNoturnaTotal
        this.maxHoraExtraNoturnaTotal = this.maxHoraExtraNoturnaTotal + item.horaExtraNoturnaTotal
        this.maxHoraExtraFdsTotal = this.maxHoraExtraFdsTotal + item.horaExtraFdsTotal
      }
      console.log('efetivos', this.maxHoraNormalTotal)
    },

    async salvarRDO (tipo) {
      if (this.nomeCliente && this.nomeProjetos) {
        await this.calculaTotalEfetivo(this.desserts)
        const params = {
          tipo: tipo,
          nomeCliente: this.nomeCliente ? this.nomeCliente : '',
          nomeProjetos: this.nomeProjetos ? this.nomeProjetos : '',
          dataRdo: this.dataRdoInicio ? moment(this.dataRdoInicio).locale('pt-br').format('L') : moment(new Date()).locale('pt-br').format('L'),
          diaSemana: this.diaSemana ? this.diaSemana : '',
          dateInicio: this.dataRdoInicio ? moment(this.dataRdoInicio).valueOf() : moment(new Date()).valueOf(),
          dataIDRDO: this.dataIDRDO ? this.dataIDRDO : moment(new Date()).valueOf(),
          areaAtuacao: this.areaAtuacao ? this.areaAtuacao : '',
          cartaChamada: this.cartaChamada ? this.cartaChamada : '',
          nomeFiscal: this.nomeFiscal ? this.nomeFiscal : '',
          nomeEncarregado: this.nomeEncarregado ? this.nomeEncarregado : '',
          condicaoManha: this.condicaoManha ? this.condicaoManha : '',
          condicaoTarde: this.condicaoTarde ? this.condicaoTarde : '',
          condicaoNoite: this.condicaoNoite ? this.condicaoNoite : '',
          prazoAtividade: this.prazoAtividade ? parseInt(this.prazoAtividade) : 0,
          diasDecorridos: this.diasDecorridos ? parseInt(this.diasDecorridos) : 0,
          prorrogacao: this.prorrogacao ? parseInt(this.prorrogacao) : 0,
          diasRestantes: this.diasRestantes ? parseInt(this.diasRestantes) : 0,
          diasDeAtrazos: this.diasDeAtrazos ? parseInt(this.diasDeAtrazos) : 0,
          opcoesDDS: this.opcoesDDS,
          opcoesPrejuizo: this.opcoesPrejuizo,
          opcoesViolacao: this.opcoesViolacao,
          opcoesOciosidade: this.opcoesOciosidade,
          servico: this.servico,
          inicioReal: this.inicioReal,
          terminoReal: this.terminoReal,
          inicioPrevisto: this.inicioPrevisto,
          terminoPrevisto: this.terminoPrevisto,
          comentarios: this.comentarios,
          efetivos: this.desserts,
          atividades: this.dessertsAtividade,
          dataCriacao: this.dataCriacao ? this.dataCriacao : moment(new Date()).valueOf(),
          dataFinalizado: moment(new Date()).valueOf(),
          sequencial: this.seguencia ? this.seguencia : 1,
          comentariosContratante: this.tipoRdo === 'assinatura' ? this.comentariosContratante : null,
          urlAssinatura: this.tipoRdo === 'assinatura' ? this.urlAssinatura : null,
          maxHoraNormalTotal: this.maxHoraNormalTotal,
          maxHoraNormalExtraTotal: this.maxHoraNormalExtraTotal,
          maxHoraNormalNoturnaTotal: this.maxHoraNormalNoturnaTotal,
          maxHoraExtraNoturnaTotal: this.maxHoraExtraNoturnaTotal,
          maxHoraExtraFdsTotal: this.maxHoraExtraFdsTotal
        }
        if (this.tipoRdo === 'editar' || this.tipoRdo === 'assinatura') {
          console.log(this.tipoRdo, params)
          try {
            await axios({
              method: 'POST',
              url: `${this.urlProd}editar-rdo`,
              data: params
            })
            if (this.tipoRdo === 'editar') {
              this.dialogoRespostaCorreto = true
              this.returnRDO()
            } else {
              this.returnAssinatura()
            }
          } catch (err) {
            console.log(err)
            this.dialogoRespostaErro = true
          }
        } else {
          try {
            await axios({
              method: 'POST',
              url: `${this.urlProd}novo-rdo`,
              data: params
            })
            this.dialogoRespostaCorreto = true
            this.returnRDO()
          } catch (err) {
            console.log(err)
            this.dialogoRespostaErro = true
          }
        }
      } else {
        const campos = []

        if (this.nomeCliente.length < 1) {
          campos.push('Clientes')
        }

        if (this.nomeProjetos.length < 1) {
          campos.push('Projetos')
        }
        console.log(campos)

        this.snackbar = true
        this.mensagem = `Preencha o(s) Campo(s) ${campos.join(', ')}`
        this.colorSnackbar = 'red'
      }
    },

    returnRDO () {
      this.$emit('voltar')
    },
    returnAssinatura () {
      this.$emit('voltarAssinatura')
    },

    initialize () {
      if (this.tipoRdo === 'editar') {
        const qtdEfeti = this.rdoEdit.efetivos.length
        for (let y = 0; y < qtdEfeti; y++) {
          this.desserts.push(this.rdoEdit.efetivos[y])
        }
      } else if (this.tipoRdo === 'copiar') {
        const qtdEfeti = this.rdoCopi.efetivos.length
        for (let y = 0; y < qtdEfeti; y++) {
          this.desserts.push(this.rdoCopi.efetivos[y])
        }
      } else if (this.tipoRdo === 'assinatura') {
        const qtdEfeti = this.rdoAssinatura.efetivos.length
        for (let y = 0; y < qtdEfeti; y++) {
          this.desserts.push(this.rdoAssinatura.efetivos[y])
        }
      } else {
        this.desserts = []
      }
    },

    initializeAtividade () {
      if (this.tipoRdo === 'editar') {
        const qtdAtiv = this.rdoEdit.atividade.length
        for (let x = 0; x < qtdAtiv; x++) {
          this.rdoEdit.atividade[x].id = x + 1
          this.dessertsAtividade.push(this.rdoEdit.atividade[x])
        }
      } else if (this.tipoRdo === 'copiar') {
        const qtdAtiv = this.rdoCopi.atividade.length
        for (let x = 0; x < qtdAtiv; x++) {
          this.rdoCopi.atividade[x].id = x + 1
          this.dessertsAtividade.push(this.rdoCopi.atividade[x])
        }
      } else if (this.tipoRdo === 'assinatura') {
        const qtdAtiv = this.rdoAssinatura.atividade.length
        for (let x = 0; x < qtdAtiv; x++) {
          this.rdoAssinatura.atividade[x].id = x + 1
          this.dessertsAtividade.push(this.rdoAssinatura.atividade[x])
        }
      } else {
        this.dessertsAtividade = []
      }
    },

    editItemAtividade (item) {
      this.editedIndexAtividade = this.dessertsAtividade.indexOf(item)
      this.editedItemAtividade = Object.assign({}, item)
      this.dialogAtividade = true
    },

    deleteItemAtividade (item) {
      this.editedIndexAtividade = this.dessertsAtividade.indexOf(item)
      this.editedItemAtividade = Object.assign({}, item)
      this.dialogDeleteAtividade = true
    },

    deleteItemConfirmAtividade () {
      this.dessertsAtividade.splice(this.editedIndexAtividade, 1)
      this.closeDeleteAtividade()
    },

    close () {
      this.dialog = false
      this.dialogHoraEfetivo = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeAtividade () {
      console.log('Fechar')
      this.dialogDeleteAtividade = false
      this.$nextTick(() => {
        this.editedItemAtividade = Object.assign({}, this.defaultItemAtividade)
        this.editedIndexAtividade = -1
      })
    },

    closeDelete () {
      this.dialogDeleteEfetivo = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDeleteAtividade () {
      console.log('Close Delete')
      this.dialogDeleteAtividade = false
      this.$nextTick(() => {
        this.editedItemAtividade = Object.assign({}, this.defaultItemAtividade)
        this.editedIndexAtividade = -1
      })
    },

    save () {
      console.log(this.editedIndex)
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },

    saveAtividade () {
      if (this.editedIndexAtividade > -1) {
        Object.assign(this.dessertsAtividade[this.editedIndexAtividade], this.editedItemAtividade)
      } else {
        this.dessertsAtividade.push(this.editedItemAtividade)
      }
      this.closeAtividade()
    },

    horaNormal () {
      this.editedItem.horaNormalInicio = this.editedItem.horaNormalInicio * 1
      this.editedItem.horaNormalTermino = this.editedItem.horaNormalTermino * 1
      this.editedItem.horaNormalTotal = this.editedItem.horaNormalTermino - this.editedItem.horaNormalInicio
    },

    horaNormalExtra () {
      this.editedItem.horaNormalExtraTermino = this.editedItem.horaNormalExtraTermino * 1
      this.editedItem.horaNormalExtraInicio = this.editedItem.horaNormalExtraInicio * 1
      this.editedItem.horaNormalExtraTotal = this.editedItem.horaNormalExtraTermino - this.editedItem.horaNormalExtraInicio
    },

    horaNormalNoturna () {
      this.editedItem.horaNormalNoturnaInicio = this.editedItem.horaNormalNoturnaInicio * 1
      this.editedItem.horaNormalNoturnaTermino = this.editedItem.horaNormalNoturnaTermino * 1
      this.editedItem.horaNormalNoturnaTotal = this.editedItem.horaNormalNoturnaTermino - this.editedItem.horaNormalNoturnaInicio
    },

    horaExtraNoturna () {
      this.editedItem.horaExtraNoturnaInicio = this.editedItem.horaExtraNoturnaInicio * 1
      this.editedItem.horaExtraNoturnaTermino = this.editedItem.horaExtraNoturnaTermino * 1
      this.editedItem.horaExtraNoturnaTotal = this.editedItem.horaExtraNoturnaTermino - this.editedItem.horaExtraNoturnaInicio
    },

    horaExtraFds () {
      this.editedItem.horaExtraFdsInicio = this.editedItem.horaExtraFdsInicio * 1
      this.editedItem.horaExtraFdsTermino = this.editedItem.horaExtraFdsTermino * 1
      this.editedItem.horaExtraFdsTotal = this.editedItem.horaExtraFdsTermino - this.editedItem.horaExtraFdsInicio
    },

    changeId () {
      this.editedItemAtividade.id = this.dessertsAtividade.length + 1
    },
    ajusteNome () {
      const ajuste = this.editedItem.name.split('-')
      this.editedItem.idEfetivo = ajuste[0] * 1
      this.editedItem.nomeEfetivo = ajuste[1]
      this.editedItem.funcaoEfetivo = ajuste[2]
    },

    adiconarColaboradores () {
      const splitElement = this.efetivosArray.split('-')
      console.log(splitElement)

      const idVerif = splitElement[0] * 1
      const verificarColab = this.desserts.filter(item => { return item.idEfetivo === idVerif })

      console.log('verificar', verificarColab.length)

      if (verificarColab.length > 0) {
        this.snackbar = true
        this.mensagem = 'Colaborador ja esta adicionado'
        this.colorSnackbar = 'red'
      } else {
        const obj = {
          name: this.efetivosArray,
          idEfetivo: splitElement[0] * 1,
          nomeEfetivo: splitElement[1].trim(),
          funcaoEfetivo: splitElement[2].trim(),
          horaNormalInicio: 0,
          horaNormalTermino: 0,
          horaNormalTotal: 0,
          horaNormalExtraInicio: 0,
          horaNormalExtraTermino: 0,
          horaNormalExtraTotal: 0,
          horaNormalNoturnaInicio: 0,
          horaNormalNoturnaTermino: 0,
          horaNormalNoturnaTotal: 0,
          horaExtraNoturnaInicio: 0,
          horaExtraNoturnaTermino: 0,
          horaExtraNoturnaTotal: 0,
          horaExtraFdsInicio: 0,
          horaExtraFdsTermino: 0,
          horaExtraFdsTotal: 0
        }
        this.desserts.push(obj)
      }
    },

    adicionarHoras (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogHoraEfetivo = true
    },

    salvarHoraEfetivo () {
      console.log(this.editedIndex)
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },

    deleteEfetivos (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDeleteEfetivo = true
    },

    deleteEfetivoConfirm () {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    repetirConfiguracoes (item) {
      for (const efetivos of this.desserts) {
        efetivos.horaNormalInicio = item.horaNormalInicio
        efetivos.horaNormalTermino = item.horaNormalTermino
        efetivos.horaNormalTotal = item.horaNormalTotal
        efetivos.horaNormalExtraInicio = item.horaNormalExtraInicio
        efetivos.horaNormalExtraTermino = item.horaNormalExtraTermino
        efetivos.horaNormalExtraTotal = item.horaNormalExtraTotal
        efetivos.horaNormalNoturnaInicio = item.horaNormalNoturnaInicio
        efetivos.horaNormalNoturnaTermino = item.horaNormalNoturnaTermino
        efetivos.horaNormalNoturnaTotal = item.horaNormalNoturnaTotal
        efetivos.horaExtraNoturnaInicio = item.horaExtraNoturnaInicio
        efetivos.horaExtraNoturnaTermino = item.horaExtraNoturnaTermino
        efetivos.horaExtraNoturnaTotal = item.horaExtraNoturnaTotal
        efetivos.horaExtraFdsInicio = item.horaExtraFdsInicio
        efetivos.horaExtraFdsTermino = item.horaExtraFdsTermino
        efetivos.horaExtraFdsTotal = item.horaExtraFdsTotal
      }
    },

    async assinaturaAws () {
      try {
        console.log('Pegar assinatura')

        const ajusteFiscal = this.nomeFiscal.split('-')
        const idFiscal = ajusteFiscal[0].trim()

        const params = {
          idFiscal: idFiscal
        }
        const result = await axios({
          method: 'POST',
          url: `${this.urlProd}aws-assinatura`,
          data: params
        })

        console.log('assinatura', result.data)
        this.urlAssinatura = result.data
      } catch (err) {
        console.log('Erro assinatura', err)
      }
    },

    async verificarAssinatura () {
      this.salvarRDO('assinar')
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

  .color-card {
    background-color: var(--light-gray)!important;
  }
</style>
