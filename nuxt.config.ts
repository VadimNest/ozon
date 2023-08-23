// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },
  css: ['~/assets/styles/main.less'],
  ssr: true,
  modules: ['@pinia/nuxt'],
  runtimeConfig: {
    public: {
      yandexAPI: process.env.YANDEX_API,
    },
  },
});
