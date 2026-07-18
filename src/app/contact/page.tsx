import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";

export default function Contact() {
  return (
    <main className="min-h-screen bg-background pt-32">
      <PageLoader />
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-32">
        <div className="text-center mb-16">
          <span className="text-gold text-xs tracking-widest uppercase mb-4 block">Concierge</span>
          <h1 className="text-5xl md:text-7xl font-heading heading-gold mb-6 uppercase tracking-widest">Connect with Scenz</h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm tracking-widest uppercase font-light">
            Our luxury concierge team is available to assist you with bespoke requests, orders, and inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto mt-24">
          <div className="glass-card p-10 rounded-2xl">
            <h3 className="text-2xl font-heading text-white mb-8 tracking-wider">Send a Message</h3>
            <form className="space-y-6">
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-3 block">Full Name</label>
                <input type="text" className="w-full bg-transparent border-b border-white/20 pb-3 outline-none focus:border-gold transition-colors text-white" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-3 block">Email Address</label>
                <input type="email" className="w-full bg-transparent border-b border-white/20 pb-3 outline-none focus:border-gold transition-colors text-white" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-3 block">Message</label>
                <textarea rows={4} className="w-full bg-transparent border-b border-white/20 pb-3 outline-none focus:border-gold transition-colors text-white resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-gold text-background py-4 tracking-widest uppercase text-sm font-medium hover:bg-white transition-colors duration-300">
                Send Inquiry
              </button>
            </form>
          </div>

          <div className="flex flex-col justify-center space-y-12">
            <div>
              <h4 className="text-gold text-sm tracking-widest uppercase mb-4">Paris Boutique</h4>
              <p className="text-muted-foreground font-light leading-relaxed">
                15 Rue de l'Élégance<br />
                75008 Paris, France
              </p>
            </div>
            <div>
              <h4 className="text-gold text-sm tracking-widest uppercase mb-4">Contact Information</h4>
              <p className="text-muted-foreground font-light leading-relaxed">
                concierge@scenzparfums.com<br />
                +33 (0) 1 23 45 67 89
              </p>
            </div>
            <div>
              <h4 className="text-gold text-sm tracking-widest uppercase mb-4">Boutique Hours</h4>
              <p className="text-muted-foreground font-light leading-relaxed">
                Monday - Saturday<br />
                10:00 AM - 7:00 PM (CET)
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
