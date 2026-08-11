import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Inter } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const META_PIXEL_ID = "1199839202332605";

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
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-7NCXTGLRKX"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-7NCXTGLRKX');
        `}
      </Script>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-18084530712"
        strategy="afterInteractive"
      />
      <Script id="google-ads" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-18084530712');
        `}
      </Script>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <body className="min-h-full flex flex-col antialiased">
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}


