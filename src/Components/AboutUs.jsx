// src/components/AboutUs.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Navbar from "./Navbar";
import hd from "../assets/Images/aboutus-desktop-hd-lexus-ux-background.jpg";
import lexus from "../assets/Images/lexus-s-background.jpg";
import man from "../assets/Images/african-american-man.jpg";
import businessman from "../assets/Images/waist-up-successful-confident-african-american-businessman-looking-sassy.jpg";
import womanstanding from "../assets/Images/african-business-woman-standing-grey-wall.jpg";
import young from "../assets/Images/pretty-attractive-young-mixed-race-model-with-large-afro-wearing-navy-jacket-her-naked-body-shorts.jpg";
import woman from "../assets/Images/stylish-employee-with-suit-tie.jpg";

import sunglass from "../assets/Images/sunglasses.jpg";
import businessmans from "../assets/Images/businessman.jpg";
import blackwoman from "../assets/Images/outdoor-lifestyle-portrait-smiling-black-woman-pink-glasses.jpg";
import pink from "../assets/Images/outdoor-lifestyle-portrait-smiling-black-woman-pink-glasses.jpg";
import african from "../assets/Images/portrait-happy-excited-african-man-removebg-preview.png";
import angle from "../assets/Images/high-angle-woman-talking-phone.jpg";

import FixedBackgroundHero1 from "./FixedBackgroundHero1";
import Footer from "./Footer";

