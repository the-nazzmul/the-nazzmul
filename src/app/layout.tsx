import type { Metadata } from "next";
import { Inter, Calistoga } from "next/font/google";
import "./globals.css";
import "highlight.js/styles/github-dark.css";
import { twMerge } from "tailwind-merge";
import { getSitePayload } from "@/lib/content";
import { getSiteMetadataBase } from "@/lib/site-url";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const calistoga = Calistoga({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
});

export async function generateMetadata(): Promise<Metadata> {
  const { siteSettings } = await getSitePayload();
  const base = getSiteMetadataBase();
  return {
    ...(base ? { metadataBase: base } : {}),
    title: siteSettings.siteTitle,
    description: siteSettings.metaDescription,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={twMerge(
          inter.variable,
          calistoga.variable,
          "antialiased bg-gray-900 text-white font-sans"
        )}
      >
        {children}
      </body>
    </html>
  );
}
