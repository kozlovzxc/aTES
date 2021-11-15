import { memo } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SignIn } from './auth/pages/sign-in'
import { SignUp } from './auth/pages/sign-up'
import { Layout } from './layout'
import { Tasks } from './tasks/pages/tasks'
import { AuthGuard } from './auth/components/auth-guard'
import { NotAuthGuard } from './auth/components/not-auth-guard'

export const Router = memo(() => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<AuthGuard />}>
            <Route index element={<Navigate to="tasks" />} />
            <Route path="tasks" element={<Tasks />} />
          </Route>
          <Route path="auth" element={<NotAuthGuard />}>
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
})
