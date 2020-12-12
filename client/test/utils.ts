import { render } from "@testing-library/vue"
import Vue from "vue"
import Vuetify from "vuetify"

Vue.use(Vuetify)

// Adopted from https://github.com/testing-library/vue-testing-library/blob/master/src/__tests__/vuetify.js
export const renderWithVuetify: typeof render = (
  component,
  options
)  => {
  const root = document.createElement('div')
  root.setAttribute('data-app', 'true')
  return render(component, {
    container: root,
    vuetify: new Vuetify(),
    ...options,
  })
}