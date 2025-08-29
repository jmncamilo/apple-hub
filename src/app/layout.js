import { Inter } from "next/font/google";
import "./globals.css";

const getInter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "E-commerce",
  description: "E-commerce Apple Inc.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${getInter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
