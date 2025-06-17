"use client";

import Agent from "@/components/Agent";
import { useUser } from "@clerk/nextjs";

const InterviewPage = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div className="h-screen">Loading...</div>;
  }

  const username = user?.username || user?.firstName || user?.emailAddresses[0]?.emailAddress;

  return (
    <div className="container mx-auto p-4 h-screen">
      {/* <h3 className="text-3xl text-purple-200 font-bold">1-1 Interview WarmUp</h3> */}

      <Agent
        userName={username ?? "Guest"}
        userId={user?.id}
        profileImage={user?.imageUrl}
        type="generate"
      />
    </div>
  );
};

export default InterviewPage;
