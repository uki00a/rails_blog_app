import { createAPIClient } from "~/infra/api";
import type { APIClient } from "~/infra/api"
import type { Plugin } from "@nuxt/types"

const plugin: Plugin = (_ctx, inject) => {
  inject("api", createAPIClient({})) // FIXME
}

declare module "@nuxt/types" {
  interface Context {
    $api: APIClient
  }
}

export default plugin