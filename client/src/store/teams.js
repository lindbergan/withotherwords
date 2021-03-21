import { Game } from "./game"
import Store from "./index"

export const Teams = {
  state: {
    teams: [],
    currentTeamIndex: -1,
  },

  getters: {
    currentTeam: state => {
      if (state.currentTeamIndex === -1) return null

      return state.teams[state.currentTeamIndex]
    },
  },

  mutations: {
    addTeam(state, team) {
      if (this.teams.length === 0) {
        this.currentTeamIndex = 0
      }
      this.teams.push(team)
    },

    changeTeamScore(state, payload) {
      const {
        point,
        word,
        success,
        passed
      } = payload

      const team = state.teams[state.currentTeamIndex]

      /* Correct word */
      if (success) {
        team.questionsSeen.push(word)
        team.correctQuestions.push(word)
        team.points += point
      } /* Passed word */
      else if (!success && passed) {
        team.questionsSeen.push(word)
        team.passedQuestions.push(word)
        team.points += point
        team.passedNr += 1
      } /* Time ran out */
      else {
        team.questionsSeen.push(word)
      }
    },

    nextTeam(state) {
      if (state.currentTeamIndex + 1 >= state.teams.length) {
        state.currentTeamIndex = 0
        Store.dispatch("nextRound")
      } else state.currentTeamIndex += 1
    },

    testInit(state) {
      state.teams = [
        {
          name: "Test team 1",
          points: 10,
          questionsSeen: [],
          correctQuestions: [],
          passedQuestions: [],
          passedNr: 1,
        },
        {
          name: "Test team 2",
          points: 21,
          questionsSeen: [],
          correctQuestions: [],
          passedQuestions: [],
          passedNr: 2,
        }
      ]
      state.currentTeamIndex = 0
    },
  },
  actions: {
    addTeam({ commit, state }, team) {
      const newTeam = {
        ...team,
        points: 0,
        questionsSeen: [],
        correctQuestions: [],
        passedQuestions: [],
        passedNr: 0,
      }
      commit("addTeam", newTeam)
    },

    correctWord({ commit }, word) {
      commit("changeTeamScore", {
        point: 1,
        word,
        success: true,
        passed: false,
      })
    },

    passedWord({ commit, state }, word) {
      const team = state.teams[state.currentTeamIndex]

      /* Decrement score if too many passes */
      const negativePassScore = team.passedNr + 1 > Game.state.passLimit ? -1 : 0

      commit("changeTeamScore", {
        point: negativePassScore,
        word,
        success: false,
        passed: true,
      })
    },

    /* Time ran out */
    wordMissed({ commit, state }, word) {
      commit("changeTeamScore", {
        point: 0,
        word,
        success: false,
        passed: false,
      })
    },

    nextTeam({ commit }) {
      commit("nextTeam")
    },

    testInit({ commit }) {
      commit("testInit")
    },
  },
}