const AboutUs = () => {
  const sliderRef = useRef(null);
  const wrapperRef = useRef(null);

  const TestimonialCard = ({ quote, name, title, avatarSrc }) => (
    <div className="flex-none w-full sm:w-1/2 lg:w-1/3 px-4">
      <div className="relative p-8 bg-white rounded-3xl shadow-xl flex flex-col justify-between h-full">
        <div className="absolute top-8 right-8 text-yellow-500 text-lg">
          ★★★★★
        </div>
        <p className="text-8xl font-serif text-yellow-500 opacity-70 mb-4 -mt-4 -ml-2">
          “
        </p>
        <p className="text-gray-800 mb-8 leading-relaxed flex-grow">{quote}</p>
        <div className="flex items-center mt-auto">
          <img
            src={avatarSrc}
            alt={name}
            className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-gray-700"
          />
          <div>
            <p className="text-black font-semibold">{name}</p>
            <p className="text-sm text-gray-800">{title}</p>
          </div>
        </div>
      </div>
    </div>
  );

  // ✅ GSAP Auto Slide Logic
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const slider = sliderRef.current;
    const cards = slider.children;
    const totalCards = cards.length;

    // Clone cards for infinite loop
    const cloneCount = 3;
    for (let i = 0; i < cloneCount; i++) {
      const clone = cards[i].cloneNode(true);
      slider.appendChild(clone);
    }

    let visibleCards = 3;
    let cardWidth = 0;
    let currentX = 0;

    const updateValues = () => {
      if (window.innerWidth < 640) visibleCards = 1;
      else if (window.innerWidth < 1024) visibleCards = 2;
      else visibleCards = 3;

      cardWidth = cards[0].offsetWidth;
      gsap.set(slider, { x: currentX });
    };

    const animate = () => {
      currentX -= cardWidth;
      gsap.to(slider, {
        x: currentX,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          if (Math.abs(currentX) >= cardWidth * totalCards) {
            currentX = 0;
            gsap.set(slider, { x: currentX });
          }
        },
      });
    };

    updateValues();
    const interval = setInterval(animate, 4000);
    window.addEventListener("resize", updateValues);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", updateValues);
    };
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* --- WELCOME SECTION --- */}
      <div className="py-16 px-4 mt-11 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={woman}
              alt="Professional at car dealership"
              className="w-full h-auto object-cover"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              WELCOME TO <span className="text-yellow-500">EVARICHY CARS</span>
            </h2>
            <p className="text-gray-600 mb-6">
              Before we get ahead of ourselves, we want to welcome you to
              EvaRichy Cars. While nothing can replace the on-the-lot
              experience.
            </p>
            <p className="text-gray-600 mb-6">
              At EvaRichy Cars, we don’t just sell and rent cars — we deliver
              freedom, flexibility, and peace of mind. Whether you're looking to
              own your dream vehicle or need a reliable ride for a weekend
              getaway, a business trip, or a special occasion, we’ve got you
              covered. Our curated selection of premium new and pre-owned cars
              ensures quality and value, while our seamless rental process puts
              you in the driver’s seat with minimal hassle. Because whether
              you’re buying or renting, your journey should start with trust.
            </p>
            <p className="text-gray-500 italic mt-8">
              — Eva Attufuah, President of EvaRichyCars
            </p>
          </div>
        </div>

        {/* --- CORE VALUES SECTION --- */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              CORE VALUES
            </h3>
            <p className="text-gray-600 mb-6">
              We go through extensive factory training so that we may provide
              you with the knowledge you need to make an educated decision in
              choosing the vehicle that is right for your lifestyle.
            </p>
            <ul className="space-y-3 text-gray-600">
              {[
                "Stress-free finance department.",
                "Robust selection of popular vehicles.",
                "We offer multiple services.",
                "Maintain your car to stay safe on the road.",
                "We know how to handle a wide range of car services.",
              ].map((text, i) => (
                <li key={i} className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={hd}
              alt="Luxury car showroom"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* --- FIXED HERO SECTION --- */}
      <FixedBackgroundHero1
        imageUrl={lexus}
        className="h-24"
        title="We Sell and Rent Luxury Cars.."
        subtitle="Don't hesitate and send us a message."
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
      </FixedBackgroundHero1>

      {/* --- TESTIMONIALS SECTION --- */}
      <div className="bg-gray-900 py-20  overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-yellow-500 text-sm tracking-widest uppercase mb-2">
              TESTIMONIALS
            </p>
            <h2 className="text-4xl font-extrabold text-white">
              What <span className="text-yellow-500">Clients Say</span>
            </h2>
          </div>

          <div ref={wrapperRef} className="overflow-hidden">
            <div
              ref={sliderRef}
              className="flex transition-transform duration-1000 ease-in-out"
            >
              <TestimonialCard
                quote="I couldn't believe how easy the entire process was! From browsing the rentals to buying my new car, EvaRichy Cars made it absolutely seamless."
                name="Emily Martin"
                title="Frequent Renter"
                avatarSrc={sunglass}
              />
              <TestimonialCard
                quote="Selling my old car was stress-free thanks to the team here. They handled everything professionally!"
                name="Victor Martin"
                title="Former Owner"
                avatarSrc={businessmans}
              />
              <TestimonialCard
                quote="Whether you're buying or renting, EvaRichy Cars is the best decision you can make!"
                name="Olivia Brown"
                title="Happy Customer"
                avatarSrc={blackwoman}
              />
              <TestimonialCard
                quote="I rely on EvaRichy Cars for all my business travel. Their rental process is fast and professional."
                name="Mark Johnson"
                title="Business Client"
                avatarSrc={african}
              />
              <TestimonialCard
                quote="The pre-owned selection here is unmatched. I bought a used car that feels brand new!"
                name="Sarah long"
                title="New Owner"
                avatarSrc={pink}
              />
              <TestimonialCard
                quote="Financing was easy and transparent. EvaRichy Cars made it stress-free from start to finish!"
                name="Smith Williams"
                title="Satisfied Buyer"
                avatarSrc={angle}
              />
            </div>
          </div>
        </div>
      </div>
      {/* --- OUR TEAM SECTION --- */}
      <div className="bg-white py-20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900">
              OUR <span className="text-yellow-500">TEAM</span>
            </h2>
            <div className="w-12 h-1 bg-yellow-500 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="text-center group">
              <div className="relative overflow-hidden rounded-lg shadow-lg mb-4">
                <img
                  src={businessman} // 👈 Replace with real image later
                  alt="Lennox Wardell"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                LENNOX WARDELL
              </h3>
              <p className="text-gray-600">Chief Executive Officer</p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center group">
              <div className="relative overflow-hidden rounded-lg shadow-lg mb-4">
                <img
                  src={young}
                  alt="Sarah Odegard"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900">SARAH ODEGARD</h3>
              <p className="text-gray-600">President of Finance</p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center group">
              <div className="relative overflow-hidden rounded-lg shadow-lg mb-4">
                <img
                  src={man}
                  alt="Lars Jakuba"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900">LARS JAKUBA</h3>
              <p className="text-gray-600">Executive Vice President</p>
            </div>

            {/* Team Member 4 */}
            <div className="text-center group">
              <div className="relative overflow-hidden rounded-lg shadow-lg mb-4">
                <img
                  src={womanstanding}
                  alt="Mikey Diokles"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900">MIKEY DIOKLES</h3>
              <p className="text-gray-600">Sales Manager</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
