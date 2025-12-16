import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Footer = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // 🔑 Replace with your actual Google Maps embed URL
  const mapSrc = 
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3947824.528712358!2d3.389029!3d6.455027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b0a0b0a0b0a%3A0x103b8b0a0b0a0b0a!2sLagos!5e0!3m2!1sen!2sng!4v1712345678901!5m2!1sen!2sng"


  return (
    <footer
      ref={ref}
      className="bg-gray-900  text-white py-8 px-4 md:px-8 lg:px-16"
    >
      {/* 🗺️ Map Section */}
      <h3 className="text-xl font-semibold mb-4">We Serve Nigeria & Beyond</h3>

      <motion.div
        variants={item}
        initial="hidden"
        animate={controls}
        className="mb-12 rounded-2xl overflow-hidden shadow-2xl border border-gray-900"
        style={{ height: "300px" }}
      >
        <iframe
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Renax Location - Dubai Water Tower"
        />
      </motion.div>

      {/* Top Contact Info */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={controls}
        className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12 p-6 bg-yellow-500 backdrop-blur-sm rounded-xl border border-gray-800"
      >
        {[
          { title: "Call us", value: "08036098387", icon: "📞", type: "phone" },
          {
            title: "Write to us",
            value: "attufuahevabensanao@gmail.com",
            icon: "✉️",
            type: "email",
          },
          {
            title: "Address",
            value: "Twin, Water Tower, Office 123",
            icon: "📍",
            type: "address",
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            variants={item}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-black font-bold text-lg">
              {item.icon}
            </div>
            <div>
              <p className="font-semibold">{item.title}</p>
              {item.type === "email" ? (
                <a
                  href={`mailto:${item.value}?subject=Rental%20Inquiry`}
                  className="text-gray-400 text-sm hover:text-white underline"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-gray-400 text-sm">{item.value}</p>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Footer Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={controls}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {/* Brand */}
        <motion.div variants={item}>
          <h3 className="text-2xl font-bold text-yellow-500 mb-3">
            EvaRichy Cars
          </h3>
          <p className="text-gray-400 text-sm mb-4 max-w-xs">
            Rent or buy a car easily and enjoy smooth, comfortable service
            throughout your journey."
          </p>
          <div className="flex gap-3">
            {[
              {
                icon: "💬",
                url: "https://wa.me/2348036098387",
                label: "WhatsApp",
                hoverBg: "#25D366",
                hoverText: "#fff",
              },
              {
                icon: "f",
                url: "https://facebook.com/yourpage",
                label: "Facebook",
                hoverBg: "#1877F2",
                hoverText: "#fff",
              },
              {
                icon: "▶️",
                url: "https://youtube.com/@yourchannel",
                label: "YouTube",
                hoverBg: "#FF0000",
                hoverText: "#fff",
              },
            ].map((social, idx) => (
              <motion.a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: social.hoverBg,
                  color: social.hoverText,
                }}
                className="w-10 h-10 border border-yellow-500 rounded-full flex items-center justify-center text-yellow-500"
                aria-label={`Visit us on ${social.label}`}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
        {/* Links */}
        <motion.div variants={item}>
          <h4 className="font-bold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            {[
              { label: "Home", href: "/landing_page" },
              { label: "About Us", href: "/about_us" },
              { label: "Services", href: "/services" },
              { label: "Cars", href: "/cars" },
              { label: "Contact Us", href: "/contact_us" },
            ].map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  className="hover:text-yellow-500 transition-colors flex items-center gap-1"
                >
                  <span>•</span> {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>{" "}
        {/* Subscribe */}
        <motion.div variants={item}>
          <h4 className="font-bold text-lg mb-3">Subscribe</h4>
          <p className="text-gray-400 text-sm mb-4">
            Want to be notified about our services.
          </p>
          <form
            className="flex"
            onSubmit={(e) => {
              e.preventDefault();
              const email = e.target.email.value.trim();
              if (!email || !/\S+@\S+\.\S+/.test(email)) {
                alert("Please enter a valid email address.");
                return;
              }
              // ✅ Show success message
              alert("Mail sent successfully!");
              e.target.reset(); // Clear the input
            }}
          >
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className="flex-1 px-4 py-2 bg-white border border-yellow-500 rounded-l-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
            <button
              type="submit"
              className="w-12 h-12 bg-yellow-500 rounded-r-full flex items-center justify-center text-black hover:bg-yellow-400 transition-colors"
              aria-label="Subscribe"
            >
              ➤
            </button>
          </form>
        </motion.div>
      </motion.div>

      {/* Bottom */}
      <motion.div
        variants={item}
        className="mt-12 pt-6 border-t border-gray-800 text-center text-xs text-gray-500"
      >
        ©2025 <span className="text-yellow-500">EvaAttufuah</span>. All rights
        reserved.
      </motion.div>
    </footer>
  );
};

export default Footer;
