import { ref } from 'vue'
import type { FetchResponse } from 'ofetch'
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

  loadingList.value = true
  const res: FetchResponse<JSON> = await fetchInstance('/', {
    method: 'GET',
    parseResponse: JSON.parse,
  })
    .catch((error: Error) => {
      alertTrigger({ show: true, msg: error.message, variant: 'alert-error' })
    })
    .finally(() => {
      loadingList.value = false
    })

  if (_loanList.value.length) {
    _loanList.value = []
    _loanList.value.push(res)
  }
  else {
    _loanList.value.push(res)
  }
}
