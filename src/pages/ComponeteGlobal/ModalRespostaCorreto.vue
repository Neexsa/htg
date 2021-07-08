<template>
  <div>
    <v-card>
      <v-card-title
        class="green lighten-2 pa-4"
        style="display: block;"
      >
        <div class="text-center">
          <v-icon dark size="80px">mdi-check-circle-outline</v-icon>
        </div>
      </v-card-title>

      <v-card-text>
        <div class="text-center mb-2">
          <h1 class="pt-5" style="
              font-size: 3em;
              font-weight: 100;
          ">Ótimo</h1>
          <br>
          <p style="font-size: 1.3em;">Tudo ocorreu bem!!!</p>
          <!-- <v-btn round color="warning" style="padding: 4%;" @click="recarregaPagina()">Tentar novamente</v-btn> -->
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="less">

</style>
