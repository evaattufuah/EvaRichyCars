import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import AccountMenu from "./AccountMenu";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((s) => !s);

  return (
    <>
      {/* ================= HEADER ================= */}
      <header
        className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 bg-white/75
      backdrop-blur-sm shadow-xl"
      >
        <div className="flex items-start space-x-4">
          <h1 className="text-left text-xl font-extrabold tracking-tight">
            <span className="font-bebas-neue ml-4 text-yellow-700 tracking-[0.3em] uppercase drop-shadow-sm">
              EvaRichy
            </span>
            <span className="text-black ml-2 font-bold"> Cars</span>
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* <Link
            to="/sign_in"
            className="bg-yellow-600 text-white px-6 py-2 rounded-full flex items-center space-x-2 hover:bg-black shadow-md hover:scale-105 transition-transform duration-300"
          >
            <span>Sign In</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link> */}

          {/* Toggle button */}
          <button
            onClick={toggleMenu}
            className="p-2 rounded-full text-black hover:bg-gray-200 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
          <AccountMenu/>
        </div>
      </header>

      {/* ================= NAV MENU ================= */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Desktop Menu */}
            <motion.div
              key="desktop-menu"
              initial={{ opacity: 0, y: -30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="hidden md:block fixed top-4 left-4 right-4 mx-auto z-50 pointer-events-auto"
            >
              <div className="bg-white rounded-[48px] p-6 flex items-center justify-between shadow-2xl">
                {/* Links */}
                <nav className="flex items-center space-x-8">
                  <h1 className="text-left text-xl font-extrabold tracking-tight">
                    <span className="font-bebas-neue  bg-gradient-to-r from-yellow-500 via-yellow-600 to-black bg-clip-text text-transparent text-2xl tracking-[0.3em] uppercase drop-shadow-sm">
                      EvaRichy
                    </span>
                    <span className="text-black ml-2 font-bold">Cars</span>
                  </h1>
                  <div className="ml-50 gap-5 flex">
                    <a
                      href="/landing_page"
                      className="text-black hover:text-yellow-600"
                    >
                      Home
                    </a>
                    <a
                      href="/about_us"
                      className="text-black hover:text-yellow-600"
                    >
                      About us
                    </a>
                    <a
                      href="/services"
                      className="text-black hover:text-yellow-600"
                    >
                      Services
                    </a>
                    <a
                      href="/cars"
                      className="text-black hover:text-yellow-600"
                    >
                      Cars
                    </a>
                    <a
                      href="/contact_us"
                      className="text-black hover:text-yellow-600"
                    >
                      Contact Us
                    </a>
                    <a href="/blogs" className="text-black hover:text-yellow-600">
                      Blogs
                    </a>
                   
                  </div>
                </nav>

                <div className="flex items-center space-x-4">
                  <Link
                    to="/sign_in"
                    className="flex items-center justify-center"
                  >
                    <span className="bg-yellow-500 text-black px-5 py-2 rounded-full font-semibold hover:bg-yellow-400 transition-colors cursor-pointer">
                      Sign In
                    </span>
                  </Link>
                  <button
                    onClick={toggleMenu}
                    className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shadow-lg"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  
                </div>
              </div>
            </motion.div>

            {/* Mobile Menu */}
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            >
              <motion.div
                initial={{ scale: 0.9, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-8 relative"
              >
                <button
                  onClick={toggleMenu}
                  className="absolute top-4 right-4 p-2 rounded-full bg-gray-900 text-white hover:bg-gray-800"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                
                <nav className="mt-8 space-y-6 text-center">
                  <a
                    href="#"
                    className="block text-lg font-medium text-gray-800 hover:text-yellow-600"
                  >
                    Home
                  </a>
                  <a
                    href="#"
                    className="block text-lg font-medium text-gray-800 hover:text-yellow-600"
                  >
                    Services
                  </a>
                  <a
                    href="#"
                    className="block text-lg font-medium text-gray-800 hover:text-yellow-600"
                  >
                    About us
                  </a>
                  <a
                    href="#"
                    className="block text-lg font-medium text-gray-800 hover:text-yellow-600"
                  >
                    Our Work
                  </a>
                  <a
                    href="#"
                    className="block text-lg font-medium text-gray-800 hover:text-yellow-600"
                  >
                    Contact Us
                  </a>
                </nav>

                <div className="mt-8 flex justify-center">
                  <button className="bg-yellow-600 text-white px-6 py-3 rounded-full hover:bg-yellow-500 transition-colors">
                    Sign In
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
