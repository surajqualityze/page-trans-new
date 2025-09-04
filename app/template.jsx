"use client"
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from "gsap"

export default function Template({ children }) {
  const [isTransitioning, setIsTransitioning] = useState(true)
  const contentRef = useRef(null)
  const blackHexRef = useRef(null)
  const pathname = usePathname()
  
  useEffect(() => {
    setIsTransitioning(true)
  }, [pathname])
  
  useEffect(() => {
    if (isTransitioning && contentRef.current && blackHexRef.current) {
      // Ensure we're at the top during transition
      window.scrollTo(0, 0)
      
      const tl = gsap.timeline({
        onComplete: () => setIsTransitioning(false)
      })
      
      // Hide content initially
      gsap.set(contentRef.current, { opacity: 0 })
      
      // Define all clip-path variables upfront
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
      
      // Set up both elements with initial clip-path
      gsap.set([contentRef.current, blackHexRef.current], {
        clipPath: initialClipPath
      })
      
      // Step 1: Animate the left and right extending lines
      tl.to([contentRef.current, blackHexRef.current], {
        duration: 1,
        ease: "power2.out",
        clipPath: step1ClipPath
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
        clipPath: step2ClipPath
      })
      
      // Step 4: Fill full screen - reveal everything
      .to(contentRef.current, {
        duration: 0.3,
        ease: "power2.inOut",
        clipPath: finalClipPath
      })
    }
  }, [isTransitioning])
  
  return (
    <div className="relative min-h-screen">
      {/* Black hexagon background */}
      <div
        ref={blackHexRef}
        className="fixed inset-0 bg-black/30 z-40"
        style={{ 
          display: isTransitioning ? 'block' : 'none'
        }}
      />
      
      <div 
        ref={contentRef} 
        className="relative z-50"
        style={{
          // Prevent scrolling during transition
          overflow: isTransitioning ? 'hidden' : 'visible',
          height: isTransitioning ? '100vh' : 'auto'
        }}
      >
        {children}
      </div>
    </div>
  )
}
