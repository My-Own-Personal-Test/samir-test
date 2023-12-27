<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { storeToRefs } from 'pinia'
import { useCurrencyFormat } from '@/plugins/numberFormatter'
import { useLoanListState } from '@/stores/loanListState'
import BaseButton from '@/components/ui/atoms/BaseButton.vue'

interface Props {
  class?: string
  items: Array<Record<string, any>>
}

const props = defineProps<Props>()
const loanState = useLoanListState()
const { userInput } = storeToRefs(loanState)
</script>

<template>
  <div class="overflow-x-auto">
    <div class="mt-4 ml-4 flex flex-col w-fit">
      <label
        for="filter"
      >
        Filter by Name
      </label>
      <input
        id="filter"
        v-model="userInput"
        class="input input-bordered focus:input-primary"
      >
    </div>
    <table class="table table-zebra">
      <!-- head -->
      <thead>
        <tr class="text-center">
          <th />
          <th class="flex justify-center gap-x-2">
            <p>Name </p>
            <Icon
              icon="solar:double-alt-arrow-up-linear"
              class="text-xl"
            />
          </th>
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
              :to="`/detail/${item.id}`"
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
