import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cookly - Maitsed, mis könetavad",
  description: "Avasta retsepte, jaga oma digitaalne retseptiraamat ja osta vajaminevad koostisosad ühe klikiga.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="et">
      <body>
        {children}
      </body>
    </html>
  );
}
