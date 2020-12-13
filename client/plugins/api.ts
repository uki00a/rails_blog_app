import { createAPIClient } from "~/infra/api";
import type { Plugin } from "@nuxt/types"

const plugin: Plugin = (_ctx, inject) => {
  const {
    API_HOST,
    API_PORT,
  } = process.env

  inject("api", createAPIClient({
    host: API_HOST ?? "localhost",
    port: API_PORT == null ? 3000 : Number(API_PORT),
  }))
}

export default plugin