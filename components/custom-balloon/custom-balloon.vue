<template>
  <div class="custom-balloon">
    <div class="custom-balloon__default" v-if="step === 1">
      <h2 class="custom-balloon__title">Пункт Ozon</h2>
      <p class="custom-balloon__description">
        Россия, Ставрополь, Тюльпановая улица, 10к3
      </p>
      <Button class="custom-balloon__controll" @click="step = 2"
        >Подробнее</Button
      >
    </div>
    <div class="custom-balloon__details" v-if="step === 2">123</div>
  </div>
</template>

<script setup>
let step = ref(1);
</script>

<style lang="less" src="./custom-balloon.less" />
