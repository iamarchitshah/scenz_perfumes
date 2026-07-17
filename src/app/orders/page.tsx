"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import { supabase } from "@/lib/supabase";
import { LogOut, Package } from "lucide-react";
import Magnetic from "@/components/Magnetic";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadUserAndOrders() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/");
        return;
      }
      setUser(user);
      
      const { data, error } = await supabase.from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (!error && data) {
        setOrders(data);
      }
      setLoading(false);
    }
    loadUserAndOrders();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background pt-32">
        <PageLoader />
        <Navbar />
        <div className="py-20 text-center uppercase tracking-widest text-gold text-sm animate-pulse">Loading Profile...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-32 pb-20">
      <PageLoader />
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-4xl font-heading heading-gold uppercase mb-2">My Profile</h1>
            <p className="text-muted-foreground uppercase tracking-widest text-sm">Welcome back, {user?.user_metadata?.full_name || user?.email}</p>
          </div>
          <Magnetic>
            <button onClick={handleSignOut} className="flex items-center gap-3 text-red-400 hover:text-red-300 transition-colors uppercase tracking-widest text-sm border border-red-900/30 px-6 py-3 rounded-full bg-red-950/20">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </Magnetic>
        </div>

        <div>
          <h2 className="text-2xl font-heading heading-gold uppercase mb-8 flex items-center gap-3">
            <Package className="w-5 h-5 text-white" /> Order History
          </h2>

          {orders.length === 0 ? (
            <div className="glass-card p-12 text-center rounded-2xl flex flex-col items-center">
              <Package className="w-12 h-12 text-white/20 mb-4" />
              <p className="text-white uppercase tracking-widest mb-6 font-light">No orders found yet</p>
              <Magnetic>
                <button onClick={() => router.push('/shop')} className="uppercase tracking-widest text-sm font-medium border border-gold text-gold px-8 py-3 rounded-full hover:bg-gold hover:text-background transition-colors duration-500">
                  Shop Collection
                </button>
              </Magnetic>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="glass-card p-6 md:p-8 rounded-xl flex flex-col md:flex-row justify-between gap-6 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="space-y-3">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">Order <span className="text-white">#{order.id.split('-')[0]}</span></p>
                    <p className="text-sm font-light text-white">{new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric'})}</p>
                    <div className="flex gap-4 items-center pt-2">
                       <span className={`px-3 py-1 text-[10px] uppercase tracking-widest rounded-full ${order.status === 'Pending' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : order.status === 'Delivered' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                         {order.status}
                       </span>
                       <span className="text-xs uppercase tracking-widest text-muted-foreground border border-white/10 px-3 py-1 rounded-full">{order.payment_method}</span>
                    </div>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Total</p>
                    <p className="text-2xl text-gold font-light tracking-widest">₹{order.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="mt-32">
         <Footer />
      </div>
    </main>
  );
}
