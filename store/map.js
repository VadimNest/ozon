import { defineStore } from 'pinia'

export const useMapStore = defineStore('map', () => {
  const state = ref({
    mapConfig: {
      zoom: 12,
      coordinates: [45.043317, 41.96911],
    },
    activePoint: 0,
  });

  //actions
  function a_setCoords(coordinates) {
    state.value.mapConfig.coordinates = coordinates;
    state.value.mapConfig.zoom = 18;
  };

  function a_setActivePoint(id) {
    state.value.activePoint = id;
  }

  // getters
  const g_getMapConfig = computed(() => state.value.mapConfig);
  const g_getActivePoint = computed(() => state.value.activePoint);

  return {
    state,
    a_setCoords,
    a_setActivePoint,
    g_getMapConfig,
    g_getActivePoint
  }
});
