import { type $Fetch, ofetch } from 'ofetch'

const base = 'https://raw.githubusercontent.com/andreascandle/p2p_json_test/main/api/json/loans.json'

/**
 * Customized fetch instance for making HTTP requests.
 * @type {$Fetch}
 * @example
 * ```ts
 * fetchInstance('/example_url', { method: 'post', body: { exampleBody: 'value'}})
 * ```
 * @see
 * https://unjs.io/packages/ofetch
 * https://github.com/unjs/ofetch
 */
const fetchInstance: $Fetch = ofetch.create({
  baseURL: base,
  timeout: 30000,
})

export { fetchInstance }
