<script lang="ts" setup>
import { onBeforeMount, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'
import { useLoanListState } from '@/stores/loanListState'
import { getList } from '@/composables/loanList'
import { useCurrencyFormat } from '@/plugins/numberFormatter'
import { useDateFormatter } from '@/plugins/dateFormatter'
import CardRoot from '@/components/ui/organisms/CardRoot.vue'
import SkeletonsComponents from '@/components/ui/atoms/SkeletonsComponents.vue'
import BaseButton from '@/components/ui/atoms/BaseButton.vue'

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
  <BaseButton
    id="btn-redirect"
    class="btn-ghost mt-4 ml-4"
    to="/"
  >
    <Icon
      icon="solar:double-alt-arrow-left-linear"
      class="text-xl"
    />
    <p>Back</p>
  </BaseButton>
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
        <div class="">
          <div class="sm:grid grid-cols-2">
            <div>
              <p class="font-semibold">
                Borrower Details:
              </p>
              <div class="mt-1">
                <div>
                  <p>Name: {{ _loanDetail.borrower.name }}</p>
                  <p>Email: {{ _loanDetail.borrower.email }}</p>
                  <p>Score: {{ _loanDetail.borrower.creditScore }}</p>
                </div>
              </div>
            </div>
            <div>
              <p class="font-semibold">
                Documents:
              </p>
              <div
                v-for="(doc, id) in _loanDetail.documents"
                :key="id"
                class="grid grid-cols-2"
              >
                <p>Type: {{ doc.type }}</p>
                <p>
                  Document File: <a
                    :href="doc.url"
                    class="hover:underline"
                  >
                    See Document
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div class="mt-4 sm:grid grid-cols-2">
            <div>
              <p class="font-semibold">
                Repayment Schedule:
              </p>
              <ol
                class="mt-1"
              >
                <li
                  v-for="(item, id) in _loanDetail.repaymentSchedule.installments"
                  :key="id"
                  class="mb-2"
                >
                  <div class="sm:flex gap-x-4">
                    <span>{{ id + 1 }}. Due Date: {{ useDateFormatter(item.dueDate) }}</span><br class="sm:hidden">
                    <span>Amount Due: {{ useCurrencyFormat(item.amountDue) }}</span>
                  </div>
                </li>
              </ol>
            </div>

            <div>
              <p class="font-semibold">
                Loan Information:
              </p>

              <div class="mt-1 sm:grid grid-cols-2">
                <div>
                  <p>Loan Amount: {{ useCurrencyFormat(_loanDetail.amount) }}</p>
                  <p>Risk: {{ _loanDetail.riskRating }}</p>
                  <p>Term: {{ _loanDetail.term }} days</p>
                </div>

                <div>
                  <p>Purpose: {{ _loanDetail.purpose }}</p>
                  <p>Interest Rate: {{ _loanDetail.interestRate }}%</p>
                  <p class="mt-1 sm:mt-0">
                    Collateral: <span class="grid grid-cols-2">
                      <p>{{ _loanDetail.collateral.type }}</p>
                      <p>{{ useCurrencyFormat(_loanDetail.collateral.value) }}</p>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </CardRoot>
  </div>
</template>
