// hooks/usePageTransition.js
"use client"
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from "gsap"

export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const contentRef = useRef(null)
  const blackHexRef = useRef(null)
  const pathname = usePathname()
  const timelineRef = useRef(null)
  
  // Memoized clip-path values for hexagon shape animation
  const clipPaths = {
    initial: `polygon(
      22% 49.5%, 22% 49.5%, 25% 44%, 75% 44%,
      78% 49.5%, 78% 49.5%, 78% 50.5%, 78% 50.5%,
      75% 56%, 25% 56%, 22% 50.5%, 22% 50.5%
    )`,
    step1: `polygon(
      0% 49.5%, 22% 49.5%, 25% 44%, 75% 44%,
      78% 49.5%, 100% 49.5%, 100% 50.5%, 78% 50.5%,
      75% 56%, 25% 56%, 22% 50.5%, 0% 50.5%
    )`,
    step2: `polygon(
      0% 45%, 22% 45%, 25% 35%, 75% 35%,
      78% 45%, 100% 45%, 100% 55%, 78% 55%,
      75% 65%, 25% 65%, 22% 55%, 0% 55%
    )`,
    final: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
  }

  const startTransition = () => {
    if (!contentRef.current || !blackHexRef.current) return
    
    setIsTransitioning(true)
    window.scrollTo(0, 0)
    
    // Kill existing timeline for performance
    if (timelineRef.current) {
      timelineRef.current.kill()
    }
    
    timelineRef.current = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false)
        timelineRef.current = null
      }
    })
    
    // Set initial state - content hidden, hexagon shape applied
    gsap.set(contentRef.current, { opacity: 0 })
    gsap.set([contentRef.current, blackHexRef.current], {
      clipPath: clipPaths.initial
    })
    
    // Reset black hex opacity
    gsap.set(blackHexRef.current, { opacity: 1 })
    
    // Animation sequence - hexagon expansion
    timelineRef.current
      // Step 1: Expand hexagon horizontally (left and right extending lines)
      .to([contentRef.current, blackHexRef.current], {
        duration: 1,
        ease: "power2.out",
        clipPath: clipPaths.step1
      })
      // Fade out black background and fade in content
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
      // Step 2: Expand hexagon vertically AND thicken horizontal lines
      .to(contentRef.current, {
        duration: 0.3,
        ease: "power2.inOut",
        clipPath: clipPaths.step2
      })
      // Step 3: Fill full screen - reveal everything
      .to(contentRef.current, {
        duration: 0.3,
        ease: "power2.inOut",
        clipPath: clipPaths.final
      })
  }
  
  useEffect(() => {
    setIsTransitioning(true)
  }, [pathname])
  
  useEffect(() => {
    if (isTransitioning) {
      startTransition()
    }
  }, [isTransitioning])
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
    }
  }, [])
  
  return {
    isTransitioning,
    contentRef,
    blackHexRef,
    startTransition
  }
}
