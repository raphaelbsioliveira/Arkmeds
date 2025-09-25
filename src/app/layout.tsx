import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "./providers";
import { ToastContainer } from "react-toastify";
import ThemeRegistry from "../features/company/components/ThemeRegistry";

const inter = Inter({ subsets: ["latin"] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arkmeds Challenge",
  description: "Desafio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>
          <ReactQueryProvider>{children}</ReactQueryProvider>
          <ToastContainer
            theme="colored"
            autoClose={3000}
            position="bottom-right"
          />
        </ThemeRegistry>
      </body>
    </html>
  );
}
