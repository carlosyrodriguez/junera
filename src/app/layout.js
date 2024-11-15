import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { Code } from "lucide-react";
import { Pin } from "lucide-react";
import { User } from "lucide-react";
import { BriefcaseBusiness } from "lucide-react";
import { ToastProvider } from "@/components/ui/toast";
import { ToastViewport } from "@/components/ui/toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "junera 🌳",
  description: "junera, a new job search experience",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastProvider>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              {children}
              <ToastViewport />
              <footer className="row-start-3 flex gap-6 mb-6 flex-wrap items-center justify-center">
  {/* Existing Links */}
  <Link href="/job-postings">
    <p className="flex items-center gap-2 hover:underline hover:underline-offset-4">
      <BriefcaseBusiness size={16} />
      Job Postings
    </p>
  </Link>
  <Link href="/job-postings?explevel=entry">
    <p className="flex items-center gap-2 hover:underline hover:underline-offset-4">
      <User size={16} />
      Entry Level Jobs
    </p>
  </Link>
  <Link href="/job-postings?location=California">
    <p className="flex items-center gap-2 hover:underline hover:underline-offset-4">
      <Pin size={16} />
      Jobs in California
    </p>
  </Link>
  <Link href="/job-postings?location=New%20York">
    <p className="flex items-center gap-2 hover:underline hover:underline-offset-4">
      <Pin size={16} />
      Jobs in New York
    </p>
  </Link>
  <Link href="/job-postings?title=Software%20Engineer">
    <p className="flex items-center gap-2 hover:underline hover:underline-offset-4">
      <Code size={16} />
      Software Engineer Jobs
    </p>
  </Link>
  <Link href="/job-postings?title=Project%20Manager">
    <p className="flex items-center gap-2 hover:underline hover:underline-offset-4">
      <Code size={16} />
      Project Manager Jobs
    </p>
  </Link>

  {/* Additional Links */}
  <Link href="/job-postings?explevel=mid">
    <p className="flex items-center gap-2 hover:underline hover:underline-offset-4">
      <User size={16} />
      Mid-Level Jobs
    </p>
  </Link>
  <Link href="/job-postings?explevel=senior">
    <p className="flex items-center gap-2 hover:underline hover:underline-offset-4">
      <User size={16} />
      Senior Level Jobs
    </p>
  </Link>
  <Link href="/job-postings?location=Texas">
    <p className="flex items-center gap-2 hover:underline hover:underline-offset-4">
      <Pin size={16} />
      Jobs in Texas
    </p>
  </Link>
  <Link href="/job-postings?location=Florida">
    <p className="flex items-center gap-2 hover:underline hover:underline-offset-4">
      <Pin size={16} />
      Jobs in Florida
    </p>
  </Link>
  <Link href="/job-postings?title=Data%20Scientist">
    <p className="flex items-center gap-2 hover:underline hover:underline-offset-4">
      <Code size={16} />
      Data Scientist Jobs
    </p>
  </Link>
  <Link href="/job-postings?title=Product%20Manager">
    <p className="flex items-center gap-2 hover:underline hover:underline-offset-4">
      <Code size={16} />
      Product Manager Jobs
    </p>
  </Link>
  <Link href="/job-postings?company=86">
    <p className="flex items-center gap-2 hover:underline hover:underline-offset-4">
      <Code size={16} />
      Microsoft Jobs
    </p>
  </Link>

  <Link href="/job-postings?company=421">
    <p className="flex items-center gap-2 hover:underline hover:underline-offset-4">
      <Code size={16} />
      Anthropic Jobs
    </p>
  </Link>
</footer>
            </ThemeProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}