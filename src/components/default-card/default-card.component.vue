<template>
  <v-card class="pt-3" variant="elevated" max-width="344px">
    <v-card-subtitle :class="{ 'text-center': textCenter }">
      <div>
        {{ title }}
      </div>
    </v-card-subtitle>
    <v-card-title :class="{ 'text-center': textCenter }">
      <p :class="color">
        {{ value }}
      </p>
    </v-card-title>
  </v-card>
</template>

<script lang="ts">
  export default {
    props: {
      title: {
        type: String,
      },
      value: {
        required: true,
      },
      textCenter: {
        type: Boolean,
        required: false,
        default: false,
      },
      backgroundColor: {
        type: String,
        default: () => '',
      },
    },
    computed: {
      color() {
        return `text-${this.backgroundColor}`;
      },
    },
  };
</script>
