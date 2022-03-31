<template>
  <v-container>
    <h1 class="text-h3 text-center mt-4 mb-10">Home Page</h1>

    <v-row>
      <v-col v-for="(item, i) in views" :key="i" cols="4">
        <v-card outlined hover class="fill-height" :to="{ name: item.view }">
          <div class="d-flex flex-no-wrap fill-height">
            <v-avatar class="align-self-center mx-3" size="100" tile>
              <v-img :src="item.src" :alt="item.alt"></v-img>
            </v-avatar>
            <div>
              <v-card-title class="text-h5" v-text="item.title"></v-card-title>
              <v-card-text v-text="item.text"></v-card-text>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    views: [
      {
        title: "Documents",
        text: "See the list of original documents previously uploaded to the application.",
        src: require("../assets/documents.png"),
        alt: "documents.png",
        view: "Documents",
      },
      {
        title: "Upload Documents",
        text: "Upload a new document to the application to process it.",
        src: require("../assets/upload_documents.png"),
        alt: "upload documents.png",
        view: "UploadDocument",
      },
      {
        title: "Upload Translation",
        text: "Upload a translation of a document previously uploaded in the application.",
        src: require("../assets/translator.png"),
        alt: "traduccion.png",
        view: "UploadTranslation",
      },
      {
        title: "Files",
        text: "See all documents, translations and variants in the web application.",
        src: require("../assets/files.png"),
        alt: "ver archivos.png",
        view: "Files",
      },
      {
        title: "Upload Variant",
        text: "Upload an edition or variant of a previously uploaded document.",
        src: require("../assets/variants.png"),
        alt: "Variante.png",
        view: "Home",
      },
      {
        title: "Dictionary",
        text: "Consult words and lexemes to know their meaning.",
        src: require("../assets/dictionary.png"),
        alt: "diccionario.png",
        view: "Home",
      },
    ],
  }),
};
</script>
