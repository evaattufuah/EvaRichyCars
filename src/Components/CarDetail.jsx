// src/Components/CarDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { client, urlFor } from "../../client";
import { Link } from "react-router-dom";

const CarDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const query = `*[_type in ["car", "rent"] && slug.current == $slug][0]{
          _id,
          name,
          make,
          model,
          year,
          price,
          originalPrice,
          mileage,
          transmission,
          fuel,
          special,
          category,
          "images": images[].asset->url,
          slug
        }`;
        const data = await client.fetch(query, { slug });
        setCar(data);
      } catch (error) {
        console.error("Failed to fetch car:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [slug]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!car)
    return <div className="p-10 text-center text-red-600">Car not found.</div>;

  return (
    <>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="px-6 ml-96 mt-2.5 py-2 bg-yellow-500 text-white rounded-lg hover:bg-gray-800 transition"
      >
        ← Back to Inventory
      </button>

      {/* Main Detail Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Image */}
        <div className="rounded-xl overflow-hidden shadow-lg mb-8">
          <img
            src={car.images[0]}
            alt={car.name}
            className="w-full h-96 object-cover"
          />
        </div>

        {/* Details */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{car.name}</h1>
              <p className="text-gray-600 text-lg">
                {car.make} {car.model} {car.year}
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {car.originalPrice && car.originalPrice > car.price && (
                <span className="text-gray-500 line-through text-lg">
                  ${car.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-2xl font-bold text-gray-900">
                ${car.price.toLocaleString()}
              </span>
              {car.special && (
                <span className="bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded-full text-sm">
                  Special Offer
                </span>
              )}
            </div>
          </div>
          {/* 🎨 BEAUTIFIED SPECS SECTION */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {/* Left Column */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-lg">📍</span>
                <span className="text-sm font-medium text-gray-700">
                  Mileage:
                </span>
                <span className="text-sm font-bold text-gray-900">
                  {car.mileage.toLocaleString()} mi
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-blue-500 text-lg">❄️</span>
                <span className="text-sm font-medium text-gray-700">
                  Air Conditioning
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-lg">⚙️</span>
                <span className="text-sm font-medium text-gray-700">
                  Transmission:
                </span>
                <span className="text-sm font-bold text-gray-900">
                  {car.transmission}
                </span>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-green-500 text-lg">⛽</span>
                <span className="text-sm font-medium text-gray-700">Fuel:</span>
                <span className="text-sm font-bold text-gray-900">
                  {car.fuel}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-lg">🚪</span>
                <span className="text-sm font-medium text-gray-700">
                  4 Doors
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-purple-500 text-lg">🏷️</span>
                <span className="text-sm font-medium text-gray-700">Type:</span>
                <span
                  className={`text-sm font-bold px-2 py-0.5 rounded-full ${
                    car.category === "new" || car._type === "car"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {car.category === "new"
                    ? "New"
                    : car.category === "rental"
                    ? "Rental"
                    : car._type === "rent"
                    ? "Rental"
                    : "New"}
                </span>
              </div>
            </div>
          </div>

          {/* Gallery */}
          {car.images.length > 1 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Gallery</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {car.images.slice(1).map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`${car.name} ${index + 2}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
              <Link
                to="/make_payments"
                state={{ car }} // ✅ added `state={{ car }}` — only addition
                className="flex items-center justify-center bg-yellow-600 text-white px-6 mt-6 py-3 rounded-full hover:bg-yellow-500 transition-colors"
              >
                Make payment
              </Link>
            </div>
          )}
        </div>

        {/* 🚗 RENTAL INFO CARD (Like Sixt) */}
        {car.category === "rental" || car._type === "rent" ? (
          <div className="mt-8 p-6 bg-white rounded-xl shadow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Economy</h2>
                <p className="text-gray-600 mt-1">
                  {car.name} (with driver) or similar
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H7"
                      />
                    </svg>
                    <span>5 Passengers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 12H5m14 0v6m0 0l-2-2m2 2l2-2"
                      />
                    </svg>
                    <span>4 Doors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 1112 0m-6 8a2 2 0 100-4m0 4a2 2 0 100-4m0 4v2m0-4v2m7-14a2 2 0 112 0m-2 0a2 2 0 102 0"
                      />
                    </svg>
                    <span>Air Conditioning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M10 6v6m0 0v6m0-6h6m-6 6h6"
                      />
                    </svg>
                    <span>{car.transmission}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8 8 8-8-8z"
                      />
                    </svg>
                    <span>Unlimited mileage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11l-7 7-7-7"
                      />
                    </svg>
                    <span>Fuel: full to full</span>
                  </div>
                </div>
              </div>
              <div className="ml-4">
                <img
                  src={car.images[0]}
                  alt={car.name}
                  className="w-32 h-24 object-cover rounded-lg"
                />
                <div className="mt-2">
                  <img
                    src="https://via.placeholder.com/60x20?text=SIXT" // 🔁 Replace with actual Sixt logo
                    alt="Sixt Logo"
                    className="h-8"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default CarDetail;
