<template>
  <v-row>

    <!------------------ Game is active ---------------->

    <v-row v-show="isGameActive">
      <v-col>

        <v-card class="d-flex align-center justify-center pa-10 ma-10">
          <div class="d-flex flex-column gap-2">
            <h1>{{ currentTeamName | capitalize }}</h1>
            <div>Round: <b>{{ roundNr }}</b></div>
            <div>Category <b>Movie stars</b></div>
            <div><b>{{ currentTeamPoints }} points</b></div>

            <div>
              <countdowner
                :time-limit="timeLimit"
                @done="roundIsOver"
                class="text-h5"
                ref="gameTimerCounter">
              </countdowner>
            </div>

            <div class="d-flex flex-column justify-center align-center">
              <span class="text-h3">
                {{ currentWord | capitalize }}
              </span>
            </div>

            <div class="d-flex justify-center align-center gap-6">
              <v-btn
                @click="passedWord(currentWord); nextWord()"
                class="big-button"
                outlined
                color="error">
                Pass
              </v-btn>
              <v-btn
                @click="correctWord(currentWord); nextWord()"
                class="big-button"
                outlined
                color="success">
                Correct
              </v-btn>
            </div>
          </div>
        </v-card>

      </v-col>
    </v-row>

    <!------------------ Game is stand by ---------------->

    <v-row v-show="!isGameActive">
      <v-col>

        <v-card class="d-flex align-center justify-center pa-10 ma-10">
          <div class="d-flex flex-column gap-2">
            <h1>Get ready!</h1>
            <div>Round: <b>{{ roundNr }}</b></div>
            <div><b>{{ currentTeamName | capitalize }}</b></div>
            <div>You have <b>{{ currentTeamPoints }} points</b></div>
            <div>Next rounds category is <b>Movie stars</b></div>
            <div class="d-flex align-center justify-center gap-2">
<!--              <v-btn-->
<!--                color="warning"-->
<!--                outlined-->
<!--              >-->
<!--                Change category-->
<!--              </v-btn>-->
              <v-btn
                :loading="roundIsStarting"
                @click="startRound"
                color="success"
                class="big-button"
                large
                outlined
              >
                Begin
              </v-btn>
            </div>

            <div v-show="roundIsStarting">
              <span class="text-h5 mr-2">Round is starting in</span>
              <countdowner
                :time-limit="3"
                @done="roundHasStarted"
                class="text-h5"
                ref="beginRoundCounter">
              </countdowner>
            </div>
          </div>
        </v-card>

      </v-col>

    </v-row>
  </v-row>
</template>
<script>
import { getRandomWord } from "../utils/localizer";
import countdowner from "../components/countdowner"
import "../assets/global.scss"
import { mapGetters, mapActions } from "vuex"

export default {
  name: "Game",

  components: {
    countdowner
  },

  data: () => ({
    currentWord: null,

    totalTime: 30.0,
    timeLeft: 30.0,
    timer: null,

    isGameActive: false,
    roundIsStarting: false,

    locale: null
  }),

  computed: {
    ...mapGetters([
      "currentTeam",
      "timeLimit",
      "roundNr",
    ]),

    currentTeamName() {
      return this.currentTeam ? this.currentTeam.name : null
    },

    currentTeamPoints() {
      return this.currentTeam ? this.currentTeam.points : null
    },
  },

  methods: {
    ...mapActions([
      "testInit",
      "correctWord",
      "passedWord",
      "wordMissed",
      "nextTeam",
    ]),

    startRound() {
      this.roundIsStarting = true
      this.$refs.beginRoundCounter.startTimer()
    },

    roundHasStarted() {
      this.roundIsStarting = false
      this.isGameActive = true
      this.$refs.gameTimerCounter.startTimer()
    },

    roundIsOver() {
      this.isGameActive = false
      this.nextWord()
      this.nextTeam()
    },

    nextWord() {
      this.currentWord = getRandomWord()
    },

    getLocale() {
      return "sv-SE";
    },
  },

  mounted() {
    if (!this.currentTeam) this.testInit()

    this.locale = this.getLocale()
    this.nextWord()
  },

  filters: {
    capitalize(val) {
      if (!val) return ""

      return val.toString()[0].toUpperCase() + val.toString().slice(1)
    },
  },
};
</script>
<style scoped>

</style>
