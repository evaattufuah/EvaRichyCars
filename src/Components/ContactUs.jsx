// src/pages/ContactUs.jsx
import React from "react";
import nissan from "../assets/Images/3910-3840x2160-desktop-4k-nissan-wallpaper.jpg";
import Navbar from "./Navbar";
import ContactUs1 from "./ContactUs1";

import Footer from "./Footer";
import CarLogoMarquee from "./CarLogoMarquee";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* === CONTACT HERO SECTION === */}
      <div
        className="relative w-full h-[70vh] md:h-[80vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${nissan})` }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-6">
          <p className="text-sm uppercase tracking-wider mb-2 opacity-80">
            GET IN TOUCH
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Contact<span className="text-yellow-500">Us</span>
          </h1>
        </div>
      </div>

      {/* === CONTACT INFO BOXES === */}
      <div className="py-12 px-6 md:px-12 lg:px-24 bg-black">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* EMAIL */}
          <div className="bg-gray-900 p-6 rounded-lg text-center group hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 mx-auto mb-4 bg-yellow-500 group-hover:bg-white rounded-full flex items-center justify-center transition-colors duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-black group-hover:text-gray-900 transition-colors duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14v-2H5v2z"
                />
              </svg>
            </div>
            <h3 className="font-medium text-white mb-1 group-hover:text-white transition-colors duration-300">
              Email us
            </h3>
            <p className="text-gray-400 text-sm group-hover:text-gray-900 transition-colors duration-300">
              <a
                href="mailto:attufuahevabensanao@gmail.com?subject=Rental%20Inquiry&body=Hello,%20I%27m%20interested%20in%20booking..."
                className="text-yellow-400 hover:text-white underline transition-colors duration-300"
              >
                attufuahevabensanao@gmail.com
              </a>
            </p>
          </div>

          {/* ADDRESS */}
          <div className="bg-gray-900 p-6 rounded-lg text-center group hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 mx-auto mb-4 bg-yellow-500 group-hover:bg-white rounded-full flex items-center justify-center transition-colors duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-black group-hover:text-gray-900 transition-colors duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.995 1.995 0 01-2.828 0l-4.244-4.244a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="font-medium text-white mb-1 group-hover:text-white transition-colors duration-300">
              Our address
            </h3>
            <p className="text-gray-400 text-sm group-hover:text-white transition-colors duration-300">
              Twin, Water Tower, Office 123
            </p>
          </div>

          {/* OPENING HOURS */}
          <div className="bg-gray-900 p-6 rounded-lg text-center group hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 mx-auto mb-4 bg-yellow-500 group-hover:bg-white rounded-full flex items-center justify-center transition-colors duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-black group-hover:text-gray-900 transition-colors duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-medium text-white mb-1 group-hover:text-white transition-colors duration-300">
              Opening Hours
            </h3>
            <p className="text-gray-400 text-sm group-hover:text-white transition-colors duration-300">
              Mon–Sun: 8 AM – 7 PM
            </p>
          </div>

          {/* CALL US */}
          <div className="bg-gray-900 p-6 rounded-lg text-center group hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 mx-auto mb-4 bg-yellow-500 group-hover:bg-white rounded-full flex items-center justify-center transition-colors duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-black group-hover:text-gray-900 transition-colors duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.501.95l-1.498 4.493A1 1 0 018.28 18H18a2 2 0 012 2v2a2 2 0 01-2 2H3a2 2 0 01-2-2v-2a2 2 0 012-2h10.28a1 1 0 00.948-.684l1.498-4.493a1 1 0 00-.501-.95l-1.498-4.493A1 1 0 0018.28 6H3a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="font-medium text-white mb-1 group-hover:text-white transition-colors duration-300">
              Call us
            </h3>
            <p className="text-white text-sm group-hover:text-white transition-colors duration-300">
              08036098387
            </p>
          </div>
        </div>
      </div>
      {/* === CONTACT FORM BELOW === */}
      <div className="py-12 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <ContactUs1 /> {/* Your existing contact form */}
        </div>
      </div>

      <div className="relative z-10">
        <CarLogoMarquee />
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
