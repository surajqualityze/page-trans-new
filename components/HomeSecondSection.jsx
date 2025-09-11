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
  }, [])

  // Set up scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (!animationStarted) {
        checkIfCentered()
      }
    }

    window.addEventListener('scroll', handleScroll)
    checkIfCentered() // Check on mount

    return () => window.removeEventListener('scroll', handleScroll)
  }, [checkIfCentered, animationStarted])

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
      transition: { duration: 0 }
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
      className="py-20 bg-gray-50 flex items-center min-h-screen sticky top-0 z-30"
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
      <p>
        Discover how a cloud-based EQMS can streamline compliance, accelerate production, and ensure the highest standards for gene therapoes, and other groundbreaking innovations. Don't let outdated systems gols back your scientific breakthroughs. From GMP to ICH guideliness, managing biotech quality has neverbeen easier. Experience how a modern EQMS can simply traceability, mitigate risks, and keep your lab, production, and compliance teams in sync-all while boosting efficiency.
      </p>

      <p>
        Biotechnology is at the forefront of solving humaity's greatest challenges, but with groundbreaking innovation comes unparalleled complexity. Managing sensitive biologic products, adhering to multifaceted regulatory requirements, and ensuring process integrity demand more than traditional system can offer. Qualityze EQMS Solution empower you with intelligent, cloud-based solutions for quality, safety, and compliance. Our platform integrates seamlessly with your processes to optimize batch consistency, validate workflows, and navigate global regulatory demands-all while enabling real-time visibility and proactibe decision-making. With Qualityze, you'll harness the power of digital transformation to deliver safer, more effective products faster.
      </p>

      <p>
        The cannabis indstry is transforming, and so are the 
      </p>

    </section>
  )
}
