import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Poppins, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import AuthWrapper from "@/components/AuthWrapper";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["300", "400", "500"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scenz | Luxury Perfume Collection",
  description: "Experience the epitome of elegance with our exclusive luxury perfume collection, crafted with the finest ingredients in the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${poppins.variable} ${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <SmoothScroll>
          <AuthWrapper>
            <CustomCursor />
            {children}
          </AuthWrapper>
        </SmoothScroll>
      </body>
    </html>
  );
}
