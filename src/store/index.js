import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const api = 'http://127.0.0.1:8000/api/'

export default new Vuex.Store({
  state: {
    languages: [
      { value: "EN", text: "English" },
      { value: "ES", text: "Español" },
      { value: "ZH", text: "Chino Tradicional" },
    ],
    documents: [],
    select: null,
    translations: [],
    dictionary: [],
    entry: "",
  },
  mutations: {
    setDocuments(state, actDocuments) {
      state.documents = actDocuments
    },
    setDocument(state, actDocument) {
      state.select = actDocument
    },
    setTranslations(state, actTranslations) {
      state.translations = actTranslations
    },
    setDictionary(state, actDictionary) {
      state.dictionary = actDictionary
    },
    setEntry(state, actEntry) {
      state.entry = actEntry
    }
  },
  actions: {
    getApiDocuments: function ({ commit }) {
      axios
        .get(api + "documents")
        .then((response) => {
          // console.log(response.data);
          commit('setDocuments', response.data.documents);
        })
        .catch((e) => console.log(e));
    },
    uploadApiDocument: function ({ dispatch }, formData) {
      axios
        .post(api + "documents", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log(response.data);
          dispatch('getApiDocuments');
        })
        .catch((e) => console.log(e));
    },
    deleteApiDocument: function ({ dispatch }, id) {
      axios
        .delete(api + "documents/" + id)
        .then((response) => {
          //console.log(response.data);
          dispatch('getApiDocuments');
        })
        .catch((e) => console.log(e));
    },
    updateApiDocument: function ({ commit, dispatch }, { id, formData }) {
      axios
        .post(api + "documents/" + id, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log(response.data);
          dispatch('getApiDocuments');
          commit('setDocument', null);
        })
        .catch((e) => console.log(e));
    },
    uploadApiTranslation: function ({ dispatch }, formData) {
      axios
        .post(api + "translations", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log(response.data);
          dispatch('getApiDocuments');
        })
        .catch((e) => console.log(e));
    },
    getApiDocument: function ({ commit }, id) {
      axios
        .get(api + "documents/" + id)
        .then((response) => {
          console.log(response.data.translations);
          commit('setDocument', response.data.original);
          commit('setTranslations', response.data.translations);
        })
        .catch((e) => console.log(e));
    },
    async getDictionary({ commit }) {
      try {
        const { data } = await axios.get(api + "media/cedict.json")
        commit("setDictionary", data)
      }
      catch (e) {
        console.log(e)
      }

      /* 
      axios
        .get(api + "media/cedict.json")
        .then((response) => {
          //console.log(response.data);
          commit('setDictionary', response.data)
        })
        .catch((e) => console.log(e)); */
    }
  },
  modules: {
  }
})
