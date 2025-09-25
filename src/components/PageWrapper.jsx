// src/components/PageWrapper.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function PageWrapper({ children }) {
  const wrapperRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      wrapperRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      }
    );
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
}
