import React, { useState, useEffect } from "react";
import saun from "../assets/Images/saun6zjg.webp";
import ferrari from "../assets/Images/ferrari2.webp";
import lambo from "../assets/Images/lambo.webp";
import range from "../assets/Images/rangehd.webp";
import yellow from "../assets/Images/yellowcar3.webp";
import mansory from "../assets/Images/mansory-venatus-3840x2160-24153-removebg-preview.png";
import Navbar from "./Navbar";
import FixedBackgroundHero from "./FixedBackgroundHero1";
import { Link } from "react-router-dom";
import car from "../assets/Images/audi-a5l-quattro-3840x2160-21427.jpg";
import Footer from "./Footer";
import CarLogoMarquee from "./CarLogoMarquee";
import mechanic from "../assets/Images/mechanic-fixing-car-brake.jpg";
import mechanic2 from "../assets/Images/mechanic-servicing-car.jpg";
// Accordion Item Component
const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <button
        className="w-full px-6 py-4 flex justify-between items-center text-left font-medium text-white hover:bg-gray-800 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-gray-300 text-sm leading-relaxed">
          {content}
        </div>
      )}
    </div>
  );
};
const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const cars = [
    {
      id: 1,
      name: "Jaguar F-Type",
      model: "TYPE R",
      image: yellow,
      color: "yellow",
    },
    {
      id: 2,
      name: "Mercedes-Benz G-Class G 550",
      model: "2024",
      image: range,
      color: "red",
    },
    {
      id: 3,
      name: "Lamborghini Huracán",
      model: "EVO",
      image: lambo,
      color: "orange",
    },
    {
      id: 4,
      name: "Ferrari Roma",
      model: "P300",
      image: ferrari,
      color: "gray",
    },
    {
      id: 5,
      name: "Aston Martin DB12",
      model: "V8",
      image: saun,
      color: "blue",
    },
    {
      id: 6,
      name: "Mansory Venatus",
      model: "2024",
      image: mansory,
      color: "black",
    },
  ];

  const nextCar = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % cars.length);
      setIsTransitioning(false);
    }, 300);
  };

  const prevCar = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + cars.length) % cars.length);
      setIsTransitioning(false);
    }, 300);
  };

  const currentCar = cars[activeIndex];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* === PRICE BADGE (Fixed Top-Right) === */}

      {/* === CAROUSEL SECTION === */}
      <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Dark Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black"></div>

        {/* Subtle Background Circle */}
        <div className="absolute w-full h-full flex items-center justify-center">
          <div className="w-[80%] h-[80%] rounded-full border border-gray-700 opacity-20"></div>
        </div>

        {/* Left Preview Button */}
        <div
          className="absolute left-4 top-1/2 -translate-y-1/2 w-20 h-20 rounded-md overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform"
          onClick={prevCar}
        >
          <img
            src={cars[(activeIndex - 1 + cars.length) % cars.length]?.image}
            alt="Previous"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-white text-center px-4 max-w-4xl">
          <div className="text-sm uppercase tracking-wider mb-2 text-gray-400">
            {currentCar.model}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            EvaRichy<span className="text-yellow-500">Cars</span>
          </h1>

          {/* Car Image — Glow on Hover */}
          <div className="mt-4 relative">
            <img
              src={currentCar.image}
              alt={currentCar.name}
              className={`w-full max-w-lg mx-auto transition-all duration-500 ${
                isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter =
                  "drop-shadow(0 0 24px rgba(255, 255, 255, 0.25))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "none";
              }}
            />
          </div>

          <div className="mt-8 text-xl font-medium">{currentCar.name}</div>
        </div>

        {/* Right Preview Button */}
        <div
          className="absolute right-4 top-1/2 -translate-y-1/2 w-20 h-20 rounded-md overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform"
          onClick={nextCar}
        >
          <img
            src={cars[(activeIndex + 1) % cars.length]?.image}
            alt="Next"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 flex space-x-2">
          {cars.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-3 h-3 rounded-full transition-colors ${
                i === activeIndex ? "bg-yellow-500" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>

      {/* === MOTORS SERVICE CENTER SECTION === */}
      <div className="py-16 px-6 md:px-12 lg:px-24 bg-white text-gray-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          {/* Text Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-600 mb-6">
              MOTORS <span className="text-black">SERVICE CENTER</span>
            </h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Are you ready to give your car the service it is asking for?
              Schedule car maintenance or repair right here. Our top-notch
              service staff can get your car or truck in and out quickly. We
              know there isn’t much more frustrating than being without your
              vehicle while it gets repaired. That’s why we have a staff that
              excels in providing top-notch maintenance and repair — and is able
              to do it quickly.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="text-yellow-500">✓</span>
                  General Automotive Repair
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-500">✓</span>
                  Preventative Car Maintenance
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-500">✓</span>
                  Air Conditioning and Heater Service
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-500">✓</span>
                  Cooling System and Radiator Repair
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-500">✓</span>
                  Synthetic Motor Oil Replacement
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="text-yellow-500">✓</span>
                  Oil Filter Replacement
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-500">✓</span>
                  Brake Repair
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-500">✓</span>
                  Engine Diagnostic
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-500">✓</span>
                  Belts, Hoses, Fluids
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-500">✓</span>
                  Transmission Services
                </li>
              </ul>
            </div>

            <p className="mt-8 text-gray-700 leading-relaxed">
              Save yourself some time by scheduling service right here. After
              you submit the form, we’ll be in touch to confirm your service
              appointment. It doesn’t get much easier than that.
            </p>
          </div>

          {/* Images */}
          <div className="space-y-6">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={mechanic}
                alt="Mechanic working on car with laptop"
                className="w-full h-48 md:h-64 object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={mechanic2}
                alt="Close-up of engine maintenance"
                className="w-full h-48 md:h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* === OUR CORE SERVICES SECTION === */}
      <div className="py-16 px-6 md:px-12 lg:px-24 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-500 mb-12 text-center">
            <span className="text-white">Our Core</span> Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* OIL CHANGES */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors">
              <div className="text-yellow-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.5 5.5A2.5 2.5 0 0 1 7 3a2.5 2.5 0 0 1 2.5 2.5c0 .89-.48 1.68-1.17 2.12l-.63.38c-.69.44-1.17 1.23-1.17 2.12v1.75a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V10c0-.89-.48-1.68-1.17-2.12l-.63-.38C1.98 7.18 1.5 6.39 1.5 5.5A2.5 2.5 0 0 1 4 3a2.5 2.5 0 0 1 .5 2.5zm0 0" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Oil Changes</h3>
              <p className="text-gray-300 leading-relaxed">
                Keep your engine running smoothly with our precision oil change
                services. We use premium synthetic oils and high-quality filters
                to extend engine life and maintain peak performance.
              </p>
            </div>

            {/* AIR CONDITIONING */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors">
              <div className="text-yellow-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3zM4 4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Air Conditioning</h3>
              <p className="text-gray-300 leading-relaxed">
                Beat the heat with our comprehensive AC servicing. We recharge
                refrigerant, inspect hoses and compressors, and ensure your
                cabin stays cool and comfortable all year round.
              </p>
            </div>

            {/* AUTO ELECTRIC */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors">
              <div className="text-yellow-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M13 0H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-2 14a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Auto Electric</h3>
              <p className="text-gray-300 leading-relaxed">
                From battery diagnostics to complex wiring repairs, our
                certified technicians handle all electrical systems. We ensure
                your lights, sensors, infotainment, and safety features operate
                flawlessly.
              </p>
            </div>

            {/* BRAKE SERVICE */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors">
              <div className="text-yellow-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3zM4 4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Brake Service</h3>
              <p className="text-gray-300 leading-relaxed">
                Your safety comes first. We inspect, clean, and replace brake
                pads, rotors, and fluid to ensure responsive stopping power.
                Don’t wait until you hear squealing — schedule your brake check
                today.
              </p>
            </div>

            {/* TRANSMISSION */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors">
              <div className="text-yellow-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3zM4 4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Transmission</h3>
              <p className="text-gray-300 leading-relaxed">
                Smooth shifting starts with proper transmission care. We offer
                flushes, inspections, and repairs for both automatic and manual
                transmissions to prevent costly failures and ensure reliable
                performance.
              </p>
            </div>

            {/* TIRE & WHEEL SERVICE */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors">
              <div className="text-yellow-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3zM4 4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Tire & Wheel Service</h3>
              <p className="text-gray-300 leading-relaxed">
                Maintain optimal handling and fuel efficiency with our tire
                rotation, balancing, alignment, and replacement services. We
                carry premium brands and match tires to your driving style and
                vehicle.
              </p>
            </div>
          </div>
        </div>
      </div>
      <FixedBackgroundHero
        imageUrl={car}
        title="Interested in Booking?"
        subtitle="Don't hesitate and send us a message."
      >
        {/* === BUTTONS INSIDE HERO === */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md">
          {/* WhatsApp Button */}
          <a
            href="https://wa.me/08036098387?text=Hi%2C%20I%20saw%20your%20car%20rental%20website!"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-yellow-500 text-black font-bold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.474-.148-.674-.148-.199 0-.523.074-.748.297l-.075.05-.074.05c-1.859 1.066-3.047 1.066-3.371 1.066-.348 0-.748-.05-.972-.149-.224-.099-.674-.297-.823-.397-.149-.099-.474-.297-.748-.596-.273-.298-.423-.447-.572-.596-.149-.149-.348-.397-.523-.596-.174-.199-.374-.447-.523-.745-.149-.298-.298-.646-.374-.945-.074-.298-.149-.646-.149-.994v-.075c0-.298.074-.596.149-.895.074-.298.224-.596.374-.895.149-.298.348-.596.523-.845.174-.248.374-.546.572-.795.199-.248.423-.497.674-.745.25-.249.499-.497.748-.745.25-.249.523-.447.798-.646.273-.199.572-.397.871-.546.298-.149.622-.298.946-.397s.674-.149 1.022-.149h.074c.348 0 .674.05 1.022.149.348.099.674.248.997.397.323.149.622.347.895.546.274.199.572.397.846.646.273.248.523.496.748.745.224.248.423.497.622.745.199.249.348.546.498.845.149.298.298.596.374.895.074.298.149.646.149.994v.075c0 .348-.074.696-.149.994-.074.298-.224.596-.374.895-.149.298-.348.596-.523.845-.174.248-.374.546-.572.795-.199.248-.423.497-.674.745-.25.249-.499.497-.748.745-.25.249-.523.447-.798.646-.273.199-.572.397-.871.546-.298.149-.622.298-.946.397s-.674.149-1.022.149h-.074c-.224 0-.474-.05-.674-.149-.2-.099-.474-.297-.748-.596-.273-.298-.474-.447-.674-.596-.199-.149-.474-.397-.748-.646-.273-.248-.474-.497-.674-.745-.199-.248-.348-.546-.474-.845-.124-.298-.224-.596-.273-.895-.05-.298-.074-.646-.074-.994v-.075c0-.348.024-.696.074-.994.05-.298.149-.596.273-.895.124-.298.273-.596.474-.895.199-.298.348-.596.572-.845.224-.248.423.497.674-.745.25-.249.499-.497.748-.745.25-.249.523-.447.798.646.273.199.572.397.871.546.298.149.622.298.946.397s.674.149 1.022.149h.074c.348 0 .674.05 1.022.149.348.099.674.248.997.397.323.149.622.347.895.546.274.199.572.397.846.646.273.248.523.496.748.745.224.248.423.497.622.745.199.249.348.546.498.845.149.298.298.596.374.895.074.298.149.646.149.994v.075c0 .348-.074.696-.149.994-.074.298-.224.596-.374.895-.149.298-.348.596-.523.845-.174.248-.374.546-.572.795-.199.248-.423.497-.674.745-.25.249-.499.497-.748.745-.25.249-.523.447-.798.646-.273.199-.572.397-.871.546-.298.149-.622.298-.946.397s-.674.149-1.022.149h-.074c-.224 0-.474-.05-.674-.149z" />
            </svg>
            WhatsApp
          </a>

          {/* Rent Now Button */}
          <Link to="/rent_cars" className="flex items-center justify-center">
            <button className="flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-white text-white font-bold rounded-full shadow-md hover:shadow-lg hover:bg-white hover:text-black transition-all duration-300">
              Rent Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-4M10 6L8 8m0 0l2 2m-2-2l2-2m2 2l2-2m-2 2l2 2m4-4V4m8 12a2 2 0 00-2-2h-2a2 2 0 00-2 2v8a2 2 0 002 2h2a2 2 0 002-2v-8z"
                />
              </svg>
            </button>
          </Link>

          {/* Schedule Service Button */}
          <Link
            to="/schedule_services"
             className="flex items-center justify-center gap-2
            px-8 py-4 bg-transparent border border-yellow-500 text-yellow-500
            font-bold rounded-full shadow-md hover:shadow-lg hover:bg-yellow-500
            hover:text-black transition-all duration-300" > Schedule Service
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </Link>
        </div>
      </FixedBackgroundHero>

      {/* === FULL CAR INFO SECTION BELOW HERO === */}
      <div className="relative w-full max-w-6xl mx-auto mt-8 bg-black/70 rounded-xl overflow-hidden">
        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
          {/* LEFT COLUMN: General Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">
              General <span className="text-yellow-500">Information</span>
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              At EvaRichyCars, we simplify every aspect of car ownership and
              usage. Whether you’re looking to{" "}
              <span className="text-yellow-500">buy</span> your dream vehicle,{" "}
              <span className="text-yellow-500">rent</span> a luxury car for a
              special occasion, or{" "}
              <span className="text-yellow-500">book a certified mechanic</span>{" "}
              on-demand — we deliver premium quality, total transparency, and
              unmatched convenience.
            </p>

            {/* Bullet Points */}
            <div className="space-y-4">
              {[
                "24/7 Roadside Assistance",
                "Free Cancellation & Return",
                "Rent Now Pay When You Arrive",
                "Rent luxury & performance cars — from daily drives to special events",
                "Book certified mechanics for on-site repairs, oil changes & diagnostics",
                "Book a Driver",
                "Buy pre-owned vehicles with full inspection reports & warranty options",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-gray-200"
                >
                  <div className="w-6 h-6 flex items-center justify-center bg-gray-700 rounded-full">
                    <span className="text-yellow-500">✓</span>
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Price Badge — Positioned at top-right of specs panel */}
          <div className="absolute top-0 right-0 z-10 bg-yellow-500 text-black font-bold text-xl px-6 py-3 rounded-tl-2xl rounded-tr-2xl rounded-br-lg rounded-bl-lg shadow-lg">
            <span className="text-2xl">$600</span>
            <span className="text-sm ml-1">/ rent per day</span>
          </div>
          {/* RIGHT COLUMN: Car Specs Panel — WITH PRICE BADGE AT TOP-RIGHT */}
          <div className="bg-gray-900 rounded-xl p-6 space-y-4 relative">
            {/* Specs List */}
            <div className="pt-8 space-y-4">
              {" "}
              {/* Add padding-top to avoid overlap with badge */}
              {[
                { label: "Doors", value: "4", icon: "🚪" },
                { label: "Passengers", value: "5", icon: "👥" },
                { label: "Transmission", value: "Auto", icon: "⚙️" },
                { label: "Luggage", value: "2 Bags", icon: "🧳" },
                { label: "Air Condition", value: "Yes", icon: "❄️" },
                { label: "Age", value: "18", icon: "👤" },
              ].map((spec, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center py-3 border-b border-gray-700 last:border-b-0"
                >
                  <div className="flex items-center gap-3 text-gray-200">
                    <span className="text-lg">{spec.icon}</span>
                    <span>{spec.label}</span>
                  </div>
                  <span className="font-medium text-white">{spec.value}</span>
                </div>
              ))}
              {/* Combined Button: Rent Now + WhatsApp */}
              <div className="mt-8 flex items-center justify-center gap-2">
                <Link
                  to="/rent_cars"
                  className="flex items-center justify-center"
                >
                  <button className="flex-1 bg-yellow-500 text-black font-bold py-3 px-12  rounded-l-full hover:bg-yellow-600 transition">
                    Rent Now
                  </button>
                </Link>
                <div className="w-px h-8 bg-black"></div> {/* Divider */}
                <a
                  href="https://wa.me/08036098387?text=Hi%2C%20I%20saw%20your%20car%20rental%20website!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-transparent border border-yellow-500 text-yellow-500 font-bold py-3 px-6 rounded-r-full hover:bg-yellow-500 hover:text-black transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.474-.148-.674-.148-.199 0-.523.074-.748.297l-.075.05-.074.05c-1.859 1.066-3.047 1.066-3.371 1.066-.348 0-.748-.05-.972-.149-.224-.099-.674-.297-.823-.397-.149-.099-.474-.297-.748-.596-.273-.298-.423-.447-.572-.596-.149-.149-.348-.397-.523-.596-.174-.199-.374-.447-.523-.745-.149-.298-.298-.646-.374-.945-.074-.298-.149-.646-.149-.994v-.075c0-.298.074-.596.149-.895.074-.298.224-.596.374-.895.149-.298.348-.596.523-.845.174-.248.374-.546.572-.795.199-.248.423-.497.674-.745.25-.249.499-.497.748-.745.25-.249.523-.447.798-.646.273-.199.572-.397.871-.546.298-.149.622-.298.946-.397s.674-.149 1.022-.149h.074c.348 0 .674.05 1.022.149.348.099.674.248.997.397.323.149.622.347.895.546.274.199.572.397.846.646.273.248.523.496.748.745.224.248.423.497.622.745.199.249.348.546.498.845.149.298.298.596.374.895.074.298.149.646.149.994v.075c0 .348-.074.696-.149.994-.074.298-.224.596-.374.895-.149.298-.348.596-.523.845-.174.248-.374.546-.572.795-.199.248-.423.497-.674.745-.25.249-.499.497-.748.745-.25.249-.523.447-.798.646-.273.199-.572.397-.871.546-.298.149-.622.298-.946.397s-.674.149-1.022.149h-.074c-.224 0-.474-.05-.674-.149-.2-.099-.474-.297-.748-.596-.273-.298-.474-.447-.674-.596-.199-.149-.474-.397-.748-.646-.273-.248-.474-.497-.674-.745-.199-.248-.348-.546-.474-.845-.124-.298-.224-.596-.273-.895-.05-.298-.074-.646-.074-.994v-.075c0-.348.024-.696.074-.994.05-.298.149-.596.273-.895.124-.298.273-.596.474-.895.199-.298.348-.596.572-.845.224-.248.423.497.674-.745.25-.249.499-.497.748-.745.25-.249.523-.447.798.646.273.199.572.397.871.546.298.149.622.298.946.397s.674.149 1.022.149h.074c.348 0 .674.05 1.022.149.348.099.674.248.997.397.323.149.622.347.895.546.274.199.572.397.846.646.273.248.523.496.748.745.224.248.423.497.622.745.199.249.348.546.498.845.149.298.298.596.374.895.074.298.149.646.149.994v.075c0 .348-.074.696-.149.994-.074.298-.224.596-.374.895-.149.298-.348.596-.523.845-.174.248-.374.546-.572.795-.199.248-.423.497-.674.745-.25.249-.499.497-.748.745-.25.249-.523.447-.798.646-.273.199-.572.397-.871.546-.298.149-.622.298-.946.397s-.674.149-1.022.149h-.074c-.224 0-.474-.05-.674-.149z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* === RENTAL CONDITIONS SECTION === */}
      {/* === RENTAL CONDITIONS SECTION (WITH TOGGLE) === */}
      <div className="py-16 px-6 md:px-12 lg:px-24 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-500 mb-8">
            <span className="text-white">Rental</span> Conditions
          </h2>

          <div className="space-y-4">
            {[
              {
                title: "1. Contract and Annexes",
                content:
                  "In addition to the car rental contract to be signed at the time of delivery, a credit card is required from our individual customers. We request our commercial customers to submit their company documents (tax plate, signature slip, ID photocopy).",
              },
              {
                title: "2. Driving License and Age",
                content:
                  "All drivers must hold a valid driver’s license for at least 2 years. Minimum age requirement is 25 years. International licenses are accepted with an official translation.",
              },
              {
                title: "3. Prices",
                content:
                  "All prices are quoted per 24-hour period and include unlimited mileage, insurance, and basic maintenance. Additional fees may apply for extra drivers, fuel top-up, or late returns.",
              },
              {
                title: "4. Payments",
                content:
                  "Payment can be made via credit/debit card or bank transfer. A security deposit is required upon pickup and will be refunded within 7 days if no damage or violations occur.",
              },
              {
                title: "5. Delivery",
                content:
                  "We offer free delivery within 10km of our depot. For longer distances, a small fee applies. Delivery times can be scheduled during business hours (8am–6pm).",
              },
              {
                title: "6. Traffic Fines",
                content:
                  "Any traffic fines incurred during the rental period are the responsibility of the renter. We will forward all notices and charges directly to you after the rental ends.",
              },
              {
                title: "7. General Terms",
                content:
                  "All rentals are governed by our standard terms and conditions. By signing the contract, you agree to comply with all rules, including no off-road driving, no smoking, and no unauthorized modifications.",
              },
            ].map((item, index) => (
              <AccordionItem
                key={index}
                title={item.title}
                content={item.content}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <CarLogoMarquee />
      </div>
      <Footer />
      {/* === PRICE BADGE — FLOATING ON TOP OF HERO SECTION === */}
      <div className="fixed top-20 right-4 z-50 bg-yellow-500 text-black font-bold text-xl px-6 py-3 rounded-tl-2xl rounded-tr-2xl rounded-br-lg rounded-bl-lg shadow-lg">
        <span className="text-2xl text-white">EvaRichy</span>
        <span className="text-sm ml-1"> cars</span>
      </div>
    </div>
  );
};

export default Services;