<template>
  <v-container>  
    <v-row>
      <v-col cols="9">
        <h2>@{{ user.name }}</h2>
      </v-col>
      <v-col cols="3">
        <span>
          <v-icon>mdi-email</v-icon>
          {{ user.email }}
        </span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" v-for="article in articles" :key="article.id">
        <article-card :article="article" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
import type { Article, User } from "~/types"
import ArticleCard from "~/components/ArticleCard.vue"

@Component({
  components: { ArticleCard },
  async asyncData(ctx) {
    const { id } = ctx.params
    const [user, articles] = await Promise.all([
      ctx.$api.user(Number(id)),
      // TODO Implement paging
      ctx.$api.articlesWrittenByUser(Number(id)),
    ])
    return { user, articles }
  },
})
export default class UserDetail extends Vue {
  user!: User
  articles!: Article[]
} 
</script>