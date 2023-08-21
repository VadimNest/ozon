<template>
  <div class="map-block__wrapper">
    <ClientOnly>
      <YandexMap
        class="map-block__content"
        :settings="settings"
        :zoom="mapConfig.zoom"
        :coordinates="mapConfig.coordinates"
      >
        <!--Markers-->
      </YandexMap>
    </ClientOnly>
  </div>
</template>

<script setup>
import { YandexMap, YandexMarker } from 'vue-yandex-maps';

onMounted(async () => {});

const runtimeConfig = useRuntimeConfig();

// enterprise: false,
const mapConfig = {
  zoom: 13,
  coordinates: [43.019857, 44.680068],
};
const settings = {
  apiKey: runtimeConfig.yandexAPI,
  lang: 'ru_RU',
  coordorder: 'latlong', // Порядок задания географических координат
  debug: false, // Режим отладки
  version: '2.1',
};
</script>

<style lang="less" src="./map-block.less" />
