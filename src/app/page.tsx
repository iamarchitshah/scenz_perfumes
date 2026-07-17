import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedCollection from "@/components/sections/FeaturedCollection";
import BrandStory from "@/components/sections/BrandStory";
import SignatureNotes from "@/components/sections/SignatureNotes";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <PageLoader />
      <Navbar />
      
      <HeroSection />
      <FeaturedCollection />
      <SignatureNotes />
      <BrandStory />
      
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
