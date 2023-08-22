<template>
  <aside class="aside-block">
    <ul class="aside-block__list">
      <li
        class="aside-block__item"
        v-for="point in points"
        :key="point.id"
        @click="сlickMarker(point)"
      >
        <h2 class="aside-block__title">Пункт Ozon</h2>
        <h3 class="aside-block__subtitle">
          {{ point.address }}
        </h3>
        <button class="aside-block__controll">Самовывоз</button>
      </li>
    </ul>
  </aside>
</template>

<script setup>
const props = defineProps({
  points: Array,
});
</script>

<style lang="less" src="./aside-block.less" />
