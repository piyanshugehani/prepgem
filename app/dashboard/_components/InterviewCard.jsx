import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewCard({interview}) {
    const router=useRouter();
  return (
    <div className='border shadow-sm p-3 rounded-lg my-4 flex justify-between items-center cursor-pointer' onClick={()=>router.push(`/dashboard/interview/${interview?.mockId}/feedback`)}>
        <div >
        <h2 className='font-bold text-primary hover:underline'>{interview?.jobPosition}</h2>
        <h2 className='text-sm text-gray-600'>Experience: {interview?.jobExperience} years</h2>
        <h2 className='text-xs text-gray-400'>Created: {interview?.createdAt}</h2>
        </div>
        <span className='py-1 px-2 mr-1 text-sm text-primary hover:underline'>See feedback?</span>
    </div>
  )
}

export default InterviewCard