<template>
  <v-card>
    <v-card-title class="headline">
      <nuxt-link :to="articleLink">{{ article.title }}</nuxt-link>
    </v-card-title>
    <v-card-subtitle>
      Posted by <nuxt-link :to="userLink">@{{ article.user.name }}</nuxt-link> at {{ article.createdAt }}
    </v-card-subtitle>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator"
import type {  Article, User } from "~/types"

@Component({})
export default class ArticleCard extends Vue {
  @Prop({ required: true })  
  article!: Article

  get articleLink(): string {
    return `/articles/${this.article.id}`
  }

  get userLink(): string {
    return `/users/${this.article.user.id}`
  }
}
</script>