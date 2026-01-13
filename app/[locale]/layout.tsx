import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Montserrat } from "next/font/google";
import "../globals.css";
import "../../styles/globals.scss";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://tetbit-blog.com"), // Replace with your actual domain
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📝</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
  title: {
    default: "Tetbit Blog",
    template: "%s | Tetbit Blog",
  },
  description:
    "Discover insightful articles on technology, tutorials, news, and opinions. Your go-to resource for web development and tech industry insights.",
  keywords: [
    "blog",
    "technology",
    "web development",
    "tutorials",
    "news",
    "opinions",
    "Next.js",
    "TypeScript",
    "React",
  ],
  authors: [{ name: "Tetbit Team" }],
  creator: "Tetbit",
  publisher: "Tetbit",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "de_DE",
    url: "/",
    siteName: "Tetbit Blog",
    title: "Tetbit Blog - Intern Checklist",
    description:
      "Discover insightful articles on technology, tutorials, news, and opinions. Your go-to resource for web development and tech industry insights.",
    images: [
      {
        url: "/og-image.jpg", // You may want to add an og-image.jpg to the public folder
        width: 1200,
        height: 630,
        alt: "Tetbit Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tetbit Blog - Intern Checklist",
    description:
      "Discover insightful articles on technology, tutorials, news, and opinions.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={montserrat.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
