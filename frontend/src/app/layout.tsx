import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: {
    default: process.env.NEXT_PUBLIC_APP_NAME || "TableBook",
    template: `%s | ${process.env.NEXT_PUBLIC_APP_NAME || "TableBook"}`,
  },
  description:
    process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
    "Бронирование столиков в ресторанах",
  keywords: ["рестораны", "бронирование", "столики", "кафе", "бары"],
  authors: [{ name: "TableBook Team" }],
  creator: "TableBook",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://tablebook.com",
    siteName: "TableBook",
    title: "TableBook - Бронирование столиков",
    description:
      "Найдите и забронируйте столик в лучших ресторанах вашего города",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
