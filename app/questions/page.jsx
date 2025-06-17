"use client"
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Header from '../dashboard/_components/Header'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Page() {
  const toolRefs = useRef([]);
  toolRefs.current = [];
  const router = useRouter();

  const addToRefs = (el) => {
    if (el && !toolRefs.current.includes(el)) {
      toolRefs.current.push(el);
    }
  };

  useEffect(() => {
    toolRefs.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, delay: index * 0.2, ease: 'power3.out' }
      );
    });
  }, []);

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
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-purple-950/20">
      <Header />

      <div className="mx-4 md:mx-12 lg:mx-24 xl:mx-36">
        <section className="py-16">
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-0.5 bg-gradient-to-r from-purple-600 to-purple-400 mr-4"></div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-purple-100 bg-clip-text text-transparent">Technical Visualization Tools</h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 ml-4"></div>
          </div>
          <p className="text-gray-300 text-center max-w-3xl mx-auto mb-10">
            Interactive tools to help you visualize and understand complex algorithms and data structures that commonly appear in technical interviews.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techTools.map((tool) => (
              <div
                key={tool.id}
                ref={addToRefs}
                className="bg-gradient-to-br from-gray-900 via-purple-950/30 to-purple-900/20 p-6 rounded-xl shadow-lg hover:shadow-purple-500/10 transition-all backdrop-blur-sm border border-purple-500/10 hover:border-purple-500/30"
              >
                <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-200 to-purple-300 bg-clip-text text-transparent">{tool.name}</h3>
                <p className="mt-3 text-gray-300 h-24">{tool.description}</p>
                <div className="mt-4">
                  <Link href={tool.link} className="inline-block bg-gradient-to-r from-purple-500 to-purple-700 text-white py-2 px-6 rounded-lg hover:from-purple-600 hover:to-purple-800 transition-all shadow-md hover:shadow-purple-500/25">
                    Practice
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-purple-950/30 via-black to-purple-950/20 rounded-2xl backdrop-blur-sm border border-purple-500/10">
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-0.5 bg-gradient-to-r from-purple-600 to-purple-400 mr-4"></div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-200 to-purple-100 bg-clip-text text-transparent">Non-Technical Preparation Tools</h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 ml-4"></div>
          </div>
          <p className="text-gray-200 text-center max-w-3xl mx-auto mb-10">
            Comprehensive resources to help you master behavioral questions, improve communication skills, and prepare for all aspects of the interview process.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {nonTechTools.map((tool) => (
              <div
                key={tool.id}
                ref={addToRefs}
                className="bg-gradient-to-br from-black/80 to-purple-950/10 p-6 rounded-xl shadow-lg hover:shadow-purple-500/10 transition-all backdrop-blur-sm border border-purple-500/10 hover:border-purple-500/30"
              >
                <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-200 to-purple-300 bg-clip-text text-transparent">{tool.name}</h3>
                <p className="mt-3 text-gray-300 h-24">{tool.description}</p>
                <div className="mt-4">
                  <button 
                    onClick={() => router.push('/interview')}
                    className="inline-block bg-gradient-to-r from-purple-500 to-purple-700 text-white py-2 px-6 rounded-lg hover:from-purple-600 hover:to-purple-800 transition-all shadow-md hover:shadow-purple-500/25"
                  >
                    Access Tool
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-200 to-purple-100 bg-clip-text text-transparent mb-12">Success Stories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-gradient-to-br from-purple-950/30 via-black to-purple-950/20 p-6 rounded-xl shadow-lg backdrop-blur-sm border border-purple-500/10">
                <div className="text-purple-400 flex mb-4">
                  ★★★★★
                </div>
                <p className="text-gray-200 italic mb-4">
                  {index === 1 ? 
                    '"The algorithm visualizers helped me truly understand complex concepts that I was struggling with. I aced my technical interview at Google!"' :
                    index === 2 ?
                    '"The behavioral question simulator gave me confidence to tackle the toughest questions. I was prepared for everything they asked!"' :
                    '"The salary negotiation coach helped me increase my offer by 15%! Best investment Ive ever made in my career."'
                  }
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center text-white font-bold">
                    {index === 1 ? 'JS' : index === 2 ? 'MP' : 'AL'}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-purple-200">
                      {index === 1 ? 'Jane Smith' : index === 2 ? 'Michael Parker' : 'Aisha Lee'}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {index === 1 ? 'Software Engineer at Google' : index === 2 ? 'Product Manager at Amazon' : 'UX Designer at Microsoft'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-200 to-purple-100 bg-clip-text text-transparent mb-6">Ready to Ace Your Next Interview?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Start preparing today with our comprehensive suite of interview preparation tools designed to help you succeed.
          </p>
          <Link href="/dashboard" className="inline-block bg-gradient-to-r from-purple-500 to-purple-700 text-white font-medium py-3 px-8 rounded-full hover:from-purple-600 hover:to-purple-800 transition-all shadow-lg hover:shadow-purple-500/25">
            Get Started Now
          </Link>
        </section>
      </div>
    </div>
  )
}

export default Page