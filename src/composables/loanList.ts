import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { fetchInstance } from '@/composables/fetch.config'
import { useLoanListState } from '@/stores/loanListState'
import { useAlertController } from '@/composables/ui/alertController'

export const loadingList = ref(false)

export async function getList() {
  const { alertTrigger } = useAlertController()
  const loanList = useLoanListState()
  const { loanList: _loanList } = storeToRefs(loanList)

  loadingList.value = true
  const res = await fetchInstance('/', { method: 'GET', parseResponse: JSON.parse })
    .catch((error: Error) => {
      alertTrigger({ show: true, msg: error.message, variant: 'alert-error' })
    })
    .finally(() => {
      loadingList.value = false
    })

  _loanList.value.push(res)
}
