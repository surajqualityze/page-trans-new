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
    0% 40%, 22% 40%, 25% 30%, 75% 30%,
    78% 40%, 100% 40%, 100% 60%, 78% 60%,
    75% 70%, 25% 70%, 22% 60%, 0% 60%
  )`,
   step3: `polygon(
      0% 25%, 22% 25%, 25% 15%, 75% 15%,
      78% 25%, 100% 25%, 100% 75%, 78% 75%,
      75% 85%, 25% 85%, 22% 75%, 0% 75%
    )`,
    step4: `polygon(
      0% 10%, 22% 10%, 25% 0%, 75% 0%,
      78% 10%, 100% 10%, 100% 90%, 78% 90%,
      75% 100%, 25% 100%, 22% 90%, 0% 90%
    )`,

  
  final: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
}


  const startTransition = () => {
    if (!contentRef.current || !blackHexRef.current) return
    
    setIsTransitioning(true)
    window.scrollTo(0, 0)
    
    if (timelineRef.current) {
      timelineRef.current.kill()
    }
    
    timelineRef.current = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false)
        timelineRef.current = null
      }
    })
    
    gsap.set(contentRef.current, { opacity: 0 })
    gsap.set([contentRef.current, blackHexRef.current], {
      clipPath: clipPaths.initial
    })
    gsap.set(blackHexRef.current, { opacity: 1 })
    
    timelineRef.current
      .to([contentRef.current, blackHexRef.current], {
        duration: 1,
        ease: "power2.out",
        clipPath: clipPaths.step1
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
        clipPath: clipPaths.step2
      })
       .to(contentRef.current, {
        duration: 0.3,
        ease: "power2.inOut",
        clipPath: clipPaths.step3
      })
       .to(contentRef.current, {
        duration: 0.4,
        ease: "power2.inOut",
        clipPath: clipPaths.step4
      })
      .to(contentRef.current, {
        duration: 0.2,
        ease: "power2.inOut",
        clipPath: clipPaths.final
      })
  }
  
  // 🔹 Trigger on route change
  useEffect(() => {
    setIsTransitioning(true)
  }, [pathname])

  // 🔹 Trigger on splash screen exit (first load)
  useEffect(() => {
    const handler = () => setIsTransitioning(true)
    window.addEventListener("firstLoadDone", handler)
    return () => window.removeEventListener("firstLoadDone", handler)
  }, [])
  
  useEffect(() => {
    if (isTransitioning) {
      startTransition()
    }
  }, [isTransitioning])
  
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
