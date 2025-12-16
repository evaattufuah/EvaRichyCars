// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// // Image imports (keep exactly as you have them)
// import blueaudis from "../assets/Images/blue4k-audi-a3-background-photo.jpg";
// import audi from "../assets/Images/bluehd-audi-wallpaper.jpg";
// import blue from "../assets/Images/blueee-audi-a3-wallpaper-image.jpg";
// import gclass from "../assets/Images/back-hd-mercedes-benz-g-class-background.jpg";
// import gclassback from "../assets/Images/image.png";
// import gclassfront from "../assets/Images/sidehd-mercedes-benz-g-class-wallpaper-photo.jpg";
// import rangefront from "../assets/Images/front-range-rover-background-photo.jpg";
// import rangeside from "../assets/Images/sideull-hd-range-rover-background.jpg";
// import rangeback from "../assets/Images/back1080p-range-rover-wallpaper-image.jpg";
// import audifront from "../assets/Images/brown4k-audi-q8-background-image.jpg";
// import audiside from "../assets/Images/browns4k-audi-q8-background-image.jpg";
// import audiback from "../assets/Images/brownside4k-audi-q8-wallpaper-photo.jpg";
// import maseratiMC20 from "../assets/Images/whitefronthd-maserati-mc20-background-photo.jpg";
// import maseratiMC21 from "../assets/Images/whiteback-desktop-4k-maserati-mc20-wallpaper.jpg";
// import maseratiMC22 from "../assets/Images/frontviewdesktop-4k-maserati-mc20-wallpaper.jpg";
// import mercedesVisionEQS from "../assets/Images/brownandwhiteesktop-dual-screen-mercedes-benz-eqs-background.jpg";
// import mercedesVisionEQS1 from "../assets/Images/brownandwhiteinteriordesktop-hd-mercedes-benz-vision-eqxx-wallpaper.jpg";
// import mercedesVisionEQS2 from "../assets/Images/brownandwhitesidedesktop-hd-mercedes-benz-eqs-wallpaper-image.jpg";
// import peugeot308 from "../assets/Images/greenhd-peugeot-wallpaper-photo.jpg";
// import peugeot309 from "../assets/Images/greensdesktop-hd-peugeot-background-image.jpg";
// import peugeot301 from "../assets/Images/greendesktop-hd-peugeot-background-imagess.jpg";
// import rollsWraith2 from "../assets/Images/black-hd-rolls-royce-background-image.jpg";
// import rollsWraith1 from "../assets/Images/blackinterior-desktop-hd-rolls-royce-wallpaper.jpg";
// import rollsWraith3 from "../assets/Images/blacks-hd-rolls-royce-background-photo.jpg";
// import tesla from "../assets/Images/frontviewdesktop-hd-tesla-model-3-background-image.jpg";
// import tesla1 from "../assets/Images/redbackesktop-dual-screen-tesla-model-3-wallpaper.jpg";
// import tesla2 from "../assets/Images/sidered-hd-tesla-model-3-wallpaper-image.jpg";
// import teslawhite from "../assets/Images/whitwfrontviewdesktop-hd-tesla-model-x-wallpaper-image.jpg";
// import teslawhite1 from "../assets/Images/whiteviewsside-desktop-4k-tesla-model-x-wallpaper.jpg";
// import teslawhite2 from "../assets/Images/whiteviewsidedesktop-4k-tesla-model-x-wallpaper-image.jpg";
// import lexusgrey from "../assets/Images/greyfront-desktop-4k-lexus-nx-wallpaper.jpg";
// import lexusgrey1 from "../assets/Images/greysidedesktop-hd-lexus-nx-wallpaper-image.jpg";
// import lexusgrey2 from "../assets/Images/greyback-desktop-4k-lexus-nx-background-photo.jpg";
// import Landrover from "../assets/Images/frontview-desktop-4k-land-rover-defender-background.jpg";
// import Landrover1 from "../assets/Images/side-3840x2160-desktop-4k-land-rover-defender-wallpaper-image.jpg";
// import Landrover2 from "../assets/Images/backview-desktop-hd-land-rover-defender-background.jpg";
// import hennessey from "../assets/Images/blackishfront-hd-hennessey-venom-background-image.jpg";
// import hennessey1 from "../assets/Images/blackishside-desktop-hd-hennessey-venom-wallpaper.jpg";
// import hennessey2 from "../assets/Images/blacksidhback-desktop-hd-hennessey-venom-wallpaper.jpg";
// import flat from "../assets/Images/redback-hd-fiat-wallpaper-photo.jpg";
// import flat1 from "../assets/Images/redinterior-iphone-hd-fiat-background.jpg";
// import flat2 from "../assets/Images/sidered-desktop-1080p-fiat-wallpaper-image.jpg";

// import McLaren from "../assets/Images/brown1-mclaren-gt-background-image.jpg";
// import McLaren1 from "../assets/Images/brown2-desktop-hd-mclaren-gt-background-photo.jpg";
// import McLaren2 from "../assets/Images/brown3desktop-hd-mclaren-gt-background-image.jpg";

