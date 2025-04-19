"use client"
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Header from '../dashboard/_components/Header'
import Link from 'next/link';

function Page() {
  // Refs for elements to animate
  const toolRefs = useRef([]);
  toolRefs.current = [];

  // Add refs to each tool div dynamically
  const addToRefs = (el) => {
    if (el && !toolRefs.current.includes(el)) {
      toolRefs.current.push(el);
    }
  };

  useEffect(() => {
    // GSAP animation for all tool items
    toolRefs.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 }, // Starting position
        { opacity: 1, y: 0, duration: 0.5, delay: index * 0.2, ease: 'power3.out' } // Ending position
      );
    });
  }, []);

  // Technical tools data
  const techTools = [
    {
      id: 1,
      name: "Sorting Visualizer",
      description: "Visualize and understand common sorting algorithms like Quick Sort, Merge Sort, and Bubble Sort with step-by-step animations.",
      link: "/questions/1"
    },
    {
      id: 2,
      name: "Graph Algorithm Visualizer",
      description: "Explore graph traversal algorithms like BFS, DFS, Dijkstra's Algorithm with interactive visualizations.",
      link: "/questions/2"
    },
    {
      id: 3,
      name: "Big-O Complexity Calculator",
      description: "Analyze and compare algorithm time and space complexity with visual representations.",
      link: "/questions/3"
    }
  ];

  // Non-technical tools data
  const nonTechTools = [
    {
      id: 1,
      name: "Mock Interview Simulator",
      description: "Simulate a real interview environment with timed responses and instant feedback on your answers."
    },
    {
      id: 2,
      name: "Resume Analyzer",
      description: "Get feedback on your resume with AI-powered analysis and suggestions for improvement."
    },
    {
      id: 3,
      name: "Interview Body Language Guide",
      description: "Master non-verbal communication with video guides on proper posture, eye contact, and gestures."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="text-center py-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg shadow-md text-white">
        <h1 className="text-4xl font-bold">Ace Your Next Interview</h1>
        <p className="mt-4 text-lg md:text-lg max-w-5xl mx-auto px-4">
          Elevate your interview preparation with our comprehensive tools and resources designed to help you succeed.
        </p>
      </section>

      <div className="mx-4 md:mx-12 lg:mx-24 xl:mx-36">
        {/* Technical Tools Section */}
        <section className="py-16">
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-1 bg-indigo-500 mr-4"></div>
            <h2 className="text-3xl font-bold text-indigo-800">Technical Visualization Tools</h2>
            <div className="w-12 h-1 bg-indigo-500 ml-4"></div>
          </div>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
            Interactive tools to help you visualize and understand complex algorithms and data structures that commonly appear in technical interviews.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techTools.map((tool) => (
              <div
                key={tool.id}
                ref={addToRefs}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border-t-4 border-indigo-500"
              >
                <h3 className="text-xl font-semibold text-indigo-800">{tool.name}</h3>
                <p className="mt-3 text-gray-600 h-24">{tool.description}</p>
                <div className="mt-4">
                  <Link href={tool.link} className="inline-block text-white bg-indigo-600 py-2 px-6 rounded-md hover:bg-indigo-700 transition-all">
                    Launch Tool
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Non-Technical Tools Section */}
        <section className="py-16 bg-gray-100 rounded-xl">
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-1 bg-teal-500 mr-4"></div>
            <h2 className="text-3xl font-bold text-teal-800">Non-Technical Preparation Tools</h2>
            <div className="w-12 h-1 bg-teal-500 ml-4"></div>
          </div>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
            Comprehensive resources to help you master behavioral questions, improve communication skills, and prepare for all aspects of the interview process.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {nonTechTools.map((tool) => (
              <div
                key={tool.id}
                ref={addToRefs}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border-t-4 border-teal-500"
              >
                <h3 className="text-xl font-semibold text-teal-800">{tool.name}</h3>
                <p className="mt-3 text-gray-600 h-24">{tool.description}</p>
                <div className="mt-4">
                  <button className="inline-block text-white bg-teal-600 py-2 px-6 rounded-md hover:bg-teal-700 transition-all">
                    Access Tool
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Progress Section */}
        <section className="py-16 my-16 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center">
          <h2 className="text-3xl font-bold">Track Your Progress</h2>
          <p className="mt-4 text-lg max-w-3xl mx-auto px-4">
            Monitor your preparation journey with detailed analytics and personalized insights to identify your strengths and areas for improvement.
          </p>
          
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto px-4">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-xl font-semibold">Completed Sessions</h3>
              <div className="mt-3 text-4xl font-bold">45</div>
              <p className="mt-2 text-sm opacity-80">+12 this week</p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-xl font-semibold">Tools Mastered</h3>
              <div className="mt-3 text-4xl font-bold">7</div>
              <p className="mt-2 text-sm opacity-80">+2 this week</p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-xl font-semibold">Avg. Performance</h3>
              <div className="mt-3 text-4xl font-bold">87%</div>
              <p className="mt-2 text-sm opacity-80">+5% improvement</p>
            </div>
          </div>
          
          <div className="mt-10">
            <Link href="/profile" className="bg-white text-indigo-700 font-medium py-3 px-6 rounded-full hover:bg-gray-100 transition-all">
              View Full Analytics
            </Link>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Success Stories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-yellow-500 flex mb-4">
                ★★★★★
              </div>
              <p className="text-gray-600 italic mb-4">
                "The algorithm visualizers helped me truly understand complex concepts that I was struggling with. I aced my technical interview at Google!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-800 font-bold">
                  JS
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold">Jane Smith</h4>
                  <p className="text-sm text-gray-500">Software Engineer at Google</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-yellow-500 flex mb-4">
                ★★★★★
              </div>
              <p className="text-gray-600 italic mb-4">
                "The behavioral question simulator gave me confidence to tackle the toughest questions. I was prepared for everything they asked!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-800 font-bold">
                  MP
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold">Michael Parker</h4>
                  <p className="text-sm text-gray-500">Product Manager at Amazon</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-yellow-500 flex mb-4">
                ★★★★★
              </div>
              <p className="text-gray-600 italic mb-4">
                "The salary negotiation coach helped me increase my offer by 15%! Best investment I've ever made in my career."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-800 font-bold">
                  AL
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold">Aisha Lee</h4>
                  <p className="text-sm text-gray-500">UX Designer at Microsoft</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Ace Your Next Interview?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Start preparing today with our comprehensive suite of interview preparation tools designed to help you succeed.
          </p>
          <Link href="/register" className="bg-indigo-600 text-white font-medium py-3 px-8 rounded-full hover:bg-indigo-700 transition-all">
            Get Started Now
          </Link>
        </section>
      </div>
    </div>
  )
}

export default Page