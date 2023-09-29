<template>
  <div class="stack">
    <v-card>
      <v-card-title> Relatório de stacks utilizadas </v-card-title>
      <v-card-text>
        <v-card-text
          >Selecione o projeto para filtrar, caso queira.</v-card-text
        >
        <v-row justify="end">
          <v-select
            width="50%"
            class="ml-2"
            color="primary"
            :items="stackHandler.projectsNames"
            label="Projetos existentes"
            v-model="selectedProjectsNames"
            chips
            multiple
          ></v-select>
        </v-row>
        <v-expansion-panels variant="popout" cols="12">
          <v-expansion-panel
            v-for="(project, projIndex) in stackHandler.projects"
            :key="projIndex"
          >
            <v-col v-if="shouldShowProject(project.name)">
              <v-expansion-panel-title @click="filterProjectById(projIndex)">
                {{ project.name }}
                <v-spacer></v-spacer>
              </v-expansion-panel-title>
              <v-expansion-panel-text align="center" elevation="0">
                <v-col align="end" cols="12">
                  <v-btn :color="'primary'"> TECH RADAR </v-btn>
                </v-col>
                <v-row class="d-flex">
                  <v-col
                    justify="space-between"
                    cols="2"
                    lg="2"
                    v-for="(item, stackIndex) in stackHandler.stacks"
                  >
                    <default-card
                      title="Stack Utilizada"
                      :value="item.stackName"
                    />
                    <v-btn @click="openDiolog(stackIndex)" :color="'red'"
                      >Remover</v-btn
                    >
                    <v-dialog v-model="dialog" width="auto">
                      <v-card>
                        <v-card-text>
                          Excluir stack do projeto {{ project.name }}?
                        </v-card-text>
                        <v-card-actions>
                          <v-btn color="primary" @click="dialog = !dialog"
                            >Sair</v-btn
                          >
                          <v-btn
                            color="danger"
                            @click="
                              removeStack(project.id, stackIndexToBeExclude)
                            "
                          >
                            Excluir
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-col>
                  <v-col cols="2">
                    <v-select
                      :items="sonarStacksNames"
                      :error="alreadyInProject"
                      v-model="newStack"
                      label="Nova Stack"
                    >
                    </v-select>
                    <v-btn
                      @click="addStack(project.id, projIndex)"
                      color="green"
                    >
                      Adicionar
                    </v-btn>
                    <v-card-text
                      style="color: rgb(247, 116, 116)"
                      v-if="alreadyInProject"
                      >Stack ja cadastrada</v-card-text
                    >
                  </v-col>
                </v-row>
              </v-expansion-panel-text>
            </v-col>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
  import { StackHandler } from '../../handler/StackHandler';
  import DefaultCard from '../../../../components/default-card/default-card.component.vue';
  import { StackService } from '../../services/stack.service';
  import { inject } from 'vue';
  import { ProjectService } from '../../../project/services/project.service';
  import { HTTP_CLIENT, HttpClient } from '../../../../infra/http/http';

  export default {
    components: {
      DefaultCard,
    },

    data() {
      return {
        stackHandler: new StackHandler(
          new StackService(inject(HTTP_CLIENT) as HttpClient),
          new ProjectService(inject(HTTP_CLIENT) as HttpClient),
        ),
        projectsNames: [] as string[],
        selectedProjectsNames: [] as string[],
        newStack: '',
        sonarStacksNames: [] as string[],
        dialog: false,
        stackIndexToBeExclude: undefined || 0,
        alreadyInProject: false,
      };
    },
    methods: {
      async getAllProjects() {
        await this.stackHandler.getAllProjects();
      },
      async filterProjectById(id: number) {
        await this.stackHandler.filterProjectById(id);
      },
      async addStack(projectId: string, projectIndex: number) {
        const stackadded = await this.stackHandler.addStack(
          projectId,
          this.newStack,
        );
        if (!stackadded) {
          await this.filterProjectById(projectIndex);
          return this.resetAddField();
        }
        this.newStack = '';
        return (this.alreadyInProject = true);
      },
      async consultStackFromSonar() {
        await this.stackHandler.consultStackFromSonar();
        Object.values(this.stackHandler.sonarStackList);
        this.sonarStacksNames = this.stackHandler.stackList
          .map((obj) => Object.values(obj)[1])
          .sort();
      },
      async removeStack(projectId: string, stackIndex: number) {
        await this.stackHandler.removeStack(projectId, stackIndex);
        this.dialog = false;
        this.newStack = '';
      },
      openDiolog(stackIndex: number) {
        this.dialog = true;
        this.stackIndexToBeExclude = stackIndex;
      },
      resetAddField() {
        this.newStack = '';
        this.alreadyInProject = false;
      },
      shouldShowProject(project: string) {
        return (
          this.selectedProjectsNames.includes(project) ||
          this.selectedProjectsNames.length === 0
        );
      },
    },
    created() {
      this.consultStackFromSonar();
      this.getAllProjects();
    },
  };
</script>