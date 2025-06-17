"use client"
import React, { useEffect } from 'react';
import Header from '../dashboard/_components/Header';
import { motion } from 'framer-motion';
import gsap from 'gsap';

function Page() {
    useEffect(() => {
        gsap.fromTo(
            '.roadmap-timeline',
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 1, stagger: 0.3, ease: 'power3.inOut' }
        );
    }, []);

    const benefitVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-black to-gray-900">
            <Header />
            <div className="relative">
                {/* <div className="absolute inset-0  to-transparent pointer-events-none" /> */}
                <div className='mx-5 md:mx-20 lg:mx-36 mt-10 space-y-12 pb-10'>
                    {/* Roadmap Timeline */}
                    <section className="space-y-8">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-300 via-purple-500 to-purple-700 bg-clip-text text-transparent">Platform Roadmap</h2>
                        <div className="roadmap-timeline space-y-6">
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={benefitVariants}
                                className="bg-gradient-to-br from-[#13131f] via-[#1a1a2e] to-[#16213e] p-8 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-purple-800/30 backdrop-blur-sm text-gray-200 hover:shadow-purple-600/10 hover:border-purple-700/40 transition-all duration-300"
                            >
                                <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500 bg-clip-text text-transparent mb-4">Phase 1: User Onboarding & Profile Setup</h3>
                                <p className="leading-relaxed text-gray-300">
                                    The first step is a seamless onboarding experience where users can set up their profiles, input career preferences, and indicate the type of interviews they want to practice. AI will analyze users' profiles to suggest mock interviews that align with their career goals, job type, and industry.
                                </p>
                            </motion.div>

                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={benefitVariants}
                                className="bg-gradient-to-br from-[#13131f] via-[#1a1a2e] to-[#16213e] p-8 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-purple-800/30 backdrop-blur-sm text-gray-200 hover:shadow-purple-600/10 hover:border-purple-700/40 transition-all duration-300"
                            >
                                <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500 bg-clip-text text-transparent mb-4">Phase 2: Personalized Mock Interview Sessions</h3>
                                <p className="leading-relaxed text-gray-300">
                                    Once the user's profile is set up, they are ready for their first mock interview. The platform uses AI-driven interview simulations to simulate real-world job interviews tailored to the user's skill level and job requirements. Real-time feedback is provided during and after each session to enhance user preparation.
                                </p>
                            </motion.div>

                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={benefitVariants}
                                className="bg-gradient-to-br from-[#13131f] via-[#1a1a2e] to-[#16213e] p-8 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-purple-800/30 backdrop-blur-sm text-gray-200 hover:shadow-purple-600/10 hover:border-purple-700/40 transition-all duration-300"
                            >
                                <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500 bg-clip-text text-transparent mb-4">Phase 3: Feedback Analysis & Recommendations</h3>
                                <p className="leading-relaxed text-gray-300">
                                    After completing a mock interview, the AI system provides detailed feedback, including areas for improvement in communication, technical skills, and behavioral aspects. Personalized recommendations are given to help users improve their weak areas. This phase aims to provide actionable insights for continuous learning and growth.
                                </p>
                            </motion.div>
                        </div>
                    </section>

                    {/* How Users Benefit Section */}
                    <section className="bg-gradient-to-br from-[#13131f] via-[#1a1a2e] to-[#16213e] p-10 rounded-xl shadow-lg border border-purple-800/30 backdrop-blur-sm">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-300 via-purple-500 to-purple-700 bg-clip-text text-transparent mb-8">How Users Benefit</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {['Personalized Feedback', 'Instant Analysis', '24/7 Access'].map((benefit, idx) => (
                                <motion.div
                                    key={idx}
                                    className="p-6 bg-black/50 rounded-xl border border-purple-800/20 shadow-lg hover:shadow-purple-600/10 hover:border-purple-700/30 transition-all duration-300"
                                    initial="hidden"
                                    animate="visible"
                                    variants={benefitVariants}
                                >
                                    <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500 bg-clip-text text-transparent mb-3">{benefit}</h3>
                                    <p className="text-gray-300 leading-relaxed">Details about {benefit} that improve user experience and success rate.</p>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Page;
