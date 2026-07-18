"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { usePathname, useRouter } from "next/navigation";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let currentSession = session;
    supabase.auth.getSession().then(({ data }) => {
      currentSession = data.session;
      setSession(currentSession);
      setLoading(false);
      
      if (!currentSession && pathname !== "/login") {
        router.replace("/login");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (!newSession && pathname !== "/login") {
        router.replace("/login");
      } else if (newSession && pathname === "/login") {
        router.replace("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px]" />
        <div className="w-16 h-16 border-2 border-gold/30 border-t-gold rounded-full animate-spin mb-8" />
        <h1 className="text-3xl font-heading heading-gold uppercase tracking-widest animate-pulse">Scenz</h1>
      </div>
    );
  }

  // Prevent flash of guarded content before redirect
  if (!session && pathname !== "/login") {
    return <div className="min-h-screen bg-background" />;
  }

  return <>{children}</>;
}
