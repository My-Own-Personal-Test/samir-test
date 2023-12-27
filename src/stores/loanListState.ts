import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { RouteParamValueRaw } from 'vue-router'

export const useLoanListState = defineStore('loan_state', () => {
  /**
   * this loading state default value is important to be true
   * the sole purpose is to delay rendered card in the detail page.
   * if the the default value is false, rendered detail and the loop will be in
   * race condition
   */
  const loadingState = ref(true)
  const loanList = ref<Record<string, any>[]>([])
  const loanDetail = ref<Record<string, any>>({})
  const shownList = ref<any>([])
  const page = ref(1)
  const itemsPerPage = ref(5)
  const userInput = ref('')
  const empty = ref(false)

  /**
   * Calculates the total number of pages based on the length of the loan list and the number of items per page.
   *
   * @param loanList - Reference to the array containing loan list items.
   * @param itemsPerPage - Reference to the number of items per page.
   * @returns A computed property representing the total number of pages.
   */
  const totalPages = computed(() => Math.ceil(loanList.value.length / itemsPerPage.value))

  /**
   * Computed property to filter the loan list based on user input.
   */
  const filteredLoanList = computed(() => {
    const input = userInput.value.toLowerCase() // Convert user input to lowercase for case-insensitive comparison
    return loanList.value.filter((item) => {
      // Customize the condition based on your filtering logic
      // In this example, it checks if the loan's title contains the user input
      return item.borrower.name.toLowerCase().includes(input)
    })
  })

  /**
   * Watches changes in the current page and loan list, updating the shown list accordingly.
   *
   * @param page - Reference to the current page.
   * @param loanList - Reference to the array containing loan list items.
   * @param itemsPerPage - Reference to the number of items per page.
   * @param shownList - Reference to the array containing the currently shown list.
   */
  watch([() => page.value, loanList.value], () => {
    const start = (page.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    shownList.value = loanList.value.slice(start, end)
  })

  /**
   * Watch for changes in the user input and update the shown list accordingly.
   */
  watch(() => userInput.value, () => {
    const start = (page.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    shownList.value = filteredLoanList.value.slice(start, end)
    if (!shownList.value.length)
      empty.value = true
  })

  /**
   * Retrieves loan details by ID f rom the loan list.
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
    shownList,
    page,
    totalPages,
    userInput,
    filteredLoanList,
    empty,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useLoanListState, import.meta.hot))
