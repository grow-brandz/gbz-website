import { useEffect } from "react";




export default function useCardStack() {
  useEffect(() => {
    if (typeof window === "undefined") return;
  
    let tl = null;
    let intervalId = null;
    let gsap = null;
  
    const init = async () => {
      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");
  
      gsap = gsapModule.gsap || gsapModule.default;
  
      const ScrollTrigger =
        scrollTriggerModule.ScrollTrigger ||
        scrollTriggerModule.default?.ScrollTrigger;
  
      if (!gsap || !ScrollTrigger) return;
  
      gsap.registerPlugin(ScrollTrigger);
  
      const isMobile = window.innerWidth < 766;
      const isServicesPage = document.querySelector(".servicesPage");
  
      if (isMobile && isServicesPage) return;
  
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
  
      intervalId = setInterval(() => {
        attempts += 1;
  
        if (initAnimation() || attempts >= maxAttempts) {
          clearInterval(intervalId);
  
          if (attempts >= maxAttempts && !tl) {
            console.warn("Container or cards not found");
          }
        }
      }, 100);
    };
  
    init();
  
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
  
      try {
        if (tl) {
          tl.scrollTrigger?.kill();
          tl.kill();
          tl = null;
        }
  
        if (gsap) {
          gsap.killTweensOf(".folderCard");
        }
      } catch (e) {
        console.error("Cleanup error:", e);
      }
    };
  }, []);
}
