import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import { supabase } from "../lib/supabaseClient"; // ✅ adjust path if needed
const BookingForm = () => {
  const navigate = useNavigate();
  const toastRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    carType: "",
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: "",
    returnDate: "",
    additionalNote: "",
  });

  // Toast state
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "", // "success" or "error"
  });

  // Mock data
  const locations = [
    "Lagos",
    "Abia",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Imo",
    "Kaduna",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Oyo",
    "Sokoto",
    "Federal Capital Territory (Abuja)",
  ];

  const carTypes = [
    "Sedan",
    "SUV",
    "Luxury",
    "Sports",
    "Electric",
    "Convertible",
    "Minivan",
    "Truck",
  ];

const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => {
    let updated = { ...prev, [name]: value };

    // ✅ Enforce: returnDate ≥ pickupDate
    if (name === "pickupDate" && prev.returnDate && value > prev.returnDate) {
      updated.returnDate = value; // Auto-adjust return date
    }
    if (name === "returnDate" && prev.pickupDate && value < prev.pickupDate) {
      updated.returnDate = prev.pickupDate; // Prevent going back in time
    }

    return updated;
  });
};
  const showNotification = (message, type) => {
    setToast({ show: true, message, type });
  };

  const hideNotification = () => {
    setToast({ show: false, message: "", type: "" });
  };

  // Auto-hide toast and redirect on success
  useEffect(() => {
    if (toast.show && toast.type === "success") {
      const timer = setTimeout(() => {
        hideNotification();
        navigate("/make_payment");
      }, 2500); // Show for 2.5 seconds, then redirect
      return () => clearTimeout(timer);
    } else if (toast.show && toast.type === "error") {
      const timer = setTimeout(() => {
        hideNotification();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast, navigate]);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // ✅ 1. Save to Supabase FIRST (so you have booking ID)
    const { data: sessionData } = await supabase.auth.getSession();

    const { data: booking, error: dbError } = await supabase
      .from("bookings")
      .insert({
        user_id: sessionData?.session?.user?.id || null,
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        car_type: formData.carType,
        pickup_location: formData.pickupLocation,
        dropoff_location: formData.dropoffLocation,
        pickup_date: formData.pickupDate,
        return_date: formData.returnDate,
        additional_notes: formData.additionalNote,
        status: "pending",
        payment_status: "unpaid",
      })
      .select() // ✅ get the created booking ID
      .single();

    if (dbError) throw dbError;

    // ✅ 2. Send email (keep your existing logic)
    await emailjs.send(
      "service_9ajquz6",
      "template_yzjk79p",
      {
        ...formData,
        booking_id: booking.id, // 👈 add to email (optional)
      },
      "ZMIZOo81UZvpocc7q"
    );

    // ✅ 3. Redirect to payment WITH booking ID
    navigate("/make_payment", {
      state: { bookingId: booking.id },
    });

    showNotification(
      "✅ Booking submitted! Redirecting to payment...",
      "success"
    );
  } catch (error) {
    console.error("Booking failed:", error);
    showNotification("❌ Failed to save booking. Please try again.", "error");
  }
};
  // ... rest of your form JSX remains unchanged until the return statement ...

  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-xl max-w-4xl mx-auto p-6 relative">
      {/* ✨ Beautiful Toast Notification */}
      {toast.show && (
        <div
          ref={toastRef}
          className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-lg font-medium flex items-center gap-2 transform transition-all duration-300 ${
            toast.type === "success"
              ? "bg-gradient-to-r from-gray-800 to-gray-700 text-white"
              : "bg-gradient-to-r from-yellow-500 to-rose-600 text-white"
          }`}
          style={{
            transform: toast.show ? "translateY(0)" : "translateY(-20px)",
            opacity: toast.show ? 1 : 0,
          }}
        >
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-6 bg-yellow-500 px-6 py-3 rounded-t-lg">
        <h2 className="text-xl font-bold">Booking Form</h2>
        <button
          className="text-white hover:text-gray-200 text-xl font-bold"
          onClick={() => navigate(-1)}
        >
          ×
        </button>
      </div>

      {/* Form (your existing JSX below) */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1: Full Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white placeholder-gray-400"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white placeholder-gray-400"
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* Row 2: Phone & Car Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white placeholder-gray-400"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium mb-2">
              Choose Car Type *
            </label>
            <select
              name="carType"
              value={formData.carType}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white appearance-none"
            >
              <option value="">Select car type *</option>
              {carTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
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
            </div>
          </div>
        </div>

        {/* Row 3: Pick Up Location & Pick Up Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label className="block text-sm font-medium mb-2">
              Pick Up Location *
            </label>
            <select
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white appearance-none"
            >
              <option value="">Select pickup location </option>
              {locations.map((loc, index) => (
                <option key={index} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
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
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Pick Up Date *
            </label>
            <div className="relative">
              <input
                type="date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Row 4: Drop Off Location & Return Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label className="block text-sm font-medium mb-2">
              Drop Off Location *
            </label>
            <select
              name="dropoffLocation"
              value={formData.dropoffLocation}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white appearance-none"
            >
              <option value="">Select drop-off location *</option>
              {locations.map((loc, index) => (
                <option key={index} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
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
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Return Date *
            </label>
            <div className="relative">
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
                min={formData.pickupDate || ""}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Note */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Additional Note/Do you need a Mobile Mechanics or Personal Driver?*
          </label>
          <textarea
            name="additionalNote"
            value={formData.additionalNote}
            onChange={handleChange}
            rows="4"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white placeholder-gray-400 resize-none"
            placeholder="Any special requests or notes..."
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-full transition duration-200 ease-in-out"
          >
            Rent Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
