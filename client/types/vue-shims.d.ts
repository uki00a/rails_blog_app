// TODO This is not ideal...
import type { APIClient } from "~/infra/api";

// Adopted from https://github.com/Microsoft/TypeScript-Vue-Starter#single-file-components
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module 'vue/types/vue' {
  interface Vue {
    $api: APIClient
  }
}