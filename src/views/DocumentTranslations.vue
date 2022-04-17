<template>
  <v-container fluid @mouseup="selection">
    <h1 v-if="select" class="text-h3 text-center my-4">
      {{ select.document.title }}
    </h1>
    <v-row class="mx-3">
      <v-col>
        <v-card
          v-if="select"
          :height="height"
          color="yellow lighten-4"
          outlined
        >
          <v-toolbar dense dark color="indigo darken-1" elevation="0">
            <v-toolbar-title>{{ select.document.file }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <span class="pr-3"> sync scrolls </span>
            <v-switch
              v-model="sync"
              hide-details
              color="cyan accent-2"
            ></v-switch>
          </v-toolbar>
          <div
            class="doc"
            id="original"
            @scroll="sync ? syncScroll($event.target) : null"
          >
            <v-card-text>
              <div v-for="(chapter, i) in select.chapters" :key="i">
                <h3
                  :class="{ hover: phover === chapter.num }"
                  @mouseover="phover = chapter.num"
                  @mouseleave="phover = ''"
                >
                  {{ chapter.chapter }}
                </h3>
                <br />
                <p
                  v-for="(passage, j) in chapter.passages"
                  :key="j"
                  :class="{ hover: phover === passage.num }"
                  @mouseover="phover = passage.num"
                  @mouseleave="phover = ''"
                >
                  {{ passage.passage }}
                </p>
              </div>
            </v-card-text>
          </div>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          v-if="translations.length !== 0"
          :height="height"
          color="yellow lighten-4"
          outlined
        >
          <v-tabs
            v-model="tab"
            dark
            background-color="indigo darken-1"
            align-with-title
          >
            <v-tabs-slider color="cyan"></v-tabs-slider>
            <v-tab v-for="(item, i) in translations" :key="i">
              {{ item.document.language }}
            </v-tab>
          </v-tabs>
          <div
            id="tab"
            class="doc"
            @scroll="sync ? syncScroll($event.target) : null"
          >
            <v-tabs-items v-model="tab" class="tab">
              <v-tab-item v-for="(translation, i) in translations" :key="i">
                <v-card-text>
                  <div v-for="(chapter, j) in translation.chapters" :key="j">
                    <h3
                      :class="{ hover: phover === chapter.num }"
                      @mouseover="phover = chapter.num"
                      @mouseleave="phover = ''"
                    >
                      {{ chapter.chapter }}
                    </h3>
                    <br />

                    <p
                      v-for="(passage, k) in chapter.passages"
                      :key="k"
                      @mouseover="phover = passage.num"
                      @mouseleave="phover = ''"
                      :class="{ hover: phover === passage.num }"
                    >
                      {{ passage.passage }}
                    </p>
                  </div>
                </v-card-text>
              </v-tab-item>
            </v-tabs-items>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-btn
      v-show="button"
      id="search"
      color="blue"
      dark
      fab
      x-small
      absolute
      @click="search"
    >
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "DocumentTranslations",
  data: () => ({
    tab: "",
    mark: "",
    phover: "",
    height: 450,
    sync: true,
    value: "",
    button: false,
  }),
  computed: {
    ...mapState(["select", "translations", "entry", "dict_flag"]),
  },
  methods: {
    ...mapMutations(["setDictFlag", "setEntry"]),
    ...mapActions(["getApiDocument"]),
    syncScroll(target) {
      var d1 = document.getElementById("original");
      var d2 = document.getElementById("tab");
      var porcentaje = target.scrollTop / (target.scrollHeight - 399);

      d1.scrollTop = Math.round((d1.scrollHeight - 399) * porcentaje);
      d2.scrollTop = Math.round((d2.scrollHeight - 399) * porcentaje);
    },
    selection(e) {
      let sel = window.getSelection();
      if (sel.toString() !== "" && !this.button) {
        let btn = document.getElementById("search");

        btn.style.left = e.clientX - 5 + "px";
        btn.style.top = e.clientY - 50 + "px";

        this.button = true;
        this.value = sel.toString();
      } else this.button = false;
    },
    search() {
      this.button = false;

      this.$emit("drawer", this.value);
    },
  },
  created() {
    const id = this.$route.params.id;

    if (this.select === null || this.select.document.id !== id) {
      this.getApiDocument(id);
    }
  },
};
</script>

<style scoped>
.doc {
  height: 89%;
  overflow: auto;
  text-align: justify;
  text-justify: inter-word;
}

.hover {
  background-color: #fff176;
}

.tab {
  background-color: transparent !important;
}
</style>