<template>
  <div
    @dragenter.prevent="toggleActive"
    @dragleave.prevent="toggleActive"
    @dragover.prevent=""
    @drop.prevent="toggleActive"
    @drop="drop"
    class="dropzone"
    :class="{ 'active-dropzone': active }"
  >
    <slot v-if="value">
      <!-- Esto es provicional -->
      <v-chip color="grey lighten-1" close @click:close="$emit('input', null)">
        {{ value.name }} - {{ value.type }}
      </v-chip>
    </slot>
    <slot v-else>
      <span>Drag and Drop</span>
      <span>A File Or</span>
      <slot name="label" v-bind:f_input="f_input">
        <label :for="f_input"> {{ label }} </label>
      </slot>
      <input :id="f_input" type="file" @change="drop" />
    </slot>
  </div>
</template>

<script>
export default {
  name: "Dropzone",
  props: {
    value: File,
    label: {
      type: String,
      default: "Seleccionar",
    },
  },
  data() {
    return {
      f_input: "dropzoneFile",
      active: false,
    };
  },
  methods: {
    drop(e) {
      if (e.type === "change") {
        console.log(e.target.files[0]);
        this.$emit("input", e.target.files[0]);
      } else if (e.type === "drop") {
        this.$emit("input", e.dataTransfer.files[0]);
      }
    },
    toggleActive() {
      this.active = !this.active;
      return this.active;
    },
  },
};
</script>

<style scoped>
.dropzone {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 16px;
  border-bottom: solid 1px;
  transition: 0.3s ease all;
}

.dropzone label {
  padding: 8px 12px;
  color: white;
  background-color: #41b883;
  transition: 0.3s ease all;
}

.dropzone input {
  display: none;
}

.active-dropzone {
  color: white;
  border-color: white;
  /*background-color: #41b883;*/
  background-color: #bdbdbd;
}

.active-dropzone label {
  background-color: white;
  /* color: #41b883; */
  color: #bdbdbd;
}
</style>