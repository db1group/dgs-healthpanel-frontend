<template>
    <v-card>
      <v-card-title> Relatório de stacks utilizadas </v-card-title>
      <v-card-text>
        <v-card-text>
          Selecione o projeto para filtrar, caso queira.
        </v-card-text>

        <v-row justify="end">
          <v-select
            color="primary"
            class="mx-7"
            :items="stackHandler.projectsNames"
            label="Projetos existentes"
            v-model="stackHandler.selectedProjectsNames"
            chips
            multiple>
          </v-select>
        </v-row>

        <v-expansion-panels variant="popout" cols="12">
          <v-expansion-panel v-for="(project) in stackHandler.projects">
            <v-col v-if="shouldShowProject(project.name)">
              <v-expansion-panel-title @click="getStacksById(project.id)">
                {{ project.name }}
              </v-expansion-panel-title>
              <v-expansion-panel-text align="center" elevation="0">
                <v-col align="end" cols="12">
                  <v-btn
                    @click="openTechModal(project.id)"
                    color='primary'>
                    TECH RADAR
                  </v-btn>
                </v-col>
                <v-row class="d-flex">
                  <v-col
                    justify="space-between"
                    cols="2"
                    lg="2"
                    v-for="(item, stackIndex) in stackHandler.stacks">
                    <v-card class="pt-3" variant="elevated" elevation="5" max-width="344px">
                      <v-card-subtitle>
                          Stack Utilizada
                      </v-card-subtitle>
                      <v-card-title>
                          {{ item.stackName }}
                      </v-card-title>
                      <v-btn
                        class="my-3"
                        @click="openDialog(stackIndex)"
                        color="red">
                        Remover
                      </v-btn>
                    </v-card>
                    <v-dialog v-model="dialog" width="auto">
                      <v-card>
                        <v-card-text>
                          Excluir stack do projeto {{ project.name }}?
                        </v-card-text>
                        <v-card-actions>
                          <v-btn color="primary" @click="dialog = !dialog">
                            Sair
                          </v-btn>
                          <v-btn
                            color="danger"
                            @click="removeStack(project.id, stackIndexToBeExclude)">
                            Excluir
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-col>
                  <v-col cols="2">
                    <v-select
                      :items="stackHandler.sonarStackNames"
                      :error="alreadyInProject"
                      v-model="newStack"
                      label="Nova Stack">
                    </v-select>
                    <v-btn
                      @click="addStack(project.id)"
                      color="green">
                      Adicionar
                    </v-btn>
                    <v-card-text
                      style="color: rgb(247, 116, 116)"
                      v-if="alreadyInProject">
                      Stack ja cadastrada
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-expansion-panel-text>
            </v-col>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>

    <v-dialog v-model="isStackModalOpen" max-width="1200">
      <v-card>
        <v-row>
          <v-col>
            <v-card-title class="ma-3">
              Perfil de Aderência ao Tech Radar
            </v-card-title>
            <v-divider></v-divider>
            <v-card-item v-for="(stack) in stackHandler.stackComparisson!.techRadarResponses">
              <v-card :color="stackHandler.resolveStackColor(stack)" class="pa-3 mb-3" variant="tonal">
                <v-card-subtitle> Stack </v-card-subtitle>
                <v-card-title > {{ stack.title }} </v-card-title>
              </v-card>
              <v-divider></v-divider>
            </v-card-item>
          </v-col>

          <v-col>
            <adherence-percentual :adherence-response="stackHandler.stackComparisson!.adherenceResponse">
            </adherence-percentual>
          </v-col>
        </v-row>

        <v-card-actions>
          <v-btn color="red" @click="isStackModalOpen = !isStackModalOpen">
            Fechar
          </v-btn>
          <v-btn href="https://techradar.db1.com.br" target="_blank">
            Saiba Mais
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script lang="ts">
  import { StackHandler } from '../../handler/StackHandler';
  import { StackService } from '../../services/stack.service';
  import { inject } from 'vue';
  import { ProjectService } from '../../../project/services/project.service';
  import { HTTP_CLIENT, HttpClient } from '../../../../infra/http/http';
  import { TechRadarService } from '../../services/techradar.service';
  import AdherencePercentual from '../adhrence-percentual/adherence-percentual.component.vue';

  export default {
    data() {
        return {
            stackHandler: new StackHandler(new StackService(inject(HTTP_CLIENT) as HttpClient), new ProjectService(inject(HTTP_CLIENT) as HttpClient), new TechRadarService(inject(HTTP_CLIENT) as HttpClient)),
            newStack: '',
            dialog: false,
            isStackModalOpen: false,
            stackIndexToBeExclude: undefined || 0,
            alreadyInProject: false
        };
    },
    methods: {
        async getAllProjects() {
            await this.stackHandler.getAllProjects();
        },
        async getStacksById(id: string) {
            return await this.stackHandler.getStacksById(id);
        },
        async addStack(projectId: string) {
            const stackadded = await this.stackHandler.addStack(projectId, this.newStack);
            if (!stackadded) {
                await this.getStacksById(projectId);
                return this.resetAddField();
            }
            this.newStack = '';
            return (this.alreadyInProject = true);
        },
        async consultStackFromSonar() {
            await this.stackHandler.consultStackFromSonar();
        },
        async removeStack(projectId: string, stackIndex: number) {
            await this.stackHandler.removeStack(projectId, stackIndex);
            this.dialog = false;
            this.newStack = '';
        },
        openDialog(stackIndex: number) {
            this.dialog = true;
            this.stackIndexToBeExclude = stackIndex;
        },
        async openTechModal(projectId: string) {
            await this.stackHandler.getTechComparissonByIds(projectId);
            this.isStackModalOpen = true;
        },
        resetAddField() {
            this.newStack = '';
            this.alreadyInProject = false;
        },
        shouldShowProject(project: string) {
            return this.stackHandler.haveToShowProject(project);
        },
    },
    created() {
        this.consultStackFromSonar();
        this.getAllProjects();
    },
    components: { AdherencePercentual }
};
</script>
