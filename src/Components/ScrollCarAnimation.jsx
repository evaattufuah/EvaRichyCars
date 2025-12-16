// ScrollCarAnimation.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import car from "../assets/Images/mercedes-benz-gles-wallpaper-photo-removebg-preview.png";
// import car from "../assets/Images/nissan-wallpaper-removebg-preview.png";


const ScrollCarAnimation = () => {
  const carRef = useRef(null);
  const ghost1Ref = useRef(null);
  const ghost2Ref = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".scroll-section",
        start: "top 80%",
        end: "bottom 40%",
        scrub: true,
      },
    });

    // Main car: flies in from far right → stops at left side (not center)
    tl.fromTo(
      carRef.current,
      { x: "100vw", opacity: 0, scale: 0.8 }, // starts off-screen right, smaller
      { x: "-20vw", opacity: 1, scale: 1, ease: "power2.out" } // ends on left side
    );

    // Ghost 1: slightly behind main car, fades in
    tl.fromTo(
      ghost1Ref.current,
      { x: "120vw", opacity: 0, scale: 0.50 },
      { x: "0vw", opacity: 0.5, scale: 0.9, ease: "power2.out" },
      "<"
    );

    // Ghost 2: further behind, more transparent
    tl.fromTo(
      ghost2Ref.current,
      { x: "140vw", opacity: 0, scale: 0.7 },
      { x: "20vw", opacity: 0.15, scale: 0.85, ease: "power2.out" },
      "<"
    );
  }, []);

  return (
    <section className="scroll-section h-100 flex items-center justify-center bg-white relative overflow-hidden">
      {/* Ghost 2 - farthest, most transparent */}
      <img
        ref={ghost2Ref}
        src={car}
        alt="Car ghost 2"
        className="h-80 w-auto absolute z-0 pointer-events-none"
        style={{ filter: "brightness(1.3) blur(1px)" }}
      />

      {/* Ghost 1 - middle, medium transparency */}
      <img
        ref={ghost1Ref}
        src={car}
        alt="Car ghost 1"
        className="h-80 w-auto absolute z-10 pointer-events-none"
        style={{ filter: "brightness(1.2) blur(0.5px)" }}
      />

      {/* Main Car - sharp, full opacity, positioned on left */}
      <img
        ref={carRef}
        src={car}
        alt="Main car"
        className="h-80 w-auto relative z-20 pointer-events-none"
      />
    </section>
  );
};

export default ScrollCarAnimation;
