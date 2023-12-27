<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import { useCurrencyFormat } from '@/plugins/numberFormatter'
import { useLoanListState } from '@/stores/loanListState'
import BaseButton from '@/components/ui/atoms/BaseButton.vue'

interface Props {
  class?: string
  items: Array<Record<string, any>>
}

interface Sort {
  direction: 'asc' | 'desc'
}

const props = defineProps<Props>()

const direction = ref('asc')
const loanState = useLoanListState()

function sort(params: Sort) {
  const { sortList } = loanState

  direction.value = params.direction === 'asc' ? 'desc' : 'asc'
  sortList(params.direction)
}
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table table-zebrah">
      <!-- head -->
      <thead>
        <tr class="text-center">
          <th />
          <th class="flex justify-center gap-x-2">
            <p>Name </p>
            <Icon
              v-if="direction === 'asc'"
              icon="solar:double-alt-arrow-up-linear"
              class="text-xl hover:cursor-pointer"
              @click="sort({ direction: 'asc' })"
            />
            <Icon
              v-else
              icon="solar:double-alt-arrow-down-linear"
              class="text-xl hover:cursor-pointer"
              @click="sort({ direction: 'desc' })"
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
