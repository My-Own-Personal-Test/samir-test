import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { fetchInstance } from '@/composables/fetch.config'
import { useLoanListState } from '@/stores/loanListState'
import { useAlertController } from '@/composables/ui/alertController'

export const loadingList = ref(false)

/**
 * Fetches the loan list asynchronously and updates the state.
 * Displays an alert in case of an error during the fetch operation.
 *
 * @throws {Error} If there is an error during the fetch operation.
 */
export async function getList(): Promise<void> {
  const { alertTrigger } = useAlertController()
  const loanList = useLoanListState()
  const { loanList: _loanList } = storeToRefs(loanList)

  const cachedLoanList = localStorage.getItem('cachedLoanList')
  const cacheTimestamp = localStorage.getItem('cachedLoanListTimestamp')

  // Check if the cached loan list is still valid
  if (cachedLoanList && cacheTimestamp) {
    const currentTime = new Date().getTime()
    const maxAge = 5 * 60 * 1000

    if (currentTime - Number.parseInt(cacheTimestamp, 10) <= maxAge) {
      _loanList.value.push(...JSON.parse(cachedLoanList))
      return
    }
  }

  loadingList.value = true
  const res = await fetchInstance('/', {
    method: 'GET',
    parseResponse: JSON.parse,
  })
    .catch((error: Error) => {
      alertTrigger({ show: true, msg: error.message, variant: 'alert-error' })
    })
    .finally(() => {
      loadingList.value = false
    })

  localStorage.setItem('cachedLoanList', JSON.stringify(res))
  localStorage.setItem('cachedLoanListTimestamp', new Date().getTime().toString())

  if (_loanList.value.length) {
    _loanList.value = []
    _loanList.value.push(...res)
  }
  else {
    _loanList.value.push(...res)
  }
}
