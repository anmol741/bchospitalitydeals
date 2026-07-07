import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
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
      <Script id="gtm-script" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-TK4CMZRL');`}
      </Script>
      <body className="min-h-full flex flex-col antialiased">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TK4CMZRL"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
