import type { Article } from "~/types"

export interface APIClient {
  articles(): Promise<Article[]>
}

interface APIClientOptions {
  host?: string
  port?: number
}

export function createAPIClient(_options: APIClientOptions) {
  function articles(): Promise<Article[]> {
    const articles: Article[] = [
      { id: 1, title: "Hello, there!✌", body: "Hey!😗", user: { id: 1, name: "hoge" }, createdAt: new Date() },
      { id: 2, title: "Hey!😏", body: "Hello, there!😻😻😻", user: { id: 2, name: "piyo" }, createdAt: new Date() }
    ]
    return Promise.resolve(articles)
  }

  return {
    articles
  }
}