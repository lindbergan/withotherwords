import Store from "./index"

export const Game = {
  state: {
    passLimit: 2,

    teamAmount: 2,

    timeLimit: 2,

    roundLimit: 10,

    roundNr: 1,

    isDone: true,
  },

  getters: {
    timeLimit: state => state.timeLimit,
    roundNr: state => state.roundNr,
    isDone: state => state.isDone,
    passLimit: state => state.passLimit,
  },

  mutations: {
    nextRound(state) {
      if (state.roundNr + 1 >= state.roundLimit) {
        state.isDone = true
      }
      state.roundNr += 1
    },

    saveSettings(state, settings) {
      state.passLimit = settings.passLimit
      state.teamAmount = settings.teamAmount
      state.timeLimit = settings.timeLimit
      state.roundLimit = settings.roundLimit

      state.roundNr = 1
      state.isDone = false

      for (let i = 0; i < state.teamAmount; i++) {
        Store.dispatch("addTeam")
      }
    },
  },

  actions: {
    nextRound({ commit }) {
      commit("nextRound")
    },

    saveSettings({ commit }, settings) {
      commit("saveSettings", settings)
    }
  },
}
