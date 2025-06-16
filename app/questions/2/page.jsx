"use client"
import { useEffect } from 'react';
import Header from '@/app/dashboard/_components/Header'
import React from 'react'
import {motion} from 'framer-motion'
import gsap from 'gsap';
import Visualizer from '../1/_components/Visualizer';
import GraphAlgorithm from './_components/GraphAlgorithm';

function page() {
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
    <div>
            <Header />
            <div>
              
                <GraphAlgorithm/>
            
                
            </div>
        </div>
  )
}

export default page