import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import maserati from "../assets/Images/maserati.jpg";
import car from "../assets/Images/land-rover-defender-3840x2160-22984.jpg";
import Lexus from "../assets/Images/dhiva.jpg";
import modern from "../assets/Images/hd_range_rover.jpg";

gsap.registerPlugin(ScrollTrigger);

const SplitImage = () => {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left column animation
      gsap.to(leftRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1.3,
        },
        x: -230, // move left more
        ease: "power2.out",
      });

      // Right column animation
      gsap.to(rightRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1.3,
        },
        x: 230, // move right more
        ease: "power2.out",
      });

      // Left column animation
      gsap.to(leftRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1.3,
        },
        x: -230, // move further left
        ease: "power2.out",
      });

      // Right column animation
      gsap.to(rightRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1.3,
        },
        x: 230, // move further right
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex justify-center items-center min-h-screen overflow-hidden"
    >
      {/* Left column */}
      <div ref={leftRef} className="flex flex-col gap-4 z-10">
        <img
          src={maserati}
          alt="maserati"
          className="w-[400px] h-[250px] rounded-lg shadow-lg"
        />
        <img
          src={car}
          alt="car"
          className="w-[400px] h-[250px] rounded-lg shadow-lg"
        />
      </div>

      {/* Text in the middle */}
      <div className="absolute max-w-xl text-center px-12 z-0">
        <h2 className="text-4xl font-bold mb-4">
          Some Of <span className="text-yellow-500">Our Cars</span>
        </h2>
        <p className="text-lg leading-relaxed">
          Luxury meets performance in every ride. From timeless classics to
          next-gen machines, our collection is built for those who value style
          and speed. Buy, sell, or book your dream car with ease — every detail
          is seamless, every drive an experience.
        </p>
      </div>

      {/* Right column */}
      <div ref={rightRef} className="flex flex-col gap-4 z-10">
        <img
          src={Lexus}
          alt="lexus"
          className="w-[400px] h-[250px] rounded-lg shadow-lg"
        />
        <img
          src={modern}
          alt="modern"
          className="w-[400px] h-[250px] rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default SplitImage;
