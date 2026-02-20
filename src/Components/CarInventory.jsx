// src/Components/CarInventory.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { client, urlFor } from "../../client";

// Progressive Image Component for better loading performance
const ProgressiveImage = ({ src, alt, className, onLoad, onError }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageLoaded(true);
      onLoad?.();
    };
    img.onerror = () => {
      setImageError(true);
      onError?.();
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, onLoad, onError]);

  if (imageError || !src) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-gray-100 text-gray-500`}
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Blur placeholder */}
      {!imageLoaded && (
        <div
          className={`${className} bg-gray-200 animate-pulse flex items-center justify-center`}
        >
          <svg
            className="w-8 h-8 text-gray-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
          </svg>
        </div>
      )}

      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        className={`${className} ${
          imageLoaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
        loading="lazy"
        decoding="async"
        style={{ transition: "opacity 0.3s ease-in-out" }}
      />
    </div>
  );
};

// Query for NEW cars
const newCarQuery = `*[_type == "car"] | order(_createdAt asc) [0...100] {
  _id,
  _type,
  name,
  price,
  originalPrice,
  year,
  fuel,
  transmission,
  mileage,
  special,
  category,
  "slug": slug.current,
  images[]{
    _key,
    alt,
    asset
  }
}`;

// Query for RENTAL cars
const rentalCarQuery = `*[_type == "rent"] | order(_createdAt asc) [0...100] {
  _id,
  _type,
  name,
  price,
  originalPrice,
  year,
  fuel,
  transmission,
  mileage,
  special,
  category,
  "slug": slug.current,
  images[]{
    _key,
    alt,
    asset
  }
}`;

const CarInventory = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredCar, setHoveredCar] = useState(null);
  const [activeView, setActiveView] = useState({});
  const [activeTab, setActiveTab] = useState("new");

  // FETCH DATA FROM SANITY - Fetch both schemas separately
  useEffect(() => {
    console.log("🔍 Fetching cars from Sanity...");

    // Fetch both new cars and rental cars in parallel
    Promise.all([client.fetch(newCarQuery), client.fetch(rentalCarQuery)])
      .then(([newCarsData, rentalCarsData]) => {
        console.log("✅ New cars fetched:", newCarsData.length);
        console.log("📊 New cars data:", newCarsData);

        console.log("✅ Rental cars fetched:", rentalCarsData.length);
        console.log("📊 Rental cars data:", rentalCarsData);

        // Combine both arrays
        const allCars = [...newCarsData, ...rentalCarsData];
        console.log("✅ Total cars combined:", allCars.length);

        // Debug each car's type and price
        allCars.forEach((car) => {
          console.log(
            `${car.name}: Type=${car._type}, Price=${car.price}, Category=${car.category}`
          );
        });

        setCars(allCars);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching cars from Sanity:", err);
        console.error("Error details:", err.message);
        setError("Failed to load car listings.");
        setLoading(false);
      });
  }, []);

  const RENTAL_PRICE_THRESHOLD = 800;

  // Filter logic: Check category first, then _type, then price threshold
  const newCars = cars.filter((car) => {
    if (car.category) return car.category === "new";
    if (car._type === "rent") return false;
    return car.price >= RENTAL_PRICE_THRESHOLD;
  });

  const rentalCars = cars.filter((car) => {
    if (car.category) return car.category === "rental";
    if (car._type === "rent") return true;
    return car.price < RENTAL_PRICE_THRESHOLD;
  });

  // Debug filtered results
  useEffect(() => {
    if (cars.length > 0) {
      console.log(
        `🚗 New Cars: ${newCars.length}`,
        newCars.map((c) => c.name)
      );
      console.log(
        `🔑 Rental Cars: ${rentalCars.length}`,
        rentalCars.map((c) => c.name)
      );
    }
  }, [cars]);

  const filteredCars = activeTab === "new" ? newCars : rentalCars;

  const handleThumbnailClick = (carId, index) => {
    setActiveView((prev) => ({ ...prev, [carId]: index }));
  };

  if (loading)
    return <div className="p-10 text-center">Loading car inventory...</div>;
  if (error)
    return <div className="p-10 text-center text-red-600">{error}</div>;

  return (
    <div className="bg-white p-6">
      {/* Navigation Tabs */}
      <div className="flex space-x-2 mb-8">
        <button
          onClick={() => setActiveTab("new")}
          className={`px-6 py-3 font-semibold rounded-t-lg transition-colors ${
            activeTab === "new"
              ? "bg-yellow-500 text-white"
              : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
        >
          NEW CARS ({newCars.length})
        </button>
        <button
          onClick={() => setActiveTab("rental")}
          className={`px-6 py-3 font-semibold rounded-t-lg transition-colors ${
            activeTab === "rental"
              ? "bg-yellow-500 text-white"
              : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
        >
          RENTAL CARS ({rentalCars.length})
        </button>
      </div>

      {/* Car Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => {
            const carId = car._id;
            const currentViewIndex = activeView[carId] || 0;
            const currentImageObject = car.images?.[currentViewIndex];
            const currentImageUrl = currentImageObject
              ? urlFor(currentImageObject).width(400).url()
              : null;

            return (
              <Link
                to={`/car/${car.slug}`} // ✅ CLICKABLE CARD
                key={carId}
                className="relative border border-gray-200 rounded-lg overflow-hidden group block" // ✅ Add 'block' for full card click
                onMouseEnter={() => setHoveredCar(carId)}
                onMouseLeave={() => setHoveredCar(null)}
              >
                {car.special && (
                  <div className="absolute top-0 left-0 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rotate-45 -translate-x-4 translate-y-4 z-10">
                    SPECIAL
                  </div>
                )}

                <div className="relative h-48 overflow-hidden">
                  {currentImageUrl ? (
                    <ProgressiveImage
                      src={currentImageUrl}
                      alt={
                        currentImageObject?.alt ||
                        `${car.name} view ${currentViewIndex + 1}`
                      }
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
                      No Image
                    </div>
                  )}
                </div>

                <div className="flex justify-center mt-2 space-x-1">
                  {car.images?.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.preventDefault(); // Prevent navigation when clicking dots
                        handleThumbnailClick(carId, index);
                      }}
                      className={`w-8 h-1 rounded-full transition-colors ${
                        currentViewIndex === index
                          ? "bg-yellow-500"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`View ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-sm uppercase">{car.name}</h3>
                  <div className="flex items-center mt-2">
                    {car.originalPrice && car.originalPrice > car.price && (
                      <span className="text-gray-500 line-through text-sm mr-1">
                        ${car.originalPrice.toLocaleString()}
                      </span>
                    )}
                    <span className="bg-yellow-500 text-white px-2 py-1 text-sm font-bold">
                      ${car.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center text-xs text-gray-600 space-x-3">
                    <span>{car.fuel}</span>
                    <span>•</span>
                    <span>{car.transmission}</span>
                    <span>•</span>
                    <span>{car.mileage.toLocaleString()} mi</span>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="col-span-4 text-center py-10 text-gray-500">
            No cars found in the {activeTab === "new" ? "New Cars" : "Rental"}{" "}
            inventory.
          </div>
        )}
      </div>
    </div>
  );
};

export default CarInventory;
