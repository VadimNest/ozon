<template>
  <div class="map-block">
    <ClientOnly>
      <YandexMap
        class="map-block__content"
        :settings="settings"
        :zoom="store.g_getMapConfig.zoom"
        :coordinates="store.g_getMapConfig.coordinates"
        :controls="[]"
      >
        <YandexClusterer :options="{ preset: 'islands#nightClusterIcons' }">
          <YandexMarker
            @click="clickMarker(point)"
            v-for="point in points"
            :key="`1-marker-${point.id}`"
            ref="marker"
            :coordinates="getCoords(point.coordinates)"
            :marker-id="`1-marker-${point.id}`"
            :options="{
              iconLayout: 'default#image',
              hideIconOnBalloonOpen: false,
              iconImageHref: '/icons/marker.svg',
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
import { useMapStore } from '@/store/map';
const store = useMapStore();
const runtimeConfig = useRuntimeConfig();

const props = defineProps({
  points: Array,
});

let activePoint = computed(() => store.g_getActivePoint);

watch(activePoint, (newValue) => {
  updateMarker(newValue);
});

const marker = ref(null);

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
const clickMarker = (point) => {
  store.a_setActivePoint(point.id);
  store.a_setCoords(getCoords(point.coordinates));
};
const updateMarker = (activeId) => {
  marker.value.forEach((item) => {
    if (
      item.properties._data.markerId.includes(activeId) &&
      activePoint != activeId
    ) {
      item.options.set({
        iconImageHref: '/icons/active-marker.svg',
      });

      item.balloon.open();
    } else
      item.options.set({
        iconImageHref: '/icons/marker.svg',
      });
  });
};
</script>

<style lang="less" src="./map-block.less" />
