"use client"
import React, { useEffect } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

export default function AnimatedTextReveal({ text }) {
  const controls = useAnimation()
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      }
    }
  }

  const letterVariants = {
    hidden: { color: '#9ca3af' }, // Gray
    visible: { color: '#000000', transition: { duration: 0.5 } } // Black
  }

  return (
    <motion.div
      ref={ref}
      className="inline-block"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          style={{ display: "inline-block" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  )
}
