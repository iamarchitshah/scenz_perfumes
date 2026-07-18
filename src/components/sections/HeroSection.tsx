"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import Magnetic from "@/components/Magnetic";
import Link from "next/link";

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  type Particle = { x: number; y: number; opacity: number; animateY: number; duration: number; };
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
      setParticles(Array.from({ length: 20 }).map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: Math.random(),
        animateY: Math.random() * -200,
        duration: Math.random() * 5 + 5
      })));
    }, 0);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background flex flex-col">
      {/* Background with luxury gradient */}
      <div className="absolute inset-0 luxury-gradient opacity-60" />
      
      {/* Background Image / Glow */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            x: mousePosition.x * -20,
            y: mousePosition.y * -20,
          }}
          transition={{ type: "spring", stiffness: 75, damping: 20 }}
          className="w-full h-full relative opacity-40 blur-sm mix-blend-screen"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold rounded-full blur-[150px] opacity-20" />
        </motion.div>
      </div>

      {/* Hero Content */}
      <div className="flex-1 w-full flex items-center justify-center">
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-7xl mx-auto pt-20 pb-12">
        {/* Floating Product Image */}
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-64 h-96 md:w-80 md:h-[30rem] mb-8"
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 1, 0, -1, 0],
              x: mousePosition.x * 15,
            }}
            transition={{
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              x: { type: "spring", stiffness: 50, damping: 20 },
            }}
            className="w-full h-full relative"
          >
            <Image
              src="/images/hero.png"
              alt="Scenz Luxury Perfume"
              fill
              className="object-contain drop-shadow-[0_20px_50px_rgba(212,175,55,0.4)]"
              priority
            />
          </motion.div>
        </motion.div>

        {/* Animated Typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-heading font-medium tracking-tight heading-gold leading-none pb-4">
            SCENZ
          </h1>
          <p className="text-lg md:text-2xl text-muted-foreground font-light max-w-2xl mt-4 tracking-widest uppercase">
            The Essence of Eternity
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row gap-6 mt-12"
        >
          <Magnetic>
            <Link href="#featured" className="px-10 py-4 bg-gold text-background rounded-full font-medium tracking-widest uppercase text-sm hover:scale-105 transition-transform inline-block">
              Discover Collection
            </Link>
          </Magnetic>
          <Magnetic>
            <Link href="/product" className="px-10 py-4 border border-gold/50 text-gold rounded-full font-medium tracking-widest uppercase text-sm hover:bg-gold/10 transition-colors inline-block">
              Shop Now
            </Link>
          </Magnetic>
        </motion.div>
        
        </div>
      </div>

      {/* Floating Particles - Render only on client to avoid hydration mismatch */}
      {mounted && particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gold rounded-full mix-blend-screen"
          initial={{
            x: p.x,
            y: p.y,
            opacity: p.opacity,
          }}
          animate={{
            y: [null, p.animateY],
            opacity: [null, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Scroll Indicator */}
      <div className="relative z-10 pb-10 w-full flex justify-center mt-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest text-gold text-center">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
