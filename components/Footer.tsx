"use client";

import React from "react";
import { Link } from "@/src/i18n/navigation";
import { useTranslations } from "next-intl";
import "../styles/components/footer.scss";
import SocialIcons from "../assets/icons/SocialIcons";

const Footer = () => {
  const t = useTranslations("footer");

  return (
    <footer className="footer">
      <div className="footer__bottom">
        <p>{t("copyright")}</p>
      </div>
    </footer>
  );
};

export default Footer;
