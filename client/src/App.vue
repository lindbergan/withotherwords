<template>
  <v-app>
    <v-main>
      <v-container
        fluid
        fill-height
      >
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
};
</script>
