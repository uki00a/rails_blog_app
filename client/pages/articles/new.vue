<template>
  <v-form
    @submit.prevent="postArticle"
    v-model="isValid">
    <v-text-field
      v-model="title"    
      label="Title"
      required
    />
    <v-textarea
      v-model="body"
      label="Body"
      hint="Body"
      required
    />
    <v-btn
      :disabled="!isValid"
      type="submit"
      color="success"
    >Post</v-btn>
  </v-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator"
import type { Article } from "~/types"

@Component
export default class ArticleDetail extends Vue {
  isValid = false
  title = ""
  body = ""

  postArticle(): void {
    // TODO Implement error handling
    this.$api.postArticle({
      title: this.title,
      body: this.body,
    }).then(({ id }) => {
      this.$router.push(`/articles/${id}`)
    })
  }
}
</script>