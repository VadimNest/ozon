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
            :key="`1-marker-${point.id}-${
              point.id == activePoint ? 'active' : 'inactive'
            }`"
            :coordinates="getCoords(point.coordinates)"
            :marker-id="`1-marker-${point.id}`"
            :options="{
              iconLayout: 'default#image',
              hideIconOnBalloonOpen: false,
              iconImageHref: getOptions(point),
              cursor: 'pointer',
              openBalloonOnClick: false,
            }"
          >
            <template #component>
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

const activePoint = ref(0);

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
  activePoint.value = point.id;
  mapConfig.coordinates = getCoords(point.coordinates);
};

const getOptions = (point) => {
  let value =
    point.id == activePoint.value
      ? '/icons/active-marker.svg'
      : '/icons/marker.svg';
  return value;
};
</script>

<style lang="less" src="./map-block.less" />
