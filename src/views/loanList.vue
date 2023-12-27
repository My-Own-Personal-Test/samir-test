<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { getList, loadingList } from '@/composables/loanList'
import { useLoanListState } from '@/stores/loanListState'
import { useCurrencyFormat } from '@/plugins/numberFormatter'
import BaseButton from '@/components/ui/atoms/BaseButton.vue'
import CardRoot from '@/components/ui/organisms/CardRoot.vue'
import TableComponents from '@/components/ui/organisms/TableComponents.vue'
import SpinnerComponent from '@/components/ui/atoms/SpinnerComponent.vue'

const direction = ref('asc')

const loanList = useLoanListState()
const { shownList, totalPages, page, empty } = storeToRefs(loanList)

function goToPage(pageNumber: number) {
  page.value = pageNumber
}

function sort() {
  const { sortList } = loanList
  direction.value = direction.value === 'asc' ? 'desc' : 'asc'
  sortList(direction.value)
}
</script>

<template>
  <div
    v-if="!shownList.length && !empty"
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
    <div class="flex justify-start w-full p-4">
      <BaseButton
        id="btn-sort"
        class="btn-primary"
        @click="sort"
      >
        Sort
      </BaseButton>
    </div>

    <div
      v-for="item in shownList"
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
      <TableComponents
        :items="shownList"
        :total-page="totalPages"
      />
    </div>
    <div
      v-if="shownList.length"
      class="grid place-items-center mt-4"
    >
      <div class="join">
        <button
          v-for="btn in 6"
          :key="btn"
          class="join-item btn"
          :class="{ 'btn-active': page === btn }"
          @click="goToPage(btn)"
        >
          {{ btn }}
        </button>
      </div>
    </div>
    <div
      v-else-if="empty"
      class="text-center"
    >
      <p>Oops! There's no match found...</p>
    </div>
  </section>
</template>
