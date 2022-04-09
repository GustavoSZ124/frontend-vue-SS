<template>
  <div>
    <v-app-bar app dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title class="mx-3">Logo</v-app-bar-title>
      <v-container fluid>
        <v-btn to="/" retain-focus-on-click plain class="pa-2 text-capitalize">
          Home
        </v-btn>
        <v-btn to="/documents" plain class="pa-2 text-capitalize">
          Documents
        </v-btn>
        <v-btn to="/files" plain class="pa-2 text-capitalize"> Files </v-btn>
        <v-btn to="/dictionary" plain class="pa-2 text-capitalize">
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

    <v-navigation-drawer v-model="drawer" app temporary dark class="text-wrap">
      <v-list>
        <v-list-item>
          <v-list-item-content class="text-center">
            <v-list-item-title class="text-h4"> Dictionary </v-list-item-title>
            <v-autocomplete
              v-model="model"
              :items="dictionary"
              :loading="isLoading"
              :search-input.sync="search"
              item-text="traditional"
              item-value="traditional"
              return-object
              clearable
              hide-details
              no-data-text="symbol no found"
              label="Chinese - English"
              placeholder="Start typing to Search"
              prepend-inner-icon="mdi-magnify"
              cache-items
            ></v-autocomplete>
          </v-list-item-content>
        </v-list-item>
        <v-list v-if="model" class="text-justify">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                {{ model.traditional }}
              </v-list-item-title>
              <v-list-item-subtitle> Traditional </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                {{ model.simplified }}
              </v-list-item-title>
              <v-list-item-subtitle> Simplified </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                {{ model.pinyin }}
              </v-list-item-title>
              <v-list-item-subtitle> Pinyin </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-for="(def, i) in model.definitions" :key="i">
            <v-list-item-content>
              <v-list-item-title> {{ i + 1 }}. {{ def }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Navbar",
  props: {
    Pdrawer: Boolean,
    word: String,
  },
  data: () => ({
    drawer: null,
    model: null,
    isLoading: false,
    search: null,
  }),
  computed: {
    ...mapState(["dictionary"]),
  },
  methods: {
    ...mapActions(["getApiDictionary"]),
    /* 
    filter(item, queryText, itemText) {
      return itemText.startsWith(queryText);
    }, */
    async Psearch(word) {
      this.drawer = true;
      this.model = null;
      if (this.dictionary.length === 0 && !this.isLoading) {
        this.isLoading = true;
        await this.getApiDictionary();
        this.isLoading = false;
        console.log("Get Dictionary");
      }

      this.dictionary.every((entry) => {
        if (entry.traditional === word) {
          this.model = entry;
          return false;
        }
        return true;
      });
      /* 
      this.dictionary.forEach((entry) => {
        if (entry.traditional === word) {
          this.model = entry;

        }
      }); */
    },
  },
  watch: {
    search(val) {
      // Items have already been loaded
      if (this.dictionary.length > 0) return;
      //if (this.items.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      this.getApiDictionary().then(() => {
        this.isLoading = false;
      });
    },
  },
};
</script>

<style scoped>
.v-list-item__subtitle,
.v-list-item__title {
  text-overflow: initial !important;
  white-space: initial !important;
}
</style>