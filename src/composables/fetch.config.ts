import { type $Fetch, ofetch } from 'ofetch'

const base = import.meta.env.DEV ? import.meta.env.VITE_DEV_URL : import.meta.env.VITE_PROD_URL

/**
 * Customized fetch instance for making HTTP requests.
 * @type {$Fetch}
 * @example
 * ```ts
 * fetchInstance('/example_url', { method: 'post', body: { exampleBody: 'value'}})
 * ```
 */
const fetchInstance: $Fetch = ofetch.create({
  baseURL: base,
  timeout: 30000,
})

export { fetchInstance }
