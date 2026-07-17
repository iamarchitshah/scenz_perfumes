"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Magnetic from "./Magnetic";

export default function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-8 right-8 z-[90] hidden md:block">
      <Magnetic>
        <button className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          <MessageCircle className="w-7 h-7" />
        </button>
      </Magnetic>
    </div>
  );
}
