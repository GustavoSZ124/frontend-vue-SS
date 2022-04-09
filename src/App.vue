<template>
  <v-app>
    <Navbar ref="navbar" />
    <v-main>
      <router-view @drawer="search" />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
  data: () => ({
    drawer: false,
    word: "",
  }),
  methods: {
    search(word) {
      this.$refs.navbar.Psearch(word);
    },
  },
};
</script>

<style>
html {
  overflow-y: auto !important;
}
</style>