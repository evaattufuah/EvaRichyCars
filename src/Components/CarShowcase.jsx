import React, { useState, useRef } from "react";
import lexus from "../assets/Images/cadillac1.jpg";
import Rolls from "../assets/Images/hd-rolls-royce-backgrounds.jpg";
import mercedes from "../assets/Images/hd-mercedes-benz-gle-wallpaper-image.jpg";
import suzuki from "../assets/Images/bike-hd-gsx-r-background.jpg";
import lamborghini from "../assets/Images/car-4k-lamborghini-wallpaper-image.jpg";


const CarShowcase = () => {
  const [selectedCar, setSelectedCar] = useState(1);
  const thumbnailContainerRef = useRef(null);

  const cars = [
    {
      id: 0,
      name: "Rolls-Royce Phantom",
      price: "$450,000.00",
      year: "2023",
      transmission: "Automatic",
      color: "White",
      mileage: "0 miles",
      mainImage: Rolls,
      thumbnailImage: Rolls,
      description:
        "The pinnacle of luxury and engineering. The Rolls-Royce Phantom offers an unparalleled driving experience with its whisper-quiet cabin, hand-crafted interior, and effortless power. It is the definitive choice for those who demand the absolute best in automotive craftsmanship and presence.",
    },
    {
      id: 1,
      name: "911 Carrera",
      price: "$89,400.00",
      year: "2017",
      transmission: "Automatic",
      color: "Red",
      mileage: "18,000 miles",
      mainImage:
        "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&h=600&fit=crop",
      thumbnailImage:
        "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=200&h=150&fit=crop",
      description:
        "Experience the legacy of performance with this stunning 2017 Porsche 911 Carrera — a masterpiece of German engineering in fiery Guards Red. With just 18,000 miles, this low-mileage example is in exceptional condition, embodying the timeless blend of sportscar agility and everyday refinement that defines the 911 legend.",
    },
    {
  id: 2,
  name: "Lamborghini Centenario",
  price: "$2,000,000.00",
  year: "2017",
  transmission: "Automatic (7-speed ISR)",
  color: "Black with Yellow Accents",
  mileage: "1,200 miles",
  mainImage: lamborghini, 
  thumbnailImage: lamborghini, 
  description: "A masterpiece of engineering and design. The Lamborghini Centenario is a limited-edition hypercar powered by a 6.5L V12 engine producing 770 hp, capable of 0–60 mph in just 2.8 seconds. With only 40 units ever made (20 coupes, 20 roadsters), this carbon-fiber-bodied machine combines aerodynamic brilliance, cutting-edge tech, and raw performance — a true collector’s dream."
},
    {
      id: 3,
      name: "Porsche 911 Turbo",
      price: "$145,300.00",
      year: "2021",
      transmission: "PDK",
      color: "Yellow",
      mileage: "8,500 miles",
      mainImage:
        "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop",
      thumbnailImage:
        "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=200&h=150&fit=crop",
      description:
        "High-performance sports car with turbocharged engine delivering exceptional speed and precision handling.",
    },
    {
      id: 4,
      name: "Porsche Panamera",
      price: "$87,200.00",
      year: "2020",
      transmission: "PDK",
      color: "White",
      mileage: "15,000 miles",
      mainImage: lexus,
      thumbnailImage: lexus,
      description:
        "Executive sedan combining luxury comfort with sports car performance in an elegant four-door design.",
    },
    {
      id: 5,
      name: "Mercedes-AMG GLE 63 S Coupe (LARTE Design)",
      price: "$125,000.00",
      year: "2023",
      transmission: "Automatic (9-speed AMG SPEEDSHIFT)",
      color: "Matte Black",
      mileage: "500 miles",
      mainImage: mercedes, // This will be replaced with the imported variable
      thumbnailImage: mercedes, // Same here
      description:
        "A bold fusion of luxury and aggression. The Mercedes-AMG GLE 63 S Coupe, enhanced by LARTE Design, features an aerodynamic widebody kit, carbon fiber accents, and performance upgrades that elevate its presence and power. With a 4.0L V8 biturbo engine delivering 603 hp, it offers blistering acceleration wrapped in premium craftsmanship.",
    },
    
  ];

  const currentCar = cars[selectedCar];

  const handleThumbnailClick = (index) => {
    setSelectedCar(index);
    // Optional: auto-scroll to center (you can remove if not needed)
    if (thumbnailContainerRef.current) {
      const thumbnailElement = thumbnailContainerRef.current.children[index];
      if (thumbnailElement) {
        const containerWidth = thumbnailContainerRef.current.offsetWidth;
        const thumbnailWidth = thumbnailElement.offsetWidth;
        const scrollLeft =
          thumbnailElement.offsetLeft - containerWidth / 2 + thumbnailWidth / 2;
        thumbnailContainerRef.current.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex justify-center items-center mb-4">
          <div>
            <div className="text-lg font-semibold text-gray-700 text-center">
              MOST WANTED ITEM
            </div>
          </div>
        </div>

        {/* Car Thumbnails - NO SCROLL, NO ORANGE BORDER */}
        <div className="flex justify-center mb-8">
          <div
            ref={thumbnailContainerRef}
            className="flex space-x-4 overflow-hidden" // ← NO scrolling
          >
            {cars.map((car, index) => (
              <div
                key={car.id}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedCar === index
                    ? "opacity-100 scale-110" // ← No border, just scale
                    : "opacity-70 hover:opacity-100"
                }`}
                onClick={() => handleThumbnailClick(index)}
              >
                <div className="w-48 h-32 bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={car.thumbnailImage}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Settings Button */}
            <div className="mb-8">
              {/* <button className="bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </button> */}
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {currentCar.name.toUpperCase()} MODELS
            </h1>

            {/* Rating */}
            <div className="flex items-center mb-6">
              <span className="text-gray-500 mr-2">Buyer Rates:</span>
              <div className="flex text-yellow-400">
                {"★".repeat(4)}
                {"☆".repeat(1)}
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-gray-500 text-lg mr-2">From</span>
                <span className="text-4xl font-bold text-gray-700">
                  {currentCar.price}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {currentCar.description}
            </p>

            {/* Car Details */}
            <div className="flex flex-wrap gap-4 text-gray-600">
              <span className="bg-gray-200 px-3 py-1 rounded-full">New</span>
              <span className="bg-gray-200 px-3 py-1 rounded-full">
                {currentCar.year}
              </span>
              <span className="bg-gray-200 px-3 py-1 rounded-full">
                {currentCar.transmission}
              </span>
              <span className="bg-gray-200 px-3 py-1 rounded-full">
                {currentCar.color}
              </span>
              <span className="bg-gray-200 px-3 py-1 rounded-full">
                {currentCar.mileage}
              </span>
            </div>
          </div>

          {/* Right Content - Car Image */}
          <div className="relative">
            <div className="rounded-2xl p-8 transition-all duration-500">
              <img
                src={currentCar.mainImage}
                alt={currentCar.name}
                className="w-full h-auto object-contain transition-opacity duration-500"
                key={selectedCar}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarShowcase;
