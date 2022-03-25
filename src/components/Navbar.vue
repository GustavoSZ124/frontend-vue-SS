<template>
  <v-app-bar app dark>
    <v-app-bar-title class="mx-3">Logo</v-app-bar-title>
    <v-container fluid>
      <v-btn to="/" retain-focus-on-click plain class="pa-2 text-capitalize">
        Home
      </v-btn>
      <v-btn to="/documents" plain class="pa-2 text-capitalize">
        Documents
      </v-btn>
      <v-btn to="/files" plain class="pa-2 text-capitalize"> Files </v-btn>
      <v-btn to="/dictionary" plain class="pa-2 text-capitalize" disabled>
        Dictionary
      </v-btn>
      <v-menu open-on-hover offset-y rounded="0">
        <template v-slot:activator="{ on, attrs }">
          <v-btn plain class="pa-2 text-capitalize" v-on="on" v-bind="attrs">
            Upload File
            <v-icon dark>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list dense dark>
          <v-list-item-group>
            <v-list-item to="/new/document" exact>
              <v-list-item-title>Upload Documents</v-list-item-title>
            </v-list-item>
            <v-list-item to="/new/translation" exact>
              <v-list-item-title>Upload Translations</v-list-item-title>
            </v-list-item>
            <v-list-item to="/new/variant" disabled exact>
              <v-list-item-title>Upload Variants</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
</style>