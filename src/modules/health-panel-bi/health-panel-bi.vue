<template>
  <v-card>
    <v-card-title> Painel de saúde </v-card-title>
    <v-card-text>
      <iframe
        title="Engineering Health Panel"
        class="health-panel-bi"
        src="https://app.powerbi.com/reportEmbed?reportId=64e1da0a-f3e1-45e7-ba83-7b9c2ba642aa&autoAuth=true&ctid=ea47001a-3428-40f3-8ea1-86bdb1a3bc84"
        frameborder="0"
        allowFullScreen="true"
      ></iframe>
    </v-card-text>
  </v-card>
</template>

<style lang="sass">
.health-panel-bi
    width: 100%
    height: 90vh
</style>
