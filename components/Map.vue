<template>
  <div class="map__wrapper">
    <!-- <yandex-map
      map-type="map"
      :zoom="yandexConfig.zoom"
      :coords="yandexConfig.activeCoords"
      :settings="yandexConfig.settings"
      :contextmenu="false"
      ymap-class="map-block__map"
      @map-was-initialized="initHandler"
      :controls="[]"
    > -->
    <!-- </yandex-map> -->
    <ClientOnly>
      <YandexMap
        :settings="settings"
        :coordinates="[32, 50]"
        class="map__content"
      >
        <!--Markers-->
      </YandexMap>
    </ClientOnly>
  </div>
</template>

<script setup>
import { YandexMap, YandexMarker } from 'vue-yandex-maps';

onMounted(async () => {
  // await loadYmap({ debug: true });
});

const runtimeConfig = useRuntimeConfig();

const yandexConfig = {
  _map: '',
  zoom: 17,
  activeCoords: [55.664868, 37.75302],
};

// enterprise: false,
const settings = {
  apiKey: runtimeConfig.yandexAPI,
  lang: 'ru_RU',
  coordorder: 'latlong', // Порядок задания географических координат
  debug: false, // Режим отладки
  version: '2.1', // Версия Я.Карт
};

const initHandler = (map) => {
  yandexConfig._map = map;
  drawPoint();
};
const drawPoint = (item) => {
  const placemark = new ymaps.Placemark(
    [55.664268, 37.75302],
    { item: item },
    {
      iconLayout: 'default#image',
      iconImageHref: './images/icons/maps-marker.svg',
    }
  );
  yandexConfig._map.geoObjects.add(placemark);
};
</script>

<style>
.map__content {
  width: 100vw;
  height: 100vh;
}
</style>
