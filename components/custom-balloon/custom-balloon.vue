<template>
  <div class="custom-balloon">
    <div class="custom-balloon__default" v-if="step === 1">
      <h2 class="custom-balloon__title">Пункт Ozon</h2>
      <p class="custom-balloon__description">
        {{ point.address }}
      </p>
      <button class="custom-balloon__controll" @click="step = 2">
        Подробнее
      </button>
    </div>

    <div class="custom-balloon__details" v-if="step === 2">
      <h2 class="custom-balloon__details-title">Пункт Ozon</h2>
      <span class="custom-balloon__details-subtitle">
        <img
          src="icons/marker.svg"
          alt="marker"
          class="custom-balloon__details-icon"
        />
        {{ point.address }}
      </span>
      <p
        class="custom-balloon__details-description"
        v-html="point.description"
      />
      <!-- <span class="custom-balloon__details-label">До встречи на Ozon!</span> -->

      <div class="custom-balloon__images-wrapper" v-if="point.images.length">
        <ul class="custom-balloon__images-list">
          <li
            class="custom-balloon__image-item"
            v-for="image in point.images"
            :key="image"
          >
            <img :src="image.url" alt="office" class="custom-balloon__image" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
let step = ref(1);

const props = defineProps({
  point: Object,
});
</script>

<style lang="less" src="./custom-balloon.less" />
