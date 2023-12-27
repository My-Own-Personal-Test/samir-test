import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import type { RouteParamValueRaw } from 'vue-router'

export const useLoanListState = defineStore('loan_state', () => {
  const loanList = ref<Record<string, any>[]>([])
  const loanDetail = ref<Record<string, any>>({})
  /**
   * this loading state default value is important to be true
   * the sole purpose is to delay rendered card in the detail page.
   * if the the default value is false, rendered detail and the loop will be in
   * race condition
   */
  const loadingState = ref(true)

  /**
   * Retrieves loan details by ID from the loan list.
   *
   * @param loanId - The ID of the loan to retrieve details for.
   */
  function getDetailById(loanId: RouteParamValueRaw | RouteParamValueRaw[]): void {
    loadingState.value = true
    const arr = loanList.value

    for (let index = 0; index < arr.length; index++) {
      if (arr[index].id === loanId) {
        loanDetail.value = arr[index]
        loadingState.value = false
        return
      }
      else {
        loadingState.value = false
      }
    }
  }

  return {
    loanList,
    getDetailById,
    loanDetail,
    loadingState,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useLoanListState, import.meta.hot))
