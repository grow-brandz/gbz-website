import { useEffect, useRef } from "react";
import lottie from "lottie-web";

function LottieLoop({ animationData, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: ref.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData,
    });

    return () => anim.destroy();
  }, [animationData]);

  return <div ref={ref} className={className} />;
}

export default LottieLoop