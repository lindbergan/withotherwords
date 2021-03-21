<template>
  <v-row class="justify-center align-center">
    <v-col>
      <v-card class="pa-10 ma-10">
        <h1 class="text-center mb-5">Settings</h1>
        <v-row class="d-flex flex-column justify-center align-center">
          <v-col>
            <div class="d-flex justify-center align-center">
              <v-select
                v-model="teamAmount"
                :items="amtTeamItems"
                outlined
                dense
                hide-detials
                label="Teams"
                class="settings-select"
              >
              </v-select>
            </div>
            <div class="d-flex justify-center align-center">
              <v-select
                v-model="amtRounds"
                :items="amtRoundsItems"
                outlined
                dense
                hide-detials
                label="Rounds"
                class="settings-select"
              >
              </v-select>
            </div>
            <div class="d-flex justify-center align-center">
              <v-select
                v-model="amtTime"
                :items="amtTimeItems"
                outlined
                dense
                hide-detials
                label="Time per round"
                class="settings-select"
              >
              </v-select>
            </div>
            <div class="d-flex justify-center align-center">
              <v-select
                v-model="amtPasses"
                :items="amtPassesItems"
                outlined
                dense
                hide-detials
                label="Passes per round"
                class="settings-select"
              >
              </v-select>
            </div>
          </v-col>
          <div class="d-flex align-center justify-center">
            <v-btn
              @click="saveSettings"
              outlined
              large
              block
              class="settings-finished-btn">
              Done
            </v-btn>
          </div>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions } from "vuex"

export default {
  name: "Settings",

  components: {},

  data: () => ({
    teamAmount: 2,
    amtTeamItems: [2, 3, 4, 5, 6, 7, 8, 9, 10],

    amtRounds: 10,
    amtRoundsItems: [2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => i * 5),

    amtTime: 60,
    amtTimeItems: [15, 30, 45, 60, 75, 90, 105, 120],

    amtPasses: 2,
    amtPassesItems: [0, 1, 2, 3, 4, 5, 10, 99],
  }),

  methods: {
    saveSettings() {
      this.$store.dispatch("saveSettings", {
        passLimit: this.amtPasses,
        teamAmount: this.teamAmount,
        timeLimit: this.amtTime,
        roundLimit: this.amtRounds,
      })
      this.$router.push("/game")
    },
  },
};
</script>
<style>
.settings-select {
  width: 200px;
  max-width: 200px !important;
}

.settings-finished-btn {
  width: 200px;
  max-width: 200px !important;
}
</style>
