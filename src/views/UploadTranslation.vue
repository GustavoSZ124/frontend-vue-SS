<template>
  <v-container>
    <h1 class="text-h3 text-center my-4">Upload new translation</h1>
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
            label="Select document"
            :items="selectDocuments"
            v-model="form.document"
            :menu-props="{ offsetY: true }"
            :rules="documentRules"
            clearable
          ></v-select>

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
import { mapActions, mapState } from "vuex";
import Dropzone from "../components/Dropzone.vue";

export default {
  name: "UploadTranslation",
  components: {
    Dropzone,
  },
  data: () => ({
    flag_msg: false,
    valid: false,
    form: {
      title: "",
      author: "",
      language: null,
      file: null,
      document: null,
    },
    file: null,
    titleRules: [(v) => !!v || "Titulo requerido"],
    authorRules: [(v) => !!v || "Autor requerido"],
    languageRules: [(v) => !!v || "Idioma requerido"],
    documentRules: [(v) => !!v || "Documento requerido"],
    fileRules: [(v) => !!v || "Archivo requerido"],
  }),
  computed: {
    ...mapState(["documents", "languages"]),
    selectDocuments() {
      let docs = [];
      this.documents.forEach((doc) => {
        if (doc.type === "Original")
          docs.push({ value: doc.id, text: doc.title });
      });
      return docs;
    },
  },
  methods: {
    ...mapActions(["getApiDocuments", "uploadApiTranslation"]),
    newDocument() {
      const formData = new FormData();

      Object.keys(this.form).forEach((key) => {
        formData.append(key, this.form[key]);
      });

      this.uploadApiTranslation(formData);
      this.flag_msg = true;
      this.$refs.form.reset();
    },
  },
  created() {
    if (this.documents.length === 0) this.getApiDocuments();
  },
};
</script>

<style>
</style>