"use client"
import Navigation from '@/components/Navigation'
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Home() {
  const sectionOneRef = useRef(null)
  const sectionTwoRef = useRef(null)

  // Progress 0->1 as sectionTwo top moves from bottom to 50% of viewport
  const { scrollYProgress: s2Progress } = useScroll({
    target: sectionTwoRef,
    offset: ['start 100%', 'start 50%'],
  })

  // Fade whole section to 0 (revealing white page background). If a solid white is needed above everything,
  // add a white overlay behind content but inside the same motion container.
  const sectionOpacity = useTransform(s2Progress, [0, 1], [1, 0])

  return (
    <div className='min-h-screen bg-white'>
      <Navigation />

      {/* Fade entire section including content */}
      <motion.section
        ref={sectionOneRef}
        className="relative h-screen w-full bg-white overflow-hidden"
        style={{ opacity: sectionOpacity }}
      >
        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="https://www.pexels.com/download/video/4884233/" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Content Container */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-black">
                <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Welcome to Our Amazing Platform
                </h1>
                <p className="text-xl lg:text-2xl mb-8 text-gray-600">
                  Experience the future with cutting-edge technology and innovative solutions
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                  Get Started
                </button>
              </div>

              <div className="relative">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-64 lg:h-80 object-cover rounded-lg shadow-2xl"
                >
                  <source src="https://www.pexels.com/download/video/6177737/" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

            </div>
          </div>
        </div>
      </motion.section>

      {/* Section Two drives the fade timing */}
      <section ref={sectionTwoRef} className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-5xl font-bold leading-tight text-gray-800">
            We create innovative digital experiences that transform businesses and empower teams to achieve extraordinary results through cutting-edge technology, creative design, and strategic partnerships that drive sustainable growth and lasting impact in today's competitive marketplace.
          </p>
        </div>
      </section>

      <section className="h-screen bg-gray-200 flex items-center">
        <div className="max-w-6xl mx-auto px-6 text-center">hi</div>
      </section>
    </div>
  )
}
