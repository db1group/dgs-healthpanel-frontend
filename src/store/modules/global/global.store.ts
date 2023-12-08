import { defineStore } from 'pinia';
import { Project } from '../../../modules/project/entities/project';

export const applicationGlobalStore = defineStore('global', {
  state: () => ({
    project: new Project(),
    locale: 'pt',
  }),
  getters: {},
  actions: {
    setProject(project: Project) {
      this.project = project;
    },
    setProjectName(projectName: string) {
      this.project.name = projectName;
    },
  },
});
