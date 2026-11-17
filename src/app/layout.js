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

export const metadata = {
  title: "Vanuja Karunaratne | Portfolio",
  description: "Personal Portfolio of Vanuja Karunaratne - Full-Stack Developer & DevOps Engineer",
  authors: [{ name: "Vanuja Karunaratne" }],
  keywords: [
    "Vanuja Karunaratne",
    "Vanuja",
    "Karunaratne",
    "DevOps Intern",
    "DevOps Engineer",
    "Cloud Automation",
    "MLOps",
    "Software Engineer",
    "University of Ruhuna",
    "SLT-MOBITEL PLC",
    "EasyCase",
    "ScaleLab",
    "Sri Lanka"
  ],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="%2318181b"/><path d="M9 11l5 5-5 5M16 21h7" stroke="%236366f1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>',
  },
  openGraph: {
    title: "Vanuja Karunaratne | Portfolio",
    description: "DevOps Intern at SLT-MOBITEL PLC & Computer Engineering student. Automation, cloud systems, and infrastructure builder.",
    url: "https://vanujak.github.io/portfolio",
    siteName: "Vanuja Karunaratne Portfolio",
    images: [
      {
        url: "https://vanujak.github.io/portfolio/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vanuja Karunaratne Portfolio Preview Card",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vanuja Karunaratne | Portfolio",
    description: "DevOps Intern at SLT-MOBITEL PLC & Computer Engineering student. Automation, cloud systems, and infrastructure builder.",
    images: ["https://vanujak.github.io/portfolio/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
