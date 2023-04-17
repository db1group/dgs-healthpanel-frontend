const LeadEngineer = () => import('./lead-engineer.vue');
const LeadEngineerList = () =>
  import('./components/list/lead-engineer-list.component.vue');
const LeadEngineerForm = () =>
  import('./components/form/lead-engineer-form.component.vue');

const routes = [
  {
    path: '/lead-engineer',
    component: LeadEngineer,
    children: [
      { path: '', name: 'lead-engineer-list', component: LeadEngineerList },
      {
        path: 'cadastrar',
        name: 'lead-engineer-create',
        component: LeadEngineerForm,
      },
      {
        path: 'editar/:id',
        name: 'lead-engineer-edit',
        component: LeadEngineerForm,
      },
    ],
  },
];
export default routes;
