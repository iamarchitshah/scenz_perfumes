"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (isAdmin && !isSignUp) {
      if (email === "admin" && password === "123456") {
        onClose();
        router.push("/admin");
        return;
      }
    }

    try {
      if (isSignUp && !isAdmin) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName, role: 'user' } }
        });
        if (error) throw error;
        onClose();
        router.push("/shop");
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        
        onClose();
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', data.user.id).single();
        if (profile?.role === 'admin' || isAdmin) {
           router.push("/admin");
        } else {
           router.push("/orders");
        }
      }
    } catch (err: any) {
      setError(err.message || "Failed to authenticate");
    }
  };

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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 z-[101] shadow-2xl"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-muted-foreground hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
            
            
            <h2 className="text-3xl font-heading heading-gold mb-2">{isAdmin ? "Admin Access" : (isSignUp ? "Join Aura" : "Sign In")}</h2>
            <p className="text-muted-foreground text-sm tracking-widest uppercase mb-8">
              {isAdmin ? "Manage the empire" : (isSignUp ? "Create your legacy account" : "Enter the world of Aura")}
            </p>

            <div className="flex gap-4 mb-8">
              <button 
                onClick={() => { setIsAdmin(false); setIsSignUp(false); setError(null); }}
                className={`flex-1 py-2 text-xs uppercase tracking-widest border-b-2 transition-colors ${!isAdmin ? 'border-gold text-gold' : 'border-white/10 text-muted-foreground hover:text-white'}`}
              >
                Customer
              </button>
              <button 
                onClick={() => { setIsAdmin(true); setIsSignUp(false); setError(null); }}
                className={`flex-1 py-2 text-xs uppercase tracking-widest border-b-2 transition-colors ${isAdmin ? 'border-gold text-gold' : 'border-white/10 text-muted-foreground hover:text-white'}`}
              >
                Admin
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {error && <p className="text-red-500 text-xs tracking-widest uppercase">{error}</p>}
              
              {!isAdmin && isSignUp && (
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground mb-3 block">Full Name</label>
                  <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required placeholder="John Doe" className="w-full bg-transparent border-b border-white/20 pb-3 outline-none focus:border-gold transition-colors text-white" />
                </div>
              )}
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-3 block">Email</label>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} required placeholder={isAdmin ? "Enter admin ID" : "Enter your email"} className="w-full bg-transparent border-b border-white/20 pb-3 outline-none focus:border-gold transition-colors text-white" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-3 block">Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" className="w-full bg-transparent border-b border-white/20 pb-3 outline-none focus:border-gold transition-colors text-white" />
              </div>
              <button type="submit" className="w-full bg-gold text-background py-4 rounded-md tracking-widest uppercase text-sm font-medium hover:bg-white transition-colors duration-300 mt-4">
                {isSignUp && !isAdmin ? "Create Account" : "Enter"}
              </button>

              {!isAdmin && (
                <div className="text-center pt-4 border-t border-white/10">
                  <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="text-xs tracking-widest uppercase text-muted-foreground hover:text-gold transition-colors block mx-auto">
                    {isSignUp ? "Already have an account? Sign In" : "New to Aura? Create Account"}
                  </button>
                </div>
              )}
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
