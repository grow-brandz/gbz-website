import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLocation } from "react-router-dom";

const CommonHeroAnimation = () => {
  const location = useLocation();
  const hasRun = useRef(false);

  useEffect(() => {
    const hero = document.querySelector(".commonHero");
    if (!hero) return;

    // prevent StrictMode double-run (dev)
    if (hasRun.current) return;
    hasRun.current = true;

    let ctx;

    // wait for layout, fonts, SVGs, Lenis
    const run = () => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        tl.from("h1", {
          y: 100,
          opacity: 0,
          duration: 1.2,
        })
          .from(
            ".word",
            {
              scale: 0.85,
              opacity: 0,
              duration: 1,
              ease: "back.out(1.7)",
            },
            "-=0.8"
          )
          .from(
            "p",
            {
              y: 50,
              opacity: 0,
              duration: 1,
            },
            "-=0.6"
          )
          .from(
            ".commonHeroFloat",
            {
              opacity: 0,
              y: 40,
              duration: 1,
            },
            "-=0.8"
          );
      }, hero);
    };

    // double RAF = browser has painted
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(run);
      return () => cancelAnimationFrame(raf2);
    });

    return () => {
      cancelAnimationFrame(raf1);
      ctx?.revert();
      hasRun.current = false;
    };
  }, [location.pathname]);

  return null;
};

export default CommonHeroAnimation;
