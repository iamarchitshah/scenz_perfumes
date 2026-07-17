"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 1.5, ease: "easeInOut" }}
      onAnimationComplete={() => setLoading(false)}
      className="fixed inset-0 z-[99999] bg-background flex flex-col items-center justify-center pointer-events-none"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl md:text-6xl font-heading text-gold tracking-widest uppercase mb-4"
      >
        Aura
      </motion.h1>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "200px" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="h-[1px] bg-gold"
      />
    </motion.div>
  );
}
