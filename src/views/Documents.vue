<template>
  <v-container>
    <h1 class="text-h3 text-center my-4">Documents</h1>
    <v-row>
      <v-col cols="12" md="8" class="mx-auto">
        <v-data-iterator
          :items="originals"
          :search="search"
          hide-default-footer
        >
          <template v-slot:header>
            <v-toolbar dense color="indigo darken-2" dark>
              <v-text-field
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                label="Search"
                hide-details
                single-line
                clearable
                filled
                class="px-0"
              ></v-text-field>
            </v-toolbar>
          </template>

          <template v-slot:default="{ items }">
            <v-list dense outlined>
              <v-list-item-group v-model="item">
                <v-list-item
                  v-for="(item, i) in items"
                  :key="i"
                  :to="{ name: 'UpdateDocument', params: { id: item.id } }"
                >
                  <v-list-item-content>
                    {{ item.title }} - {{ item.author }}
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-row>
                      <v-col>
                        <v-btn
                          fab
                          x-small
                          color="primary"
                          :to="{
                            name: 'UpdateDocument',
                            params: { id: i },
                          }"
                          class="ml-1"
                        >
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn
                          fab
                          x-small
                          color="red"
                          @click.native.prevent="
                            id = i;
                            dialog = true;
                          "
                          class="ml-1"
                        >
                          <v-icon>mdi-window-close</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" width="370">
      <div>
        <template slot:default>
          <v-card color="grey lighten-3" class="text-center">
            <v-card-title> Are you sure to delete the document: </v-card-title>
            <v-card-text v-if="document">
              {{ document.title }} - {{ document.author }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                text
                @click="
                  id = null;
                  dialog = false;
                "
              >
                Cancel
              </v-btn>
              <v-btn color="red" text @click="deleteDocument()"> Delete </v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </div>
    </v-dialog>
    <v-snackbar v-model="msg" timeout="2000"> Document Deleted </v-snackbar>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Documents",
  data: () => ({
    search: "",
    title: "",
    item: null,
    msg: false,
    dialog: false,
    id: null,
  }),
  computed: {
    ...mapState(["documents"]),
    originals() {
      return this.documents.filter((doc) => doc.type === "Original");
    },
    document() {
      if (this.id !== null) return this.originals[this.id];
      return null;
    },
  },
  methods: {
    ...mapActions(["getApiDocuments", "deleteApiDocument"]),
    deleteDocument() {
      this.dialog = false;
      this.deleteApiDocument(this.document.id);
      this.msg = true;
      this.id = null;
    },
  },
  created() {
    if (this.documents.length === 0) this.getApiDocuments();
  },
};
</script>

<style scoped>
</style>