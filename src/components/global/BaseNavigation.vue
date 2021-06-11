<template>
  <div id="base-navigation">
    <v-app-bar
      absolute
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>HTG</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn> -->
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      app
    >
    <v-layout column style="text-align: center">
      <v-flex class="mt-5" >
        <v-avatar
          color="indigo"
          style="text-align: center"
          size="60">
          <span class="white--text text-h5">{{user.nome ? user.nome.substr(0, 1) : ''}}</span>
          <!-- <v-icon dark size="30">
            mdi-account-circle
          </v-icon> -->
        </v-avatar>
        <p class="subheading ma-3">Bem Vindo,</p>
        <p class="subheading ma-3">{{user.nome}}</p>
      </v-flex>
    </v-layout>
    <!-- <v-list-item tree-line>
      <v-list-item-content>
        <v-list-item-title>HTG</v-list-item-title>
        <v-list-item-subtitle>Bem Vindo, </v-list-item-subtitle>
        <v-list-item-subtitle>{{user.nome}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item> -->

    <v-divider></v-divider>
      <v-list
        nav
        dense
        rounded
      >
      <v-list-group
        v-for="item in opcoes"
        :key="item.title"
      >
        <template v-slot:activator>
          <v-list-item-title
            link
          >
          {{ item.principal.title }}
          </v-list-item-title>
        </template>
          <v-list-item
            v-for="sub in item.submenus"
            :key="sub.title"
            link
            @click="navegar(sub.title)"
          >
            <v-list-item-icon>
              <v-icon class="material-icons-outlined">{{ sub.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ sub.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </v-list-group>
        <!-- <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            @click="navegar(item.title)"
          >
            <v-list-item-icon>
              <v-icon class="material-icons-outlined">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'BaseNavigation',
  computed: {
    ...mapState('auth', ['user'])
  },
  data () {
    return {
      drawer: true,
      group: null,
      opcoes: [
        {
          principal: {
            title: 'Home'
          },
          submenus: [
            { title: 'Home', icon: 'mdi-home' }
          ]
        },
        {
          principal: {
            title: 'RH'
          },
          submenus: [
            { title: 'Colaboradores', icon: 'mdi-account-multiple-plus' },
            { title: 'Clientes', icon: 'mdi-factory' },
            { title: 'Projetos', icon: 'mdi-folder-plus' },
            { title: 'Funcao', icon: 'mdi-wrench' }
          ]
        },
        {
          principal: {
            title: 'RDO'
          },
          submenus: [
            { title: 'RDO', icon: 'mdi-file-plus' }
            // { title: 'Dashboard', icon: 'mdi-file-plus' }
          ]
        }
      ]
    }
  },
  watch: {
    group () {
      this.drawer = false
    }
  },
  methods: {
    navegar (nome) {
      this.$router.push({ name: nome })
    }
  }
}
</script>

<style lang="scss" scoped>
  #base-navigation {
    .v-app-bar {
      background-color: var(--light-medium);
      color: var(--dark);
      text-decoration-color: var(--dark);
    }
  }

  .ajuste-icon {
    color: var(--light);
    padding: 2%;
  }
</style>
