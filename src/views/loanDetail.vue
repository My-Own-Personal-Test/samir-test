<script lang="ts" setup>
import { onBeforeMount, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useLoanListState } from '@/stores/loanListState'
import { getList } from '@/composables/loanList'
import CardRoot from '@/components/ui/organisms/CardRoot.vue'
import SkeletonsComponents from '@/components/ui/atoms/SkeletonsComponents.vue'

const loanList = useLoanListState()
const { loanDetail: _loanDetail, loanList: _loanList, loadingState } = storeToRefs(loanList)
const route = useRoute()

onBeforeMount(async () => {
  /**
   * Conditionally fetches the loan list and retrieves the detail by ID.
   * If the loan list has items, it directly calls getDetailById. Otherwise, it fetches the list first and then calls getDetailById.
   *
   * @param route - The route object containing parameters.
   */

  if (!_loanList.value.length) {
    await getList()
    loanList.getDetailById(route.params.loanId)
  }
  else {
    loanList.getDetailById(route.params.loanId)
  }
})

onBeforeUnmount(() => {
  _loanDetail.value = {}
})
</script>

<template>
  <div class="p-10">
    <SkeletonsComponents
      v-if="loadingState"
      class="h-96 w-full"
    />

    <CardRoot
      v-else
      :loan-id="route.params.loanId"
      class="flex flex-col gap-y-4"
    >
      <template #head>
        <div class="text-center">
          <p class="text-2xl font-semibold">
            Loan Detail
          </p>
          <p class="mt-2">
            {{ route.params.loanId }}
          </p>
        </div>
      </template>

      <template #body>
        <div class="sm:grid grid-cols-2 mt-6">
          <div>
            <p class="font-semibold">
              Borrower Details:
            </p>
            <div class="mt-1">
              <p>Name: {{ _loanDetail.borrower.name }}</p>
              <p>Score: {{ _loanDetail.borrower.creditScore }}</p>
            </div>
          </div>
          <div>
            <p class="font-semibold">
              Repayment Schedule:
            </p>
          </div>
        </div>
      </template>
    </CardRoot>
  </div>
</template>
