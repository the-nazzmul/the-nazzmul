import type { Metadata } from "next";
import { Inter, Calistoga } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import { getSitePayload } from "@/lib/content";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const calistoga = Calistoga({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
});

function metadataBase(): URL | undefined {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    try {
      return new URL(raw.replace(/\/$/, ""));
    } catch {
      return undefined;
    }
  }
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }
  return undefined;
}

export async function generateMetadata(): Promise<Metadata> {
  const { siteSettings } = await getSitePayload();
  const base = metadataBase();
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
