import "./globals.css";
import { AuthProvider } from "../lib/authContext";

export const metadata = {
  title: "Polling App",
  description: "Next.js + Supabase Polling App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
