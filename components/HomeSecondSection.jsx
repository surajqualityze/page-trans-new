"use client"
import React, { useEffect, useRef, useState, useCallback } from "react"
import { motion, useAnimation } from "framer-motion"

export default function HomeSecondSection() {
  const sectionRef = useRef(null)
  const controls = useAnimation()
  const [isCentered, setIsCentered] = useState(false)
  const [animationStarted, setAnimationStarted] = useState(false)
  const [animationDone, setAnimationDone] = useState(false)

  const text = `We create innovative digital experiences that transform businesses and empower teams to achieve extraordinary results through cutting-edge technology, creative design, and strategic partnerships that drive sustainable growth and lasting impact in today's competitive marketplace.`

  // Custom intersection observer for precise center detection
  const checkIfCentered = useCallback(() => {
    if (!sectionRef.current) return

    const rect = sectionRef.current.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const sectionCenter = rect.top + rect.height / 2
    const viewportCenter = viewportHeight / 2
    
    // Check if section center is near viewport center (within 100px tolerance)
    const isInCenter = Math.abs(sectionCenter - viewportCenter) < 100
    
    setIsCentered(isInCenter)

    // Reset animation if section is far from center (scrolled away)
    if (!isInCenter && rect.top > viewportHeight * 0.8) {
      // Section is below viewport, reset animation
      setAnimationStarted(false)
      setAnimationDone(false)
      controls.set("hidden")
    }
  }, [controls])

  // Set up scroll listener
  useEffect(() => {
    const handleScroll = () => {
      checkIfCentered()
    }

    window.addEventListener('scroll', handleScroll)
    checkIfCentered() // Check on mount

    return () => window.removeEventListener('scroll', handleScroll)
  }, [checkIfCentered])

  // Lock/unlock scroll based on animation state
  useEffect(() => {
    if (animationStarted && !animationDone) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
      document.documentElement.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
      document.documentElement.style.overflow = 'unset'
    }
  }, [animationStarted, animationDone])

  // Start animation when section is centered
  useEffect(() => {
    if (isCentered && !animationStarted) {
      setAnimationStarted(true)
      controls.start("visible").then(() => {
        setTimeout(() => {
          setAnimationDone(true)
        }, 500)
      })
    }
  }, [isCentered, controls, animationStarted])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.01,
        delayChildren: 0.2
      }
    }
  }

  const letterVariants = {
    hidden: { 
      color: "#9ca3af",
      transition: { duration: 0 } // Instant reset to gray
    },
    visible: { 
      color: "#000000", 
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-white flex items-center h-screen sticky top-0 z-30"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.div
          className="text-4xl md:text-5xl font-bold leading-tight"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {text.split("").map((char, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              className="inline-block"
              style={{ 
                whiteSpace: char === " " ? "pre" : "normal"
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
