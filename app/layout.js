import "./globals.css";

export const metadata = {
  title: "ZANESBESTLIFE Quiz",
  description:
    "A high-converting reset quiz that captures email leads and personalized quiz answers."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
