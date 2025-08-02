import React from 'react'
import { Priority } from '@/state/api'
import ReusablePriorityPage from '../reusablePriorityPage'



const Backlog = () => {
  return (
    //{/* return a ReusablePriorityPage passing the Backlog member of the Priority enum as priority argument */}
    <ReusablePriorityPage priority={Priority.Backlog} />
  )
}

export default Backlog