"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Magnetic from "@/components/Magnetic";
import { CartStore } from "@/lib/cart";
import { supabase } from "@/lib/supabase";

function ProductDetails() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '1';
  
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      const { data } = await supabase.from('products').select('*').eq('id', id).single();
      if (data) setProduct(data);
      setLoading(false);
    }
    loadProduct();
  }, [id]);

  if (loading || !product) {
    return <div className="py-40 text-center uppercase tracking-widest text-gold text-sm animate-pulse">Distilling Fragrance Notes...</div>;
  }

  return (
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-32">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          
          {/* Product Image Viewer */}
          <div className="w-full md:w-1/2">
            <div className="glass-card p-6 rounded-2xl w-full h-[60vh] flex items-center justify-center relative group">
              <div className="absolute top-8 left-8 z-10">
                <span className="text-[10px] tracking-widest uppercase border border-gold/30 px-4 py-2 rounded-full text-gold">{product.tag || product.category || 'Luxury'}</span>
              </div>
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                className="object-contain drop-shadow-[0_20px_50px_rgba(212,175,55,0.4)] group-hover:scale-110 transition-transform duration-1000 p-12"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-heading heading-gold mb-4 uppercase">{product.name}</h1>
            <p className="text-3xl text-white font-light tracking-widest mb-8">₹{product.price}</p>
            
            <p className="text-muted-foreground font-light leading-relaxed mb-10 text-lg">
              A masterfully crafted signature scent blending seamlessly into a perfect harmony. 
              {product.name} captures an energetic, uplifting, and elegantly sophisticated aura tailored for any occasion.
            </p>

            <div className="border-t border-b border-white/10 py-6 mb-10 grid grid-cols-2 gap-y-4 text-sm font-light uppercase tracking-widest text-muted-foreground">
              <div>Top: <span className="text-white ml-2 capitalize">{product.category === 'Floral' ? 'Rose, Jasmine' : product.category === 'Woody' ? 'Sandalwood' : 'Bergamot, Citrus'}</span></div>
              <div>Projection: <span className="text-gold ml-2 capitalize">Intense</span></div>
              <div>Heart: <span className="text-white ml-2 capitalize">{product.category === 'Spicy' ? 'Pepper, Clove' : 'Lily of the Valley'}</span></div>
              <div>Longevity: <span className="text-gold ml-2 capitalize">12+ Hours</span></div>
              <div>Base: <span className="text-white ml-2 capitalize">{product.category === 'Oriental' ? 'Oud, Musk' : 'Vanilla, Amber'}</span></div>
              <div>Family: <span className="text-white ml-2 capitalize">{product.category || 'Signature'}</span></div>
            </div>

            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center border border-white/20 rounded-full">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-12 h-12 flex items-center justify-center text-white hover:text-gold hover:bg-white/5 rounded-l-full transition-colors">-</button>
                <span className="w-12 text-center text-white">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="w-12 h-12 flex items-center justify-center text-white hover:text-gold hover:bg-white/5 rounded-r-full transition-colors">+</button>
              </div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">35ml / 1.01 fl.oz</p>
            </div>

            <div className="flex gap-4">
              <Magnetic>
                <button onClick={() => {
                  for (let i = 0; i < quantity; i++) {
                    CartStore.addItem(product);
                  }
                }} className="flex-1 bg-gold text-background py-5 px-10 rounded-full uppercase tracking-widest text-sm font-medium shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-105 transition-transform w-[280px]">
                  Add To Bag
                </button>
              </Magnetic>
              <Magnetic>
                <button className="w-14 h-14 border border-white/20 rounded-full flex items-center justify-center text-white hover:border-gold hover:text-gold transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
  );
}

export default function Product() {
  return (
    <main className="min-h-screen bg-background pt-32">
      <PageLoader />
      <Navbar />
      <Suspense fallback={<div className="py-40 text-center uppercase tracking-widest text-gold text-sm animate-pulse">Distilling Fragrance Notes...</div>}>
         <ProductDetails />
      </Suspense>
      <div className="mt-8">
        <Footer />
      </div>
    </main>
  );
}
