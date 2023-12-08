import { defineStore } from 'pinia';
import { Project } from '../../../modules/project/entities/project';

export const authStore = defineStore('global', {
  state: () => ({
    project: new Project(),
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
