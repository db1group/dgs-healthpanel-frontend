<template>
  <v-dialog :model-value="show" @input="close" width="auto">
    <v-card>
      <v-card-text> {{ text }} </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="close"> Cancelar </v-btn>
        <v-btn color="danger" @click="removeItem"> Excluir </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  export default {
    props: {
      text: {
        type: String,
        default: () => 'Tem certeza que deseja excluir?',
      },
      show: {
        type: Boolean,
        default: () => false,
        required: true,
      },
    },
    methods: {
      removeItem() {
        this.$emit('remove');
      },
      close() {
        this.$emit('close');
      },
    },
  };
</script>
