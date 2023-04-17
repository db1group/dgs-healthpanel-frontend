```
<template>
  <v-dialog z-index="100" :model-value="value" persistent max-width="600">
    <v-card>
      <v-card-title> Processos </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <h2 class="text-center">Seja bem vindo ao painel de saúde 2.0</h2>
          </v-col>
          <v-col cols="12">
            <v-img class="ma-auto" src="/logo2.png" max-width="300px" />
          </v-col>
          <v-col cols="12">
            <p class="text-center">
              Sim, esse form é maior do que nosso antigo formulário. No entanto
              as respostas aqui serão salvas e você só deverá editar aquilo que
              de fato mudou em seu projeto. Esperamos que sua experiência seja
              melhor e que você consiga ter uma visibilidade daquilo que podemos
              melhorar nos projetos em que você está envolvido.
            </p>
          </v-col>
          <v-col cols="12">
            <v-form ref="form">
              <v-select
                label="Selecione o projeto"
                variant="outlined"
                :rules="[rules.required]"
                v-model:model-value="project"
                :items="projects"
                item-title="title"
                item-value="key"
              />
            </v-form>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          variant="outlined"
          size="large"
          class="ma-auto"
          @click="goToForm"
          >Bora pro form!</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  value: boolean;
}
const { value } = defineProps<Props>();

const form = ref<any>(null);

const emit = defineEmits(['input']);

const project = ref('');

const projects = [
  { key: 'IT_AL5_BANK', title: 'Al5 Bank' },
  { key: 'DB1_AVENUE', title: 'Avenue' },
  { key: 'IT_EBANX', title: 'Ebanx' },
  { key: 'IT_OMNI_BANCO', title: 'Omn iBanco' },
  { key: 'IT_OMNI_FINANCEIRA', title: 'Omni Financeira' },
  { key: 'DB1_PLAENGE', title: 'Plaenge' },
  { key: 'IT_SENAC_2020', title: 'Senac' },
  { key: 'DB1_XP', title: 'Xp' },
  { key: 'DB1_ZOOP', title: 'Zoop' },
  { key: 'DB1_ITSSEG', title: 'Its seg' },
  { key: 'DB1_ROYAL', title: 'Royal' },
  { key: 'DB1_EXIGO', title: 'Exigo' },
  { key: 'DB1_ARISTOTLE', title: 'Aristotle' },
];

const rules = {
  required: (v: any) => !!v || 'Campo obrigatório',
};

async function goToForm() {
  const { valid } = await form.value.validate();
  if (valid) {
    emit('input', project.value);
  }
}
</script>
