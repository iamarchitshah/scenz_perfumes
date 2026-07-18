import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import Image from "next/image";

export default function About() {
  return (
    <main className="min-h-screen bg-background pt-32">
      <PageLoader />
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        {/* Header */}
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <span className="text-gold text-xs tracking-widest uppercase mb-4 block">Our Story</span>
          <h1 className="text-5xl md:text-7xl font-heading heading-gold mb-8 uppercase tracking-widest">
            A Legacy of <br /> Elegance
          </h1>
          <p className="text-muted-foreground leading-relaxed font-light text-lg">
            Born from a passion for the extraordinary, Scenz has redefined the landscape of high-end perfumery. We believe that a fragrance is more than a scent—it is an invisible garment, a signature, and a powerful memory.
          </p>
        </div>

        {/* Cinematic Imagery Section */}
        <div className="relative h-[60vh] w-full rounded-2xl overflow-hidden glass-card p-2 mb-32">
          <div className="relative w-full h-full rounded-xl overflow-hidden">
            <Image
              src="/images/hero.png" // using hero placeholder
              alt="Scenz Perfume Creation"
              fill
              className="object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gold/10 mix-blend-overlay" />
          </div>
        </div>

        {/* Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <h2 className="text-3xl md:text-5xl font-heading text-white mb-6 uppercase tracking-wider">The Philosophy</h2>
            <p className="text-muted-foreground font-light leading-relaxed mb-6">
              Our master perfumers approach fragrance creation as an architectural endeavor. Each note is meticulously selected, balanced, and aged to perfection to ensure extraordinary longevity and projection.
            </p>
            <p className="text-muted-foreground font-light leading-relaxed">
              We utilize only the most precious ingredients sourced sustainably from exclusive harvesters around the globe: Rose de Mai from Grasse, Oud from Assam, and Sandalwood from Mysore.
            </p>
          </div>
          <div className="relative h-96 glass-card p-2 rounded-xl">
            <div className="relative w-full h-full rounded-lg overflow-hidden flex items-center justify-center p-8">
               <Image src="/images/product_2.png" alt="Ingredients" fill className="object-contain" />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
