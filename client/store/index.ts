import type { GetterTree, MutationTree } from "vuex"
import type { User } from "~/types"

interface State {
  me: User | null
}
type RootState = State

export const IS_SIGNED_IN = "isSignedIn"
export const LOGIN_AS = "loginAs"
export const LOGOUT = "logout"

export function state(): State {
  return {
    me: null
  }
}

export const getters: GetterTree<State, RootState> = {
  [IS_SIGNED_IN](state): boolean {
    return state.me != null
  },
}

export const mutations: MutationTree<State> = {
  [LOGIN_AS](state, me: User) {
    state.me = me
  },
  [LOGOUT](state) {
    state.me = null
  },
}