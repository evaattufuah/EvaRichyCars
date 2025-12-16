import React, { useState } from "react";
import bens from "../assets/Images/mercedesss.jpg";
import pexels from "../assets/Images/pexels1.jpg";
import sport from "../assets/Images/black4k-sports-car-wallpaper.jpg";
import cars from "../assets/Images/car2.png";
import lexuss from "../assets/Images/4k-lexus-ux-wallpaper-image.jpg";



const LatestNews = () => {
  const newsItems = [
    {
      id: 1,
      image: bens,
      category: "RENTAL",
      title: "Documents required for car rental",
      date: { day: "29", month: "Apr" },
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=500&fit=crop",
      category: "SPORT CARS",
      title: "Rental cost of sport and other cars",
      date: { day: "27", month: "Apr" },
    },
    {
      id: 3,
      image: lexuss,
      category: "FINES",
      title: "Rental cars how to check driving fines?",
      date: { day: "25", month: "Apr" },
    },
    {
      id: 4,
      image: pexels,
      category: "INSURANCE",
      title: "How to choose the right car insurance?",
      date: { day: "22", month: "Apr" },
    },
    {
      id: 5,
      image: cars,
      category: "TIPS",
      title: "5 tips for first-time car renters",
      date: { day: "20", month: "Apr" },
    },
    {
      id: 6,
      image: sport,
      category: "DESTINATIONS",
      title: "Best road trip destinations this summer",
      date: { day: "18", month: "Apr" },
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesToShow = 3;
  const totalSlides = Math.ceil(newsItems.length / slidesToShow);

  const goToSlide = (index) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index);
    }
  };

  return (
    <section className="bg-gray-900 py-16 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-sm uppercase tracking-wider text-white">Our Blog</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Latest <span className="text-yellow-500">News</span>
        </h2>
      </div>

      {/* Slider Container */}
      <div className="max-w-6xl mx-auto px-4 overflow-hidden">
        {/* Sliding Wrapper */}
        <div
          className="flex transition-transform duration-700 ease-in-out gap-8"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {newsItems.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-full md:w-[calc(33.333%-1.333rem)] group rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Image with curved bottom and rounded corners */}
              <div className="relative h-[220px] overflow-hidden rounded-t-2xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Dark gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black/80 to-transparent"></div>

                {/* SVG Curve Mask */}
                <svg
                  className="absolute bottom-0 left-0 w-full"
                  viewBox="0 0 400 50"
                  preserveAspectRatio="none"
                  style={{ height: "50px" }}
                >
                  <path
                    d="M0,25 Q200,50 400,25 L400,50 L0,50 Z"
                    fill="#1a1a1a"
                  />
                </svg>
              </div>

              {/* Content box */}
              <div className="relative bg-white rounded-b-2xl p-6 pt-8 min-h-[160px]">
                <div className="absolute left-6">
                  <div className="w-12 h-12 rounded-full bg-gray-800 border-2 border-yellow-400 flex flex-col items-center justify-center text-sm font-bold">
                    <span className="text-xl text-white">{item.date.day}</span>
                    <span className="text-xs text-gray-400">
                      {item.date.month}
                    </span>
                  </div>
                </div>

                <div className="pt-2 ml-16">
                  <span className="block text-xs uppercase tracking-widest text-yellow-400 font-semibold">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-semibold mt-1 text-black leading-tight">
                    {item.title}
                  </h3>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-500 rounded-b-2xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-12 space-x-3">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "bg-yellow-400 scale-125"
                  : "bg-gray-500 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
