<template>
  <v-row justify="center" align="center" dense>
    <v-col cols="12">
      <article-card
        v-for="article in articles"
        :key="article.id"
        :article="article">
      </article-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import type { Article, User } from "~/types/index"
import ArticleCard from "~/components/ArticleCard.vue"

@Component({
  async asyncData(ctx) {
    const articles = await ctx.$api.articles()
    return { articles }
  },
  components: { ArticleCard }
})
export default class extends Vue {
  articles: Article[] = []
}
</script>
