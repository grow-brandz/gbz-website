import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useCardStack() {
  useEffect(() => {
    const isMobile = window.innerWidth < 766;
    const isServicesPage = document.querySelector(".servicesPage");

    if (isMobile && isServicesPage) return;
    const initAnimation = () => {
      const container = document.querySelector(".folderCover");
      const cards = gsap.utils.toArray(".folderCard");

      if (!container || cards.length === 0) {
        console.warn("Container or cards not found");
        return;
      }

      // Set initial state - ALL cards start below viewport
      cards.forEach((card, i) => {
        gsap.set(card, {
          yPercent: i === 0 ? 0 : 100,
          zIndex: cards.length + i  // First card gets highest z-index
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "center center",
          end: () => `+=${(cards.length - 1) * window.innerHeight}`, // Reduced scroll length
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          markers: false,
          invalidateOnRefresh: true,
        },
      });

      // Animate each card sliding up
      cards.forEach((card, i) => {
        if (i > 0) {
          tl.to(card, {
            yPercent: 0,
            duration: 1,
            ease: "power2.inOut"
          }, (i - 1) * 1); // Start each animation earlier for smoother overlap
        }
      });

      // Add a small pause at the end so last card doesn't stick
      tl.to({}, { duration: 0.5 });
    };

    const timeoutId = setTimeout(initAnimation, 100);

    return () => {
      clearTimeout(timeoutId);
      try {
        ScrollTrigger.getAll().forEach((st) => st.kill());
        gsap.killTweensOf(".folderCard");
      } catch (e) {
        console.error("Cleanup error:", e);
      }
    };
  }, []);
}