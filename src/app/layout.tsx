import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Footer from "@/components/Footer/Footer";
import "@/styles/main.scss";
import Navigation from "@/components/Navigation/Navigation";
import { MotionConfig } from "framer-motion";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '400', '600', '700'],
  variable: '--font-poppins',
}); 

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Czester Garage | Mechanika samochodowa",
  description: "Naprawy i diagnostyka samochodowa w Jerzmanowej.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navigation />
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
        <Footer />
      </body>
      
    </html>
  );
}

