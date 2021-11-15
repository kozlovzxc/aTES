import { memo } from 'react'
import { Link } from 'react-router-dom'
import * as classes from './home.module.css'

export const Home = memo(() => {
  return (
    <div className={classes.container}>
      <h1>aTES</h1>
      <div>
        <Link to={'/sign-in'}>Sign in</Link>
      </div>
      <div>
        <Link to={'/sign-up'}>Sign up</Link>
      </div>
    </div>
  )
})
