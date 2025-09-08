// page.jsx
"use client";
import Navigation from "@/components/Navigation";
import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HomeSecondSection from "@/components/HomeSecondSection";

// Memoized video component
const OptimizedVideo = React.memo(({ src, className, ...props }) => (
  <video
    autoPlay
    loop
    muted
    playsInline
    preload="metadata"
    className={className}
    {...props}
  >
    <source src={src} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
));

OptimizedVideo.displayName = "OptimizedVideo";

export default function Home() {
  const sectionOneRef = useRef(null);
  const sectionTwoRef = useRef(null);

  // Memoize scroll configuration
  const scrollConfig = useMemo(
    () => ({
      target: sectionTwoRef,
      offset: ["start 100%", "start 30%"],
    }),
    []
  );

  const { scrollYProgress: s2Progress } = useScroll(scrollConfig);
  const sectionOpacity = useTransform(s2Progress, [0, 1], [1, 0]);

  // Memoized content
  const heroContent = useMemo(
    () => ({
      title: "Welcome to Our Amazing Platform",
      subtitle:
        "Experience the future with cutting-edge technology and innovative solutions",
      buttonText: "Get Started",
    }),
    []
  );

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section - Fade entire section including content */}
      <motion.section
        ref={sectionOneRef}
        className="relative h-screen w-full bg-white overflow-hidden"
        style={{ opacity: sectionOpacity }}
      >
        {/* Background Video */}
        <OptimizedVideo
          src="https://www.pexels.com/download/video/4884233/"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Content Container */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-black">
                <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  {heroContent.title}
                </h1>
                <p className="text-xl lg:text-2xl mb-8 text-gray-600">
                  {heroContent.subtitle}
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                  {heroContent.buttonText}
                </button>
              </div>

              <div className="relative">
                <OptimizedVideo
                  src="https://www.pexels.com/download/video/6177737/"
                  className="w-full h-64 lg:h-80 object-cover rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section Two */}
      <div ref={sectionTwoRef}>
        <HomeSecondSection />
      </div>

      {/* Third Section */}
      <section className="h-screen bg-gray-200 flex items-center relative z-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800">Next Section</h2>
          <p className="text-xl text-gray-600 mt-4">
            This section appears after the text animation completes
          </p>
        </div>
      </section>
    </div>
  );
}
