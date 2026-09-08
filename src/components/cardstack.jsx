import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function useCardStack() {
  useEffect(() => {
    const isMobile = window.innerWidth < 766;
    const isServicesPage = document.querySelector(".servicesPage");

    if (isMobile && isServicesPage) return;

    let tl = null;
    let attempts = 0;
    const maxAttempts = 30;

    const initAnimation = () => {
      const container = document.querySelector(".folderCover");
      const cards = gsap.utils.toArray(".folderCard");

      if (!container || cards.length === 0) {
        return false;
      }

      cards.forEach((card, i) => {
        gsap.set(card, {
          yPercent: i === 0 ? 0 : 100,
          zIndex: cards.length + i,
        });
      });

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "center center",
          end: () => `+=${(cards.length - 1) * window.innerHeight}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          markers: false,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, i) => {
        if (i > 0) {
          tl.to(
            card,
            {
              yPercent: 0,
              duration: 1,
              ease: "power2.inOut",
            },
            (i - 1) * 1
          );
        }
      });

      tl.to({}, { duration: 0.5 });
      return true;
    };

    const intervalId = setInterval(() => {
      attempts += 1;
      if (initAnimation() || attempts >= maxAttempts) {
        clearInterval(intervalId);
        if (attempts >= maxAttempts && !tl) {
          console.warn("Container or cards not found");
        }
      }
    }, 100);

    return () => {
      clearInterval(intervalId);
      try {
        if (tl) {
          tl.scrollTrigger?.kill();
          tl.kill();
          tl = null;
        }
        gsap.killTweensOf(".folderCard");
      } catch (e) {
        console.error("Cleanup error:", e);
      }
    };
  }, []);
}
