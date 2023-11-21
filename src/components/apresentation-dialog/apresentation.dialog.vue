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
              Esse painel tem o propósito de coletar informações sobre a saúde
              técnica dos projetos e ser uma ferramenta que irá te auxiliar na
              evolução deles. Esperamos que você utilize isso no seu
              dia-a-dia e que seja uma ferramenta que te ajude de fato!
            </p>
          </v-col>
          <v-col cols="12">
            <v-form ref="form">
              <v-row>
                <v-col cols="12" lg="12">
                  <v-autocomplete
                    label="Selecione o projeto"
                    variant="outlined"
                    :rules="[rules.required]"
                    v-model:model-value="project"
                    :items="projects"
                    item-title="name"
                    item-value="id"
                  />
                </v-col>
              </v-row>
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
  import { ref, reactive, onMounted, inject } from 'vue';
  import { Project } from '../../modules/project/entities/project';
  import { ProjectService } from '../../modules/project/services/project.service';
  import { HTTP_CLIENT, HttpClient } from '../../infra/http/http';

  interface Props {
    value: boolean;
  }
  const { value } = defineProps<Props>();

  const form = ref<any>(null);

  const emit = defineEmits(['input']);

  const project = ref('');

  const quantityDevs = ref(3);

  const projects: Project[] = reactive([]);

  const rules = {
    required: (v: any) => !!v || 'Campo obrigatório',
  };

  async function getProjects() {
    const projectService = new ProjectService(
      inject(HTTP_CLIENT) as HttpClient,
    );

    const listProjects = await projectService.getAllProjects();
    projects.push(...listProjects);
  }

  async function goToForm() {
    const { valid } = await form.value.validate();
    if (valid) {
      emit('input', project.value);
    }
  }

  onMounted(() => {
    getProjects();
  });
</script>
