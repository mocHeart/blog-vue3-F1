<template>
  <router-link to="/talks" class="swiper-container">
    <v-icon color="#4c4948" icon="mdi-chat-outline" />
    <div
      :style="{ height: height * lineNum + 'px' }"
      class="rollScreen_container"
    >
      <ul
        class="rollScreen_list"
        :style="{ transform: transform }"
        :class="{ rollScreen_list_unanim: num === 0 }"
      >
        <li
          v-for="(item, index) in list"
          :key="index"
          :style="{ height: height + 'px' }"
        >
          <span class="item" v-html="item" />
        </li>
      </ul>
    </div>
    <v-icon class="arrow" color="#4c4948" icon="mdi-chevron-double-right" />
  </router-link>
</template>

<script setup lang="ts" name="Swiper">
import { computed, ref } from "vue";

let { height, lineNum, list } = withDefaults(
  // 参数一：定义props类型：? 代表非必传字段， :号后面紧跟的是数据类型或自定义接口， | 或多种类型
  defineProps<{
    height?: number;
    lineNum?: number;
    list?: string[] | any;
  }>(),
  // 参数二：指定非必传字段的默认值
  {
    height: 25,
    lineNum: 1,
  }
);

let num = ref(0);
let transform = computed(() => {
  return "translateY(-" + num.value * height + "px)";
});

setInterval(() => {
  if (num.value !== list.length - 1) {
    num.value++;
  } else {
    num.value = 0;
  }
}, 3000);
</script>

<style scoped lang="scss">
// 向右的箭头图标慢慢向右淡出的动画
@keyframes passing {
  0% {
    transform: translateX(-50%);
    opacity: 0;
  }
  50% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(50%);
    opacity: 0;
  }
}

.swiper-container {
  padding: 0.6rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  .rollScreen_container {
    width: 100%;
    line-height: 25px;
    text-align: center;
    display: inline-block;
    position: relative;
    overflow: hidden;
    .rollScreen_list_unanim {
      transition: none;
    }
    .rollScreen_list {
      transition: 1s linear;
      .item {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        transition: all 0.3s;
        color: #4c4948;
      }
    }
  }
  .arrow {
    animation: 2s passing infinite;
  }
}
</style>
