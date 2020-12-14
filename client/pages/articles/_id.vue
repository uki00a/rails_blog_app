<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>{{ article.title }}</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div>{{ formattedBody }}</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator"
import type { Article } from "~/types"

@Component({
  async asyncData(ctx) {
    const { id } = ctx.params
    const article = await ctx.$api.article(Number(id))
    return { article }
  }
})
export default class ArticleDetail extends Vue {
  article!: Article

  get formattedBody(): string {
    // TODO Parse markdown
    return this.article.body
  }
}
</script>