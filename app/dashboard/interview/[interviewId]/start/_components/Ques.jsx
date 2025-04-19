import { Lightbulb, Volume2, Pause, Play } from 'lucide-react';
import React, { useState } from 'react'
import Groq from "groq-sdk";

function Ques({interviewQues, activeIndex, setActiveIndex, timeRemaining, isTimerRunning, setIsTimerRunning}) {
    const [isSpeaking, setIsSpeaking] = useState(false);
    
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
                speech.rate = 0.9; // Slightly slower for better clarity
                speech.pitch = 1;
                speech.onend = () => setIsSpeaking(false);
                
                window.speechSynthesis.speak(speech);
                setIsSpeaking(true);
            } else {
                alert("Oops! Your browser does not support text to speech feature :/");
            }
        } catch (error) {
            console.error("Text-to-speech error:", error);
            // Fallback to basic speech synthesis
            if ('speechSynthesis' in window) {
                const speech = new SpeechSynthesisUtterance(text);
                window.speechSynthesis.speak(speech);
            }
        }
    }
    
    return (
        <div className='p-5 border rounded-lg'>
            <div className='flex justify-between items-center mb-5'>
                <div className={`text-2xl font-bold ${timeRemaining < 300 ? 'text-red-500' : 'text-primary'}`}>
                    {formatTime(timeRemaining)}
                </div>
                <button 
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className="p-2 rounded-full hover:bg-gray-100"
                >
                    {isTimerRunning ? <Pause size={20} /> : <Play size={20} />}
                </button>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                {interviewQues&&interviewQues.map((question,index)=>(
                    <h2 key={index} onClick={() => setActiveIndex(index)} className={`p-2 rounded-full text-center cursor-pointer ${activeIndex===index ? 'text-white bg-primary' : 'bg-secondary'}`}>Question #{index+1}</h2>
                ))}
            </div>
            <h2 className='my-5 text-md md:text-lg'>{interviewQues[activeIndex]?.question}</h2>
            <Volume2 
                className={`cursor-pointer ${isSpeaking ? 'text-primary' : ''}`} 
                color={isSpeaking ? "currentColor" : "gray"} 
                onClick={() => textToSpeechh(interviewQues[activeIndex]?.question)}
            />
            <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
                <h2 className='flex gap-2 items-center text-primary'>
                    <Lightbulb/>
                    <span className='font-semibold'>Note:</span>
                </h2>
                <h2 className='text-sm my-2 text-primary'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
            </div>
        </div>
    )
}

export default Ques