import { memo } from 'react'
import { useStore } from 'effector-react'
import { $auth } from '../stores/auth.store'
import { Navigate, Outlet } from 'react-router-dom'

export const NotAuthGuard = memo(() => {
  const auth = useStore($auth)

  return !auth.authenticated ? <Outlet /> : <Navigate to="/" />
})
