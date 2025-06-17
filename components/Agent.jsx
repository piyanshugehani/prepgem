"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { interviewer } from "@/constants";
import { createFeedback } from "@/lib/actions/general.action";
import { db } from "@/utils/db";
import { allowedUsers } from "@/utils/schema";

const CallStatus = {
  INACTIVE: "INACTIVE",
  CONNECTING: "CONNECTING",
  ACTIVE: "ACTIVE",
  FINISHED: "FINISHED",
};

const Agent = ({
  userName,
  userId,
  interviewId,
  feedbackId,
  type,
  questions,
}) => {
  const router = useRouter();
  const { user } = useUser();
  const [callStatus, setCallStatus] = useState(CallStatus.INACTIVE);
  const [messages, setMessages] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState("");

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
    };

    const onMessage = (message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => {
      console.log("speech start");
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      console.log("speech end");
      setIsSpeaking(false);
    };

    const onError = (error) => {
      console.log("Error:", error);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }

    const handleGenerateFeedback = async (messages) => {
      console.log("handleGenerateFeedback");

      const { success, feedbackId: id } = await createFeedback({
        interviewId: interviewId,
        userId: userId,
        transcript: messages,
        feedbackId,
      });

      if (success && id) {
        router.push(`/interview/${interviewId}/feedback`);
      } else {
        console.log("Error saving feedback");
        router.push("/");
      }
    };

    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        router.push("/dashboard");
      } else {
        handleGenerateFeedback(messages);
      }
    }
  }, [messages, callStatus, feedbackId, interviewId, router, type, userId]);

  const handleCall = async () => {
    try {
      console.log("email", user.primaryEmailAddress.emailAddress)
      // Check if user is allowed to use this feature
      const allowedUser = await db
        .select({
          email: allowedUsers.email,
          status: allowedUsers.status
        })
        .from(allowedUsers)
        .where(
          and(
            eq(allowedUsers.email, user.primaryEmailAddress.emailAddress),
            eq(allowedUsers.status, 'approved')
          )
        );
      console.log("allowedUser", allowedUser)
      const isAllowed = allowedUser.length > 0;

      if (!isAllowed) {
        // If user is not allowed, show alert and handle request submission
        const userConfirmed = window.confirm(
          "You need admin approval to use this feature. Would you like to submit a request?"
        );
        let userEmail = user.primaryEmailAddress.emailAddress;
        if (userConfirmed) {
          // Send access request
          await fetch('/api/send-request', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userEmail })
          });
          alert("Your request has been submitted. Please wait for admin approval.");
        }
        return;
      }
      // If user is allowed, proceed with the call
      setCallStatus(CallStatus.CONNECTING);

      if (type === "generate") {
        await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID, {
          variableValues: {
            username: userName,
            userid: userId,
          },
        });
      } else {
        let formattedQuestions = "";
        if (questions) {
          formattedQuestions = questions
            .map((question) => `- ${question}`)
            .join("\n");
        }

        await vapi.start(interviewer, {
          variableValues: {
            questions: formattedQuestions,
          },
        });
      }
    } catch (error) {
      console.error("Error in handleCall:", error);
      alert("An error occurred. Please try again later.");
    }
  };
  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  return (
    <React.Fragment>
      <div className="flex flex-col justify-center min-h-[90vh] w-full max-w-6xl mx-auto px-4 ">
        <div className="flex justify-center gap-x-12 w-full mb-16">
          {/* AI Interviewer Card */}
          <div className="flex flex-col items-center p-8 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl border border-gray-800 shadow-lg hover:shadow-purple-500/10 transition-all duration-300 w-72">
            <div className="relative">
              <Image
                src="/ai-avatar-bot.png"
                alt="profile-image"
                width={560}
                height={560}
                className="object-cover rounded-2xl "
              />
              {isSpeaking && (
                <span className="absolute bottom-2 right-2 w-6 h-6 bg-purple-500 rounded-full animate-pulse animate-speak ring-2 ring-black" />
              )}
            </div>
            <h3 className="mt-6 text-xl font-semibold text-white">AI Interviewer</h3>
          </div>

          {/* User Profile Card */}
          <div className="hidden md:flex flex-col items-center p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl border border-gray-800 shadow-lg hover:shadow-purple-500/10 transition-all duration-300 w-72">
            <Image
              src="/user.svg"
              alt="profile-image"
              width={560}
              height={560}
              className="rounded-2xl object-cover border-2 border-gray-800"
            />
            <h3 className="mt-6 text-xl font-semibold text-white">{userName}</h3>
          </div>
        </div>
        {messages.length > 0 && (
          <div className="w-full max-w-4xl mx-auto mb-16">
            <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-800 shadow-lg">
              <p
                key={lastMessage}
                className={cn(
                  "transition-opacity duration-500 opacity-0",
                  "animate-fadeIn opacity-100",
                  "text-xl leading-relaxed text-gray-200"
                )}
              >
                {lastMessage}
              </p>
            </div>
          </div>
        )}

        <div className="relative flex justify-center">
          {callStatus !== "ACTIVE" ? (
            <button 
              className="relative px-8 py-2 bg-gradient-to-r from-purple-200 to-gray-100 text-xl font-medium rounded-full hover:from-purple-100 hover:to-gray-200 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
              onClick={handleCall}
            >
              <span
                className={cn(
                  "absolute inset-0 rounded-full bg-purple-200",
                  "animate-ping opacity-75",
                  callStatus !== "CONNECTING" && "hidden"
                )}
              />
              <span className="relative flex items-center gap-3">
                {callStatus === "INACTIVE" || callStatus === "FINISHED" ? (
                  <>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg> */}
                    Start Interview
                  </>
                ) : (
                  "Connecting..."
                )}
              </span>
            </button>
          ) : (
            <button 
              className="px-12 py-5 bg-gradient-to-r from-red-600 to-red-800 text-white text-xl font-medium rounded-full hover:from-red-700 hover:to-red-900 transition-all duration-300 shadow-lg hover:shadow-red-500/20 flex items-center gap-3"
              onClick={() => {
                handleDisconnect();
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.36 6.64a9 9 0 0 1 .28 12.72m-2.5-2.5a5 5 0 0 0-7.78-6.28L4.1 4.1m2.28 2.28-2.3-2.3m15.84 15.84-2.3-2.3m-9.9-9.9 2.3 2.3"/></svg>
              End Interview
            </button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Agent;
