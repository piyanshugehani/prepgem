import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNew from './_components/AddNew'
import InterviewList from './_components/InterviewList'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function Dashboard() {
  return (
    <div className='my-6 min-h-[90vh]'>
     
      

      
        <AddNew/>
      
      <InterviewList/>
    </div>
  )
}

export default Dashboard