<template>
  <div class="stack">
    <stackProject-expanded-dialog
      v-model="showDialogAnalytic"
      :evaluationsAnalytics="evaluationsAnalytics"
    />
    <v-card>
      <v-card-title> Relatório analítico </v-card-title>
      <v-card-text>
        <v-row justify="end">
          <v-col cols="12" lg="3" class="text-right">
            <v-btn color="primary" @click="openDialog"
              >Relatório completo</v-btn
            >
          </v-col>
          <v-col cols="12">
            <v-radio-group
              v-model="selectedProject"
              inline
            >
              <v-radio
                class="ml-2"
                color="primary"
                v-for="(item, index) in projects"
                :key="index"
                :label="item.name"
                :value="index"
              ></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>

        <v-row>
          <v-col v-for="proj in projects" cols="12">
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-title>
                  {{ proj.name }}
                  <v-spacer></v-spacer>
                </v-expansion-panel-title>

                <v-expansion-panel-text elevation="0">
                  <v-row>
                    <v-col cols="12" lg="3">
                      <default-card
                        title="Nota em métricas"
                        :value="proj.name"
                      />
                    </v-col>
                    <v-col cols="12" lg="3">
                      <default-card
                        title="HealthScore"
                        :value="proj.leads"
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
import StackProjectExpandedDialog from './stack-project-expanded.dialog.vue';
import { StackService } from '../../services/stack.service'; 
import { inject } from 'vue';
import { ProjectService } from '../../../project/services/project.service';
import { HTTP_CLIENT, HttpClient } from '../../../../infra/http/http';

export default {
  components: {
    DefaultCard,
    StackProjectExpandedDialog,
  },
  props: {
    evaluationsAnalytics: {
      type: Array as () => Project[],
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      stackService: new StackService(inject(HTTP_CLIENT) as HttpClient),
      projectService: new ProjectService(inject(HTTP_CLIENT) as HttpClient),
      showDialogAnalytic: false,
      selectedProject: undefined,
      stacks: [] as Stack[],
      projects: [] as Project[]
    };
  },
  methods: {
    openDialog() {
      this.showDialogAnalytic = true;
    },
    getProjectName() {
      ;
    },
    async getAllLanguage() {
      this.stacks = await this.stackService.getAllLanguages()
      console.log(this.stacks);
    },
    async getAllProjects() {
      this.projects = await this.projectService.getAllProjects()
      console.log(this.projects);
    }
  },
  created() {
    this.getAllProjects()
  },
}
</script>
