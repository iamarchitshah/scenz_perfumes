"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function BrandStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section ref={containerRef} className="pt-32 pb-56 relative overflow-hidden bg-[#0a0a0a]">
      {/* Background text */}
      <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-heading font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none">
        HERITAGE
      </h2>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center gap-16 md:gap-24">
        <div className="w-full md:w-1/2">
          <motion.div 
            style={{ y: y1 }} 
            className="relative h-[60vh] w-full rounded-2xl overflow-hidden glass-card p-2"
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <Image
                src="/images/hero.png" // Re-using image as placeholder for brand story
                alt="Brand Heritage"
                fill
                className="object-cover opacity-60 scale-110"
              />
              <div className="absolute inset-0 bg-gold/10 mix-blend-overlay" />
            </div>
          </motion.div>
        </div>

        <div className="w-full md:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            <span className="text-gold text-xs tracking-[0.3em] uppercase mb-6 block">Our Heritage</span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading heading-gold mb-8 leading-tight">
              A Century of <br /> Elegance
            </h2>
            
            <div className="space-y-6 text-muted-foreground font-light text-lg leading-relaxed">
              <p>
                Since 1924, Scenz has been at the forefront of luxury perfumery, blending tradition with avant-garde innovation. 
                Our master perfumers travel the globe to source the rarest, most exquisite ingredients.
              </p>
              <p>
                Each bottle is a testament to our dedication to craftsmanship—a symphony of scent that transcends time and space, 
                designed to evoke emotion and create lasting memories.
              </p>
            </div>

            <motion.div 
              style={{ y: y2 }}
              className="mt-16 flex items-center gap-8"
            >
              <div className="flex flex-col">
                <span className="text-4xl font-heading text-gold">1924</span>
                <span className="text-xs uppercase tracking-widest text-muted-foreground mt-2">Founded</span>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="flex flex-col">
                <span className="text-4xl font-heading text-gold">50+</span>
                <span className="text-xs uppercase tracking-widest text-muted-foreground mt-2">Master Perfumers</span>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="flex flex-col">
                <span className="text-4xl font-heading text-gold">80</span>
                <span className="text-xs uppercase tracking-widest text-muted-foreground mt-2">Boutiques</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
