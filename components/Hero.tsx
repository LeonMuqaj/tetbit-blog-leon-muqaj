"use client";

import { useTranslations } from "next-intl";
import "../styles/components/hero.scss";
import { useRouter, usePathname } from "@/src/i18n/navigation";
import SearchBar from "./SearchBar";

interface HeroProps {
  selectedTypes: string[];
}

const Hero = ({ selectedTypes }: HeroProps) => {
  const t = useTranslations("hero");
  const router = useRouter();
  const pathname = usePathname();

  const postTypes = ["Blog", "News", "Tutorial", "Opinion"];

  const handleTypeClick = (type: string) => {
    let newTypes: string[];

    if (type === "All") {
      newTypes = [];
    } else {
      if (selectedTypes.includes(type)) {
        newTypes = selectedTypes.filter((t) => t !== type);
      } else {
        newTypes = [...selectedTypes, type];
      }
    }

    if (newTypes.length === 0) {
      router.push(pathname);
    } else {
      router.push(`${pathname}?categories=${newTypes.join(",")}`);
    }
  };

  const isAllActive = selectedTypes.length === 0;

  return (
    <div className="hero">
      <h1 className="hero__title">{t("title")}</h1>
      <p className="hero__subtitle">{t("subtitle")}</p>
      <div className="hero__search-wrapper">
        <SearchBar />
      </div>
      <div className="hero__buttons">
        <button
          onClick={() => handleTypeClick("All")}
          className={`hero__button ${
            isAllActive ? "hero__button--active" : ""
          }`}
        >
          {t("all")}
        </button>
        {postTypes.map((type) => (
          <button
            key={type}
            onClick={() => handleTypeClick(type)}
            className={`hero__button ${
              selectedTypes.includes(type) ? "hero__button--active" : ""
            }`}
          >
            {t(type.toLowerCase())}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Hero;
