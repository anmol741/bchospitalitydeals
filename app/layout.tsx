import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BC Hospitality Deals | Restaurant & Hospitality Business Sales",
  description:
    "Exclusive, confidential BC commercial real estate listings — restaurants, motels, and hospitality businesses for sale. Represented by CJ Kalra, Century 21 Coastal Realty Ltd.",
  keywords: "BC restaurant for sale, hospitality business BC, commercial real estate BC, restaurant for sale Prince George, McBride restaurant, Cache Creek restaurant, Dawson Creek restaurant",
  openGraph: {
    title: "BC Hospitality Deals | Exclusive Restaurant & Hospitality Sales",
    description:
      "Exclusive, confidential BC commercial real estate — restaurants and hospitality businesses for sale.",
    url: "https://bchospitalitydeals.com",
    siteName: "BC Hospitality Deals",
    locale: "en_CA",
    type: "website",
  },
  icons: {
    icon: [
      { url: '/favicon.png?v=2', sizes: 'any', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon.png?v=2' },
    ],
    shortcut: '/favicon.png?v=2',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full`}
      data-scroll-behavior="smooth"
    >
      <GoogleTagManager gtmId="GTM-TK4CMZRL" />
      <body className="min-h-full flex flex-col antialiased">
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
