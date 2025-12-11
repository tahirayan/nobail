import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Footer from "@/components/widgets/footer";
import Header from "@/components/widgets/header";
import { AuthProvider } from "@/contexts/auth-context";

const nunitoSans = Nunito({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
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
        className={`${nunitoSans.variable} flex min-h-screen flex-col antialiased`}
      >
        <AuthProvider>
          <Header />
          <div className="flex-grow">{children}</div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
