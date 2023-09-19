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
              v-model="selectedMonth"
              inline
              @change="filterByMonth"
            >
              <v-radio
                class="ml-2"
                color="primary"
                v-for="(item, index) in months"
                :key="index"
                :label="item"
                :value="index"
              ></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="evaluation in evaluationsAnalytics" cols="12">
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-title>
                  {{ evaluation }}
                  <v-spacer></v-spacer>

                  <v-chip :color="evaluation ? 'success' : 'danger'">
                    {{ "evaluation" }}
                  </v-chip>
                </v-expansion-panel-title>

                <v-expansion-panel-text elevation="0">
                  <v-row>
                    <v-col cols="12" lg="3">
                      <default-card
                        title="Nota em processos"
                        :value="evaluation"
                      />
                    </v-col>
                    <v-col cols="12" lg="3">
                      <default-card
                        title="Nota em métricas"
                        :value="evaluation.stackName"
                      />
                    </v-col>
                    <v-col cols="12" lg="3">
                      <default-card
                        title="HealthScore"
                        :value="evaluation.stackId"
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
  import StackProjectExpandedDialog from './stack-project-expanded.dialog.vue';
  import { StackService } from '../../services/stack.service'; 
import { inject } from 'vue';
import { HTTP_CLIENT, HttpClient } from '../../../../infra/http/http';

  export default {
    components: {
      DefaultCard,
      StackProjectExpandedDialog,
    },
    props: {
      evaluationsAnalytics: {
        type: Array as () => Stack[],
        required: true,
        default: () => [],
      },
    },
    data() {
      return {
        stackService: new StackService(inject(HTTP_CLIENT) as HttpClient),
        showDialogAnalytic: false,
        selectedMonth: new Date().getMonth(),
        months: [
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro',
        ],
        stacks: {}
      };
    },
    methods: {
      openDialog() {
        this.showDialogAnalytic = true;
      },
      filterByMonth() {
        this.$emit('filter-by-month', this.selectedMonth);
      },
      async getAllProjects() {
        this.stacks = await this.stackService.getAllProjects()
        console.log(this.stacks);
        
      },
    },
    created() {
      this.getAllProjects()
    },
  };
</script>
