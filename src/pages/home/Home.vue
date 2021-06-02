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
                  <div class="text-h7 white--text pa-3 v-card--material__title"> HOME </div>
                </v-theme-provider>
              </v-sheet>
            </v-card-title>
            <v-card class="card-home">
              <v-container class="py-0">
                  <v-row>
                    <v-col
                      cols="12"
                      md="4"
                      lg="4"
                      sm="4"
                      xs="4"
                      class="mt-7"
                    >
                      <v-card class="ma-3">
                          <v-list-item  >

                            <v-sheet color="blue" width="80" height="80" elevation="10" rounded class="ajuste-sheet">
                              <v-icon dark large class="icon-alien">mdi-account</v-icon>
                            </v-sheet>

                            <v-list-item-content>
                              <div class="overline text-right">Clientes</div>
                              <v-list-item-title class="headline mb-1 text-right" >1</v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-card>
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                      lg="4"
                      sm="4"
                      xs="4"
                      class="mt-7"
                    >
                      <v-card class="ma-3">
                          <v-list-item  >
                            <v-sheet color="red" width="80" height="80" elevation="10" rounded class="ajuste-sheet">
                              <v-icon dark large class="icon-alien">mdi-account-group</v-icon>
                            </v-sheet>
                            <v-list-item-content>
                              <div class="overline text-right">Projetos Ativos</div>
                              <v-list-item-title class="headline mb-1 text-right" >1</v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-card>
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                      lg="4"
                      sm="4"
                      xs="4"
                      class="mt-7"
                    >
                      <v-card class="ma-3">
                          <v-list-item  >
                            <v-sheet color="orange" width="80" height="80" elevation="10" rounded class="ajuste-sheet">
                              <v-icon dark large class="icon-alien">mdi-folder-text</v-icon>
                            </v-sheet>
                            <v-list-item-content>
                              <div class="overline text-right">RDO Feitas no Dia</div>
                              <v-list-item-title class="headline mb-1 text-right" >1</v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-card>
                    </v-col>
                  </v-row>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>

      </v-container>
    </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
  }),

  created () {
    console.log(window.location)
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
