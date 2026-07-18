import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Magnetic from "./Magnetic";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#050505] pt-32 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-24">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-4xl md:text-6xl font-heading heading-gold mb-6 uppercase tracking-widest">Scenz</h2>
            <p className="text-muted-foreground max-w-sm font-light leading-relaxed mb-8">
              The epitome of elegance and seduction. Crafted with the finest ingredients from around the world to leave a lasting impression.
            </p>
            <div className="flex gap-4">
              <Magnetic>
                <a href="#" aria-label="Instagram" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-background hover:border-gold transition-all duration-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#" aria-label="Twitter" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-background hover:border-gold transition-all duration-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#" aria-label="Facebook" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-background hover:border-gold transition-all duration-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
              </Magnetic>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-heading mb-6 tracking-wider uppercase">Explore</h4>
            <ul className="space-y-4">
              {['Home', 'Shop', 'Our Story', 'Ingredients', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-muted-foreground hover:text-gold transition-colors inline-block text-sm uppercase tracking-widest">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-heading mb-6 tracking-wider uppercase">Newsletter</h4>
            <p className="text-muted-foreground text-sm font-light mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="relative group">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-transparent border-b border-white/20 pb-2 text-sm focus:outline-none focus:border-gold transition-colors text-foreground pr-10"
              />
              <button type="submit" className="absolute right-0 top-0 bottom-2 text-white/50 group-hover:text-gold transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Scenz Parfums. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <h1 className="absolute -bottom-10 md:-bottom-24 left-1/2 -translate-x-1/2 text-[15vw] font-heading font-bold text-white/[0.02] whitespace-nowrap pointer-events-none select-none">
        SCENZSCENZ
      </h1>
    </footer>
  );
}
