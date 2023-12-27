<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { getList } from '@/composables/loanList'
import { useLoanListState } from '@/stores/loanListState'
import { useCurrencyFormat } from '@/plugins/numberFormatter'
import BaseButton from '@/components/ui/atoms/BaseButton.vue'
import CardRoot from '@/components/ui/organisms/CardRoot.vue'
import TableComponents from '@/components/ui/organisms/TableComponents.vue'

const loanList = useLoanListState()
const { loanList: _loanList } = storeToRefs(loanList)
</script>

<template>
  <div
    v-if="!_loanList.length"
    class="flex justify-center min-h-screen items-center"
  >
    <BaseButton
      id="click2see"
      class="btn-primary"
      @click="getList"
    >
      Click to see Loan List
    </BaseButton>
  </div>
  <section
    v-else
    class="grid place-items-center min-h-screen sm:block"
  >
    <div
      v-for="item in _loanList"
      :key="item.borrower"
      class="max-h-screen overflow-scroll w-96 p-4 sm:hidden"
    >
      <CardRoot
        :user-id="item.borrower.id"
      >
        <template #head>
          <p>Name: {{ item.borrower.name }}</p>
        </template>
        <template #body>
          <div class="grid grid-rows-2 gap-y-1">
            <div class="grid grid-cols-2">
              <p>Amount: <br>{{ useCurrencyFormat(item.amount) }}</p>
              <p>Rating: {{ item.riskRating }}</p>
            </div>
            <div class="grid grid-cols-2">
              <p>Term: {{ item.term }} days</p>
            </div>
          </div>
        </template>
      </CardRoot>
    </div>

    <div class="py-10">
      <TableComponents :items="_loanList" />
    </div>
  </section>
</template>
