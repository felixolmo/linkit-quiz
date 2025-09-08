import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Linkit.Digital Assessment",
  description: "Quick quiz to recommend a tailored digital solution",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-[#f3f9fe] to-white text-neutral-900">
        {children}
      </body>
    </html>
  );
}
