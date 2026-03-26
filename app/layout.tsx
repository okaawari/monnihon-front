import type { Metadata } from "next";
import { Inter, Noto_Serif_JP, Shippori_Mincho_B1 } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSerifJp = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
});

const shipporiMinchoB1 = Shippori_Mincho_B1({
  variable: "--font-shippori-mincho",
  weight: ["400", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Monnihon — Японы хэл сурах платформ",
  description: "Япон хэлийг эх хэлээрээ сур. Цагаан толгойгоос эхлээд өдөр тутмын яриа хүртэл сурах шинэ ертөнц тун удахгүй нээгдэнэ.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn" className="scroll-smooth">
      <body
        className={`${inter.variable} ${notoSerifJp.variable} ${shipporiMinchoB1.variable} noise vignette antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
