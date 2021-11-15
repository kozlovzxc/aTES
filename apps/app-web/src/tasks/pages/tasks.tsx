import { memo, useEffect } from 'react'
import { $tasks, tasksFetchFx } from '../stores/tasks'
import { useStore } from 'effector-react'

export const Tasks = memo(() => {
  const tasksStore = useStore($tasks)

  useEffect(() => {
    void tasksFetchFx()
  }, [])

  console.log(tasksStore.tasks)
  return <>Tasks</>
})
