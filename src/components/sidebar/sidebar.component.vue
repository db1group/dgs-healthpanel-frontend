<template>
  <v-navigation-drawer
    :model-value="drawer"
    @update:model-value="close"
    temporary
  >
    <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
      title="John Leider"
    ></v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Home"
        value="home"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-forum"
        title="About"
        value="about"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
const emit = defineEmits(['input']);

interface Props {
  drawer: boolean;
}

function close(data: boolean) {
  console.log(data);
  emit('input', false);
}

const { drawer } = defineProps<Props>();
</script>
