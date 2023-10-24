<template>
  <v-overlay
    absolute
    attach="body"
    z-index="2000"
    :model-value="loader.show"
    class="justify-center align-center position-fixed"
  >
    <v-progress-circular
      color="primary"
      indeterminate
      size="64"
    ></v-progress-circular>
  </v-overlay>
</template>

<script lang="ts">
  export default {
    data() {
      return {
        loader: this.$loader,
      };
    },
    created() {
      this.loader = this.$loader;
    },
  };
</script>
