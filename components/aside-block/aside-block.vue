<template>
  <aside class="aside-block">
    <ul class="aside-block__list">
      <li class="aside-block__item" v-for="item in 10" :key="item">
        <h2 class="aside-block__title">Пункт Ozon</h2>
        <h3 class="aside-block__subtitle">
          Россия, Ставрополь, Тюльпановая улица, 10к3
        </h3>
        <button class="aside-block__controll">Самовывоз</button>
      </li>
    </ul>
  </aside>
</template>

<script setup></script>

<style lang="less" src="./aside-block.less" />
