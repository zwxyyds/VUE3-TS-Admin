import type { ThemeState, ThemeLayout } from "./typing";
import type { Commit } from "vuex";
import {
  setLayout,
  getLayout,
  setLayoutCol,
  getLayoutCol,
} from "@/utils/cookie";
const state = {
  layout: getLayout() || "left",
  layoutCollapsed: getLayoutCol() === "true",
};

const mutations = {
  SET_LAYOUT(state: ThemeState, layout: ThemeLayout) {
    state.layout = layout;
  },
  SET_LAYOUTCOL(state: ThemeState, bool: boolean) {
    state.layoutCollapsed = bool;
  },
};

const actions = {
  configLayout({ commit }: { commit: Commit }, layout: ThemeLayout) {
    setLayout(layout);
    commit("SET_LAYOUT", layout);
  },
  configLayoutCol({ commit }: { commit: Commit }, bool: boolean) {
    setLayoutCol(bool);
    commit("SET_LAYOUTCOL", bool);
  },
};

const userStore = {
  namespaced: true,
  state,
  mutations,
  actions,
};

export default userStore;
