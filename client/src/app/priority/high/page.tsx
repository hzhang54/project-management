import React from 'react'
import { Priority } from '@/state/api'
import ReusablePriorityPage from '../reusablePriorityPage'



const High = () => {
  return (
    //{/* return a ReusablePriorityPage passing the Urgent member of the Priority enum as priority argument */}
    <ReusablePriorityPage priority={Priority.High} />
  )
}

export default High