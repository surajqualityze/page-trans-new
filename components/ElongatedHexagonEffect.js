"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ElongatedHexagonOnly() {
  const hexRef = useRef(null);
  
  useEffect(() => {
    if (hexRef.current) {
      const tl = gsap.timeline();
      
      // Start with hexagon but collapsed left/right lines
      gsap.set(hexRef.current, {
        clipPath: `polygon(
          22% 49.5%,   /* start left line at connector */
          22% 49.5%,   /* left connector start */
          25% 44%,     /* hexagon top-left */
          75% 44%,     /* hexagon top-right */
          78% 49.5%,   /* right connector start */
          78% 49.5%,   /* end right line at connector */
          78% 50.5%,   /* end right line at connector bottom */
          78% 50.5%,   /* right connector end */
          75% 56%,     /* hexagon bottom-right */
          25% 56%,     /* hexagon bottom-left */
          22% 50.5%,   /* left connector end */
          22% 50.5%    /* start left line at connector bottom */
        )`
      });
      
      // Step 1: Animate the left and right extending lines
      tl.to(hexRef.current, {
        duration: 1,
        ease: "power2.out",
        clipPath: `polygon(
          0% 49.5%,    /* extend left line */
          22% 49.5%,   /* left connector start (unchanged) */
          25% 44%,     /* hexagon top-left (unchanged) */
          75% 44%,     /* hexagon top-right (unchanged) */
          78% 49.5%,   /* right connector start (unchanged) */
          100% 49.5%,  /* extend right line */
          100% 50.5%,  /* extend right line bottom */
          78% 50.5%,   /* right connector end (unchanged) */
          75% 56%,     /* hexagon bottom-right (unchanged) */
          25% 56%,     /* hexagon bottom-left (unchanged) */
          22% 50.5%,   /* left connector end (unchanged) */
          0% 50.5%     /* extend left line bottom */
        )`
      })
      
      // Step 2: Expand the hexagon vertically
      .to(hexRef.current, {
        duration: 0.5,
        ease: "power2.inOut",
        clipPath: `polygon(
          0% 49.5%,    /* left line (unchanged) */
          22% 49.5%,   /* left connector start (unchanged) */
          25% 20%,     /* hexagon top-left - expand up */
          75% 20%,     /* hexagon top-right - expand up */
          78% 49.5%,   /* right connector start (unchanged) */
          100% 49.5%,  /* right line (unchanged) */
          100% 50.5%,  /* right line bottom (unchanged) */
          78% 50.5%,   /* right connector end (unchanged) */
          75% 80%,     /* hexagon bottom-right - expand down */
          25% 80%,     /* hexagon bottom-left - expand down */
          22% 50.5%,   /* left connector end (unchanged) */
          0% 50.5%     /* left line bottom (unchanged) */
        )`
      })
      
      // Step 3: Final expansion to cover more screen
      .to(hexRef.current, {
        duration: 1,
        ease: "power2.out",
        clipPath: `polygon(
          -20% 49.5%,  /* extend left line further */
          10% 49.5%,   /* adjust left connector */
          15% 5%,      /* hexagon top-left - near screen edge */
          85% 5%,      /* hexagon top-right - near screen edge */
          90% 49.5%,   /* adjust right connector */
          120% 49.5%,  /* extend right line further */
          120% 50.5%,  /* extend right line bottom further */
          90% 50.5%,   /* adjust right connector bottom */
          85% 95%,     /* hexagon bottom-right - near screen edge */
          15% 95%,     /* hexagon bottom-left - near screen edge */
          10% 50.5%,   /* adjust left connector bottom */
          -20% 50.5%   /* extend left line bottom further */
        )`
      })

      // ✅ Step 4: Fill full screen
      .to(hexRef.current, {
        duration: 0.1,
        ease: "power2.inOut",
        clipPath: `polygon(
          0 0, 100% 0, 100% 100%, 0 100%
        )`
      });
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center overflow-hidden">
      <div
        ref={hexRef}
        className="absolute inset-0 bg-red-500"
      />
    </div>
  );
}
