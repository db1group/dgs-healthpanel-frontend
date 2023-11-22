<template>
  <v-dialog v-model="dialogConfirmation.show" width="auto">
    <v-card>
      <v-card-text> {{ dialogConfirmation.text }} </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="dialogConfirmation.show = false">
          Cancelar
        </v-btn>
        <v-btn color="danger" @click="removeItem"> Excluir </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  export default {
    data() {
      return {
        dialogConfirmation: this.$dialogConfirmation,
      };
    },
    methods: {
      removeItem() {
        this.dialogConfirmation.show = false;
        this.$emit('remove');
      },
    },
  };
</script>
