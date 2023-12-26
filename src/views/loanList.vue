<script lang="ts" setup>
import { getList } from '@/composables/loanList'
import BaseButton from '@/components/ui/atoms/BaseButton.vue'
</script>

<template>
  <section class="grid place-items-center min-h-screen">
    <BaseButton
      id="click2see"
      class="btn-primary"
      @click="getList"
    >
      Click to see Loan List
    </BaseButton>
  </section>
</template>
