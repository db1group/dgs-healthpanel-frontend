<template>
	<div class="stack">
		<v-card>
			<v-card-title> Relatório de stacks utilizadas </v-card-title>
			<v-card-text>
				<v-card-text>Selecione o projeto para filtrar, caso queira.</v-card-text>
				<v-row justify="end">
					<v-col cols="12">
						<v-radio-group
							v-model="selectedProjectIndexArray"
							inline
							@change="getProjectSelected(selectedProjectIndexArray)"
						>
							<v-radio
								class="ml-2"
								color="primary"
								v-for="(item, index) in projectsNames"
								:key="index"
								:label="item.name"
								:value="index"
							></v-radio>
						</v-radio-group>
					</v-col>
				</v-row>
				<v-expansion-panels variant="popout" cols="12">
						<v-expansion-panel v-for="(proj, index) in projects" :key="index">
							<v-col v-if="selectedProjectIndexArray === index || selectedProjectIndexArray === null" >
									<v-expansion-panel-title @click="getProjectSelected(index)">
										{{ proj.name }}
										<v-spacer></v-spacer>
										<v-btn :color="'primary'">
											TECH RADAR
										</v-btn>
									</v-expansion-panel-title>
									<v-expansion-panel-text align="center" elevation="0">
										<v-row class="d-flex" >
											<v-col justify="space-between" cols="2" lg="2" v-for="(item, stackIndex) in stacks">
												<default-card
													title="Stack Utilizada"
													:value="item.stackName"
												/>
												<v-btn @click="removeStack(proj.id, stackIndex, index)" :color="'red'">Remove</v-btn>
											</v-col>
											<v-col cols="2">
												<v-text-field v-model="newStack" label="Nova Stack"></v-text-field>
												<v-btn :color="'green'">Adicionar</v-btn>
											</v-col>
										</v-row>
									</v-expansion-panel-text>
							</v-col>
						</v-expansion-panel>
				</v-expansion-panels>
			</v-card-text>
		</v-card>
	</div>
</template>

<script lang="ts">
import { Stack } from '../../entities/stack';
import DefaultCard from '../../../../components/default-card/default-card.component.vue';
import { Project } from '../../../project/entities/project';
import { StackService } from '../../services/stack.service'; 
import { inject } from 'vue';
import { ProjectService } from '../../../project/services/project.service';
import { HTTP_CLIENT, HttpClient } from '../../../../infra/http/http';

export default {
	components: {
		DefaultCard,
	},
	
	data() {
		return {
			stackService: new StackService(inject(HTTP_CLIENT) as HttpClient),
			projectService: new ProjectService(inject(HTTP_CLIENT) as HttpClient),
			selectedProjectIndexArray: null,
			stacks: [] as Stack[],
			projects: [] as Project[],
			projectsNames: [] as Project[],
			newStack: '',
		};
	},
	methods: {
		async getAllProjects() {
			const allProject = await this.projectService.getAllProjects();
			this.projects = allProject;
			this.projectsNames = allProject;
		},
		async filterProjectById(id:number) {
			const specificProjectId = this.projects.find((project, index) => index === id);
			return this.stackService.getLanguageByProjectId(specificProjectId!.id);
		},
		async getProjectSelected(id:number) {
			const response = await this.filterProjectById(id);
			this.stacks = response;
		},
		addStack(projectIndex: {}) {
      if (this.newStack.trim() !== '') {
        this.projects[projectIndex].stacks.push({ stackName: this.newStack });
        this.newStack = '';
      }
    },
		async removeStack(projectId: string, stackIndex: number, projectIndex:number) {
			this.stacks.splice(stackIndex, 1)
			const stackIdArray: string[] = []
			this.stacks.map((stack) => {
				stackIdArray.push(stack.stackId);
			})
			const stackId = {
				"stacksId": stackIdArray
			}
			await this.stackService.updateStackByProject(projectId, stackId);
			await this.getProjectSelected(projectIndex)
    },
	},
	created() {
		this.getAllProjects()
	},
}
</script>
