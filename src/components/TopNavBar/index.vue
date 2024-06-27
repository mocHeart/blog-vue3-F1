<template>
  <div class="bg">
    TopNavBar
    <v-btn>Click</v-btn>
    <v-btn prepend-icon="$vuetify"> Button </v-btn>

    <v-icon
      color="purple-darken-2"
      icon="mdi-dialpad"
      size="large"
    ></v-icon>

    <v-icon icon="mdi-home" />

    <v-icon icon="mdi-account-multiple" />

    <v-icon
      icon="mdi-eye"
      size="large"
    ></v-icon>


    

    
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.bg {
  background-color: $bgColor;
}
</style>
