<template>
  <v-card>
    <v-card-title class="headline">{{ article.title }}</v-card-title>
    <v-card-subtitle>Posted by @{{ article.user.name }} at {{ article.createdAt }}</v-card-subtitle>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator"
import type {  Article, User } from "~/types"

@Component({})
export default class ArticleCard extends Vue {
  @Prop({ required: true })  
  article!: Article
}
</script>