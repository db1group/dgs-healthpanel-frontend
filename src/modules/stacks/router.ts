const StackProject = () => import('./stack-project.vue');
const StackProjectList = () =>
  import('./components/stacks/stack-project.component.vue');

const routes = [
  {
    path: '/stacks',
    component: StackProject,
    children: [
        { path: '', name: 'stacks-projects-list', component: StackProjectList },
    ],
  },
];
export default routes;
