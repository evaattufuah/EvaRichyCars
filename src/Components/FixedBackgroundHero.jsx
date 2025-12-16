import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const FixedBackgroundHero = ({ imageUrl, title, subtitle, children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      className="relative h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundAttachment: "fixed", // ✅ keeps image fixed only in this section
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70" />

      {/* Content */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl drop-shadow-md"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md"
        >
          {React.Children.map(children, (child) =>
            React.cloneElement(child, {
              className: `
                w-full sm:w-auto px-5 py-3 font-semibold rounded-lg shadow-md
                transition-transform hover:-translate-y-0.5 active:translate-y-0
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50
                ${child.props.className || ""}
              `.trim(),
            })
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FixedBackgroundHero;
