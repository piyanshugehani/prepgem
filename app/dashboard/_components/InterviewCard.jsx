import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewCard({interview}) {
    const router = useRouter();

    if (!interview) {
        return (
            <div className='border shadow-sm p-3 rounded-lg my-4 text-center text-gray-500'>
                There are no interviews here
            </div>
        )
    }

    const handleCardClick = () => {
        router.push(`/dashboard/interview/${interview?.mockId}/feedback`);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div 
            className='border shadow-sm p-3 rounded-lg my-4 flex justify-between items-center cursor-pointer hover:bg-gray-900 transition-colors' 
            onClick={handleCardClick}
            role="button"
            tabIndex={0}
        >
            <div>
                <h2 className='font-bold text-primary hover:underline'>{interview?.jobPosition || 'Untitled Position'}</h2>
                <h2 className='text-sm text-gray-400'>Experience: {interview?.jobExperience || 0} years</h2>
                {/* <h2 className='text-xs text-gray-400'>Created: {formatDate(interview?.createdAt)}</h2> */}
            </div>
            <span className='py-1 px-2 mr-1 text-sm text-primary hover:underline'>
                {interview?.mockId ? 'View Feedback' : 'No Feedback Available'}
            </span>
        </div>
    )
}

export default InterviewCard