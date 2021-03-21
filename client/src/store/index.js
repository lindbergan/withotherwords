import Vue from 'vue';
import Vuex from 'vuex';
import { Teams } from "./teams.js"
import { Game } from "./game.js"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Teams,
    Game,
  },
});
