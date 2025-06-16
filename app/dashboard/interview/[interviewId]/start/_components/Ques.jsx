import { Lightbulb, Volume2, Pause, Play } from 'lucide-react';
import React, { useState, useEffect } from 'react'
import Groq from "groq-sdk";

function Ques({interviewQues, activeIndex, setActiveIndex, isTimerRunning, setIsTimerRunning}) {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes per question
    
    useEffect(() => {
        setTimeRemaining(120); // Reset timer when question changes
    }, [activeIndex]);

    useEffect(() => {
        let timer;
        if (isTimerRunning && timeRemaining > 0) {
            timer = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        setIsTimerRunning(false);
                        if (activeIndex < interviewQues.length - 1) {
                            setActiveIndex(activeIndex + 1);
                        }
                        return 120;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isTimerRunning, timeRemaining, activeIndex, setActiveIndex, interviewQues.length]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const textToSpeechh = async (text) => {
        try {
            if (isSpeaking) {
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
                return;
            }

            const groq = new Groq({
                apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
            });

            const completion = await groq.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: "You are a professional interviewer. Convert this question into a natural, conversational tone."
                    },
                    {
                        role: "user",
                        content: text
                    }
                ],
                model: "mixtral-8x7b-32768",
                temperature: 0.5,
                max_tokens: 1024,
            });

            const enhancedText = completion.choices[0]?.message?.content || text;

            if ('speechSynthesis' in window) {
                const speech = new SpeechSynthesisUtterance(enhancedText);
                speech.rate = 0.9;
                speech.pitch = 1;
                speech.onend = () => setIsSpeaking(false);
                
                window.speechSynthesis.speak(speech);
                setIsSpeaking(true);
            } else {
                alert("Oops! Your browser does not support text to speech feature :/");
            }
        } catch (error) {
            console.error("Text-to-speech error:", error);
            if ('speechSynthesis' in window) {
                const speech = new SpeechSynthesisUtterance(text);
                window.speechSynthesis.speak(speech);
            }
        }
    }
    
    return (
        <div className='p-5 border rounded-lg bg-gradient-to-br from-gray-900  to-gray-900 border-purple-500/30'>
            <div className='flex justify-between items-center mb-5'>
                <div className={`text-2xl font-bold ${timeRemaining < 30 ? 'text-red-400' : 'text-purple-300'}`}>
                    {formatTime(timeRemaining)}
                </div>
                <button 
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className="p-2 rounded-full hover:bg-purple-800/50 text-white transition-all duration-300"
                >
                    {isTimerRunning ? <Pause size={20} /> : <Play size={20} />}
                </button>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                {interviewQues&&interviewQues.map((question,index)=>(
                    <h2 
                        key={index}
                        className={`p-2 rounded-full text-center transition-all duration-300 ${
                            activeIndex===index 
                            ? 'bg-gradient-to-r from-purple-200 to-purple-300 text-gray-900 shadow-lg' 
                            : 'bg-gray-800/50 text-gray-300'
                        }`}
                    >
                        Question #{index+1}
                    </h2>
                ))}
            </div>
            <h2 className='my-5 text-md md:text-lg text-white'>{interviewQues[activeIndex]?.question}</h2>
            <Volume2 
                className={`cursor-pointer transition-all duration-300 ${isSpeaking ? 'text-purple-400' : 'text-gray-400 hover:text-purple-300'}`} 
                color="currentColor"
                onClick={() => textToSpeechh(interviewQues[activeIndex]?.question)}
            />
            <div className='border border-purple-500/30 rounded-lg p-5 bg-gray-900/50 mt-20 backdrop-blur-sm'>
                <h2 className='flex gap-2 items-center text-purple-300'>
                    <Lightbulb/>
                    <span className='font-semibold'>Note:</span>
                </h2>
                <h2 className='text-sm my-2 text-gray-300'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
            </div>
        </div>
    )
}

export default Ques