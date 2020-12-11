<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
      </div>
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
  async asyncData() {
    const articles: Article[] = [
      { id: 1, title: "Hello, there!✌", body: "Hey!😗", user: { id: 1, name: "hoge" }, createdAt: new Date() },
      { id: 2, title: "Hey!😏", body: "Hello, there!😻😻😻", user: { id: 2, name: "piyo" }, createdAt: new Date() }
    ]
    return { articles }
  },
  components: { ArticleCard }
})
export default class extends Vue {
  articles: Article[] = []
}
</script>
