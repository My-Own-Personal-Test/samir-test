<script lang="ts" setup>
import { cn } from '@/plugins/twMerge'

interface Props {
  class?: string
}

const props = defineProps<Props>()
</script>

<template>
  <div :class="cn('skeleton', props.class)" />
</template>
