<template>
  <v-footer>
    <div class="footer-wrap">
      <div>
        ©{{
          homeStore.indexInfo.websiteConfig?.websiteCreateTime.substring(0, 4)
        }}
        - {{ new Date().getFullYear() }} By
        {{ homeStore.indexInfo.websiteConfig?.websiteAuthor }}
      </div>
      <a href="https://beian.miit.gov.cn/" target="_blank">
        {{ homeStore.indexInfo.websiteConfig?.websiteRecordNo }}
      </a>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
import useHomeStore from "@/store/modules/home";

let homeStore = useHomeStore();
</script>

<style scoped lang="scss">
@keyframes Gradient {
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}

.footer-wrap {
  width: 100%;
  line-height: 2;
  position: relative;
  padding: 40px 20px;
  color: #eee;
  font-size: 14px;
  text-align: center;
  background: linear-gradient(-45deg, #ee7752, #ce3e75, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: Gradient 10s ease infinite;
  a {
    color: #eee !important;
  }
}
</style>
