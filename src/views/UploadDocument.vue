<template>
  <v-container>
    <h1 class="text-h3 text-center my-4">Upload new document</h1>
    <v-form v-model="valid" @submit.prevent="newDocument" ref="form">
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
        <v-col cols="12" md="3" class="ml-auto">
          <v-btn @click="$router.go(-1)" block> Cancel </v-btn>
        </v-col>
        <v-col cols="12" md="3" class="mr-auto">
          <v-btn block type="submit" :disabled="!valid" color="success">
            Create
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-snackbar timeout="2000" v-model="flag_msg" color="green">
      The document was save
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import Dropzone from "../components/Dropzone.vue";

export default {
  name: "UploadDocument",
  components: {
    Dropzone,
  },
  data: () => ({
    flag_msg: false,
    valid: false,
    languages: [
      { value: "EN", text: "English" },
      { value: "ES", text: "Español" },
      { value: "ZH", text: "Chino Tradicional" },
    ],
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
  methods: {
    ...mapActions(["uploadApiDocument"]),
    newDocument() {
      const formData = new FormData();

      Object.keys(this.form).forEach((key) => {
        formData.append(key, this.form[key]);
      });

      this.uploadApiDocument(formData);
      this.flag_msg = true;
      this.$refs.form.reset();
    },
  },
};
</script>

<style scoped>
</style>