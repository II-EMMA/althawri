import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "./globals.css";
import { Tajawal } from "next/font/google";
import Header from "../sections/header/Header";
import Footer from "../sections/footer/Footer";
import FloatingActionButtons from "../components/FloatingActionButtons";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-tajawal",
  // display: "swap",
});

export const metadata = {
  title: "Mootery Auctions",
  description: "NVP",
};
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === "ar" ? "lrt" : "rtl";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={`${tajawal.className}`}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
          <Footer />
          <FloatingActionButtons />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
