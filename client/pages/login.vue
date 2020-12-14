<template>
  <v-form
    @submit.prevent="login"
    v-model="isValid">
    <v-text-field
      v-model="email"    
      label="Email"
      required
    />
    <v-text-field
      v-model="password"
      label="Password"
      required
    />
    <v-btn
      :disabled="!isValid"
      type="submit"
      color="success"
    >Login</v-btn>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator"

@Component
export default class Login extends Vue {
  isValid = false
  email = ""
  password = ""

  login() {
    this.$api.signIn(this.email, this.password)
      .then(() => this.$api.me())
      .then(me => {
        // TODO Save `me` to vuex store
        console.log(me)
        this.$router.push("/")
      })
      .catch(err => {
        // TODO Implement error handling
      })
  }
}
</script>