import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lushè Beauty Studio | Premium Beauty Salon in Gurugram",
  description:
    "Lushè Beauty Studio — A premium nails & beauty studio in Sector 52, Gurugram. Expert hair, nails, skin, and beauty services in a warm, sophisticated setting.",
  keywords: [
    "beauty salon gurugram",
    "premium salon sector 52",
    "nails studio gurugram",
    "lushè beauty",
    "hair salon gurugram",
    "beauty studio india",
  ],
  openGraph: {
    title: "Lushè Beauty Studio",
    description: "Premium Nails & Beauty Studio — Sector 52, Gurugram",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${dmSans.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
