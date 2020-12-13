// TODO This is not ideal...
import type { APIClient } from "~/infra/api"

declare module "@nuxt/types" {
  interface Context {
    $api: APIClient
  }
}
