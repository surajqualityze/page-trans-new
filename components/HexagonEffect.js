"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function HexagonEffect() {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (overlayRef.current) {
      const tl = gsap.timeline({ repeat: -1, yoyo: true });

      // Start with hexagon collapsed to center
      gsap.set(overlayRef.current, {
        clipPath: `polygon(
          50% 50%,
          50% 50%,
          50% 50%,
          50% 50%,
          50% 50%,
          50% 50%
        )`
      });

      // Expand to hexagon shape
      tl.to(overlayRef.current, {
        duration: 1,
        ease: "power2.out",
        clipPath: `polygon(
          50% 0%,
          100% 25%,
          100% 75%,
          50% 100%,
          0% 75%,
          0% 25%
        )`
      });

      // Expand lines horizontally to cover full width
      tl.to(overlayRef.current, {
        duration: 1.5,
        ease: "power2.out",
        clipPath: `polygon(
          50% 0%,
          100% 25%,
          100% 75%,
          50% 100%,
          0% 75%,
          0% 25%
        )`,
        // Add horizontal expansion by changing the side points
        onUpdate: function() {
          const progress = this.progress();
          const leftExpand = 0 - (progress * 50); // Extend left beyond screen
          const rightExpand = 100 + (progress * 50); // Extend right beyond screen
          
          gsap.set(overlayRef.current, {
            clipPath: `polygon(
              50% 0%,
              ${rightExpand}% 25%,
              ${rightExpand}% 75%,
              50% 100%,
              ${leftExpand}% 75%,
              ${leftExpand}% 25%
            )`
          });
        }
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
      {/* Background content */}
      <div className="text-center z-10">
        <h1 className="text-6xl font-bold mb-4 text-black">Page Content</h1>
        <p className="text-xl text-gray-600">This content is visible through the hexagon</p>
      </div>

      {/* Black overlay with hexagon cutout */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black"
        style={{
          clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)'
        }}
      />
    </div>
  );
}
