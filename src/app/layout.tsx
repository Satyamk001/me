import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sansFont = Inter({
  variable: "--nf-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const serifFont = Playfair_Display({
  variable: "--nf-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  weight: ["400", "600", "700"],
});

const monoFont = JetBrains_Mono({
  variable: "--nf-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Satyam Kumar — Software Engineer & AI Engineer",
  description:
    "Software Engineer (Backend / Full-Stack) at MapmyIndia specializing in Agentic AI, LangGraph multi-agent architectures, RAG pipelines, and high-performance event-driven systems.",
  keywords: [
    "Satyam Kumar",
    "Software Engineer",
    "AI Engineer",
    "LangGraph",
    "GenAI",
    "RAG",
    "Node.js",
    "TypeScript",
    "MapmyIndia",
  ],
  authors: [{ name: "Satyam Kumar" }],
};

export const viewport: Viewport = {
  themeColor: "#f4f2ee",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${serifFont.variable} ${monoFont.variable}`}
    >
      <body className="antialiased selection:bg-[#0d0d0d] selection:text-[#f4f2ee]">
        {children}
      </body>
    </html>
  );
}
