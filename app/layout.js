import "./globals.css";
import { Providers } from "@/providers/Providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col h-screen w-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