// import Peugeot from "../assets/Images/blueback1-4k-peugeot-background-photo.jpg";
// import Peugeot1 from "../assets/Images/blueback-hd-peugeot-background.jpg";
// import Peugeot2 from "../assets/Images/bluebaack2hd-peugeot-background-photo.jpg";





// const CarInventory = () => {
//   const [hoveredCar, setHoveredCar] = useState(null);
//   const [activeView, setActiveView] = useState({});
//   const [activeTab, setActiveTab] = useState("new"); // default to "new"
// const cars = [
//   {
//     id: 0,
//     name: "Audi A3 Sedan",
//     price: 32900,
//     originalPrice: 36500,
//     year: 2024,
//     fuel: "28/36",
//     transmission: "Automatic (7-speed S tronic)",
//     mileage: 5,
//     images: [audi, blueaudis, blue],
//     special: false,
//   },
//   {
//     id: 1,
//     name: "Mercedes-AMG G 63",
//     price: 168000,
//     originalPrice: 172000,
//     year: 2024,
//     fuel: "13/17",
//     transmission: "Automatic (9-speed AMG SPEEDSHIFT)",
//     mileage: 25,
//     images: [gclassback, gclass, gclassfront],
//     special: true,
//   },
//   {
//     id: 2,
//     name: "Range Rover Vogue",
//     price: 68000,
//     originalPrice: 75000,
//     year: 2016,
//     fuel: "17/23",
//     transmission: "Automatic (8-speed ZF)",
//     mileage: 32000,
//     images: [rangefront, rangeback, rangeside],
//     special: true,
//   },
//   {
//     id: 3,
//     name: "Audi Q8",
//     price: 68900,
//     originalPrice: 72500,
//     year: 2024,
//     fuel: "19/26",
//     transmission: "Automatic (8-speed Tiptronic)",
//     mileage: 8,
//     images: [audifront, audiside, audiback],
//     special: true,
//   },
//   {
//     id: 4,
//     name: "Maserati MC20",
//     price: 215000,
//     originalPrice: 225000,
//     year: 2024,
//     fuel: "15/22",
//     transmission: "Automatic (8-speed dual-clutch)",
//     mileage: 12,
//     images: [maseratiMC22, maseratiMC21, maseratiMC20],
//     special: true,
//   },
//   {
//     id: 5,
//     name: "Mercedes-Benz Vision EQS",
//     price: 145000,
//     originalPrice: 152000,
//     year: 2023,
//     fuel: "Electric (Range: 435 miles)",
//     transmission: "Automatic (Single-speed direct drive)",
//     mileage: 0,
//     images: [mercedesVisionEQS, mercedesVisionEQS1, mercedesVisionEQS2],
//     special: false,
//   },
//   {
//     id: 6,
//     name: "Peugeot 308",
//     price: 27500,
//     originalPrice: 29000,
//     year: 2024,
//     fuel: "32/42",
//     transmission: "Automatic (8-speed EAT8)",
//     mileage: 5,
//     images: [peugeot308, peugeot309, peugeot301],
//     special: false,
//   },
//   {
//     id: 7,
//     name: "Rolls-Royce Wraith Black Badge",
//     price: 385000,
//     originalPrice: 410000,
//     year: 2022,
//     fuel: "14/21",
//     transmission: "Automatic (8-speed ZF)",
//     mileage: 850,
//     images: [rollsWraith1, rollsWraith2, rollsWraith3],
//     special: true,
//   },

//   // Rentals (IDs 8–16)
//   {
//     id: 8,
//     name: "Tesla Model 3",
//     price: 450,
//     originalPrice: 520,
//     year: 2023,
//     fuel: "Electric (350 mi range)",
//     transmission: "Single-Speed Automatic",
//     mileage: 12000,
//     images: [tesla, tesla1, tesla2],
//   },

//   {
//     id: 9,
//     name: "Lexus NX 450h+",
//     price: 320,
//     originalPrice: 380,
//     year: 2023,
//     fuel: "Hybrid (35 MPG combined)",
//     transmission: "Automatic (e-CVT)",
//     mileage: 8500,
//     images: [lexusgrey, lexusgrey1, lexusgrey2],
//   },
//   {
//     id: 10,
//     name: "Tesla Model X",
//     price: 580,
//     originalPrice: 650,
//     year: 2022,
//     fuel: "Electric (340 mi range)",
//     transmission: "Single-Speed Automatic",
//     mileage: 18000,
//     images: [teslawhite, teslawhite1, teslawhite2],
//   },
//   {
//     id: 11,
//     name: "Land Rover Defender V8",
//     price: 680,
//     originalPrice: 750,
//     year: 2023,
//     fuel: "Gasoline (14 MPG city / 20 MPG highway)",
//     transmission: "Automatic (8-speed)",
//     mileage: 5200,
//     images: [Landrover, Landrover1, Landrover2],
//   },
//   {
//     id: 12,
//     name: "Hennessey Venom F5",
//     price: 2500,
//     originalPrice: 3000,
//     year: 2024,
//     fuel: "Gasoline (12 MPG combined)",
//     transmission: "Automatic (7-speed dual-clutch)",
//     mileage: 300,
//     images: [hennessey1, hennessey, hennessey2],
//   },
//   {
//     id: 13,
//     name: "Fiat 500X Sport",
//     price: 95,
//     originalPrice: 120,
//     year: 2023,
//     fuel: "Gasoline (28 MPG combined)",
//     transmission: "Automatic (6-speed)",
//     mileage: 12000,
//     images: [flat2, flat1, flat],
//     special: false,
//   },
//   {
//     id: 14,
//     name: "McLaren GT",
//     price: 1800,
//     originalPrice: 2200,
//     year: 2023,
//     fuel: "Gasoline (18 MPG combined)",
//     transmission: "Automatic (7-speed DCT)",
//     mileage: 2500,
//     images: [McLaren, McLaren1, McLaren2],
//     special: true,
//   },
//   {
//     id: 16,
//     name: "Peugeot 5008",
//     price: 130,
//     originalPrice: 160,
//     year: 2023,
//     fuel: "Gasoline (29 MPG combined)",
//     transmission: "Automatic (8-speed)",
//     mileage: 9500,
//     images: [Peugeot, Peugeot1, Peugeot2],
//     special: false,
//   },
// ];


