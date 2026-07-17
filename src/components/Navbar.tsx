"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Search, ShoppingBag, Menu, X, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Magnetic from "./Magnetic";
import CartSidebar from "./CartSidebar";
import { useCart, CartStore } from "@/lib/cart";
import { supabase } from "@/lib/supabase";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { items } = useCart();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex items-center justify-between px-6 md:px-12 py-4 md:py-6 ${
          scrolled ? "glass-card py-4" : "bg-transparent"
        }`}
      >
        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex-1">
          <button onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Desktop Links Left */}
        <div className="hidden md:flex flex-1 gap-8">
          {navLinks.slice(0, 2).map((link, i) => (
            <Magnetic key={i}>
              <Link
                href={link.href}
                className="text-sm tracking-widest uppercase hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </Link>
            </Magnetic>
          ))}
        </div>

        {/* Logo */}
        <div className="flex-1 flex justify-center">
          <Link href="/" className="text-3xl md:text-5xl font-heading font-medium tracking-widest uppercase text-center heading-gold">
            Aura
          </Link>
        </div>

        {/* Desktop Links / Icons Right */}
        <div className="hidden md:flex flex-1 gap-8 justify-end items-center">
          {navLinks.slice(2, 4).map((link, i) => (
            <Magnetic key={i}>
              <Link
                href={link.href}
                className="text-sm tracking-widest uppercase hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </Link>
            </Magnetic>
          ))}
          <div className="flex items-center gap-6 ml-4 border-l border-border/50 pl-6">
            <Magnetic>
              <button>
                <Search className="w-5 h-5 hover:text-gold transition-colors" />
              </button>
            </Magnetic>
            <Magnetic>
              <Link href="/orders" className="group relative pt-1">
                <User className="w-5 h-5 hover:text-gold transition-colors" />
                {user && <span className="absolute w-2 h-2 rounded-full bg-gold top-0 right-0"></span>}
              </Link>
            </Magnetic>
            <Magnetic>
              <button onClick={() => CartStore.setIsOpen(true)} className="relative">
                <ShoppingBag className="w-5 h-5 hover:text-gold transition-colors" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-background text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                    {totalItems}
                  </span>
                )}
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Mobile Icons Right */}
        <div className="md:hidden flex-1 flex justify-end gap-4">
          <Link href="/orders" className="relative pt-1">
            <User className="w-5 h-5" />
            {user && <span className="absolute w-2 h-2 rounded-full bg-gold top-0 right-0"></span>}
          </Link>
          <button onClick={() => CartStore.setIsOpen(true)} className="relative">
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-background text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex flex-col justify-center items-center h-screen w-screen"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-8 right-6"
            >
              <X className="w-8 h-8 text-gold" />
            </button>
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    className="text-4xl font-heading uppercase text-foreground hover:text-gold transition-colors block"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartSidebar />
    </>
  );
}
