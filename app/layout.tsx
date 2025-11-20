import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://movimoji.rustyrishii.workers.dev"),
  title: "Movimoji 🎬",
  description: "Convert movie and TV show names into emojis with AI.",
  openGraph: {
    title: "Movimoji 🎬",
    description: "Convert movie and TV show names into emojis with AI.",
    url: "https://movimoji.rustyrishii.workers.dev",
    siteName: "Movimoji",
    images: [
      {
        url: "/twitter-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Movimoji 🎬",
    description: "Convert movie and TV show names into emojis with AI.",
    images: ["/twitter-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
