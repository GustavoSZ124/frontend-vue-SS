<template>
  <v-container>
    <h1 class="text-h3 text-center my-4">Dictionary</h1>
    <v-row>
      <v-col cols="12" md="8" class="mx-auto">
        <v-card>
          <v-toolbar
            flat
            dark
            extended
            extension-height="16"
            color="indigo darken-2"
            class="pt-3"
          >
            <v-autocomplete
              v-model="model"
              :items="dictionary"
              :filter="filter"
              :loading="isLoading"
              :search-input.sync="search"
              item-text="traditional"
              item-value="traditional"
              return-object
              clearable
              hide-details
              color="white"
              hide-no-data
              no-data-text="symbol no found"
              label="Dictionary Chinese - English"
              placeholder="Start typing to Search"
              prepend-inner-icon="mdi-magnify"
            ></v-autocomplete>
          </v-toolbar>
          <v-expand-transition>
            <v-list v-if="model" class="amber lighten-4 text-justify">
              <v-list-item>
                <v-list-item-content>
                  <v-row>
                    <v-col>
                      <v-list-item-title>
                        {{ model.traditional }}
                      </v-list-item-title>
                      <v-list-item-subtitle> Traditional </v-list-item-subtitle>
                    </v-col>
                    <v-col>
                      <v-list-item-title>
                        {{ model.simplified }}
                      </v-list-item-title>
                      <v-list-item-subtitle> Simplified </v-list-item-subtitle>
                    </v-col>
                    <v-col>
                      <v-list-item-title>
                        {{ model.pinyin }}
                      </v-list-item-title>
                      <v-list-item-subtitle> Pinyin </v-list-item-subtitle>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-for="(def, i) in model.definitions" :key="i">
                <v-list-item-content>
                  {{ i + 1 }}. {{ def }}
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Dictionary",
  data: () => ({
    model: null,
    isLoading: false,
    search: null,
  }),
  computed: {
    ...mapState(["dictionary"]),
  },
  methods: {
    ...mapActions(["getApiDictionary"]),
    filter(item, queryText, itemText) {
      return itemText.startsWith(queryText);
    },
  },
  watch: {
    search(val) {
      // Items have already been loaded
      if (this.dictionary.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      this.getApiDictionary();
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
</style>