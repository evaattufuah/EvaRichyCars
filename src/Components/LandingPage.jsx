// LandingPage.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination } from "swiper/modules";

// 2. SWIPER CSS IMPORTS
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import React from "react";
import lexus from "../assets/Images/cadillac1.jpg";
import mclaren from "../assets/Images/4k-wallpaper-image.jpg";
import land from "../assets/Images/range_rover.jpg";
import rover from "../assets/Images/hd-range-rover-background-desert.jpg";
import pink from "../assets/Images/cars4.jpg";
import red from "../assets/Images/redfull-hd-range-rover-wallpaper-image.jpg";
import Navbar from "./Navbar";
import SplitImage from "./SplitImage";
import VehicleSearch from "./VehicleSearch";
import CarShowcase from "./CarShowcase";
import CarInventory from "./CarInventory";
import FixedBackgroundHero from "./FixedBackgroundHero";
import CarLogoMarquee from "./CarLogoMarquee";
import LatestNews from "./LatestNews";
import { Link } from "react-router-dom";
import ScrollCarAnimation from "./ScrollCarAnimation";
import CarRentalProcess from "./CarRentalProcess";
import ContactUs1 from "./ContactUs1";
import Footer from "./Footer";

const LandingPage = () => {
  // Slides data structure: Defined using existing image imports
  const heroSlides = [
    { id: 1, src: lexus, alt: "Cadillac Luxury Car" },
    { id: 2, src: pink, alt: "McLaren Sports Car" },
    { id: 3, src: rover, alt: "Range Rover SUV" },
    { id: 3, src: red, alt: "Range Rover red" },
  ];

  const marqueeItems = [
    "LUXURY CARS",
    "PERFORMANCE",
    "ELEGANCE",
    "SPEED",
    "BOOKINGS",
    "AUTOMOTIVE DESIGN",
    "DRIVE THE FUTURE",
    "EVARICHY MOTORS",
    "INNOVATION",
    "ENGINEERED STYLE",
    "CUSTOM BUILDS",
    "POWER & PRECISION",
    "NEXT-GEN VEHICLES",
    "CAR CULTURE",
    "TECH-DRIVEN",
    "BUILT FOR MOTION",
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* ================= HERO SECTION (FULL WIDTH WITH CENTERED TEXT) ================= */}
      <section className="relative w-full h-screen">
        {/* FULL WIDTH SWIPER IMAGE */}
        <div className="absolute inset-0 w-full h-full">
          {/* DARK OVERLAY FOR BETTER TEXT READABILITY */}
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <Swiper
            modules={[EffectFade, Autoplay, Pagination]}
            effect="fade"
            fadeEffect={{
              crossFade: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            speed={1000}
            slidesPerView={1}
            pagination={{ clickable: true }}
            loop={true}
            className="w-full h-full"
          >
            {heroSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* CENTERED TEXT CONTENT */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            Drive Into <span className="text-yellow-500">Luxury</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Experience unmatched performance, bookings, elegance, and precision
            with EvaRichy Cars.
          </p>
          {/* <div className="flex justify-center space-x-4">
            <button className="bg-yellow-600 px-6 py-3 rounded-full font-semibold hover:bg-yellow-700 transition">
              Explore Cars
            </button>
            <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
              Learn more
            </button>
          </div> */}
        </div>

        {/* MARQUEE AT BOTTOM */}
        <div className="absolute bottom-0 left-0 right-0 z-20 text-white py-2 px-6">
          <div className="marquee-container whitespace-nowrap overflow-hidden">
            <div className="marquee flex items-center space-x-3 text-sm font-medium">
              {Array.from({ length: 2 }).flatMap(() =>
                marqueeItems.map((item, index) => (
                  <React.Fragment key={`${index}-${Math.random()}`}>
                    <span>{item}</span>
                    {index < marqueeItems.length - 1 && (
                      <span className="text-yellow-500">♦</span>
                    )}
                  </React.Fragment>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Marquee CSS */}
        <style jsx>{`
          .marquee-container {
            width: 100%;
            overflow: hidden;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 8px;
          }
          .marquee {
            display: inline-block;
            animation: marquee 70s linear infinite;
            will-change: transform;
            padding: 0 8px;
          }
          @keyframes marquee {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}</style>
      </section>

      {/* ================= TEXT SECTION ================= */}
      <div className="max-w-full text-xl mt-4 text-center px-6 ">
        <span className=" font-bold text-2xl  mb-4">
          We Are More Than A Car
          <span className="text-yellow-500"> Rental Company</span>
        </span>
        <br />
        To the world of luxury and performance cars. From business trips to
        once-in-a-lifetime drives, booking is seamless.
        <br /> More than just rentals we deliver style, speed, and unforgettable
        experiences.
      </div>

      {/* ================= SPLIT IMAGE ================= */}
      <div className="-mt-11 ">
        <SplitImage />
      </div>

      {/* ================= CAR SHOWCASE ================= */}
      <CarShowcase />

      {/* ================= VEHICLE SEARCH ===4============= */}
      <div className="bg-gray-900 h-60 -mt-8">
        <VehicleSearch />
      </div>

      {/* ================= CAR INVENTORY ================= */}
      <CarInventory />

      {/* ✅ ✅ ✅ THIS IS WHERE YOU ADD IT — IMMEDIATELY AFTER FixedBackgroundHero */}
      <FixedBackgroundHero
        imageUrl={land}
        title="Interested in Renting?"
        subtitle="Don't hesitate and send us a message."
      >
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md">
          {/* WhatsApp Button (no link needed, or use <a> if linking to WhatsApp) */}
          <a
            href="https://wa.me/08036098387?text=Hi%2C%20I%20saw%20your%20car%20rental%20website!"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-yellow-500 hover:bg-black text-white font-semibold rounded-full shadow-md transition"
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

          {/* Rent Now Button — wrap Link around button, but style Link as flex item */}
          <Link to="/rent_cars" className="flex items-center justify-center">
            <button className="flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-white hover:bg-black hover:text-white font-semibold rounded-full shadow-md transition">
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
        </div>
      </FixedBackgroundHero>

      <div className="relative z-10">
        <CarLogoMarquee />
      </div>
      <div>
        <ScrollCarAnimation />
      </div>

      {/* Rest of your page */}
      <div className="bg-gray-900">
        <LatestNews />
      </div>
      <FixedBackgroundHero
        imageUrl={mclaren}
        title="Your Dream Car Awaits?"
        subtitle="See it in action, then drive away with confidence."
      >
        {/* === NEW: Car Promo Video Button === */}
        <a
          href="https://www.youtube.com/shorts/FYoCC1TPSMk"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center gap-2 mb-6 cursor-pointer"
        >
          <div className="flex items-center gap-2 text-xl font-bold">
            <span>Car</span>
            <span className="text-yellow-500">Promo</span>
            <span>Video</span>
          </div>
          <div className="w-16 h-16 rounded-full border-2 border-yellow-500 flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-black transition-colors duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </a>
      </FixedBackgroundHero>
      <CarRentalProcess />
      <ContactUs1 />
      <Footer />
    
    </div>
  );
};

export default LandingPage;
