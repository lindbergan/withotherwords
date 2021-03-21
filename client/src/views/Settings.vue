<template>
  <v-row class="justify-center align-center">
    <v-col :cols="8">
      <h1 class="text-center mb-5">Inställningar</h1>
      <v-row class="d-flex flex-column justify-center align-center">
        <v-col>
          <div class="d-flex justify-center align-center">
            <v-select
              v-model="amtPlayers"
              :items="amtPlayersItems"
              outlined
              dense
              hide-detials
              label="Antal spelare"
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
              label="Antal rounds"
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
              label="Antal time"
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
              label="Antal passes"
              class="settings-select"
            >
            </v-select>
          </div>
        </v-col>
        <div class="d-flex align-center justify-center">
          <v-btn
            to="/game"
            outlined
            large
            block
            class="settings-finished-btn">
            Färdig
          </v-btn>
        </div>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "Settings",

  components: {},

  data: () => ({
    amtPlayers: 2,
    amtPlayersItems: [2, 3, 4, 5, 6, 7, 8, 9, 10],

    amtRounds: 10,
    amtRoundsItems: [2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => i * 5),

    amtTime: 60,
    amtTimeItems: [15, 30, 45, 60, 75, 90, 105, 120],

    amtPasses: 2,
    amtPassesItems: [0, 1, 2, 3, 4, 5, 10, 99],
  }),
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
