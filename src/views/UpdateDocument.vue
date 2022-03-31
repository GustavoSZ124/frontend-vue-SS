<template>
  <v-container>
    <h1 class="text-h3 text-center my-4">Update Document</h1>
    <v-form v-model="valid" ref="form">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            filled
            required
            label="Title"
            placeholder="Write the tittle of the document"
            :rules="titleRules"
            v-model="form.title"
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            filled
            label="Author"
            placeholder="Write the author of the document"
            :rules="authorRules"
            v-model="form.author"
            clearable
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8">
          <v-input
            background-color="grey lighten-3"
            height="180px"
            v-model="form.file"
            :rules="fileRules"
          >
            <template v-slot:default>
              <Dropzone v-model="form.file">
                <template v-slot:label="{ f_input }">
                  <v-btn>
                    <label :for="f_input">Select One</label>
                  </v-btn>
                </template>
              </Dropzone>
            </template>
            <template v-slot:message="message">
              {{ message.message }}
            </template>
          </v-input>
        </v-col>
        <v-col cols="4">
          <v-select
            filled
            label="Select language"
            :items="languages"
            v-model="form.language"
            :menu-props="{ offsetY: true }"
            :rules="languageRules"
            clearable
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="2" class="ml-auto">
          <v-btn block @click="$router.go(-1)"> Cancel </v-btn>
        </v-col>
        <v-col cols="12" md="2">
          <v-btn block @click="resetVal"> Reset Changes </v-btn>
        </v-col>
        <v-col cols="12" md="2" class="mr-auto">
          <v-btn
            block
            color="success"
            :disabled="!valid || !changes"
            @click="dialog = true"
          >
            Save Changes
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-dialog v-model="dialog" width="370">
      <div>
        <template slot:default>
          <v-card color="grey lighten-3" class="text-center">
            <v-card-title>
              Are you sure to save the document's changes?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="dialog = false"> Cancel </v-btn>
              <v-btn color="red" text @click="updateDocument"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </div>
    </v-dialog>
    <v-snackbar timeout="2000" v-model="flag_msg" color="green">
      The document was updated
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Dropzone from "../components/Dropzone.vue";

export default {
  name: "UpdateDocument",
  components: {
    Dropzone,
  },
  data: () => ({
    id: 0,
    flag_msg: false,
    dialog: false,
    valid: false,
    form: {
      title: "",
      author: "",
      language: null,
      file: null,
    },
    titleRules: [(v) => !!v || "Required Title"],
    authorRules: [(v) => !!v || "Required Author"],
    languageRules: [(v) => !!v || "Required Language"],
    fileRules: [(v) => !!v || "Required File"],
  }),
  computed: {
    ...mapState(["documents", "languages"]),
    changes() {
      let change = false;
      Object.keys(this.form).forEach((key) => {
        if (key !== "file") {
          if (this.form[key] !== this.documents[this.id][key]) change = true;
        } else {
          if (this.form[key] && this.form[key].size !== 0) change = true;
        }
      });
      return change;
    },
  },
  methods: {
    ...mapActions(["updateApiDocument"]),
    updateDocument() {
      let formData = new FormData();

      this.dialog = false;
      Object.keys(this.form).forEach((key) => {
        formData.append(key, this.form[key]);
      });

      this.updateApiDocument({ id: this.documents[this.id].id, formData });
      this.$router.push({ name: "Documents" });
    },
    resetVal() {
      Object.keys(this.form).forEach((key) => {
        if (key === "file")
          this.form.file = new File([""], this.documents[this.id].file, {
            type: "text/plain",
          });
        else this.form[key] = this.documents[this.id][key];
      });
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.resetVal();
  },
};
</script>

<style scoped>
</style>