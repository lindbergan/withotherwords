export const Game = {
  state: {
    passLimit: 2,

    teamAmount: 2,

    timeLimit: 2,

    roundLimit: 10,

    roundNr: 1,

    isActive: false,

    isDone: false,
  },

  getters: {
    timeLimit: state => state.timeLimit,
    roundNr: state => state.roundNr,
  },

  mutations: {
    nextRound(state) {
      if (state.roundNr + 1 >= state.roundLimit) {
        state.isDone = true
      }
      state.roundNr += 1
    },
  },

  actions: {
    nextRound({ commit }) {
      commit("nextRound")
    },
  },
}