//   // Define NEW CARS by ID
//   const newCarIds = [0, 1, 2, 3, 4, 5, 6, 7]; // Audi A3, G63, Q8, MC20, EQS, Peugeot 308
//   // const rentalCarIds = [0, 1, 2, 3, 4, 5, 6, 7];

//   const filteredCars =
//     activeTab === "new"
//       ? cars.filter((car) => newCarIds.includes(car.id))
//       : cars.filter((car) => !newCarIds.includes(car.id)); // Rentals = the rest

//   const handleThumbnailClick = (carId, index) => {
//     setActiveView((prev) => ({ ...prev, [carId]: index }));
//   };

//   return (
//     <div className="bg-white p-6">
//       {/* Navigation Tabs — ONLY TWO */}
//       <div className="flex space-x-2 mb-8">
//         <button
//           onClick={() => setActiveTab("new")}
//           className={`px-6 py-3 font-semibold rounded-t-lg transition-colors ${
//             activeTab === "new"
//               ? "bg-yellow-500 text-white"
//               : "bg-gray-200 text-black hover:bg-gray-300"
//           }`}
//         >
//           NEW CARS
//         </button>
//         <button
//           onClick={() => setActiveTab("rental")}
//           className={`px-6 py-3 font-semibold rounded-t-lg transition-colors ${
//             activeTab === "rental"
//               ? "bg-yellow-500 text-white"
//               : "bg-gray-200 text-black hover:bg-gray-300"
//           }`}
//         >
//           Rentals CARS
//         </button>
//       </div>

//       {/* Car Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {filteredCars.map((car) => {
//           const currentViewIndex = activeView[car.id] || 0;
//           const currentImage = car.images[currentViewIndex];

//           return (
//             <div
//               key={car.id}
//               className="relative border border-gray-200 rounded-lg overflow-hidden group"
//               onMouseEnter={() => setHoveredCar(car.id)}
//               onMouseLeave={() => setHoveredCar(null)}
//             >
//               {car.special && (
//                 <div className="absolute top-0 left-0 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rotate-45 -translate-x-4 translate-y-4 z-10">
//                   SPECIAL
//                 </div>
//               )}

//               <div className="relative h-48 overflow-hidden">
//                 <img
//                   src={currentImage}
//                   alt={`${car.name} view ${currentViewIndex + 1}`}
//                   className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//                 />
//               </div>

//               <div className="flex justify-center mt-2 space-x-1">
//                 {car.images.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handleThumbnailClick(car.id, index)}
//                     className={`w-8 h-1 rounded-full transition-colors ${
//                       currentViewIndex === index
//                         ? "bg-yellow-500"
//                         : "bg-gray-300 hover:bg-gray-400"
//                     }`}
//                     aria-label={`View ${index + 1}`}
//                   />
//                 ))}
//               </div>

//               <div className="p-4">
//                 <h3 className="font-bold text-sm uppercase">{car.name}</h3>
//                 <div className="flex items-center mt-2">
//                   <span className="text-gray-500 line-through text-sm mr-1">
//                     ${car.originalPrice.toLocaleString()}
//                   </span>
//                   <span className="bg-yellow-500 text-white px-2 py-1 text-sm font-bold">
//                     ${car.price.toLocaleString()}
//                   </span>
//                 </div>
//                 <div className="mt-3 flex items-center text-xs text-gray-600 space-x-3">
//                   <span>{car.fuel} MPG</span>
//                   <span>•</span>
//                   <span>{car.transmission}</span>
//                   <span>•</span>
//                   <span>{car.mileage.toLocaleString()} mi</span>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
// {/*
//       <div className="mt-8 text-center">
//         <Link to="/all-cars">
//           <button className="bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-black transition-colors">
//             SHOW ALL
//           </button>
//         </Link>
//       </div> */}
//     </div>
//   );
// };

// export default CarInventory;
// src/Components/CarInventory.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { client, urlFor } from "../../client";

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
                    <img
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