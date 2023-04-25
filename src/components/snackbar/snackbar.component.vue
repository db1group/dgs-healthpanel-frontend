<template>
  <v-snackbar
    :absolute="snackbar.absolute"
    :bottom="snackbar.bottom"
    :color="snackbar.color"
    :left="snackbar.left"
    :right="snackbar.right"
    :timeout="snackbar.timeout"
    dark
    :top="snackbar.top"
    v-model="snackbar.show"
    :vertical="snackbar.vertical"
    :multi-line="snackbar.multiLine"
  >
    <span class="text-white">
      {{ snackbar.text }}
    </span>

    <template v-slot:actions>
      <v-btn
        v-if="!snackbar.hideDefaultBtn"
        @click="snackbar.show = false"
        :color="snackbar.buttonColor"
        text
      >
        Fechar
      </v-btn>
      <v-btn
        v-if="snackbar.callback && snackbar.callback.action"
        @click="snackbarAction"
        :color="snackbar.buttonColor"
        text
      >
        {{ snackbar.callback.label }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
export default {
  data() {
    return {
      snackbar: this.$snackbar,
    };
  },
  methods: {
    snackbarAction() {
      if (this.snackbar.callback) {
        this.snackbar.callback.action();
      }
    },
  },
  created() {
    this.snackbar = this.$snackbar;
  },
};
</script>
