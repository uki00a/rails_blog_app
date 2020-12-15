import type { Article, User } from "~/types"

// TODO Generate interfaces from swagger.yml
interface PostArticleParams {
  title: string
  body: string
}

interface PostArticleResult {
  id: number
}

export interface APIClient {
  me(): Promise<User>
  article(id: number): Promise<Article>
  articles(): Promise<Article[]>
  articlesWrittenByUser(userID: number): Promise<Article[]>
  postArticle(article: PostArticleParams): Promise<PostArticleResult>
  user(id: number): Promise<User>
  signIn(email: string, password: string): Promise<void>;
  signOut(): void
}

interface APIClientOptions {
  host?: string
  port?: number
}

class NotAuthenticatedError extends Error {}

export function createAPIClient(_options: APIClientOptions) {
  const { host, port } = _options
  const endpoint = host?.startsWith("http") ? `${host}:${port}` : `http://${host}:${port}`

  let token: string | null = null

  function isSignedIn(): boolean {
    return token != null
  }

  function ensureSignedIn(): void {
    if (!isSignedIn()) {
      throw new NotAuthenticatedError()
    }
  }

  function buildAuthHeader(): string {
    ensureSignedIn()
    return `Bearer ${token}`
  }

  async function callAPI<T>(path: string, init: RequestInit): Promise<T> {
    const url = new URL(path, endpoint)
    const res = await fetch(url.href, init)
    return res.json()
  }

  async function get<T>(path: string): Promise<T> {
    return callAPI<T>(path, { method: "GET", })
  }

  function withAuthHeader(headers: Record<string, string> = {}): Record<string, string> {
    return {
      ...headers,
      "Authorization": buildAuthHeader(),
    }
  }

  async function authenticatedGet<T>(path: string): Promise<T> {
    ensureSignedIn()
    return callAPI<T>(path, {
      method: "GET",
      headers: withAuthHeader(),
    })
  }

  async function post<T>(path: string, body: object): Promise<T> {
    return callAPI<T>(path, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    })
  }

  function authenticatedPost<T>(path: string, body: object): Promise<T> {
    return callAPI<T>(path, {
      method: "POST",
      body: JSON.stringify(body),
      headers: withAuthHeader({ "Content-Type": "application/json" }),
    })
  }

  function me(): Promise<User> {
    return authenticatedGet<User>("/me")
  }

  function article(id: number): Promise<Article> {
    return get<Article>(`/articles/${id}`)
  }

  function articles(): Promise<Article[]> {
    return get<Article[]>("/articles")
  }

  function articlesWrittenByUser(userID: number): Promise<Article[]> {
    return get<Article[]>(`/users/${userID}/articles`)
  }

  function postArticle(article: PostArticleParams): Promise<PostArticleResult> {
    return authenticatedPost<PostArticleResult>(`/articles`, { article })
  }

  function user(id: number): Promise<User> {
    return get<User>(`/users/${id}`)
  }

  async function signIn(email: string, password: string): Promise<void> {
    const { jwt } = await post<{ jwt: string }>("/user_token", { auth: { email, password } }) 
    token = jwt
    return
  }

  function signOut(): void {
    token = null
  }

  return {
    me,
    article,
    articles,
    articlesWrittenByUser,
    postArticle,
    user,
    signIn,
    signOut,
  }
}