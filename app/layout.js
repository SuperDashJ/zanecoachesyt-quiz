import "./globals.css";

export const metadata = {
  title: "zanesbestlife quiz",
  description:
    "A high-converting reset quiz that captures email leads and delivers a personalized plan."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
