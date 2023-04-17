const Project = () => import('./project.vue');
const ProjectList = () =>
  import('./components/list/project-list.component.vue');
const ProjectForm = () =>
  import('./components/form/project-form.component.vue');

const routes = [
  {
    path: '/projetos',
    component: Project,
    children: [
      { path: '', name: 'project-list', component: ProjectList },
      {
        path: 'cadastrar',
        name: 'project-create',
        component: ProjectForm,
      },
      {
        path: 'editar/:id',
        name: 'project-edit',
        component: ProjectForm,
      },
    ],
  },
];
export default routes;
