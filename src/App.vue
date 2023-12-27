<script setup lang="ts">
import { RouterView } from 'vue-router'
import AlertRoot from '@/components/ui/molecules/AlertRoot.vue'
</script>

<template>
  <div>
    <main class="container">
      <RouterView />
    </main>
    <AlertRoot />
  </div>
</template>
