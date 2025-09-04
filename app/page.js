"use client"
import Navigation from '@/components/Navigation'
import React, { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from "gsap"


export default function Home({ isTransitioning, setIsTransitioning }) {
  const sectionOneRef = useRef(null)
  const sectionTwoRef = useRef(null)
  const contentRef = useRef(null)
  const blackHexRef = useRef(null)

// Your existing scroll animations
  const { scrollYProgress: s2Progress } = useScroll({
    target: sectionTwoRef,
    offset: ['start 100%', 'start 50%'],
  })
  const sectionOpacity = useTransform(s2Progress, [0, 1], [1, 0])

  // Handle transition animation
  useEffect(() => {
    if (isTransitioning && contentRef.current && blackHexRef.current) {
      const tl = gsap.timeline({
        onComplete: () => setIsTransitioning(false)
      })
      
      // Your existing animation code here...
      gsap.set(contentRef.current, { opacity: 0 })
      
      const initialClipPath = `polygon(
        22% 49.5%, 22% 49.5%, 25% 44%, 75% 44%,
        78% 49.5%, 78% 49.5%, 78% 50.5%, 78% 50.5%,
        75% 56%, 25% 56%, 22% 50.5%, 22% 50.5%
      )`
      
      const step1ClipPath = `polygon(
        0% 49.5%, 22% 49.5%, 25% 44%, 75% 44%,
        78% 49.5%, 100% 49.5%, 100% 50.5%, 78% 50.5%,
        75% 56%, 25% 56%, 22% 50.5%, 0% 50.5%
      )`
      
      const step2ClipPath = `polygon(
        0% 45%, 22% 45%, 25% 35%, 75% 35%,
        78% 45%, 100% 45%, 100% 55%, 78% 55%,
        75% 65%, 25% 65%, 22% 55%, 0% 55%
      )`
      
      const finalClipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
      
      gsap.set([contentRef.current, blackHexRef.current], {
        clipPath: initialClipPath
      })
      
      tl.to([contentRef.current, blackHexRef.current], {
        duration: 1,
        ease: "power2.out",
        clipPath: step1ClipPath
      })
      .to(blackHexRef.current, {
        duration: 0.2,
        ease: "power2.out",
        opacity: 0
      })
      .to(contentRef.current, {
        duration: 0.1,
        ease: "power2.out",
        opacity: 1
      }, "<")
      .to(contentRef.current, {
        duration: 0.3,
        ease: "power2.inOut",
        clipPath: step2ClipPath
      })
      .to(contentRef.current, {
        duration: 0.3,
        ease: "power2.inOut",
        clipPath: finalClipPath
      })
    }
  }, [isTransitioning, setIsTransitioning])
  
  return (
    <div className='min-h-screen bg-white'>
      <Navigation />

      {/* Fade entire section including content */}
      <motion.section
        ref={sectionOneRef}
        className="relative h-screen w-full bg-white overflow-hidden"
        style={{ opacity: sectionOpacity }}
      >

         {/* Transition overlays scoped to this section */}
        {isTransitioning && (
          <>
            <div
              ref={blackHexRef}
              className="absolute inset-0 bg-black/30 z-40"
            />
            <div
              ref={contentRef}
              className="absolute inset-0 z-50 pointer-events-none"
            />
          </>
        )}

        
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
