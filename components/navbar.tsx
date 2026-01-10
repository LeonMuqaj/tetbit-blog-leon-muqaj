"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/src/i18n/navigation";
import "../styles/components/navbar.scss";
import logo from "../assets/logo.png";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link href="/" className="navbar__brand">
          <Image
            src={logo}
            alt="Tetbit Blog Logo"
            width={50}
            height={50}
            priority
          />
          <span className="navbar__title">Tetbit Blog</span>
        </Link>

        <div className="navbar__right navbar__right--desktop">
          <LanguageSwitcher />
        </div>
        <button
          className="navbar__hamburger"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <div
            className={`navbar__hamburger-icon ${
              isMenuOpen ? "navbar__hamburger-icon--open" : ""
            }`}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        {isMenuOpen && <div className="navbar__overlay" onClick={closeMenu} />}

        {isMenuOpen && (
          <div className="navbar__hamburger-menu">
            <div className="navbar__hamburger-content">
              <p className="navbar__hamburger-label">Select Language</p>
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
