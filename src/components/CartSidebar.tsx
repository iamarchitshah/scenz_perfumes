"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart, CartStore } from "@/lib/cart";

export default function CartSidebar() {
  const { items: cartItems, isOpen } = useCart();
  const onClose = () => CartStore.setIsOpen(false);

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const updateQuantity = (id: number, delta: number) => {
    CartStore.updateQuantity(id, delta);
  };

  const removeItem = (id: number) => CartStore.removeItem(id);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[101] shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-2xl font-heading heading-gold uppercase tracking-widest">Your Bag ({cartItems.length})</h2>
              <button onClick={onClose} className="text-muted-foreground hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {cartItems.length === 0 ? (
                <div className="flex flex-col flex-1 items-center justify-center text-muted-foreground py-20 text-center">
                  <p className="uppercase tracking-widest mb-4">Your bag is empty</p>
                  <button onClick={onClose} className="text-gold hover:text-white transition-colors uppercase text-sm border-b border-gold/30 pb-1">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                <div key={item.id} className="flex gap-6">
                  <div className="relative w-24 h-24 bg-white/5 rounded-lg border border-white/10 p-2">
                    <Image src={item.image} alt={item.name} fill className="object-contain" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-heading text-lg tracking-wide">{item.name}</h3>
                        <span className="text-sm">₹{item.price.toLocaleString()}</span>
                      </div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">{item.volume}</p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center gap-4 border border-white/20 rounded-full px-3 py-1">
                        <button onClick={() => updateQuantity(item.id, -1)} className="text-white hover:text-gold"><Minus className="w-3 h-3" /></button>
                        <span className="text-xs">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="text-white hover:text-gold"><Plus className="w-3 h-3" /></button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-xs uppercase tracking-widest text-muted-foreground hover:text-destructive transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
              )}
            </div>

            <div className="p-6 border-t border-white/10 bg-[#050505]">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm uppercase tracking-widest text-muted-foreground">Subtotal</span>
                <span className="text-xl font-heading text-gold">₹{subtotal.toLocaleString()}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-6 font-light text-center">Shipping & taxes calculated at checkout</p>
              <Link href="/checkout" onClick={onClose} className="w-full bg-gold text-background py-4 rounded-full flex items-center justify-center tracking-widest uppercase text-sm font-medium hover:bg-white transition-colors duration-300">
                Proceed to Checkout
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
