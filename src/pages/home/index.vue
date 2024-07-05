<template>
  <div>
    HOME
    <div class="topMargin"></div>
    <div v-for="item of 50" :key="item">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
