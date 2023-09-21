<template>
	<div class="stack">
		<v-card>
			<v-card-title> Relatório de stacks utilizadas </v-card-title>
			<v-card-text>
				<v-card-text>Selecione o projeto para filtrar, caso queira.</v-card-text>
				<v-row justify="end">
					<v-select 
						width="50%"
						class="ml-2"
						color="primary"
						:items="projectsNames"
						label="Projetos existentes"
						v-model="selectedProjectsNames"
						chips
						multiple
					></v-select>
				</v-row>
				<v-expansion-panels variant="popout" cols="12">
						<v-expansion-panel v-for="(proj, projIndex) in projects" :key="projIndex">
							<v-col v-if="selectedProjectsNames.includes(proj.name) || selectedProjectsNames.length === 0" >
									<v-expansion-panel-title @click="getProjectSelected(projIndex)">
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
												{{ stacks }}
												<v-btn @click="openDiolog(stackIndex)" :color="'red'">Remover</v-btn>
												<v-dialog
													v-model="dialog"
													width="auto"
												>
													<v-card>
														<v-card-text>
															Excluir stack do projeto {{ proj.name }}?
														</v-card-text>
														<v-card-actions>
															<v-btn color="primary" @click="dialog = !dialog">Sair</v-btn>
															<v-btn 
															color="danger" 
															@click="removeStack(proj.id, stackIndexToBeExclude)"
															>
																Excluir
															</v-btn>
														</v-card-actions>
													</v-card>
												</v-dialog>
											</v-col>
											<v-col cols="2">
												<v-select 
													:items=sonarStacksNames 
													:error=alreadyInProject 
													v-model="newStack" 
													label="Nova Stack">
												</v-select>
												<v-btn 
													@click="addStack(proj.id, projIndex)" 
													:color="'green'">
													Adicionar
												</v-btn>
												<v-card-text v-if="alreadyInProject">Stack ja cadastrada</v-card-text>
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
			stacks: [] as Stack[],
			projects: [] as Project[],
			projectsNames: [] as string[],
			selectedProjectsNames: [] as string[],
			newStack: '',
			sonarStacksNames: [] as string[],
			sonarStacksList: [] as Stack[],
			stackList: [] as string[],
			dialog: false,
			stackIndexToBeExclude: undefined || 0,
			alreadyInProject: false
		};
	},
	methods: {
		async getAllProjects() {
			const allProject = await this.projectService.getAllProjects();
			this.projects = allProject;
			allProject.map(proj => this.projectsNames.push(proj.name))
		},
		async filterProjectById(id:number) {
			const specificProjectId = this.projects.find((project, index) => index === id);
			return this.stackService.getLanguageByProjectId(specificProjectId!.id);
		},
		async getProjectSelected(id:number) {
			const response = await this.filterProjectById(id);
			this.stacks = response;
		},
		async addStack(projectId: string, projectIndex:number) {
			this.sonarStacksList.map((item) => {
				if(item.stackName === this.newStack) {
					this.newStack = item.stackId
				}
			})
			const stackToInclude = {
				projectId,
				StackId: this.newStack
			}
			try {
				await this.stackService.addStacks(stackToInclude);
			} catch (error) {
				return this.alreadyInProject = true
			}
			await this.getProjectSelected(projectIndex);
			this.alreadyInProject = false
			this.newStack = '';
		},
		async consultStackFromSonar() {
			this.sonarStacksList = await this.stackService.updateStackSonar();			
			this.stackList = Object.values(this.sonarStacksList);			
			this.sonarStacksNames = this.stackList.map(obj => Object.values(obj)[1]).sort();     		 
    	},
		async removeStack(projectId: string, stackIndex: number) {
			this.dialog = false
			this.stacks.splice(stackIndex, 1)
			const stacksId: string[] = [];
			this.stacks.map((stack) => {
				stacksId.push(stack.stackId);
			})
			const stackId = {
				projectId,
				stacksId
			};
			await this.stackService.updateStackByProject(projectId, stackId);
			this.newStack = '';	
    	},
		openDiolog(stackIndex: number) {
			this.dialog = true
			this.stackIndexToBeExclude = stackIndex
		}
	},
	created() {
		this.consultStackFromSonar();
		this.getAllProjects();
	},
}
</script>
