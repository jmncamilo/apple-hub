import { Inter } from "next/font/google";
import "./globals.css";

const getInter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "E-commerce",
  description: "Lo que sea",
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
