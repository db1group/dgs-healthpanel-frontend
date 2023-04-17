<template>
  <div class="health-panel-process">
    <apresentation-dialog @input="setProject" :value="showDialog" />

    <section class="health-panel-process__theme" v-for="theme in healthProcess">
      <header class="health-panel-process__theme-title">
        {{ theme.title }}
      </header>
      <health-panel-columns-component
        v-for="(item, index) in theme.columns"
        :class="`a${index + 1}`"
        :column="item"
      />
    </section>
    <v-card v-if="healthProcess.length">
      <v-card-actions class="my-5">
        <v-row justify="center">
          <v-col cols="12" lg="4">
            <v-btn
              block
              size="large"
              variant="outlined"
              color="primary"
              @click="sendForm()"
              >Enviar form</v-btn
            >
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import { inject } from 'vue';
import { HttpClient, HTTP_CLIENT } from '../../infra/http/http';
import { HealthPanel } from './domain/health-panel';
import { GetQuestionsService } from './services/get-questions.service';
import HealthPanelColumnsComponent from './components/health-panel-columns.component.vue';

import { SaveFormService } from './services/save-form.service';
import ApresentationDialog from '../../components/apresentation-dialog/apresentation.dialog.vue';
import { HealthPanelProcess } from './domain/health-panel-process';

export default {
  components: {
    HealthPanelColumnsComponent,
    ApresentationDialog,
  },
  data() {
    return {
      saveFormService: new SaveFormService(inject(HTTP_CLIENT) as HttpClient),
      getQuestionService: new GetQuestionsService(
        inject(HTTP_CLIENT) as HttpClient,
      ),
      project: '',
      showDialog: false,
      healthPanelProcess: new HealthPanel(),
    };
  },
  computed: {
    healthProcess() {
      return this.healthPanelProcess.process.sort(
        (a: HealthPanelProcess, b: HealthPanelProcess) => {
          return a.order - b.order;
        },
      );
    },
  },
  methods: {
    async setProject(projectData: string) {
      this.$loader.open();
      this.showDialog = false;
      this.project = projectData;

      await this.getQuestions();
      this.$loader.close();
    },
    getQuestions() {
      return this.getQuestionService.execute(this.project).then((response) => {
        this.healthPanelProcess = new HealthPanel(response, this.project);
      });
    },
    sendForm() {
      this.saveFormService.execute(this.healthPanelProcess).then((response) => {
        console.log(response);
      });
    },
  },
  created() {
    this.showDialog = true;
  },
};
</script>

<style lang="sass">
.health-panel-process
  width: 100%
  min-height: 100vh
  &__theme
    display: flex
    flex-wrap: wrap
    padding: 30px 0px
    border-bottom: 1px solid #fff
  &__header
    position: sticky
    top: 0
    z-index: 10
  &__theme-title
    font-size: 28px
    font-weight: 700
    text-align: center
    width: 100%


.a1
  margin-top: 60px
.a2
  margin-top: 40px
.a3
  margin-top: 30px
.a4
  margin-top: 20px
.a5
  margin-top: 0px
</style>
