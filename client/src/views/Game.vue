<template>
  <v-row class="justify-center align-center">
    <h1 style="text-transform: uppercase">{{ currentWord }}</h1>
  </v-row>
</template>
<script>
import { getRandomWord } from "../utils/localizer";

export default {
  name: "Settings",

  components: {},

  data: () => ({
    currentWord: null,
    locale: null,
  }),

  methods: {
    getLocale() {
      return "sv-SE";
    },
  },

  mounted() {
    (this.locale = this.getLocale()), (this.currentWord = getRandomWord());
  },
};
</script>
