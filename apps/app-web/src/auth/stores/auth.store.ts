import { createDomain } from 'effector'
import { request } from '../../common/request'

const domain = createDomain('auth')

const LOCAL_STORAGE_KEY = 'accessToken'

/**
 * Store
 */
export const $auth = domain.createStore({ authenticated: false })

/**
 * Effects
 */
export interface SignInDTO {
  username: string
  password: string
}
export const signInFx = domain.createEffect((body: SignInDTO) => {
  return request.post('http://localhost:3000/auth/sign-in', body)
})
signInFx.done.watch(({ result }) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, result.data.accessToken)
})
$auth.on(signInFx.done, () => ({ authenticated: true }))

export interface SignUpDTO {
  username: string
  password: string
}
export const signUpFx = domain.createEffect((body: SignUpDTO) => {
  return request.post('http://localhost:3000/auth/sign-up', body)
})
signUpFx.done.watch(({ result }) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, result.data.accessToken)
})
$auth.on(signUpFx.done, () => ({ authenticated: true }))
