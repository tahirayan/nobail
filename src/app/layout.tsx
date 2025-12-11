import type { Metadata } from "next";
import { Fragment_Mono, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Footer from "@/components/widgets/footer";
import Header from "@/components/widgets/header";
import { AuthProvider } from "@/contexts/auth-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const interDisplay = Inter({
  variable: "--font-inter-display",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  display: "block",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const fragmentMono = Fragment_Mono({
  variable: "--font-fragment-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoBail - Structure That Adapts to Your Social Life",
  description:
    "Hang out with people who never leave you hanging. We introduce you to the best places in Tallinn, prepaid to guarantee attendance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${interDisplay.variable} ${spaceGrotesk.variable} ${fragmentMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <AuthProvider>
          <Header />
          <div className="grid grow place-items-center">{children}</div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
