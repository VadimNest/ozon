<template>
  <div class="map-block__wrapper">
    <ClientOnly>
      <YandexMap
        class="map-block__content"
        :settings="settings"
        :zoom="mapConfig.zoom"
        :coordinates="mapConfig.coordinates"
      >
        <YandexClusterer :options="{ preset: 'islands#nightClusterIcons' }">
          <YandexMarker
            v-for="point in points"
            :key="`1-marker-${point.id}`"
            :coordinates="getCoords(point.coordinates)"
            :marker-id="`1-marker-${point.id}`"
            :options="{
              iconLayout: 'default#image',
              iconImageHref: '/icons/marker.svg',
            }"
          />
        </YandexClusterer>
      </YandexMap>
    </ClientOnly>
  </div>
</template>

<script setup>
import { YandexMap, YandexClusterer, YandexMarker } from 'vue-yandex-maps';

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

const getCoords = (coords) => {
  return [coords.latitude, coords.longitude];
};
</script>

<style lang="less" src="./map-block.less" />
