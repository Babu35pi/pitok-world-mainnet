import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PitokWorld - TikTok on Pi",
  description: "Upload videos, Earn Pi!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script src="https://sdk.minepi.com/pi-sdk.js"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
