import "./globals.css";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import StoreProvider from "./state/StoreProvider";

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
// });

export const metadata: Metadata = {
  title: "Todo app",
  description:
    "This is an application for mastering your tasks, by arranging your todos.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <StoreProvider>
        <body className="bg-[#040b24]">{children}</body>
      </StoreProvider>
    </html>
  );
}
