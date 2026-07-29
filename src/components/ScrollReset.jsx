import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollReset({ lenis }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!lenis) return;
    lenis.scrollTo(0, {
      immediate: true,
      force: true,
    });
  }, [pathname, lenis]);

  return null;
}

export default ScrollReset;
