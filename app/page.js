"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import gsap from "gsap"
import { Button } from "@/components/ui/button"

export default function Home() {
  const router = useRouter()
  const circleRef = useRef(null)
  const bgCircleRef = useRef(null)

  useEffect(() => {
    // GSAP Animations for a smooth entry and continuous effects
    if (circleRef.current) {
      gsap.to(circleRef.current, {
        scale: 1.2,
        rotation: 180,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      })
    }

    if (bgCircleRef.current) {
      gsap.to(bgCircleRef.current, {
        rotation: 360,
        duration: 10,
        repeat: -1,
        ease: "linear",
      })
    }
  }, [])

  const handleStartClick = () => {
    router.push("/sign-in/")
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black to-slate-900 text-purple-400">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={bgCircleRef}
          className="bg-circle absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-500/20 to-purple-500/20 blur-3xl"
        />
        <div
          ref={circleRef}
          className="circle absolute bottom-0 -left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/20 to-teal-500/20 blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col min-h-screen">
       

        {/* Hero Section */}
        <main className="flex-grow flex flex-col md:flex-row items-center justify-center gap-8 py-12 md:py-20">
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Get ready for your next interview
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto md:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              With an AI that mimics real-world scenarios and adapts to your skill level. Let's start practicing now!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <Button
                className="mt-8 px-8 py-6 text-lg bg-gradient-to-r from-purple-600 to-purple-600 hover:from-purple-700 hover:to-purple-700 rounded-xl shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-1"
                onClick={handleStartClick}
              >
                Start Interview
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 h-5 w-5"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Button>
            </motion.div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <motion.div
              className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/30 to-purple-500/30 blur-xl animate-pulse" />
              <div
                className="absolute inset-8 rounded-full bg-gradient-to-r from-purple-600/40 to-purple-600/40 blur-md animate-pulse"
                style={{ animationDelay: "1s" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24 text-white"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Z" />
                  <path d="M15.45 10h1.5a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h1.5" />
                  <path d="M12 19v3" />
                  <path d="M8 22h8" />
                </svg>
              </div>
            </motion.div>
          </div>
        </main>

        {/* Features Section */}
        <section id="features" className="py-12 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose AI PrepGem?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Realistic Scenarios",
                description: "Practice with AI that simulates real interview conditions and questions.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-purple-500 mb-4"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                ),
              },
              {
                title: "Adaptive Learning",
                description: "Our AI adjusts difficulty based on your performance to maximize growth.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-purple-500 mb-4"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                ),
              },
              {
                title: "Detailed Feedback",
                description: "Get personalized insights and improvement suggestions after each session.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-teal-500 mb-4"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                    <path d="M10 9H8" />
                  </svg>
                ),
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <div className="text-center">
                  {feature.icon}
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        
      </div>
    </div>
  )
}
