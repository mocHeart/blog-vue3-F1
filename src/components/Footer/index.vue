<template>
  <v-snackbar :timeout="200000" color="primary" variant="tonal">
    <template v-slot:activator="{ props }">
      <v-btn class="ma-2" color="primary" variant="tonal" v-bind="props"
        >open</v-btn
      >
    </template>

    Snackbar with <strong>tonal</strong> variant.
  </v-snackbar>

  <div class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </div>

</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
