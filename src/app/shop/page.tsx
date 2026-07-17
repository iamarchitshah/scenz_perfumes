import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export const revalidate = 0; // Disable caching to see live database updates immediately

export default async function Shop() {
  // Fetch real products from Supabase
  const { data: dbProducts, error } = await supabase.from('products').select('*');
  const products = dbProducts || [];
  return (
    <main className="min-h-screen bg-background pt-32 pb-24">
      <PageLoader />
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-heading heading-gold mb-6 uppercase tracking-widest">The Collection</h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm tracking-widest uppercase font-light">
            Discover our complete range of exquisite luxury fragrances.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="sticky top-32">
              <h3 className="text-xl font-heading mb-6 tracking-widest uppercase">Filters</h3>
              
              <div className="mb-8 p-6 glass-card rounded-xl">
                <h4 className="text-sm text-gold tracking-widest uppercase mb-4">Categories</h4>
                <div className="space-y-3">
                  {['All', 'Woody', 'Floral', 'Fresh', 'Oriental', 'Spicy'].map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="form-checkbox bg-transparent border-white/20 text-gold rounded focus:ring-gold/50 cursor-pointer" />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="p-6 glass-card rounded-xl">
                <h4 className="text-sm text-gold tracking-widest uppercase mb-4">Price Range</h4>
                <input type="range" min="200" max="1000" className="w-full accent-gold bg-white/10 rounded-full h-1" />
                <div className="flex justify-between mt-3 text-xs text-muted-foreground">
                  <span>₹200</span>
                  <span>₹1,000+</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
              <span className="text-sm text-muted-foreground tracking-widest uppercase">{products.length} Products</span>
              <select className="bg-transparent border border-white/20 text-foreground text-sm py-2 px-4 rounded-full outline-none focus:border-gold">
                <option value="featured" className="bg-background">Featured</option>
                <option value="price-asc" className="bg-background">Price: Low to High</option>
                <option value="price-desc" className="bg-background">Price: High to Low</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <a href={`/product?id=${product.id}`} key={product.id} className="group glass-card p-6 rounded-xl hover:-translate-y-2 transition-transform duration-500 cursor-pointer block relative">
                  <div className="relative h-64 w-full mb-6">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="text-center pt-4 border-t border-white/5 relative z-10 bg-black/40">
                    <span className="text-[10px] text-gold tracking-widest uppercase block mb-2">{product.category}</span>
                    <h3 className="text-lg font-heading tracking-wide mb-1 transition-colors">{product.name}</h3>
                    <p className="text-muted-foreground font-light tracking-widest">₹{product.price}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
