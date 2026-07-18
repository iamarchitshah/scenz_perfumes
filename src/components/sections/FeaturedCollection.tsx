"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Magnetic from "@/components/Magnetic";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { CartStore } from "@/lib/cart";
import Link from "next/link";

type Product = { id: number; name: string; price: number; image: string; tag: string };

export default function FeaturedCollection() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchFeatured() {
      const { data } = await supabase.from('products').select('*').limit(4);
      if (data) setProducts(data);
    }
    fetchFeatured();
  }, []);
  return (
    <section id="featured" className="py-32 bg-background relative z-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div>
            <h2 className="text-4xl md:text-6xl font-heading heading-gold mb-4">Featured Collection</h2>
            <p className="text-muted-foreground text-sm tracking-widest uppercase max-w-md">
              A curated selection of our most exquisite and sought-after fragrances.
            </p>
          </div>
          <Magnetic>
            <Link href="/shop" className="text-sm border-b border-gold text-gold pb-1 tracking-widest uppercase hover:text-white hover:border-white transition-colors">
              View All Products
            </Link>
          </Magnetic>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative glass-card p-6 rounded-xl overflow-hidden"
              whileHover={{ y: -10 }}
            >
              <div className="absolute top-4 left-4 z-10">
                <span className="text-[10px] tracking-widest uppercase border border-gold/30 px-3 py-1 rounded-full text-gold">
                  {product.tag}
                </span>
              </div>
              
              <div className="relative h-72 w-full mb-6 overflow-hidden flex items-center justify-center">
                <motion.div
                  className="w-full h-full relative"
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </motion.div>
                
                <div className="absolute inset-0 bg-background/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
                  <button onClick={() => CartStore.addItem(product)} className="bg-gold text-background w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                    <span className="sr-only">Add to Cart</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                  </button>
                  <a href={`/product?id=${product.id}`} className="bg-white/10 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                    <span className="sr-only">Quick View</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                  </a>
                </div>
              </div>

              <div className="text-center relative z-10 border-t border-white/5 pt-4">
                <h3 className="text-xl font-heading tracking-wide mb-2 text-foreground group-hover:text-gold transition-colors">{product.name}</h3>
                <p className="text-muted-foreground font-light tracking-widest">₹{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
