import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allNote: []
  },
  mutations: {
    ADD_NOTE(state, note) {
      state.allNote.push(note);
    }
  },
  actions: {
    addNote({ commit }, note) {
      commit("ADD_NOTE", note);
    }
  },
  modules: {}
});
