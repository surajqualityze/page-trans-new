"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function DottedBackground() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:20px_20px]" />
  );
}

export default function LoadingScreen({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // 🔹 Tell template.jsx to trigger hexagon animation
      window.dispatchEvent(new Event("firstLoadDone"));
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-white overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
          >
            <DottedBackground />
            <motion.h1
              className="relative z-10 text-4xl md:text-6xl font-bold text-gray-900"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              Qualityze
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-700`}
      >
        {children}
      </div>
    </div>
  );
}
