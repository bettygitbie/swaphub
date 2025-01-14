import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import Navbar from "./components/layout/navbar";

const inter = Inter({ subsets: ['latin'] });;

export const metadata: Metadata = {
  title: "SwapHub - Find Amazing Deals Near You",
  description: "Buy and sell used items in your local area",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={inter.className}
      >
        <Navbar />
        {children}
        {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        
        </ThemeProvider> */}
      </body>
    </html>
  );
}
