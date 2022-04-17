<template>
  <v-container>
    <h1 class="text-h3 text-center my-4">Files</h1>
    <v-row>
      <v-col cols="12" md="8" class="mx-auto">
        <v-data-iterator
          :items="documents"
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
              <v-list-item-group>
                <v-list-item
                  v-for="(item, i) in items"
                  :key="i"
                  :to="{ name: 'Document', params: { id: item.id } }"
                >
                  <v-list-item-content>
                    {{ item.type }} - {{ item.title }}
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-row>
                      <v-col>
                        <v-btn
                          fab
                          x-small
                          color="primary"
                          :to="{
                            name:
                              item.type === 'Original'
                                ? 'UpdateDocument'
                                : 'UpdateTranslation',
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
            <v-card-text>
              {{ document }}
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
  name: "Files",
  data: () => ({
    search: "",
    title: "",
    msg: false,
    dialog: false,
    id: null,
  }),
  computed: {
    ...mapState(["documents"]),
    document() {
      if (this.id !== null) return this.documents[this.id].title;
      return "";
    },
  },
  created() {
    if (this.documents.length === 0) this.getApiDocuments();
  },
  methods: {
    ...mapActions([
      "getApiDocuments",
      "deleteApiDocument",
      "deleteApiTranslation",
    ]),
    deleteDocument() {
      this.dialog = false;
      if (document.type === "Tranlation")
        this.deleteApiTranslation(this.documents[this.id].id);
      else this.deleteApiDocument(this.documents[this.id].id);
      this.msg = true;
      this.id = null;
    },
  },
};
</script>

<style>
</style>