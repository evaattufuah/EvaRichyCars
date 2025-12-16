// src/Components/page/VehicleResults.jsx
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { client, urlFor } from "../../lib/sanityClient";
import Navbar from "../Navbar";

const VehicleResults = () => {
  const [searchParams] = useSearchParams();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);

      const searchTerm = searchParams.get("q") || "";
      const make = searchParams.get("make") || "";
      const model = searchParams.get("model") || "";
      const maxPrice = Number(searchParams.get("maxPrice") || 50000);

      try {
        const query = `*[_type == "vehicle"]{
          _id,
          name,
          make,
          model,
          price,
          mileage,
          transmission,
          images
        }`;
        const allVehicles = await client.fetch(query);

        let filtered = allVehicles;

        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          filtered = filtered.filter(
            (v) =>
              v.name?.toLowerCase().includes(term) ||
              v.make?.toLowerCase().includes(term) ||
              v.model?.toLowerCase().includes(term)
          );
        }

        if (make) {
          filtered = filtered.filter((v) => v.make?.toLowerCase() === make);
        }

        if (model) {
          filtered = filtered.filter((v) => v.model?.toLowerCase() === model);
        }

        filtered = filtered.filter((v) => v.price <= maxPrice);

        setVehicles(filtered);

        const initialIndexes = {};
        filtered.forEach((v) => {
          initialIndexes[v._id] = 0;
        });
        setCurrentImageIndex(initialIndexes);
      } catch (error) {
        console.error("Failed to fetch vehicles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [searchParams]);

  const handleNextImage = (vehicleId, totalImages) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [vehicleId]: (prev[vehicleId] + 1) % totalImages,
    }));
  };

  const handlePrevImage = (vehicleId, totalImages) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [vehicleId]: (prev[vehicleId] - 1 + totalImages) % totalImages,
    }));
  };

  const handleDotClick = (vehicleId, index) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [vehicleId]: index,
    }));
  };

  return (
    
    <div className="max-w-7xl mx-auto px-4 py-8 justify-items-center">
            <Navbar />
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mt-14">
          {loading
            ? "Loading vehicles..."
            : `FOUND ${vehicles.length} VEHICLE${
                vehicles.length !== 1 ? "S" : ""
              }`}
        </h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500"></div>
        </div>
      ) : vehicles.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600">
            No vehicles match your filters.
          </p>
          <p className="text-gray-500 mt-2">
            Try adjusting your search criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
          {vehicles.map((vehicle) => {
            const currentIndex = currentImageIndex[vehicle._id] || 0;
            const totalImages = vehicle.images?.length || 0;

            return (
              <div
                key={vehicle._id}
                className="bg-white rounded-lg max-w-4xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {vehicle.images && vehicle.images.length > 0 && (
                  <div className="relative h-94 bg-black group">
                    <img
                      src={urlFor(vehicle.images[currentIndex]).url()}
                      alt={vehicle.name}
                      className="w-full h-full object-cover transition-opacity duration-300"
                    />

                    {totalImages > 1 && (
                      <>
                        <button
                          onClick={() =>
                            handlePrevImage(vehicle._id, totalImages)
                          }
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-amber-500 hover:text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
                        >
                          ‹
                        </button>
                        <button
                          onClick={() =>
                            handleNextImage(vehicle._id, totalImages)
                          }
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-amber-500 hover:text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
                        >
                          ›
                        </button>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                          {vehicle.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => handleDotClick(vehicle._id, index)}
                              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                index === currentIndex
                                  ? "bg-amber-500 scale-125 ring-2 ring-white"
                                  : "bg-white/60 hover:bg-white/90"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

                <div className="p-5">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {vehicle.name}
                  </h4>
                  <p className="text-gray-600 text-sm mb-3">
                    {vehicle.make} • {vehicle.model}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-700 mb-2">
                    <span>Mileage: {vehicle.mileage?.toLocaleString()}</span>
                    {vehicle.transmission && (
                      <span className="text-gray-500">
                        {vehicle.transmission}
                      </span>
                    )}
                  </div>
                  <p className="text-2xl font-bold text-amber-600">
                    ${vehicle.price?.toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VehicleResults;
