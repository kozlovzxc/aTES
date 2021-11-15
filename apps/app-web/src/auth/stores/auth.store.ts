import { createDomain } from 'effector'
import { request } from '../../common/request'
import { AxiosError } from 'axios'

const domain = createDomain('auth')

const LOCAL_STORAGE_KEY = 'accessToken'

/**
 * Store
 */
interface AuthStore {
  loading: boolean
  error?: string
  authenticated: boolean
}
export const $auth = domain.createStore<AuthStore>({
  loading: false,
  authenticated: false,
})

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
$auth
  .on(signInFx.pending, (store, pending) => ({ ...store, loading: pending }))
  .on(signInFx.doneData, (store, response) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, response.data.accessToken)
    return { ...store, authenticated: true, error: undefined }
  })
  .on(signInFx.failData, (store, error: AxiosError) => {
    console.log(error)
    return {
      ...store,
      error:
        error.response.data.message ??
        'Some error occurred, please try to submit this form again in a few minutes...',
    }
  })

export interface SignUpDTO {
  username: string
  password: string
}
export const signUpFx = domain.createEffect((body: SignUpDTO) => {
  return request.post('http://localhost:3000/auth/sign-up', body)
})
$auth.on(signUpFx.doneData, (store, response) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, response.data.accessToken)
  return {
    ...store,
    authenticated: true,
  }
})
