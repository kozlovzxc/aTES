import { memo } from 'react'
import { useForm } from 'react-hook-form'
import { $auth, signInFx } from '../stores/auth.store'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from 'effector-react'

export const SignIn = memo(() => {
  const { register, handleSubmit: useSubmit } = useForm()
  const navigate = useNavigate()
  const authStore = useStore($auth)

  const handleSubmit = useSubmit(async (data) => {
    await signInFx({
      username: data.username,
      password: data.password,
    })
    navigate('/')
  })

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <div className="w-25 p-5 bg-primary bg-opacity-10 rounded">
        <h1 className="mb-3">👋 Sign in</h1>
        <form className="mb-3" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              className="form-control"
              type="text"
              autoComplete="username"
              placeholder="username"
              required
              {...register('username')}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              type="password"
              placeholder="********"
              autoComplete="current-password"
              required
              {...register('password')}
            />
          </div>

          {authStore.error && (
            <div className="input-group has-validation mb-3">
              <input hidden className="form-control is-invalid" />
              <div className="invalid-feedback">{authStore.error}</div>
            </div>
          )}

          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
        </form>
        <div>
          New? <Link to="/auth/sign-up">Create an account.</Link>
        </div>
      </div>
    </div>
  )
})
