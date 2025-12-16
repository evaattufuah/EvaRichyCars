// src/pages/BookingsPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { Link } from "react-router-dom";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/sign_in");
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to load bookings.");
      } else {
        setBookings(data || []);
      }
      setLoading(false);
    };

    fetchBookings();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading your booking history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-md text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          {/* Back Button (Left) */}
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-black transition"
          >
            ← Back to Inventory
          </button>
          {/* Title (Centered) */}
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold text-gray-900">Your Bookings</h1>
            <p className="mt-2 text-gray-600">
              {bookings.length === 0
                ? "You haven’t made any bookings yet."
                : `You have ${bookings.length} ${
                    bookings.length === 1 ? "booking" : "bookings"
                  }.`}
            </p>
          </div>
          {/* Empty space on right (for balance) */}
          <div className="w-40"></div> {/* Optional: adjust width if needed */}
        </div>

        {/* Empty State */}
        {bookings.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center max-w-2xl mx-auto">
            <div className="text-6xl mb-6">🚗</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Ready to rent?
            </h2>
            <p className="text-gray-600 mb-6">
              Browse our rental fleet and book your next adventure.
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition shadow-md"
            >
              Browse Rental Cars
            </button>
          </div>
        )}

        {/* Bookings List */}
        {bookings.length > 0 && (
          <div className="space-y-5">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition"
              >
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-5">
                    {/* Car Type Icon */}
                    {/* <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2h14z"
                        />
                      </svg>
                    </div> */}

                    {/* Booking Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {booking.car_type}
                          </h3>
                          <p className="mt-1 text-gray-500 text-sm">
                            {new Date(booking.pickup_date).toLocaleDateString()}{" "}
                            →{" "}
                            {new Date(booking.return_date).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            From: {booking.pickup_location} → To:{" "}
                            {booking.dropoff_location}
                          </p>
                        </div>
                        <div className="mt-2 sm:mt-0">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              booking.payment_status === "paid"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {booking.payment_status === "paid"
                              ? "✅ Paid"
                              : "⏳ Unpaid"}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <div className="text-lg font-bold text-gray-900">
                          {booking.additional_notes && (
                            <div className="text-sm text-gray-600">
                              Note: {booking.additional_notes}
                            </div>
                          )}
                        </div>
                        {/* Optional: Add "View Details" or "Cancel" button */}
                        {/* <button className="text-sm text-blue-600 hover:underline">
                          View Details
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer CTA */}
        {bookings.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Need a car? Explore our latest rentals.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
