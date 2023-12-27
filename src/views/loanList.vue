<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { getList, loadingList } from '@/composables/loanList'
import { useLoanListState } from '@/stores/loanListState'
import { useCurrencyFormat } from '@/plugins/numberFormatter'
import BaseButton from '@/components/ui/atoms/BaseButton.vue'
import CardRoot from '@/components/ui/organisms/CardRoot.vue'
import TableComponents from '@/components/ui/organisms/TableComponents.vue'
import SpinnerComponent from '@/components/ui/atoms/SpinnerComponent.vue'

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
      :disabled="loadingList"
      @click="getList"
    >
      <SpinnerComponent v-if="loadingList" />
      <span v-else>Click to see Loan List</span>
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
        :loan-id="item.id"
      >
        <template #head>
          <p>Name: {{ item.borrower.name }}</p>
        </template>
        <template #body>
          <div class="grid grid-rows-2 gap-y-1">
            <div class="grid grid-cols-2">
              <p>Amount: <br>{{ useCurrencyFormat(item.amount) }}</p>
              <p>Rate: {{ item.interestRate }}</p>
            </div>
            <div class="grid grid-cols-2">
              <p>Rating: {{ item.riskRating }}</p>
              <p>Term: {{ item.term }} days</p>
            </div>
          </div>
        </template>
      </CardRoot>
    </div>

    <div class="py-10 hidden sm:block">
      <TableComponents :items="_loanList" />
    </div>
  </section>
</template>
