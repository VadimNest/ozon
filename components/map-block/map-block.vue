<template>
  <div class="map-block">
    <ClientOnly>
      <YandexMap
        class="map-block__content"
        :settings="settings"
        :zoom="mapConfig.zoom"
        :coordinates="mapConfig.coordinates"
        :controls="[]"
      >
        <YandexClusterer :options="{ preset: 'islands#nightClusterIcons' }">
          <YandexMarker
            @click="сlickMarker(point)"
            v-for="point in points"
            :key="`1-marker-${point.id}`"
            :coordinates="getCoords(point.coordinates)"
            :marker-id="`1-marker-${point.id}`"
            :options="{
              iconLayout: 'default#image',
              iconImageHref: '/icons/marker.svg',
              hideIconOnBalloonOpen: false,
              // iconColor: 'red',
              // fillColor: 'red',
              // fill: true,
            }"
          >
            <template #component>
              <!-- v-model="name" -->
              <CustomBalloon :point="point" />
            </template>
          </YandexMarker>
        </YandexClusterer>
      </YandexMap>
    </ClientOnly>
  </div>
</template>

<script setup>
import { YandexMap, YandexClusterer, YandexMarker } from 'vue-yandex-maps';

const props = defineProps({
  points: Array,
});

const runtimeConfig = useRuntimeConfig();

const mapConfig = reactive({
  zoom: 12,
  coordinates: [45.043317, 41.96911],
});

const settings = {
  apiKey: runtimeConfig.yandexAPI,
  lang: 'ru_RU',
  coordorder: 'latlong',
  debug: false,
  version: '2.1',
};

const getCoords = (coords) => {
  return [coords.latitude, coords.longitude];
};

const сlickMarker = (point) => {
  mapConfig.coordinates = getCoords(point.coordinates);
};
</script>

<style lang="less" src="./map-block.less" />
