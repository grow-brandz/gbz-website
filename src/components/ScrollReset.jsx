import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollReset({ lenis }) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!lenis) return;

    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const scrollToSection = () => {
        const target = document.getElementById(id);
        if (!target) return false;
        const header = document.querySelector("header");
        const offset = header ? -(header.offsetHeight + 16) : -120;
        lenis.scrollTo(target, { offset, force: true });
        return true;
      };

      if (!scrollToSection()) {
        requestAnimationFrame(scrollToSection);
      }
      return;
    }

    lenis.scrollTo(0, {
      immediate: true,
      force: true,
    });
  }, [pathname, hash, lenis]);

  return null;
}

export default ScrollReset;
