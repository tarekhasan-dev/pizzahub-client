
import { Anton, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/layout/Navbar";

import "./globals.css";
import "./global-layout.css";

// Display Font
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

// Body Font
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

// Website Metadata
export const metadata = {
  title: "PizzaHub | Wood-Fired Pizza Delivered",
  description:
    "Discover local pizza shops, browse wood-fired menus and order fresh pizza to your door.",
};

// Root Layout
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${anton.variable} ${jakarta.variable}`}>
      <body className="flex min-h-screen flex-col bg-cream text-ink selection:bg-tomato selection:text-white">
        <Navbar />

        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
