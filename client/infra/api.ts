import type { Article } from "~/types"

export interface APIClient {
  article(id: number): Promise<Article>
  articles(): Promise<Article[]>
}

interface APIClientOptions {
  host?: string
  port?: number
}

export function createAPIClient(_options: APIClientOptions) {
  const { host, port } = _options
  const endpoint = host?.startsWith("http") ? `${host}:${port}` : `http://${host}:${port}`

  async function get<T>(path: string): Promise<T> {
    const url = new URL(path, endpoint)
    const req = await fetch(url.href, {
      method: "GET",
    })
    const res = await req.json()
    return res
  }

  function article(id: number): Promise<Article> {
    return get<Article>(`/articles/${id}`)
  }

  function articles(): Promise<Article[]> {
    // const articles: Article[] = [
    //   { id: 1, title: "Hello, there!✌", body: "Hey!😗", user: { id: 1, name: "hoge" }, createdAt: new Date() },
    //   { id: 2, title: "Hey!😏", body: "Hello, there!😻😻😻", user: { id: 2, name: "piyo" }, createdAt: new Date() }
    // ]
    // return Promise.resolve(articles)
    return get<Article[]>("/articles")
  }

  return {
    article,
    articles
  }
}