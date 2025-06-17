"use client"
import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { chatSession } from '@/utils/GeminiAPIModel';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { toast } from 'sonner';
import { LoaderCircle, Mic } from 'lucide-react';
import { CircleStopIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Groq from 'groq-sdk';

function WebcamComponent({data, interviewQues, activeIndex, setActiveIndex, userAnswers, onAnswerUpdate}) {
  const [userAns, setUserAns] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const router = useRouter();
  const mediaRecorderRef = useRef(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [loader,setLoader]=useState(false);
  const {user}=useUser();

  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error('Audio Recording not supported in this browser.');
      return;
    }

    return () => {
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      setAudioChunks([]);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioChunks(currentChunks => [...currentChunks, event.data]);
        }
      };

      mediaRecorderRef.current.start(1000);
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error('Failed to access microphone');
    }
  };

  const stopRecording = async () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      try {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' }); // Changed to WAV format
        
        if (audioBlob.size === 0) {
          throw new Error('No audio data recorded');
        }

        // Create a File object instead of FormData
        const audioFile = new File([audioBlob], 'audio.wav', { type: 'audio/wav' });
        
        const groq = new Groq({
          apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
          dangerouslyAllowBrowser: true
        });
        
        const transcription = await groq.audio.transcriptions.create({
          file: audioFile,
          model: "distil-whisper-large-v3-en",
          response_format: "verbose_json",
        });
        
        setUserAns(transcription.text);
      } catch (error) {
        console.error('Transcription error:', error);
        toast.error(error.message || 'Failed to transcribe audio');
      }

      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setAudioChunks([]);
    }
  };

  const handleButtonClick = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };

  const handleSaveAnswer = () => {
    onAnswerUpdate(userAns);
    setUserAns('');
    toast("Answer saved for this question!");
  };

  const handleEndInterview = async () => {
    setLoader(true);
    try {
      for (let i = 0; i < interviewQues.length; i++) {
        if (userAnswers[i]) {
          const feedbackPrompt = `Question: ${interviewQues[i]?.question}, User's answer: ${userAnswers[i]}, depending on given question and user's answer please give a rating (out of 10) for the answer and feedback as area of improvement if any, and also a recommended answer for the user if you were in his place, in max 3-4 lines in JSON format with rating,feedback and answer as fields in JSON.`;
          
          const res = await chatSession.sendMessage(feedbackPrompt);
          const mockJsonResp = (res.response.text()).replace('```json', '').replace('```', '');
          const JsonFeedback = JSON.parse(mockJsonResp);
          console.log("msg recvd", JsonFeedback);

          await db.insert(UserAnswer).values({
            mockIdRef: data?.mockId,
            question: interviewQues[i]?.question,
            correctAns: JsonFeedback?.answer,
            userAns: userAnswers[i],
            feedback: JsonFeedback?.feedback,
            rating: JsonFeedback?.rating,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD-MM-yyyy")
          });
        }
      }
      
      toast("Interview completed successfully!");
      router.push(`/dashboard/interview/${data?.mockId}/feedback`);
    } catch (error) {
      console.error("Error saving interview:", error);
      toast.error("Error saving interview responses");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-screen p-4 text-foreground">
      <div className="flex justify-end space-x-2 mb-4">
       
        {activeIndex !== interviewQues?.length-1 && (
          <Button onClick={() => setActiveIndex(activeIndex+1)}>Next{" >"}</Button>
        )}
        {activeIndex === interviewQues?.length-1 && (
          <Button
            variant="destructive"
            size="sm"
            onClick={handleEndInterview}
            disabled={loader}
          >
            {loader ? <LoaderCircle className="h-4 w-4 animate-spin" /> : 'End Interview'}
          </Button>
        )}
      </div>

      <div className='flex flex-col justify-center items-center bg-black my-5 rounded-lg p-10'>
        <Image src={"/cam.jpg"} width={150} height={200} className='absolute' />
        <Webcam mirrored={true} style={{ zIndex: 100, height: 250, width: '100%' }} />
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            className="flex-1 my-1" 
            onClick={handleButtonClick}
          >
            {isRecording ? (
              <span className='text-red-500 flex gap-1'>
                <CircleStopIcon size={18} />
                Recording..
              </span>
            ) : (
              <span className='flex gap-1'>
                <Mic size={18} />
                Record Answer
              </span>
            )}
          </Button>
          <Button
            variant="secondary"
            onClick={handleSaveAnswer}
          >
            Save
          </Button>
        </div>

        {userAns && (
          <div className="bg-gray-900 rounded-lg border p-4 transition-all duration-300">
            <p className="text-sm text-gray-100">
              {userAns}
            </p>
          </div>
        )}
        </div>
      </div>
    
  );
}

export default WebcamComponent;
