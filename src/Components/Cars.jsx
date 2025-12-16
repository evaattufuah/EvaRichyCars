import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Navbar from "./Navbar";
import carImage from "../assets/Images/brabus-800-mean-3840x2160-23786-removebg-preview.png";
import VehicleSearch from "./VehicleSearch";
import CarInventory from "./CarInventory";
import CarLogoMarquee from "./CarLogoMarquee";

import Footer from "./Footer";
const Cars = () => {
  const evaTextRef = useRef(null);
  const richyTextRef = useRef(null);
  const carImageRef = useRef(null);

  useEffect(() => {
    // Animate background texts
    gsap.fromTo(
      evaTextRef.current,
      { opacity: 0.15 },
      { opacity: 0.06, duration: 2, ease: "power2.out" }
    );
    gsap.fromTo(
      richyTextRef.current,
      { opacity: 0.15 },
      { opacity: 0.06, duration: 2, ease: "power2.out", delay: 0.2 }
    );

    // CAR: Emerging FROM the screen
    gsap.fromTo(
      carImageRef.current,
      {
        opacity: 0,
        scale: 0.4,
        filter: "blur(20px)",
      },
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 2.2,
        delay: 0.5,
        ease: "back.out(1.4)",
      }
    );
  }, []);

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen w-full bg-white overflow-hidden flex items-center justify-center">
        {/* Background Texts — EVA at top, RICHY at bottom */}
        <h1
          ref={evaTextRef}
          className="absolute top-0 left-1/2 -translate-x-1/2 text-[15rem] md:text-[20rem] font-black text-gray-900 pointer-events-none select-none z-0 whitespace-nowrap"
        >
          EVA
        </h1>

        <h1
          ref={richyTextRef}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[15rem] md:text-[20rem] font-black text-gray-900 pointer-events-none select-none z-0 whitespace-nowrap"
        >
          RICHY
        </h1>

        {/* Car — centered, bigger */}
        <div className="relative z-10 px-4 w-full flex justify-center">
          <img
            ref={carImageRef}
            src={carImage}
            alt="Brabus 800"
            className="w-[90%] max-w-[1000px] h-auto object-contain drop-shadow-2xl"
          />
        </div>
      </div>
      <div className="bg-gray-900 h-60 -mt-8">
        <VehicleSearch />
      </div>
      <CarInventory />

      <div className="relative z-10">
        <CarLogoMarquee />
      </div>
      <Footer />
    </>
  );
};

export default Cars;
