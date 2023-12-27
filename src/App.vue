<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useDark, useToggle } from '@vueuse/core'
import AlertRoot from '@/components/ui/molecules/AlertRoot.vue'
import BaseButton from '@/components/ui/atoms/BaseButton.vue'

const isDark = useDark({
  selector: 'html',
  attribute: 'data-theme',
  valueDark: 'dark',
  valueLight: 'light',
})

function toggle() {
  const toggleTheme = useToggle(isDark)
  toggleTheme()
}
</script>

<template>
  <div>
    <main class="container">
      <div class="flex justify-end pt-4">
        <BaseButton
          id="btn-toggle"
          class="btn-success"
          @click="toggle"
        >
          <Icon
            v-if="isDark"
            icon="solar:moon-fog-linear"
            class="text-xl"
          />
          <Icon
            v-else
            icon="solar:sun-fog-linear"
            class="text-xl"
          />
          {{ isDark ? 'Dark' : 'Light' }}
        </BaseButton>
      </div>
      <RouterView />
    </main>
    <AlertRoot />
  </div>
</template>
