<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <nuxt-link v-if="isSignedIn" to="/articles/new">New Article</nuxt-link>
      <v-spacer />
      <a v-if="isSignedIn" @click.prevent="logout" href="#">Logout</a>
      <nuxt-link v-else to="/login">Login</nuxt-link>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Getter, Vue } from "nuxt-property-decorator"
import { IS_SIGNED_IN, LOGOUT } from "~/store"

@Component
export default class DefaultLayout extends Vue {
  clipped = false
  drawer = false
  fixed = false
  items = [
    {
      icon: 'mdi-apps',
      title: 'Welcome',
      to: '/',
    },
    {
      icon: 'mdi-chart-bubble',
      title: 'Inspire',
      to: '/inspire',
    },
  ]
  miniVariant = false
  title = 'Vuetify.js'

  @Getter(IS_SIGNED_IN)
  isSignedIn!: boolean

  logout(): void {
    this.$store.commit(LOGOUT)
    this.$api.signOut()
    this.$router.push("/")
  }
}
</script>
