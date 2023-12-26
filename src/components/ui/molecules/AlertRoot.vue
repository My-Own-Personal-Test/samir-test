<script lang="ts" setup>
import { cn } from '@/plugins/twMerge'
import { alertState } from '@/composables/ui/alertController'
</script>

<template>
  <Teleport to="body">
    <div
      v-if="alertState.show"
      :class="cn('alert fixed bottom-4 w-5/6 md:max-w-xl left-0 right-0 mx-auto', alertState.variant)"
    >
      {{ alertState.msg }}
    </div>
  </Teleport>
</template>
