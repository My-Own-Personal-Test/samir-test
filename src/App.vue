<script setup lang="ts">
import { RouterView } from 'vue-router'
import AlertRoot from '@/components/ui/molecules/AlertRoot.vue'
</script>

<template>
  <div>
    <RouterView />
    <AlertRoot />
  </div>
</template>
