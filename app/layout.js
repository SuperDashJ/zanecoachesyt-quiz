import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "zanesbestlife",
  description:
    "A high-converting reset quiz that captures email leads and delivers a personalized plan."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
