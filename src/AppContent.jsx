import { useEffect, useState } from "react";
import Lenis from "lenis";

import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import ScrollReset from "./components/ScrollReset.jsx";
import CommonHeroAnimation from "./components/CommonHeroAnimation.jsx";

import AppRoutes from "./AppRoutes.jsx";

function AppContent() {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const l = new Lenis({
      smooth: true,
      duration: 1.5,
    });

    setLenis(l);

    function raf(time) {
      l.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      l.destroy();
    };
  }, []);

  return (
    <>
      <ScrollReset lenis={lenis} />

      <CommonHeroAnimation />

      <Header />

      <AppRoutes />

      <Footer />
    </>
  );
}

export default AppContent;