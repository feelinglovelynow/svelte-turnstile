import { CHALLENGE_URL } from '$lib/variables'
import type { TurnstileTokenValidateResponse } from '$lib'


export default async (turnstileResponse: FormDataEntryValue, secret: string) => {
  if (!turnstileResponse) throw { id: 'fln__svelte-turnstile__no-turnstile-response', message: 'Please include a turnstileResponse' }
  if (!secret) throw { id: 'fln__svelte-turnstile__no-secret', message: 'Please include a secret' }
  else {
    const response = await fetch(CHALLENGE_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ secret, response: turnstileResponse }),
    })

    const validationResponse: TurnstileTokenValidateResponse = await response.json()

    // The timeout-or-duplicate error code can happen @ form where the file changes but the other form fields do not change
    // This is not a scary (bot seeming) error so we bypass it, all errors may be found here
    // https://developers.cloudflare.com/turnstile/get-started/server-side-validation/#error-codes
    if (!validationResponse.success && validationResponse['error-codes'].length === 1 && validationResponse['error-codes'][0] === 'timeout-or-duplicate') {
      validationResponse.success = true
    }

    if (!validationResponse.success) throw { id: 'fln__svelte-turnstile__validation-unsuccessful', message: 'For some reason our site believes you are a bot, we apologize, refresh your browser and submit again as human like as possible please' }
  }
}
