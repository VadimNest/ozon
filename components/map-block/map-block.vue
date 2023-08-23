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
          <!-- :key="`1-marker-${point.id}-${
            point.id == activePoint ? 'active' : 'inactive'
          }`" -->
          <YandexMarker
            @click="сlickMarker(point, i)"
            v-for="(point, i) in points"
            :key="`1-marker-${point.id}`"
            ref="marker"
            :coordinates="getCoords(point.coordinates)"
            :marker-id="`1-marker-${point.id}`"
            :options="{
              iconLayout: 'default#image',
              hideIconOnBalloonOpen: false,
              iconImageHref: `/icons/marker.svg?marker-icon-id=${point.id}'`,
              cursor: 'pointer',
              // openBalloonOnClick: false,
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
const сlickMarker = (point, i) => {
  // console.log(marker.value[i]);

  let item = marker.value.find((item) =>
    item.properties._data.markerId.includes(point.id)
  );
  // console.log(point.id);
  item.properties._data.markerId;

  // console.log(item.options._options);
  console.log(
    item.options.set({
      iconImageHref: '/icons/active-marker.svg',
    })
  );

  // setTimeout(() => {
  //   item.options._options.iconImageHref = '/icons/active-marker.svg';
  // }, 1000);
  // marker.value[i].options._options.iconImageHref = '/icons/active-marker.svg';

  activePoint.value = point.id;
  store.a_setCoords(getCoords(point.coordinates));
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
