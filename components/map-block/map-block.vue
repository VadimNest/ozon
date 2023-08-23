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

let mapConfig = computed(() => store.g_getMapConfig);

const activePoint = ref(0);

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
  marker.value.forEach((item) => {
    if (item.properties._data.markerId.includes(point.id))
      item.options.set({
        iconImageHref: '/icons/active-marker.svg',
      });
    else
      item.options.set({
        iconImageHref: '/icons/marker.svg',
      });
  });

  activePoint.value = point.id;
  store.a_setCoords(getCoords(point.coordinates));
};
</script>

<style lang="less" src="./map-block.less" />
