// src/components/ScheduleServiceForm.jsx✅ 3. Netlify Forms (If you host on Netlify)

import React, { useState } from "react";
import emailjs from "emailjs-com";

const ScheduleServiceForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    makeModel: "",
    mileage: "",
    bestTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Service request submitted! We'll contact you within 48 hours.");
    console.log(formData);
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md max-w-6xl mx-auto mt-12">
      {/* Header */}
      <div className="bg-yellow-500 px-6 py-3 mb-6 rounded-t-lg">
        <h2 className="text-xl font-bold text-white">SCHEDULE SERVICE</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT: FORM */}
        <div className="flex-1 space-y-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 placeholder-gray-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 placeholder-gray-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 placeholder-gray-500"
                  placeholder="Enter your phone"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Make/Model *
                </label>
                <input
                  type="text"
                  name="makeModel"
                  value={formData.makeModel}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 placeholder-gray-500"
                  placeholder="e.g. Toyota Camry"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mileage (optional)
                </label>
                <input
                  type="number"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 placeholder-gray-500"
                  placeholder="e.g. 45000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Best Time *
                </label>
                <input
                  type="time"
                  name="bestTime"
                  value={formData.bestTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                  required
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-700">
              <button
                type="submit"
                className="px-6 py-3 bg-yellow-500 text-black font-medium rounded-md hover:bg-yellow-400 transition"
              >
                REQUEST A SERVICE
              </button>
              <p className="mt-3 text-sm text-gray-400">
                By submitting this form you will be scheduling a service
                appointment at no obligation and will be contacted within 48
                hours by a service advisor.
              </p>
            </div>
          </form>
        </div>

        {/* RIGHT: HOURS OF OPERATION */}
        <div className="lg:w-80 bg-gray-800 p-5 rounded-lg border border-gray-700">
          <div className="flex items-center gap-2 mb-4">
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h3 className="font-medium text-white">HOURS OF OPERATION</h3>
          </div>

          <div className="space-y-3 text-sm">
            {[
              { day: "SUNDAY", hours: "CLOSED" },
              { day: "MONDAY", hours: "9:00 AM - 9:00 PM" },
              { day: "TUESDAY", hours: "9:00 AM - 9:00 PM" },
              { day: "WEDNESDAY", hours: "9:00 AM - 9:00 PM" },
              { day: "THURSDAY", hours: "9:00 AM - 9:00 PM" },
              { day: "FRIDAY", hours: "9:00 AM - 7:00 PM" },
              { day: "SATURDAY", hours: "9:00 AM - 7:00 PM" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between py-2 border-b border-gray-700 last:border-b-0"
              >
                <span className="font-medium text-gray-300">{item.day}</span>
                <span className="text-white">{item.hours}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleServiceForm;
