<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useLoanListState } from '@/stores/loanListState'
import { getList } from '@/composables/loanList'

const loanList = useLoanListState()
const { loanDetail: _loanDetail, loanList: _loanList } = storeToRefs(loanList)
const route = useRoute()

onMounted(async () => {
  /**
   * Conditionally fetches the loan list and retrieves the detail by ID.
   * If the loan list has items, it directly calls getDetailById. Otherwise, it fetches the list first and then calls getDetailById.
   *
   * @param route - The route object containing parameters.
   */
  if (_loanList.value.length) {
    loanList.getDetailById(route.params.loanId)
  }

  else {
    await getList()
    loanList.getDetailById(route.params.loanId)
  }
})
</script>

<template>
  <pre>
    {{ _loanDetail }}
  </pre>
</template>
