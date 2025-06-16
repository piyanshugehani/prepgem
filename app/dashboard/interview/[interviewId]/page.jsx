"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam';
import { LightbulbIcon, WebcamIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function Interview({ params }) {
    const [data, setData] = useState();
    const [webcamEnabled, setWebcamEnabled] = useState(false);
    const router = useRouter();

    useEffect(() => {
        console.log("id from params", params.interviewId);
        getInterviewDetails()
    }, [])

    const getInterviewDetails = async () => {
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId))
        console.log("details!!", result[0]);
        setData(result[0])
    }

    return (
        <div className='flex my-10 flex-col min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black p-8'>
            <h2 className='font-semibold text-3xl text-white mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-white'>
                Hello! Let's get started.
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                <div className='flex flex-col gap-5'>
                    <div className='flex flex-col p-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-lg backdrop-blur-sm gap-5 text-gray-100'>
                        <h2><span className='font-semibold text-gray-300'>Job Role:</span> {data?.jobPosition}</h2>
                        <h2><span className='font-semibold text-gray-300'>Job Description/Tech Stack:</span> {data?.jobDesc}</h2>
                        <h2><span className='font-semibold text-gray-300'>Job Experience:</span> {data?.jobExperience}</h2>
                    </div>
                    <div className='p-6 rounded-xl bg-gray-900/30 border border-gray-700 shadow-lg backdrop-blur-sm'>
                        <h2 className='flex gap-2 items-center font-semibold text-gray-300 mb-3'>
                            <LightbulbIcon className="h-5 w-5"/>
                            Information
                        </h2>
                        <h2 className='text-gray-300'>{process.env.NEXT_PUBLIC_INFO}</h2>
                    </div>
                </div>
                <div>
                    {webcamEnabled ? (
                        <div className='rounded-xl overflow-hidden border border-gray-700 shadow-lg'>
                            <Webcam 
                                onUserMedia={() => setWebcamEnabled(true)} 
                                onUserMediaError={() => setWebcamEnabled(false)} 
                                mirrored={true}
                                className='w-full'
                            />
                        </div>
                    ) : (
                        <div className='flex flex-col'>
                            <div className='bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 shadow-lg p-8'>
                                <WebcamIcon className='h-72 w-full p-20 text-gray-400' />
                            </div>
                            <Button 
                                variant="outline" 
                                className='mt-4 bg-gray-900/50 text-gray-200 border-gray-700 hover:bg-gray-800/70 transition-all duration-300'
                                onClick={() => setWebcamEnabled(true)}
                            >
                                Enable Camera and Microphone
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <div className='flex justify-end mt-8'>
                <Button 
                    onClick={() => router.push(`/dashboard/interview/${params.interviewId}/start`)}
                    className='bg-gradient-to-r from-purple-400 to-purple-300 hover:from-purple-300 hover:to-purple-300 text-gray-800 shadow-lg transition-all duration-300'
                >
                    Start Interview
                </Button>
            </div>
        </div>
    )
}

export default Interview