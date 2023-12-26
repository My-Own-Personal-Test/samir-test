import { ref } from 'vue'

type Variant = 'alert-info' | 'alert-error' | 'alert-success' | 'alert-warning' | ''

interface Payload {
  show: boolean
  msg: string
  variant: Variant
  timer?: any
}

export const alertState = ref<Payload>({
  show: false,
  msg: '',
  variant: '',
  timer: null,
})

/**
 * useAlertController function provides methods to control the display and behavior of an alert.
 * @returns An object with an alertTrigger method.
 * @example
 * ``` ts
 * import { useAlertController } from '@/composables/ui/alertController.ts'
 * ```
 * ```ts
 * const { alertTrigger } = useAlertController()
 * ```
 * ```ts
 * alertTrigger({ show:true, msg:'example message', variant:'alert-info' })
 * ```
 */
export function useAlertController() {
  /**
   * alertTimeout method clears the existing timer and sets a new timer to hide the alert after 3000 milliseconds (3 seconds).
   */
  function alertTimeout() {
    clearTimeout(alertState.value.timer)

    if (alertState.value.show) {
      alertState.value.timer = setTimeout(() => {
        alertState.value.show = false
        alertState.value.msg = ''
        alertState.value.variant = ''
      }, 3000)
    }
  }

  /**
   * alertTrigger method is used to update the alert state based on the provided payload and trigger the timeout for automatic hiding.
   * @param payload - An object of type Payload containing show, msg, variant, and optional timer properties.
   */
  function alertTrigger(payload: Payload) {
    alertState.value.variant = payload.variant
    alertState.value.msg = payload.msg
    alertState.value.show = payload.show

    alertTimeout()
  }

  return { alertTrigger }
}
