import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { UtilityNavigation } from "@/components/layout/header/utility-navigation";
import { MainNavigation } from "@/components/layout/header/main-navigation";
import { Footer } from "@/components/layout/footer/Footer";
import { BackToTopButton } from "@/components/layout/BackToTopButton";
import { AnimationInitializer } from "@/components/AnimationInitializer";
import "./globals.css";
import "./shadow-animations.css";
import "./clean-shadow.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tongmyong University",
  description: "Leading Innovation in Higher Education",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <NextIntlClientProvider messages={messages}>
            <AnimationInitializer />
            <div className="relative flex min-h-screen flex-col">
              <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur transition-all duration-500 ease-in-out">
                <UtilityNavigation />
              </header>
              <MainNavigation />
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <Footer />
              <BackToTopButton />
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
