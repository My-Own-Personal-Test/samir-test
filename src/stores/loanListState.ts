import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoanListState = defineStore('loan_list', () => {
  const loanList = ref<Record<string, any>[]>([])

  return { loanList }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useLoanListState, import.meta.hot))
