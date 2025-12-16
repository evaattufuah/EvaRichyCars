import React from "react";
import porsche from "../assets/Images/porsche_logo.png";
import ferrari from "../assets/Images/390-removebg-preview.png";
import benz from "../assets/Images/566-removebg-preview.png";
import peugeot from "../assets/Images/9458-removebg-preview.png";
import maserati from "../assets/Images/982-removebg-preview.png";
import Rolls from "../assets/Images/1021.png";
import Jaguar from "../assets/Images/891398-removebg-preview.png";



const CarLogoMarquee = () => {
  const carLogos = [
    { name: "Porsche", src: porsche },
    { name: "ferrari", src: ferrari },
    { name: "benz", src: benz },
    { name: "peugeot", src: peugeot },
    { name: "maserati", src: maserati },
    { name: "Rolls", src: Rolls },
    { name: "Jaguar", src: Jaguar },
  ];

  return (
    <div className="bg-gray-500 py-2">
      <div className="overflow-hidden relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {/* First set of logos */}
          {carLogos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="inline-block px-8 py-4"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-16 w-auto object-contain"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {carLogos.map((logo, index) => (
            <div
              key={`${logo.name}-duplicate-${index}`}
              className="inline-block px-8 py-4"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-16 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
          display: inline-flex;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default CarLogoMarquee;
