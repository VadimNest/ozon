import { defineStore } from 'pinia'
import axios from 'axios'

export const useMapStore = defineStore('map',
  {
    state: () => ({
      mapConfig: {
        zoom: 12,
        coordinates: [45.043317, 41.96911],
      }
    }),

    getters: {
      g_getMapConfig(state) {
        return state.mapConfig;
      },
    },

    actions: {
      a_setCoords(coordinates) {
        this.mapConfig.coordinates = coordinates;
        // this.mapConfig.zoom = 18;
      }
    },
  })
