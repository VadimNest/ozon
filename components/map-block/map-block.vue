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

onMounted(async () => {
  points.value = await $fetch('http://localhost:3000/points');
});

let points = ref();
const runtimeConfig = useRuntimeConfig();

const mapConfig = {
  zoom: 12,
  coordinates: [45.043317, 41.96911],
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
