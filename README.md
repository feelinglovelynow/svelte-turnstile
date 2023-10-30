# 🕉 @feelinglovelynow/svelte-turnstile


## 💎 Install
```bash
pnpm add @feelinglovelynow/svelte-turnstile
```


## 🙏 Description
Helper functions and component to integrate Svelte w/ an invisible Cloudflare Turnstile form validator


## 💚 Properties
```ts
export let sitekey: string
```


## 💛 Instructions
1. Get Cloudflare account and in dashboard setup Turnstile
1. From Turnstile dashboard find Secret key
1. Add Secret key to `.env` file (CLOUDFLARE_TURNSTILE_PRIVATE_KEY)
1. Add turnstile script to app.html
```html
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"></script> <!-- https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#disable-implicit-rendering -->
```


### 🧡 Example: Client side
* If wondering how PUBLIC_ENVIRONMENT is set => [@feelinglovelynow/env-write](https://www.npmjs.com/package/@feelinglovelynow/env-write)
* If wondering where showToast comes from => [@feelinglovelynow/toast](https://www.npmjs.com/package/@feelinglovelynow/toast)
```svelte
<script lang="ts">
  import showToast from '@feelinglovelynow/toast'
  import { PUBLIC_ENVIRONMENT } from '$env/static/public'
  import { Turnstile, PUBLIC_KEY_ALWAYS_PASSES } from '@feelinglovelynow/svelte-turnstile'

  const PUBLIC_KEY = 'get-from-cloudflare-turnstile-dashboard'

  function getTurnstileState (e: CustomEvent) { // if form is submitted before this callback no token will be passed in the form (aka) token validation will fail, typically takes less then 3 seconds after page load
    if (e.detail.status === 'success') isLoading = false // status options => [ 'success', 'error', 'expired', 'timeout' ] https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations
    else showToast({ type: 'info', items: [ e.detail.message ] }) // message options => [ 'All good!', 'Network error', 'Token expired', 'Challenge expired' ] https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations
  }
</script>


<Turnstile on:state={ getTurnstileState } sitekey={ PUBLIC_ENVIRONMENT === 'local' ? PUBLIC_KEY_ALWAYS_PASSES : PUBLIC_KEY } />
```


### ❤️ Example: Server side
* If wondering how PUBLIC_ENVIRONMENT is set => [@feelinglovelynow/env-write](https://www.npmjs.com/package/@feelinglovelynow/env-write)
```ts
import { PUBLIC_ENVIRONMENT } from '$env/static/public'
import { CLOUDFLARE_TURNSTILE_PRIVATE_KEY } from '$env/static/private'
import { validate, CLOUDFLARE_TURNSTILE_PRIVATE_KEY_ALWAYS_PASSES } from '@feelinglovelynow/svelte-turnstile'

const fields = Object.fromEntries((await request.formData()).entries())
const secret = (PUBLIC_ENVIRONMENT === 'local') ? CLOUDFLARE_TURNSTILE_PRIVATE_KEY_ALWAYS_PASSES : CLOUDFLARE_TURNSTILE_PRIVATE_KEY

await validate(fields['cf-turnstile-response'], secret)
```


### 💟 Server Side Errors from `validate.ts`
```ts
if (!turnstileResponse) throw { id: 'fln__svelte-turnstile__no-turnstile-response', message: 'Please include a turnstileResponse' }
if (!secret) throw { id: 'fln__svelte-turnstile__no-secret', message: 'Please include a secret' }
if (!validationResponse.success) throw { id: 'fln__svelte-turnstile__validation-unsuccessful', message: 'For some reason our site believes you are a bot, we apologize, refresh your browser and submit again as human like as possible please' }
```


## 🎁 All our NPM Packages
* [@feelinglovelynow/env-write](https://github.com/feelinglovelynow/env-write)
* [@feelinglovelynow/get-form-entries](https://github.com/feelinglovelynow/get-form-entries)
* [@feelinglovelynow/get-relative-time](https://github.com/feelinglovelynow/get-relative-time)
* [@feelinglovelynow/global-style](https://github.com/feelinglovelynow/global-style)
* [@feelinglovelynow/jwt](https://github.com/feelinglovelynow/jwt)
* [@feelinglovelynow/loop-backwards](https://github.com/feelinglovelynow/loop-backwards)
* [@feelinglovelynow/slug](https://github.com/feelinglovelynow/slug)
* [@feelinglovelynow/svelte-loading-anchor](https://github.com/feelinglovelynow/svelte-loading-anchor)
* [@feelinglovelynow/svelte-modal](https://github.com/feelinglovelynow/svelte-modal)
* [@feelinglovelynow/svelte-turnstile](https://github.com/feelinglovelynow/svelte-turnstile)
* [@feelinglovelynow/toast](https://github.com/feelinglovelynow/toast)
