"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import Ques from './_components/Ques';
import WebcamComponent from './_components/Webcam';

export default function StartInterview({ params }) {
    const [data, setData] = useState();
    const [interviewQues,setInterviewQues]=useState([]);
    const [activeIndex,setActiveIndex]=useState(0);
    const [timeRemaining, setTimeRemaining] = useState(10 * 60);
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const [userAnswers, setUserAnswers] = useState([]); // Store all answers

    useEffect(() => {
        console.log("id from params", params.interviewId);
        getInterviewDetails()
    }, [])

    useEffect(() => {
        let timer;
        if (isTimerRunning && timeRemaining > 0) {
            timer = setInterval(() => {
                setTimeRemaining(prev => prev - 1);
            }, 1000);
        } else if (timeRemaining === 0) {
            setIsTimerRunning(false);
            alert("Interview time is up!");
        }
        return () => clearInterval(timer);
    }, [timeRemaining, isTimerRunning]);

    const getInterviewDetails = async () => {
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId))
        const jsonMockResponse=JSON.parse(result[0].jsonMockResp)
        setInterviewQues(jsonMockResponse)
        setData(result[0])
    }

    const handleAnswerUpdate = (answer) => {
        setUserAnswers(prev => {
            const newAnswers = [...prev];
            newAnswers[activeIndex] = answer;
            return newAnswers;
        });
    };

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 my-10'>
            <Ques 
                interviewQues={interviewQues} 
                activeIndex={activeIndex} 
                setActiveIndex={setActiveIndex}
                timeRemaining={timeRemaining}
                isTimerRunning={isTimerRunning}
                setIsTimerRunning={setIsTimerRunning}
            />
            <WebcamComponent 
                data={data} 
                interviewQues={interviewQues} 
                activeIndex={activeIndex} 
                setActiveIndex={setActiveIndex}
                userAnswers={userAnswers}
                onAnswerUpdate={handleAnswerUpdate}
            />
        </div>
    )
}
