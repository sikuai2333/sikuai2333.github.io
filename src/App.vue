<script setup lang="ts">
import { ref } from 'vue'
import StyleSwitcher from './components/StyleSwitcher.vue'
import LoadingScreen from './components/LoadingScreen.vue'
const loaded = ref(false)
</script>

<template>
  <LoadingScreen @done="loaded = true" />
  <div :class="{ ready: loaded }" style="opacity:0;transition:opacity 0.4s ease 0.1s">
    <StyleSwitcher />
    <router-view />
  </div>
</template>

<style>
.ready { opacity: 1 !important; }
</style>
