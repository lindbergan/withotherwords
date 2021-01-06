<template>
  <v-row class="justify-center align-center">
    <v-col :cols="8">
      <h1 class="text-center mb-5">Inställningar</h1>
      <v-row class="d-flex flex-column justify-center align-center">
        <v-col :xs="2" :sm="2" :md="3" :lg="3">
          <v-select
            v-model="amtPlayers"
            :items="amtPlayersItems"
            outlined
            dense
            hide-detials
            label="Antal spelare"
          >
          </v-select>
          <v-select
            v-model="amtRounds"
            :items="amtRoundsItems"
            outlined
            dense
            hide-detials
            label="Antal rounds"
          >
          </v-select>
          <v-select
            v-model="amtTime"
            :items="amtTimeItems"
            outlined
            dense
            hide-detials
            label="Antal time"
          >
          </v-select>
          <v-select
            v-model="amtPasses"
            :items="amtPassesItems"
            outlined
            dense
            hide-detials
            label="Antal passes"
          >
          </v-select>
        </v-col>
        <v-col :xs="6" :sm="6" :md="6" :lg="6">
          <v-btn to="/game" depressed large block>Färdig</v-btn>
        </v-col>
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
