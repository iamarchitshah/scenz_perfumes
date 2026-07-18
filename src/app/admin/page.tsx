"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import { 
  Plus, Edit2, Trash2, LayoutDashboard, Package, 
  ShoppingCart, MessageSquare, LogOut, TrendingUp, 
  Users, Clock, CheckCircle, XCircle 
} from "lucide-react";
import Image from "next/image";

type Product = { id: number; name: string; price: number; stock: number; category: string; image: string };
type Order = { id: string; customer_name: string; customer_email: string; amount: number; status: string; created_at: string };
type Message = { id: number; name: string; email: string; message: string; status: string; created_at: string };

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    async function fetchData() {
      const [prodRes, orderRes, msgRes] = await Promise.all([
        supabase.from('products').select('*').order('id', { ascending: true }),
        supabase.from('orders').select('*').order('created_at', { ascending: false }),
        supabase.from('messages').select('*').order('created_at', { ascending: false })
      ]);
      if (prodRes.data) setProducts(prodRes.data);
      if (orderRes.data) setOrders(orderRes.data);
      if (msgRes.data) setMessages(msgRes.data);
    }
    fetchData();
  }, []);

  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.amount), 0);
  const pendingOrdersCount = orders.filter(o => o.status === 'Pending').length;
  const unreadMessagesCount = messages.filter(m => m.status === 'Unread').length;

  return (
    <main className="min-h-screen bg-[#050505] pt-24">
      {/* Hide primary navbar internally, or keep it. Let's keep it but simplified. */}
      {/* We won't use the standard Navbar here to give a true admin isolated feel. */}
      
      <div className="flex h-[calc(100vh-6rem)] max-w-[1600px] mx-auto overflow-hidden">
        
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/10 p-6 flex flex-col justify-between hidden lg:flex">
          <div>
            <div className="mb-12">
              <h1 className="text-3xl font-heading heading-gold uppercase tracking-widest">Scenz</h1>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1 block">Command Center</span>
            </div>

            <nav className="space-y-4">
              <button 
                onClick={() => setActiveTab("overview")}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sm tracking-widest uppercase transition-all duration-300 ${activeTab === "overview" ? "bg-gold/10 text-gold border border-gold/20" : "text-muted-foreground hover:text-white hover:bg-white/5"}`}
              >
                <LayoutDashboard className="w-4 h-4" /> Overview
              </button>
              <button 
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sm tracking-widest uppercase transition-all duration-300 ${activeTab === "orders" ? "bg-gold/10 text-gold border border-gold/20" : "text-muted-foreground hover:text-white hover:bg-white/5"}`}
              >
                <ShoppingCart className="w-4 h-4" /> Orders
              </button>
              <button 
                onClick={() => setActiveTab("products")}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sm tracking-widest uppercase transition-all duration-300 ${activeTab === "products" ? "bg-gold/10 text-gold border border-gold/20" : "text-muted-foreground hover:text-white hover:bg-white/5"}`}
              >
                <Package className="w-4 h-4" /> Products
              </button>
              <button 
                onClick={() => setActiveTab("messages")}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sm tracking-widest uppercase transition-all duration-300 ${activeTab === "messages" ? "bg-gold/10 text-gold border border-gold/20" : "text-muted-foreground hover:text-white hover:bg-white/5"}`}
              >
                <MessageSquare className="w-4 h-4" /> Messages
              </button>
            </nav>
          </div>

          <button 
            onClick={() => router.push("/")}
            className="flex items-center gap-4 px-4 py-3 text-sm tracking-widest uppercase text-muted-foreground hover:text-destructive transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </aside>

        {/* Main Content */}
        <section className="flex-1 p-6 md:p-12 overflow-y-auto">
          
          {/* Mobile Nav Top */}
          <div className="lg:hidden flex gap-4 overflow-x-auto border-b border-white/10 pb-4 mb-8 custom-scrollbar">
            {['overview', 'orders', 'products', 'messages'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-xs uppercase tracking-widest ${activeTab === tab ? "bg-gold text-black font-medium" : "bg-white/5 text-muted-foreground"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h2 className="text-3xl font-heading text-white uppercase tracking-widest mb-8">Dashboard Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="glass-card p-6 rounded-2xl border border-white/10 relative overflow-hidden group">
                  <div className="absolute -right-6 -top-6 w-24 h-24 bg-gold/10 rounded-full blur-2xl group-hover:bg-gold/20 transition-all" />
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Total Revenue</p>
                    <TrendingUp className="w-4 h-4 text-gold" />
                  </div>
                  <h3 className="text-3xl font-heading text-white relative z-10">₹{totalRevenue.toLocaleString()}</h3>
                  <p className="text-[10px] text-green-500 uppercase tracking-widest mt-2 relative z-10">+12% from last week</p>
                </div>
                
                <div className="glass-card p-6 rounded-2xl border border-white/10 relative overflow-hidden group">
                  <div className="absolute -right-6 -top-6 w-24 h-24 bg-gold/10 rounded-full blur-2xl group-hover:bg-gold/20 transition-all" />
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Pending Orders</p>
                    <Clock className="w-4 h-4 text-gold" />
                  </div>
                  <h3 className="text-3xl font-heading text-white relative z-10">{pendingOrdersCount}</h3>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-2 relative z-10">Action required</p>
                </div>

                <div className="glass-card p-6 rounded-2xl border border-white/10 relative overflow-hidden group">
                  <div className="absolute -right-6 -top-6 w-24 h-24 bg-gold/10 rounded-full blur-2xl group-hover:bg-gold/20 transition-all" />
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Total Site Visitors</p>
                    <Users className="w-4 h-4 text-gold" />
                  </div>
                  <h3 className="text-3xl font-heading text-white relative z-10">1,240</h3>
                  <p className="text-[10px] text-green-500 uppercase tracking-widest mt-2 relative z-10">+5% from last week</p>
                </div>

                <div className="glass-card p-6 rounded-2xl border border-white/10 relative overflow-hidden group">
                  <div className="absolute -right-6 -top-6 w-24 h-24 bg-gold/10 rounded-full blur-2xl group-hover:bg-gold/20 transition-all" />
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">New Messages</p>
                    <MessageSquare className="w-4 h-4 text-gold" />
                  </div>
                  <h3 className="text-3xl font-heading text-white relative z-10">{unreadMessagesCount}</h3>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-2 relative z-10">In your inbox</p>
                </div>
              </div>

              {/* Recent Orders Preview */}
              <h3 className="text-xl font-heading text-white uppercase tracking-widest mb-6">Recent Pending Orders</h3>
              <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10">
                      <th className="p-4 text-[10px] uppercase tracking-widest text-muted-foreground">Order ID</th>
                      <th className="p-4 text-[10px] uppercase tracking-widest text-muted-foreground">Customer</th>
                      <th className="p-4 text-[10px] uppercase tracking-widest text-muted-foreground">Amount</th>
                      <th className="p-4 text-[10px] uppercase tracking-widest text-muted-foreground text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.filter(o => o.status === "Pending" || o.status === "Processing").map((order) => (
                      <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4 text-sm font-medium">{order.id.slice(0,8)}</td>
                        <td className="p-4 text-sm text-muted-foreground">{order.customer_name}</td>
                        <td className="p-4 text-sm text-gold">₹{order.amount.toLocaleString()}</td>
                        <td className="p-4 text-right">
                          <button className="text-[10px] uppercase tracking-widest bg-gold text-black px-4 py-1.5 rounded-full hover:bg-white transition-colors">Fulfill</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex justify-between items-end mb-8">
                <h2 className="text-3xl font-heading text-white uppercase tracking-widest">Order Fulfillment</h2>
              </div>
              <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10">
                      <th className="p-6 text-xs uppercase tracking-widest text-muted-foreground">ID</th>
                      <th className="p-6 text-xs uppercase tracking-widest text-muted-foreground">Customer</th>
                      <th className="p-6 text-xs uppercase tracking-widest text-muted-foreground">Date</th>
                      <th className="p-6 text-xs uppercase tracking-widest text-muted-foreground">Status</th>
                      <th className="p-6 text-xs uppercase tracking-widest text-muted-foreground">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-6 font-medium text-sm">{order.id.slice(0,8)}</td>
                        <td className="p-6 text-sm text-muted-foreground">{order.customer_name}</td>
                        <td className="p-6 text-sm text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</td>
                        <td className="p-6">
                           <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest border 
                            ${order.status === 'Pending' ? 'border-yellow-500/50 text-yellow-500' : 
                              order.status === 'Processing' ? 'border-blue-500/50 text-blue-500' : 
                              order.status === 'Shipped' ? 'border-purple-500/50 text-purple-500' : 
                              'border-green-500/50 text-green-500'}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-6 font-medium">₹{order.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex justify-between items-end mb-8">
                <h2 className="text-3xl font-heading text-white uppercase tracking-widest">Product Catalog</h2>
                <button className="flex items-center gap-2 bg-gold text-background px-6 py-3 rounded-full text-sm font-medium uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                  <Plus className="w-4 h-4" /> Add Product
                </button>
              </div>
              <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10">
                      <th className="p-6 text-xs uppercase tracking-widest text-muted-foreground">Product</th>
                      <th className="p-6 text-xs uppercase tracking-widest text-muted-foreground hidden md:table-cell">Category</th>
                      <th className="p-6 text-xs uppercase tracking-widest text-muted-foreground">Price</th>
                      <th className="p-6 text-xs uppercase tracking-widest text-muted-foreground hidden sm:table-cell">Stock</th>
                      <th className="p-6 text-xs uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="relative w-12 h-12 bg-black/50 rounded-lg p-1 border border-white/10">
                              <Image src={product.image} alt={product.name} fill className="object-contain" />
                            </div>
                            <span className="font-heading text-lg">{product.name}</span>
                          </div>
                        </td>
                        <td className="p-6 hidden md:table-cell text-sm text-muted-foreground">{product.category}</td>
                        <td className="p-6">₹{product.price}</td>
                        <td className="p-6 hidden sm:table-cell">
                          <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest border ${product.stock < 10 ? 'border-red-500/50 text-red-500' : 'border-green-500/50 text-green-500'}`}>
                            {product.stock} Units
                          </span>
                        </td>
                        <td className="p-6 text-right space-x-4">
                          <button className="text-muted-foreground hover:text-white transition-colors"><Edit2 className="w-4 h-4 inline" /></button>
                          <button className="text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4 inline" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "messages" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h2 className="text-3xl font-heading text-white uppercase tracking-widest mb-8">Concierge Inquiries</h2>
              <div className="space-y-6">
                {messages.map((msg) => (
                  <div key={msg.id} className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row gap-6 justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-heading text-lg">{msg.name}</h4>
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground bg-white/5 px-2 py-1 rounded-sm">{msg.email}</span>
                      </div>
                      <p className="text-sm font-light leading-relaxed text-muted-foreground mb-4">"{msg.message}"</p>
                      <span className="text-[10px] text-muted-foreground uppercase">{new Date(msg.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex flex-col items-end gap-4 min-w-[120px]">
                      {msg.status === "Unread" ? (
                        <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest flex items-center gap-1">
                          <XCircle className="w-3 h-3" /> Unread
                        </span>
                      ) : (
                        <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Replied
                        </span>
                      )}
                      
                      {msg.status === "Unread" && (
                        <button className="text-[10px] uppercase tracking-widest hover:text-gold transition-colors">Reply via Email &rarr;</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </section>
      </div>
      
      {/* We can place the top general Navbar absolutely above, or just keep it minimal. */}
      <div className="fixed top-0 left-0 w-full z-[100] pointer-events-none">
        <Navbar />
      </div>
    </main>
  );
}
