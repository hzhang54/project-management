import React from 'react'
import { Priority } from '@/state/api'
import ReusablePriorityPage from '../reusablePriorityPage'



const Medium = () => {
  return (
    //{/* return a ReusablePriorityPage passing the Urgent member of the Priority enum as priority argument */}
    <ReusablePriorityPage priority={Priority.Medium} />
  )
}

export default Medium