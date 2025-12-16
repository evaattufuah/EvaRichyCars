import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import emailjs from "emailjs-com";
import lexus from "../assets/Images/nissan-wallpaper-removebg-preview.png";

const ContactUs1 = () => {
  const carRef = useRef(null);
  const formRef = useRef(null);
  const notificationRef = useRef(null); // 🔔 For GSAP animation
  const [carVisible, setCarVisible] = useState(true);
  const [carOffset, setCarOffset] = useState(0);
  const maxOffset = 80;

  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "", // "success" or "error"
  });

  // Handle GSAP animation for notification
  useEffect(() => {
    if (notification.show && notificationRef.current) {
      // Fade in
      gsap.fromTo(
        notificationRef.current,
        { opacity: 0, y: -20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out" }
      );

      // Auto-hide after delay
      const timer = setTimeout(
        () => {
          hideNotification();
        },
        notification.type === "success" ? 3000 : 4000
      );

      return () => clearTimeout(timer);
    } else if (!notification.show && notificationRef.current) {
      // Fade out
      gsap.to(notificationRef.current, {
        opacity: 0,
        y: -10,
        scale: 0.95,
        duration: 0.3,
        ease: "power1.in",
        onComplete: () => {
          if (notificationRef.current) {
            notificationRef.current.style.display = "none";
          }
        },
      });
    }
  }, [notification.show]);

  const hideNotification = () => {
    setNotification((prev) => ({ ...prev, show: false }));
  };

  const handleInputInteraction = () => {
    if (!carVisible) {
      gsap.set(carRef.current, {
        x: 0,
        scale: 1,
        opacity: 1,
      });
      setCarVisible(true);
      setCarOffset(0);
    }

    if (carOffset < maxOffset) {
      const newOffset = Math.min(carOffset + 8, maxOffset);
      setCarOffset(newOffset);
      gsap.to(carRef.current, {
        x: -newOffset,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      firstName: formRef.current.firstName.value,
      lastName: formRef.current.lastName.value,
      email: formRef.current.email.value,
      phone: formRef.current.phone.value,
      message: formRef.current.message.value,
    };

    emailjs
      .send(
        "service_9ajquz6",
        "template_9va6wme",
        formData,
        "ZMIZOo81UZvpocc7q"
      )
      .then(
        (result) => {
          console.log("Message sent!", result.text);

          setNotification({
            show: true,
            message: "✅ Your message has been sent successfully!",
            type: "success",
          });

          // Car animation
          gsap.to(carRef.current, {
            x: -window.innerWidth - 200,
            scale: 0.2,
            opacity: 0,
            duration: 1,
            ease: "power2.in",
            onComplete: () => {
              setCarVisible(false);
              setTimeout(() => {
                if (carRef.current && formRef.current) {
                  gsap.killTweensOf(carRef.current);
                  formRef.current.reset();
                  gsap.set(carRef.current, {
                    x: -window.innerWidth - 200,
                    scale: 0.2,
                    opacity: 0,
                  });
                  gsap.to(carRef.current, {
                    x: 0,
                    scale: 1,
                    opacity: 1,
                    duration: 1,
                    ease: "elastic.out(1, 0.6)",
                  });
                  setCarVisible(true);
                  setCarOffset(0);
                }
              }, 500);
            },
          });
        },
        (error) => {
          console.error("FAILED...", error.text);
          setNotification({
            show: true,
            message: "❌ Oops! Failed to send your message. Please try again.",
            type: "error",
          });
        }
      );
  };

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-white relative">
      {/* ✨ Beautified Notification Popup */}
      {notification.show && (
        <div
          ref={notificationRef}
          className={`fixed top-6 right-6 z-50 max-w-xs px-5 py-4 rounded-xl shadow-lg text-white font-medium flex items-center justify-between transition-opacity ${
            notification.type === "success"
              ? "bg-gradient-to-r from-green-500 to-emerald-600"
              : "bg-gradient-to-r from-red-500 to-rose-600"
          }`}
          style={{ display: "block" }}
        >
          <span>{notification.message}</span>
          <button
            onClick={hideNotification}
            className="ml-3 text-white hover:text-gray-200 focus:outline-none"
            aria-label="Close notification"
          >
            ✕
          </button>
        </div>
      )}

      <h2 className="text-3xl font-bold text-center mb-10">CONTACT US</h2>

      <div className="flex flex-col lg:flex-row gap-10 items-start max-w-7xl mx-auto">
        {/* Car */}
        <div
          ref={carRef}
          className="lg:w-1/2 flex justify-center"
          style={{ willChange: "transform, opacity" }}
        >
          <img
            src={lexus}
            alt="Red Car"
            className="max-w-full h-auto rounded-lg drop-shadow-lg"
            width={500}
          />
        </div>

        {/* Form */}
        <div className="lg:w-1/2 space-y-8">
          <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name*"
                  className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                  onFocus={handleInputInteraction}
                  onChange={handleInputInteraction}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name*"
                  className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                  onFocus={handleInputInteraction}
                  onChange={handleInputInteraction}
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address*"
                  className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                  onFocus={handleInputInteraction}
                  onChange={handleInputInteraction}
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  onFocus={handleInputInteraction}
                  onChange={handleInputInteraction}
                />
              </div>
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Message*"
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
                onFocus={handleInputInteraction}
                onChange={handleInputInteraction}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-yellow-500 text-white font-medium rounded-full hover:bg-gray-800 transition-colors"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="pt-6 border-t border-gray-200">
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.501.502m9.899-3.173a1 1 0 011.414 0l4.493 4.493a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5a2 2 0 012-2h6.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.501.502z"
                  />
                </svg>
                <span>
                  <strong>Phone:</strong> 08036098387
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
                <span>
                  <strong>Address:</strong> Twin, Water Tower, Office 123
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
                <span>
                  <strong>Email:</strong>
                  <a
                    href="mailto:attufuahevabensanao@gmail.com?subject=Rental%20Inquiry&body=Hello,%20I%27m%20interested%20in%20booking..."
                    className="text-yellow-400 hover:text-yellow-300 underline"
                  >
                    attufuahevabensanao@gmail.com
                  </a>
                </span>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              {[
                {
                  name: "Facebook",
                  icon: "f",
                  url: "https://facebook.com/yourpage",
                  color: "text-blue-600 hover:bg-blue-50",
                },
                {
                  name: "Twitter",
                  icon: "🐦",
                  url: "https://twitter.com/yourhandle",
                  color: "text-blue-400 hover:bg-blue-50",
                },
                {
                  name: "YouTube",
                  icon: "▶️",
                  url: "https://youtube.com/@yourchannel",
                  color: "text-red-600 hover:bg-red-50",
                },
                {
                  name: "Instagram",
                  icon: "📸",
                  url: "https://instagram.com/yourhandle",
                  color: "text-pink-500 hover:bg-pink-50",
                },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center text-sm transition-colors ${social.color}`}
                  aria-label={`Visit us on ${social.name}`}
                >
                  <span>{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs1;
