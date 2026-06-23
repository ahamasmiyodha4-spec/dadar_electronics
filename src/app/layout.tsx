import "./globals.css";

export const metadata = {
  title: 'Dadar Electronics Dubai',
  description: 'Premium Laptops and Mobiles in Dubai',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}