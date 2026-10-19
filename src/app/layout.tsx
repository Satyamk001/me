import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const sansFont = Geist({
  variable: "--nf-sans",
  subsets: ["latin"],
  display: "swap",
});

const serifFont = Instrument_Serif({
  variable: "--nf-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: "400",
  display: "swap",
});

const monoFont = Geist_Mono({
  variable: "--nf-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://satyamkumar.dev";
const TITLE = "Satyam Kumar — Software Engineer & AI Engineer";
const DESCRIPTION =
  "Software Engineer (Backend / Full-Stack) at MapmyIndia specializing in Agentic AI, LangGraph multi-agent architectures, RAG pipelines, and high-performance event-driven systems.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
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
  authors: [{ name: "Satyam Kumar", url: SITE_URL }],
  creator: "Satyam Kumar",
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Satyam Kumar",
    title: TITLE,
    description:
      "Software Engineer at MapmyIndia building event-driven systems and Agentic AI workflows with LangGraph, RAG, Node.js, and TypeScript.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Satyam Kumar — Software Engineer & AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "Software Engineer at MapmyIndia building event-driven systems and Agentic AI workflows with LangGraph, RAG, Node.js, and TypeScript.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f2ee",
  colorScheme: "light",
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
