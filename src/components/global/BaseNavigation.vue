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

      <v-btn icon class="mr-2" @click="homeLink()">
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn icon class="mr-5" @click="logout()">
        <v-icon>mdi-logout</v-icon>
      </v-btn>

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
        </v-avatar>
        <p class="subheading ma-3">Bem Vindo,</p>
        <p class="subheading ma-3">{{user.nome}}</p>
      </v-flex>
    </v-layout>

    <v-divider></v-divider>
      <v-list
        nav
        dense
        rounded
      >
        <v-list-item
          v-for="itemHome in home"
          :key="itemHome.title"
          link
          @click="navegar(itemHome.link)"
        >
          <v-list-item-icon>
            <v-icon class="material-icons-outlined">{{ itemHome.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ itemHome.title }}</v-list-item-title>
          </v-list-item-content>

        </v-list-item>
        <div
          v-for="item in opcoes"
          :key="item.principal.title"
        >
          <ul v-if="permissionPage(item)" class="pa-0">
            <v-list-group>
              <template v-slot:activator>

                  <v-list-item-icon>
                    <v-icon class="material-icons-outlined">{{ item.principal.icon }}</v-icon>
                  </v-list-item-icon>

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
                @click="navegar(sub.link)"
              >
                <v-list-item-icon class="pl-4">
                  <v-icon class="material-icons-outlined">{{ sub.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ sub.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </ul>
        </div>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="primary" @click="logout()">
            Sair
            <v-icon class="pl-1">mdi-logout</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'BaseNavigation',
  computed: {
    ...mapState('auth', ['user'])
  },
  data () {
    return {
      drawer: true,
      group: null,
      home: [{ title: 'Página Inicial', link: 'Home', icon: 'mdi-home' }],
      opcoes: [
        {
          principal: {
            title: 'Usuario',
            icon: 'mdi-account'
          },
          submenus: [
            { title: 'Usuario', link: 'User', icon: 'mdi-account-edit' },
            { title: 'Assinatura Eletronica', link: 'AssinaturaEletronica', icon: 'mdi-pencil-box' }
          ]
        },
        {
          principal: {
            title: 'Sistema RH',
            icon: 'mdi-account-multiple-plus',
            permissao: ['P_RH']
          },
          submenus: [
            { title: 'Colaboradores', link: 'Colaboradores', icon: 'mdi-account-multiple-plus' },
            { title: 'Novo Acesso', link: 'NewAccess', icon: 'mdi-account-plus' },
            { title: 'Permissão Acesso', link: 'Permissao', icon: 'mdi-lock-open' },
            { title: 'Funcao', link: 'Funcao', icon: 'mdi-wrench' }
          ]
        },
        {
          principal: {
            title: 'Sistema RDO',
            icon: 'mdi-folder-multiple',
            permissao: ['P_RDO']
          },
          submenus: [
            { title: 'Clientes', link: 'Clientes', icon: 'mdi-factory' },
            { title: 'Projetos', link: 'Projetos', icon: 'mdi-folder-plus' },
            { title: 'RDO', link: 'RDO', icon: 'mdi-file-plus' },
            { title: 'Assinatura RDO', link: 'Assinatura', icon: 'mdi-pencil' },
            { title: 'Dashboard', link: 'DashRdo', icon: 'mdi-chart-pie' }
          ]
        }
      ]
    }
  },
  created () {
  },
  watch: {
    group () {
      this.drawer = false
    }
  },
  methods: {
    ...mapActions('auth', ['ActionSigOut']),
    navegar (nome) {
      this.$router.push({ name: nome })
    },
    async logout () {
      try {
        await this.ActionSigOut()

        this.$router.push({ name: 'Login' })
      } catch (e) {
        alert(e.data ? e.data.message : 'Não foi possivél fazer o logout!!!')
      }
    },

    homeLink () {
      this.$router.push({ name: 'Home' })
    },

    permissionPage (item) {
      if (this.user.permissao) {
        if (item.principal.permissao) {
          if (this.user.permissao.includes('ADMIN')) {
            return true
          } else {
            const r1 = this.user.permissao
            const r2 = item.principal.permissao
            const r3 = r1.filter(a => r2.includes(a))
            console.log(r3)
            if (r3.length > 0) {
              return true
            } else {
              return false
            }
          }
        } else {
          return true
        }
      } else {
        return false
      }
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
