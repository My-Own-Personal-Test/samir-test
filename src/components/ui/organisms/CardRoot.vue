<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { type RouteParamValueRaw, useRoute } from 'vue-router'
import { cn } from '@/plugins/twMerge'
import BaseButton from '@/components/ui/atoms/BaseButton.vue'

type Params = RouteParamValueRaw | RouteParamValueRaw[]
interface Props {
  loanId: string | Params
  class?: string
}

const props = defineProps<Props>()
const route = useRoute()
</script>

<template>
  <div
    :id="`card-id-${props.loanId}`"
    :class="cn('card w-full bg-base-100 shadow-lg', props.class)"
  >
    <div class="card-body">
      <slot name="head">
        head
      </slot>
      <slot name="body">
        <p>If a dog chews shoes whose shoes does he choose?</p>
      </slot>
      <div
        v-if="route.name === 'home'"
        class="card-actions justify-end"
      >
        <BaseButton
          id="btn-redirect"
          class="btn-primary"
          :to="`/detail/${props.loanId}`"
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
