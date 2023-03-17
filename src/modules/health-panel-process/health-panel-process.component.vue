<template>
  <div class="health-panel-process">
    <!-- <sidebar-component :drawer="drawer" @input="drawer = !drawer" /> -->
    <v-toolbar>
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>Painel de saúde 2.0 {{ drawer }}</v-toolbar-title>
      <v-row justify="end" align="center">
        <v-col cols="6">
          <v-select
            hide-details
            v-model="currentMonth"
            density="compact"
            max-width="200px"
            placeholder="Mês de competência"
            label="Mês de competência"
            :items="months"
            item-title="text"
            background-color="transparent"
            variant="outlined"
            ro
            item-value="value"
          />
        </v-col>
      </v-row>
    </v-toolbar>
    <section
      class="health-panel-process__theme"
      v-for="theme in healthPanelProcess.process"
    >
      <header class="health-panel-process__theme-title">
        {{ theme.title }}
      </header>
      <health-panel-columns-component
        v-for="(item, index) in theme.columns"
        :class="`a${index + 1}`"
        :column="item"
      />
    </section>
  </div>
</template>

<script lang="ts">
import { reactive, inject, onMounted } from 'vue';
import { HttpClient, HTTP_CLIENT } from '../../infra/http/http';
import { HealthPanel } from './domain/health-panel';
import { GetQuestionsService } from './services/get-questions.service';
import HealthPanelColumnsComponent from './components/health-panel-columns.component.vue';
import SidebarComponent from '../../components/sidebar/sidebar.component.vue';
export default {
  components: {
    HealthPanelColumnsComponent,
    SidebarComponent,
  },
  data() {
    return {
      drawer: false,
      currentMonth: new Date().getMonth() + 1,
      healthPanelProcess: new HealthPanel(),
      months: [
        { text: 'Janeiro', value: 1 },
        { text: 'Fevereiro', value: 2 },
        { text: 'Março', value: 3 },
        { text: 'Abril', value: 4 },
        { text: 'Maio', value: 5 },
        { text: 'Junho', value: 6 },
        { text: 'Julho', value: 7 },
        { text: 'Agosto', value: 8 },
        { text: 'Setembro', value: 9 },
        { text: 'Outubro', value: 10 },
        { text: 'Novembro', value: 11 },
        { text: 'Dezembro', value: 12 },
      ],
    };
  },
  methods: {
    getQuestions() {
      const httpService = inject(HTTP_CLIENT) as HttpClient;
      const getQuestionService = new GetQuestionsService(httpService);
      getQuestionService.execute().then((response) => {
        this.healthPanelProcess = new HealthPanel(response);
      });
    },
  },

  created() {
    this.getQuestions();
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
    width: 100%
    text-align: center
    padding: 10px
    position: sticky
    height: 80px
    top: 0
    display: flex
    background: var(--backgroud-color)
    transition: 0.2s
    z-index: 1
    border-bottom: 1px solid #babaca
    justify-content: space-between

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
