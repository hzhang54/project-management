import React from 'react'
import { Priority } from '@/state/api'
import ReusablePriorityPage from '../reusablePriorityPage'



const Low = () => {
  return (
    //{/* return a ReusablePriorityPage passing the Low member of the Priority enum as priority argument */}
    <ReusablePriorityPage priority={Priority.Low} />
  )
}

export default Low