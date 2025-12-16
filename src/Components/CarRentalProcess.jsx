// CarRentalProcess.jsx
import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const CarRentalProcess = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true, // animate only once
    threshold: 0.1, // trigger when 10% of section is visible
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Animation variants
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const headerItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section ref={ref} className="bg-gray-900 py-16 px-4 md:px-8 lg:px-16">
      {/* Header */}
      <motion.div
        variants={headerItem}
        initial="hidden"
        animate={controls}
        className="text-center mb-10"
      >
        <p className="text-xs uppercase tracking-widest text-white mb-2">
          STEPS
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Car Rental <span className="text-yellow-500">Process</span>
        </h2>
      </motion.div>

      {/* Steps Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={controls}
        className="flex flex-col md:flex-row gap-6 justify-center items-stretch max-w-6xl mx-auto"
      >
        {/* Step 1 */}
        <motion.div
          variants={item}
          whileHover={{
            scale: 1.05,
            y: -10,
            boxShadow:
              "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="relative bg-white p-6 rounded-xl shadow-lg flex flex-col justify-between min-h-[220px] w-full md:w-1/3 cursor-pointer"
        >
          <div>
            <h3 className="text-xl font-bold text-black mb-3">Choose A Car</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              View our range of cars, find your perfect car for the coming days.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 ml-4 z-10">
            <motion.div
              whileHover={{
                scale: 1.15,
                backgroundColor: "#eab308",
              }}
              transition={{ type: "spring", stiffness: 600, damping: 25 }}
              className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white font-bold text-sm"
            >
              0<span className="text-yellow-500">1.</span>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-2 bg-yellow-500 rounded-t-full"></div>
        </motion.div>

        {/* Step 2 */}
        <motion.div
          variants={item}
          whileHover={{
            scale: 1.05,
            y: -10,
            boxShadow:
              "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="relative bg-white p-6 rounded-xl shadow-lg flex flex-col justify-between min-h-[220px] w-full md:w-1/3 cursor-pointer"
        >
          <div>
            <h3 className="text-xl font-bold text-black mb-3">
              Come In Contact
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Our advisor team is ready to help you with the booking process or
              any questions.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 ml-4 z-10">
            <motion.div
              whileHover={{
                scale: 1.15,
                backgroundColor: "#eab308",
              }}
              transition={{ type: "spring", stiffness: 600, damping: 25 }}
              className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white font-bold text-sm"
            >
              0<span className="text-yellow-500">2.</span>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-2 bg-yellow-500 rounded-t-full"></div>
        </motion.div>

        {/* Step 3 */}
        <motion.div
          variants={item}
          whileHover={{
            scale: 1.05,
            y: -10,
            boxShadow:
              "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="relative bg-white p-6 rounded-xl shadow-lg flex flex-col justify-between min-h-[220px] w-full md:w-1/3 cursor-pointer"
        >
          <div>
            <h3 className="text-xl font-bold text-black mb-3">Enjoy Driving</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Receive the key and enjoy your car. We treat all our cars with
              respect.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 ml-4 z-10">
            <motion.div
              whileHover={{
                scale: 1.15,
                backgroundColor: "#eab308",
              }}
              transition={{ type: "spring", stiffness: 600, damping: 25 }}
              className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white font-bold text-sm"
            >
              0<span className="text-yellow-500">3.</span>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-2 bg-yellow-500 rounded-t-full"></div>
        </motion.div>
      </motion.div>

      {/* Info Line */}
      <motion.div
        variants={headerItem}
        initial="hidden"
        animate={controls}
        transition={{ delay: 0.7 }}
        className="text-center mt-10 text-white text-sm flex items-center justify-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>
          If you've never rented a car before, we'll guide you through the
          process.
        </span>
      </motion.div>
    </section>
  );
};

export default CarRentalProcess;
