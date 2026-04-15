import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Ubuntu } from "next/font/google";
import { AuthProvider } from "@/lib/authContext";
import { Navbar } from "@/components/Navbar";

const ubuntu = Ubuntu({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-ubuntu",
});

export const metadata: Metadata = {
  title: "Learning Next.js from beginner to Advanced",
  description:
    "Learning Next.js from beginner to Advanced course and practice project.",
  keywords: ["next js", "learning next js", "react js"],
  authors: [{ name: "Cishahayo Songa Achille" }],
  creator: "Cishahayo Songa Achille",
  publisher: "Cishahayo Songa Achille",
  openGraph: {
    title: "Learning Next.js from beginner to Advanced",
    description:
      "Learning Next.js from beginner to Advanced course and practice project.",
    url: "https://learning-nextjs-from-beginner-to-advanced.vercel.app",
    siteName: "Learning Next.js from beginner to Advanced",
    images: [
      {
        url: "https://learning-nextjs-from-beginner-to-advanced.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Learning Next.js from beginner to Advanced",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learning Next.js from beginner to Advanced",
    description:
      "Learning Next.js from beginner to Advanced course and practice project.",
    images: [
      "https://learning-nextjs-from-beginner-to-advanced.vercel.app/og-image.png",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ubuntu.variable} h-full antialiased`}>
      <AuthProvider>
        <body className="min-h-full flex flex-col prose lg:prose-xl max-w-none">
          <Navbar />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
