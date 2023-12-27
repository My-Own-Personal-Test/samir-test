<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { useCurrencyFormat } from '@/plugins/numberFormatter'
import BaseButton from '@/components/ui/atoms/BaseButton.vue'

interface Props {
  class?: string
  items: Array<Record<string, any>>
}

const props = defineProps<Props>()
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table table-zebra">
      <!-- head -->
      <thead>
        <tr class="text-center">
          <th />
          <th>Name</th>
          <th>Amount</th>
          <th>Interest Rate</th>
          <th>Term</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, idx) in props.items"
          :key="item.borrower.id"
          class="text-center"
        >
          <td>{{ idx + 1 }}</td>
          <td>{{ item.borrower.name }}</td>
          <td>{{ useCurrencyFormat(item.amount) }}</td>
          <td>{{ item.interestRate }} %</td>
          <td>{{ item.term }} days</td>
          <td>
            <BaseButton
              id="btn-redirect"
              class="btn-primary btn-sm"
              :to="`/detail/${item.borrower.id}`"
            >
              see details
              <Icon
                icon="solar:double-alt-arrow-right-linear"
                class="text-xl"
              />
            </BaseButton>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
