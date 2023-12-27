<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { cn } from '@/plugins/twMerge'
import BaseButton from '@/components/ui/atoms/BaseButton.vue'

interface Props {
  userId: string
  class?: string
}

const props = defineProps<Props>()
</script>

<template>
  <div :class="cn('card w-full bg-base-100 shadow-lg', props.class)">
    <div class="card-body">
      <slot name="head">
        head
      </slot>
      <slot name="body">
        <p>If a dog chews shoes whose shoes does he choose?</p>
      </slot>
      <div class="card-actions justify-end">
        <BaseButton
          id="btn-redirect"
          class="btn-primary"
          :to="`/detail/${props.userId}`"
        >
          see details
          <Icon
            icon="solar:double-alt-arrow-right-linear"
            class="text-xl"
          />
        </BaseButton>
      </div>
    </div>
  </div>
</template>
