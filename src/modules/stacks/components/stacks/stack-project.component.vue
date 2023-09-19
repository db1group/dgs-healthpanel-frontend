<template>
  <div class="stack">
    <v-card>
      <v-card-title> Relatório de stacks utilizadas </v-card-title>
      <v-card-text>
        <v-text>Selecione o projeto para filtrar, caso queira.</v-text>
        <v-row justify="end">
          <v-col cols="12">
            <v-radio-group
              v-model="selectedProject"
              inline
              @change="filterProjectById(selectedProject)"
            >
              <v-radio
                class="ml-2"
                color="primary"
                v-for="(item, index) in projectsNames"
                :key="index"
                :label="item.name"
                :value="index"
              ></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>

        <v-row>
          <v-col v-for="(proj, index) in projects" cols="12">
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-title @click="filterProjectById(index)">
                  {{ proj.name }}
                  <v-spacer></v-spacer>
                  <v-btn :color="'primary'">
                    TECH RADAR
                  </v-btn>
                  
                </v-expansion-panel-title>
                <v-expansion-panel-text elevation="0">
                  <v-row >
                    <v-col cols="3" lg="3" v-for="(item) in stacks">
                      <default-card
                        title="Stack utilizada"
                        :value="item.stackName"
                      />
                    </v-col>
                  </v-row>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Stack } from '../../entities/stack';
import DefaultCard from '../../../../components/default-card/default-card.component.vue';
import { Project } from '../../../project/entities/project';
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
      stackService: new StackService(inject(HTTP_CLIENT) as HttpClient),
      projectService: new ProjectService(inject(HTTP_CLIENT) as HttpClient),
      showDialogAnalytic: false,
      selectedProject: 0,
      stacks: [] as Stack[],
      projects: [] as Project[],
      projectsNames: [] as Project[]
    };
  },
  methods: {
    async filterProjectById(id:number) {
      const specificProjectId = this.projects.find((project, index) => index === id)
      const response = await this.stackService.getLanguageByProjectId(specificProjectId!.id)
      console.log(response);
      this.stacks = response
    },
    async getAllProjects() {
      const allProject = await this.projectService.getAllProjects()
      console.log(this.projectsNames);
      
      this.projects = allProject
      this.projectsNames = allProject
      allProject.map((item, index) => {
        this.selectedProject = index
      })
    }
  },
  created() {
    this.getAllProjects()
  },
}
</script>
