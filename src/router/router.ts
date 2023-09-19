import { createRouter, createWebHistory } from 'vue-router';
import Form from '../modules/health-panel-process/health-panel-process.component.vue';
import Report from '../modules/report/report.vue';
import Ranking from '../modules/ranking/ranking.vue';
import HealthPanelBI from '../modules/health-panel-chart/health-panel-bi.vue';
import projectModule from '../modules/project/router';
import techLeadModule from '../modules/techlead/router';
import Stack from '../modules/stacks/stack-project.vue';
import stackModule from '../modules/stacks/router';

const routes = [
  { name: 'form', path: '/', component: Form },
  { name: 'report', path: '/relatorio', component: Report },
  { name: 'ranking', path: '/ranking', component: Ranking },
  {
    name: 'health-panel-bi',
    path: '/painel-de-saude',
    component: HealthPanelBI,
  },
  { name: 'stacks', path: '/stacks', component: Stack },
];

export const router = createRouter({
  history: createWebHistory(),
  routes: [...routes, ...projectModule, ...techLeadModule, ...stackModule],
});
