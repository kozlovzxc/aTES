import { memo } from 'react'
import * as classes from './layout.module.css'
import { Outlet } from 'react-router-dom'

export const Layout = memo(() => {
  return (
    <div className={classes.layout}>
      <Outlet />
    </div>
  )
})
