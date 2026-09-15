import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import ThemeRegistry from "@/components/ThemeRegistry";
import "./globals.css";

// Fontes da landing (Playfair + DM Sans)
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nutri Poliana Campos | Nutrição personalizada",
  description:
    "Acompanhamento nutricional personalizado. Emagreça com estratégia, sem viver de dieta.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${dmSans.variable} ${playfair.variable}`}>
      <body className={dmSans.className}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
