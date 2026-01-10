"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import GermanFlagIcon from "../assets/icons/GermanFlagIcon";
import EnglishFlagIcon from "../assets/icons/EnglishFlagIcon";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: "en" | "de") => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="navbar__language-switcher">
      <button
        className={`navbar__language ${
          locale === "de" ? "navbar__language--active" : ""
        }`}
        onClick={() => switchLocale("de")}
      >
        <GermanFlagIcon width={20} height={20} />
        <span>De</span>
      </button>
      <button
        className={`navbar__language ${
          locale === "en" ? "navbar__language--active" : ""
        }`}
        onClick={() => switchLocale("en")}
      >
        <EnglishFlagIcon width={20} height={20} />
        <span>En</span>
      </button>
    </div>
  );
}
