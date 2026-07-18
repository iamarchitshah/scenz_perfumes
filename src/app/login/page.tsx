"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setProcessing(true);
    
    if (isAdmin && !isSignUp) {
      if (email === "admin" && password === "123456") {
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
        router.push("/");
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', data.user.id).single();
        if (profile?.role === 'admin' || isAdmin) {
           router.push("/admin");
        } else {
           router.push("/");
        }
      }
    } catch (err: any) {
      setError(err.message || "Failed to authenticate");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden px-6">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-foreground/10 rounded-full blur-[120px]" />
        
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-10 z-10 shadow-2xl relative"
        >
            <h1 className="text-4xl text-center font-heading heading-gold uppercase tracking-widest mb-10">Scenz</h1>
            
            <h2 className="text-2xl font-heading text-white mb-2">{isAdmin ? "Admin Access" : (isSignUp ? "Join Scenz" : "Sign In")}</h2>
            <p className="text-muted-foreground text-sm tracking-widest uppercase mb-8">
              {isAdmin ? "Manage the empire" : (isSignUp ? "Create your legacy account" : "Enter the world of Scenz")}
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
              {error && <p className="text-red-500 text-xs tracking-widest uppercase bg-red-950/20 p-3 rounded-md border border-red-900/30">{error}</p>}
              
              {!isAdmin && isSignUp && (
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground mb-3 block">Full Name</label>
                  <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required placeholder="John Doe" className="w-full bg-transparent border-b border-white/20 pb-3 outline-none focus:border-gold transition-colors text-white" />
                </div>
              )}
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-3 block">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder={isAdmin ? "Enter admin ID" : "Email Address"} className="w-full bg-transparent border-b border-white/20 pb-3 outline-none focus:border-gold transition-colors text-white" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-3 block">Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" className="w-full bg-transparent border-b border-white/20 pb-3 outline-none focus:border-gold transition-colors text-white" />
              </div>
              <button type="submit" disabled={processing} className="w-full bg-gold text-background py-4 rounded-md tracking-widest uppercase text-sm font-medium hover:bg-white transition-all duration-300 mt-4 disabled:opacity-50">
                {processing ? "Authenticating..." : (isSignUp && !isAdmin ? "Create Account" : "Access Collection")}
              </button>

              {!isAdmin && (
                <div className="text-center pt-6 mt-6 border-t border-white/10">
                  <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="text-xs tracking-widest uppercase text-muted-foreground hover:text-gold transition-colors block mx-auto">
                    {isSignUp ? "Already have an account? Sign In" : "New to Scenz? Create Account"}
                  </button>
                </div>
              )}
            </form>
        </motion.div>
    </main>
  );
}
