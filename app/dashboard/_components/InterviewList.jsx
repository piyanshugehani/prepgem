'use client'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm';
import React, { useEffect, useState, useRef } from 'react'
import InterviewCard from './InterviewCard';
import gsap from 'gsap';

function InterviewList() {
    const {user} = useUser();
    const [list, setList] = useState([]);
    const interviewListRef = useRef([]);

    const getInterviewListforUser = async () => {
        const res = await db.select().from(MockInterview).where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress));
        console.log("response from db", res);   
        setList(res);
    }

    useEffect(() => {
        user && getInterviewListforUser();
    }, [user]);  // Login, user is set from null to some user, thus user needs to be in dependency

    // GSAP Animation
    useEffect(() => {
        if (interviewListRef.current.length > 0) {
            interviewListRef.current.forEach((el, index) => {
                gsap.fromTo(
                    el,
                    { opacity: 0, y: 20 }, // Initial state (off-screen)
                    { opacity: 1, y: 0, duration: 0.5, delay: index * 0.2, ease: 'power3.out' } // Animation properties
                );
            });
        }
    }, [list]); // Trigger animation when the list changes

    return (
        <div>
            <h2 className="text-2xl font-semibold text-purple-400 py-4">Previous Interviews</h2>
            <div className="space-y-4">
                {list && list.length > 0 ? (
                    list.map((interview, index) => (
                        <div 
                            key={index} 
                            ref={(el) => interviewListRef.current[index] = el} // Add reference for each interview card
                        >
                            <InterviewCard interview={interview} />
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center py-4 pb-80">No interviews available</p>
                )}
            </div>
        </div>
    );
}

export default InterviewList;
