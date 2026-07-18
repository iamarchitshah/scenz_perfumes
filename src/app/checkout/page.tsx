"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/lib/cart";

export default function Checkout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [method, setMethod] = useState("COD");
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "" });
  
  const { items } = useCart();
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate Digital Payment Gateway processing (e.g. Razorpay / GPay UPI overlay delay)
    if (method === "UPI") {
      await new Promise(resolve => setTimeout(resolve, 2500)); 
    }

    const { data: { user } } = await supabase.auth.getUser();

    // Insert live order into Supabase
    const { error } = await supabase.from('orders').insert([{
      customer_name: `${formData.firstName} ${formData.lastName}`.trim() || user?.user_metadata?.full_name || "Guest Customer",
      customer_email: formData.email || user?.email || "guest@example.com",
      amount: subtotal,
      payment_method: method,
      status: "Pending",
      user_id: user?.id || null
    }]);

    setLoading(false);
    
    if (!error) {
      setSuccess(true);
      setTimeout(() => router.push('/'), 3000);
    }
  };
  return (
    <main className="min-h-screen bg-background pt-32 pb-24">
      <PageLoader />
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <h1 className="text-4xl md:text-5xl font-heading heading-gold mb-12 uppercase tracking-widest text-center">Checkout</h1>

        {success ? (
          <div className="flex flex-col items-center justify-center py-32 text-center animate-in fade-in zoom-in duration-700">
            <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-8 border border-green-500/50">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
            </div>
            <h2 className="text-4xl font-heading heading-gold uppercase tracking-widest mb-4">Order Confirmed</h2>
            <p className="text-muted-foreground tracking-widest uppercase">Thank you for your purchase. We are preparing your luxury fragrances.</p>
          </div>
        ) : (
        <form onSubmit={handleCheckout} className="flex flex-col lg:flex-row gap-16">
          <div className="flex-1 space-y-12">
            <div>
              <h2 className="text-xl font-heading mb-6 tracking-widest uppercase">Contact Information</h2>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                placeholder="Email Address" 
                className="w-full bg-transparent border-b border-white/20 pb-3 outline-none focus:border-gold transition-colors text-white mb-6" 
              />
            </div>

            <div>
              <h2 className="text-xl font-heading mb-6 tracking-widest uppercase">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-6">
                <input required type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} placeholder="First Name" className="w-full bg-transparent border-b border-white/20 pb-3 outline-none focus:border-gold transition-colors text-white" />
                <input required type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} placeholder="Last Name" className="w-full bg-transparent border-b border-white/20 pb-3 outline-none focus:border-gold transition-colors text-white" />
                <input required type="text" placeholder="Address" className="w-full bg-transparent border-b border-white/20 pb-3 outline-none focus:border-gold transition-colors text-white col-span-2" />
                <input type="text" placeholder="City" className="w-full bg-transparent border-b border-white/20 pb-3 outline-none focus:border-gold transition-colors text-white" />
                <input type="text" placeholder="State" className="w-full bg-transparent border-b border-white/20 pb-3 outline-none focus:border-gold transition-colors text-white" />
                <input type="text" placeholder="PIN Code" className="w-full bg-transparent border-b border-white/20 pb-3 outline-none focus:border-gold transition-colors text-white" />
                <input type="text" placeholder="Phone" className="w-full bg-transparent border-b border-white/20 pb-3 outline-none focus:border-gold transition-colors text-white" />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-heading mb-6 tracking-widest uppercase">Payment Method</h2>
              <div className="space-y-4">
                <label className="flex items-center gap-4 p-4 border border-white/20 rounded-xl cursor-pointer hover:border-gold transition-colors">
                  <input type="radio" name="payment" value="COD" checked={method === "COD"} onChange={(e) => setMethod(e.target.value)} className="accent-gold w-4 h-4" />
                  <span className="text-sm tracking-widest uppercase">Cash on Delivery (COD)</span>
                </label>
                <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${method === "UPI" ? "border-gold bg-gold/5" : "border-white/20 hover:border-gold"}`}>
                  <input type="radio" name="payment" value="UPI" checked={method === "UPI"} onChange={(e) => setMethod(e.target.value)} className="accent-gold w-4 h-4" />
                  <span className="text-sm tracking-widest uppercase text-[#34A853]">Google Pay (UPI) / Digital</span>
                </label>
              </div>
            </div>
            
            <button disabled={loading} className="w-full bg-gold text-background py-5 rounded-md tracking-widest uppercase text-sm font-medium hover:bg-white transition-colors duration-300 disabled:opacity-50">
              {loading ? (method === "UPI" ? "Processing UPI Gateway..." : "Confirming Order...") : "Complete Order"}
            </button>
          </div>

          <div className="w-full lg:w-96">
            <div className="glass-card p-8 rounded-2xl sticky top-32">
              <h2 className="text-xl font-heading mb-6 tracking-widest uppercase">Order Summary</h2>
              <div className="space-y-6 mb-6">
                {items.length === 0 ? (
                  <p className="text-muted-foreground text-sm uppercase tracking-widest text-center py-4">Your bag is empty</p>
                ) : (
                  items.map(item => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <h4 className="font-heading">{item.name}</h4>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm">₹{item.price * item.quantity}</span>
                    </div>
                  ))
                )}
              </div>
              <div className="border-t border-white/10 pt-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-lg font-heading text-gold mt-4 pt-4 border-t border-white/10">
                  <span>Total</span>
                  <span>₹{subtotal}</span>
                </div>
              </div>
            </div>
          </div>
        </form>
        )}
      </div>
      <Footer />
    </main>
  );
}
