"use client";

import { useState, useEffect, useRef, RefObject } from "react";

interface StickyScrollState {
  sidebarRef: RefObject<HTMLElement | null>;
  containerRef: RefObject<HTMLElement | null>;
  sidebarStyle: React.CSSProperties;
}

/**
 * Custom hook for creating a sticky sidebar that:
 * 1. Stays fixed at the top while scrolling
 * 2. Scrolls naturally when reaching the end so both sidebar and content end together
 */
export function useStickyScroll(topOffset: number = 40): StickyScrollState {
  const sidebarRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const [sidebarStyle, setSidebarStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const sidebar = sidebarRef.current;
    const container = containerRef.current;

    if (!sidebar || !container) return;

    // Store original sidebar dimensions
    let sidebarWidth = sidebar.offsetWidth;
    let sidebarLeft = sidebar.getBoundingClientRect().left;

    const updateDimensions = () => {
      if (sidebar && container) {
        // Get dimensions when sidebar is in normal flow
        const currentStyle = sidebar.style.position;
        sidebar.style.position = '';
        sidebarWidth = sidebar.offsetWidth;
        sidebarLeft = sidebar.getBoundingClientRect().left;
        sidebar.style.position = currentStyle;
      }
    };

    const handleScroll = () => {
      if (!sidebar || !container) return;

      // Disable sticky behavior on mobile/small tablets (below 820px)
      if (window.innerWidth < 820) {
        setSidebarStyle({});
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const sidebarHeight = sidebar.offsetHeight;
      const scrollY = window.scrollY;

      // Calculate container positions
      const containerTop = containerRect.top + scrollY;
      const containerBottom = containerTop + container.offsetHeight;
      
      // When sidebar would exceed container bottom
      const sidebarBottomWhenFixed = scrollY + topOffset + sidebarHeight;
      const shouldBeAbsolute = sidebarBottomWhenFixed >= containerBottom;
      
      // When we've scrolled past the start point
      const shouldBeFixed = scrollY >= containerTop - topOffset && !shouldBeAbsolute;

      if (shouldBeAbsolute) {
        // Position sidebar at the bottom of the container (use absolute)
        setSidebarStyle({
          position: "absolute",
          bottom: "0",
          top: "auto",
          left: "auto",
          right: "0",
          width: sidebarWidth + "px",
        });
      } else if (shouldBeFixed) {
        // Fixed position while scrolling - maintain horizontal position
        setSidebarStyle({
          position: "fixed",
          top: topOffset + "px",
          left: sidebarLeft + "px",
          width: sidebarWidth + "px",
        });
      } else {
        // Default - no special positioning
        setSidebarStyle({});
      }
    };

    // Update dimensions on resize
    const handleResize = () => {
      // Reset styles to get accurate measurements
      setSidebarStyle({});
      setTimeout(() => {
        updateDimensions();
        handleScroll();
      }, 10);
    };

    // Initial setup
    updateDimensions();
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [topOffset]);

  return { sidebarRef, containerRef, sidebarStyle };
}

