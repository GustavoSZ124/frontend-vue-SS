<template>
  <v-navigation-drawer v-model="drawer" absolute temporary>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6"> Application </v-list-item-title>
        <v-list-item-subtitle> subtext </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Leftbar",
  props: {
    value: Boolean,
  },
  data: () => ({
    drawer: null,
  }),
  methods: {
    active() {},
  },
  created() {
    this.drawer = this.value;
  },
};
</script>

<style>
</style>