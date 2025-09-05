"use client"
import { usePageTransition } from '@/hooks/usePageTransition'

export default function Template({ children }) {
  const { isTransitioning, contentRef, blackHexRef } = usePageTransition()
  
  return (
    <div className="relative min-h-screen">
      {/* Hexagon overlay */}
      <div
        ref={blackHexRef}
        className="fixed inset-0 bg-black/30 z-40"
        style={{ 
          display: isTransitioning ? 'block' : 'none'
        }}
      />
      
      {/* Content container */}
      <div 
        ref={contentRef} 
        className="relative z-50"
        style={{
          overflow: isTransitioning ? 'hidden' : 'visible',
          height: isTransitioning ? '100vh' : 'auto'
        }}
      >
        {children}
      </div>
    </div>
  )
}
