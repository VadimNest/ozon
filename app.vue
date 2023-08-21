<template>
  <div class="app">
    <MapBlock :points="points" />
    <AsideBlock :points="points" />
  </div>
</template>

<script setup>
onMounted(async () => {
  points.value = await $fetch('http://localhost:3000/points');
});

let points = ref();
</script>

<style lang="less">
.app {
  position: relative;
}
</style>
