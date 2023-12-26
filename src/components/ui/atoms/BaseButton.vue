<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { cn } from '@/plugins/twMerge'

interface Props {
  class: string | ''
  id: string
  disabled?: boolean
  to?: string
  target?: string
}

const props = defineProps<Props>()
</script>

<template>
  <button
    v-if="!props.to"
    :id="`${props.id}-button`"
    :class="cn('btn', props.class)"
    :disabled="props.disabled"
  >
    <slot />
  </button>
  <RouterLink
    v-else
    :id="`${props.id}-redirect-button`"
    :to="props.to"
    :class="cn('btn', props.class)"
    :target="props.target"
  >
    <slot />
  </RouterLink>
</template>
