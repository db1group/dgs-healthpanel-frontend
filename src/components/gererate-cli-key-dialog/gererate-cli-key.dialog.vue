<template>
  <v-dialog persistent :model-value="modelValue" @input="close" width="600">
    <v-card>
      <v-card-title>
        {{ $t('generateCliDialog.title') }}
      </v-card-title>

      <v-card-text>
        <v-row align="center">
          <v-col cols="12">
            <p>
              {{ $t('generateCliDialog.message') }}
            </p>
          </v-col>
          <v-col cols="12">
            <v-banner v-if="key" lines="one" icon="mdi-key" color="info">
              <template v-slot:text> {{ key }}</template>

              <template v-slot:actions>
                <v-btn
                  color="success"
                  variant="outlined"
                  icon
                  size="small"
                  @click="copyKey"
                >
                  <v-icon> mdi-content-copy </v-icon>
                </v-btn>
              </template>
            </v-banner>
          </v-col>
          <v-col cols="12" lg="12" class="text-center">
            <v-btn
              v-if="showBtnGenerateKey"
              color="success"
              @click="generateKey"
            >
              <v-icon start> mdi-key </v-icon>
              {{ $t('generateCliDialog.buttonGenerate') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="close">
          {{ $t('generateCliDialog.buttonClose') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { inject } from '@vue/runtime-core';
  import { GenerateKeyCliService } from './generate-key-cli.service';
  import { HTTP_CLIENT, HttpClient } from '../../infra/http/http';
  import { applicationGlobalStore } from '../../store/modules/global/global.store';
  import { authStore } from '../../store/modules/auth/auth-store';

  export default defineComponent({
    props: {
      text: {
        type: String,
        default: () => 'Tem certeza que deseja excluir?',
      },
      modelValue: {
        type: Boolean,
        default: () => false,
        required: true,
      },
    },
    data() {
      return {
        key: '',
        httpService: inject(HTTP_CLIENT) as HttpClient,
        globaStore: applicationGlobalStore(),
        userStore: authStore(),
      };
    },
    methods: {
      copyKey() {
        navigator.clipboard.writeText(this.key).then(() => {
          this.$snackbar.open({
            text: 'Chave copiada com sucesso',
            color: 'success',
            buttonColor: 'white',
          });
        });
      },
      generateKey() {
        const project = this.globaStore.project.id;
        const generateKeyCliService = new GenerateKeyCliService(
          this.httpService,
        );
        generateKeyCliService
          .generateKey(project)
          .then((key: string) => {
            this.key = key;
          })
          .catch((error) => {
            console.log(error);
            this.$snackbar.open({
              text: error.response.data.message,
              color: 'error',
              buttonColor: 'white',
            });
          });
      },
      removeItem() {
        this.$emit('remove');
      },
      close() {
        this.$emit('update:modelValue', false);
      },
    },
    computed: {
      showBtnGenerateKey() {
        return !this.key;
      },
    },
  });
</script>
