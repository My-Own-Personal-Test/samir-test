import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import type { RouteParamValueRaw } from 'vue-router'

export const useLoanListState = defineStore('loan_list', () => {
  const loanList = ref<Record<string, any>[]>([])
  const loanDetail = ref<Record<string, any>>({})

  function getDetailById(loanId: RouteParamValueRaw | RouteParamValueRaw[]) {
    const arr = loanList.value
    loanDetail.value = arr.filter(item => item.id === loanId)
  }

  return { loanList, getDetailById, loanDetail }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useLoanListState, import.meta.hot))
