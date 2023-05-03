<template>
  <v-card>
    <v-card-title> Ranking dos projetos </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" v-for="item in items" :key="item.title">
          <v-card>
            <v-card-text>
              <v-row align="center">
                <v-col cols="1">
                  <v-row align="center" no-gutters>
                    <v-img
                      v-if="item.position <= 3"
                      max-width="100px"
                      :src="getLeadbordIcon(item.position)"
                    />
                    <div v-else>
                      <h1>
                        {{ item.position }}
                      </h1>
                    </div>

                  </v-row>
                </v-col>
                <v-col cols="4">
                  <div class="ml-4">
                    <div class="text-h5">{{ item.title }}</div>
                    <div class="text-subtitle-1 text-primary">
                      {{ item.lead }}
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

    </v-card-text>
  </v-card>
</template>

<script lang="ts">
export default {
  data: () => ({
    items: [
      {
        position: 1,
        prependAvatar: 'projects/al5.jpg',
        title: 'AL5 Bank',
        lead: 'Danilo Guinami',
      },
      {
        position: 2,
        prependAvatar: 'projects/plaenge.png',
        title: 'Plaenge',
        lead: 'Gabriel Verão',
      },
      {
        position: 3,
        prependAvatar: 'projects/omni.jpg',
        title: 'Omni Banco',
        lead: 'Fernanda Peron',
      },
      {
        position: 4,
        prependAvatar: 'projects/omni-financeira.webp',
        title: 'Omni financeira',
        lead: 'Elison Lusvardi',
      },
      {
        position: 5,
        prependAvatar: 'projects/omni-financeira.webp',
        title: 'Ebanx',
        lead: 'Yuri Silva',
      },
    ],
  }),

  methods: {
    getLeadbordIcon(position: any) {
      const icons = ['medal/gold.png', 'medal/silver.png', 'medal/bronze.png'];

      return icons[position - 1];
    },
  },
};
</script>
