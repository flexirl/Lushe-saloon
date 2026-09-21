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
  title: "Lushè Unisex Saloon | Premium Unisex Salon in Gurugram",
  description:
    "Lushè Unisex Saloon — A premium unisex salon in Sector 52, Gurugram. Expert hair, nails, skin, and beauty services for men & women in a warm, sophisticated setting.",
  keywords: [
    "unisex salon gurugram",
    "premium salon sector 52",
    "nails studio gurugram",
    "lushè unisex saloon",
    "lusheunisexsaloon",
    "hair salon gurugram",
    "beauty salon india",
    "mens salon gurugram",
    "womens salon gurugram",
  ],
  openGraph: {
    title: "Lushè Unisex Saloon",
    description: "Premium Unisex Salon — Sector 52, Gurugram",
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
