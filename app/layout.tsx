import type { Metadata } from "next";
import "./globals.css";
import { Nunito_Sans } from 'next/font/google';
import { Provider } from "@/components/chakra-ui/provider";

export const metadata: Metadata = {
  title: "Prakash Sewani",
  description: "Created using create-next-app",
};

const nunito = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${nunito.className}`}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
