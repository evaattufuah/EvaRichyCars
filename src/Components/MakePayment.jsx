// src/components/MakePayment.jsx
import React, { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const MakePayment = () => {
  const location = useLocation();
  const { bookingId } = location.state || {};

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "",
  });

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3500);
  };

  useEffect(() => {
    const script = document.createElement("script");
    // ✅ FIXED: Removed trailing spaces
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  // ✅ Define callback ONCE (stable reference)
  const onSuccess = useCallback(
    (response) => {
      console.log("✅ Paystack success:", response);
      showToast(`✅ Payment successful! Ref: ${response.reference}`, "success");

      if (bookingId) {
        supabase
          .from("bookings")
          .update({
            payment_ref: response.reference,
            payment_status: "paid",
            status: "confirmed",
          })
          .eq("id", bookingId)
          .then(({ error }) => {
            if (error) {
              console.error("❌ DB update failed:", error);
              showToast("⚠️ Paid, but booking not updated.", "error");
            } else {
              console.log("✅ Booking updated to paid!");
            }
          });
      }
    },
    [bookingId, showToast]
  );

  const onClose = useCallback(() => {
    console.log("❌ Paystack closed");
    showToast("❌ Payment window closed", "error");
  }, [showToast]);

  const handlePaystackPayment = () => {
    if (!window.PaystackPop) {
      showToast("⏳ Paystack loading...", "error");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: "pk_test_9f37ed7c4853de20eeb23e6d3cd16e711726e031",
      email: "attufuahevabensanaomi@gmail.com",
      amount: 300000 * 100,
      currency: "NGN",
      ref: `ref_${Date.now()}`,
      callback: onSuccess, // ✅ named function (not inline)
      onClose: onClose, // ✅ named function
    });

    handler.openIframe();
  };

  const handlePickupPayment = async () => {
    if (!bookingId) {
      showToast("❌ No booking found.", "error");
      return;
    }

    try {
      const { error } = await supabase
        .from("bookings")
        .update({
          payment_status: "unpaid",
          status: "pending",
        })
        .eq("id", bookingId);

      if (error) throw error;
      showToast("✅ Pickup confirmed!", "success");
    } catch (err) {
      console.error("❌ Pickup failed:", err);
      showToast("⚠️ Failed to update booking.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      {toast.show && (
        <div
          className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-lg font-medium flex items-center gap-2 transform transition-all duration-300 ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          <span>{toast.message}</span>
        </div>
      )}

      <div className="mt-8">
        <Link
          to="/landing_page"
          className="text-yellow-500 hover:text-black font-medium inline-flex items-baseline"
        >
          ← Back to Home
        </Link>
      </div>

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-yellow-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Booking Confirmed!
          </h2>

          <p className="text-black mb-6">
            Your rental request has been received. Please complete your payment
            to finalize your booking.
          </p>

          <div className="space-y-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900">
                Option 1: Pay Online
              </h3>
              <p className="text-sm text-black mt-1">
                Secure payment via Paystack (cards, bank transfer, USSD)
              </p>
              <button
                onClick={handlePaystackPayment}
                className="mt-3 w-full bg-yellow-500 hover:bg-black text-white py-2 px-4 rounded-md transition"
              >
                Pay Now with Paystack
              </button>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900">
                Option 2: Pay on Pickup
              </h3>
              <p className="text-sm text-black mt-1">
                Pay cash or card when you collect your vehicle
              </p>
              <button
                onClick={handlePickupPayment}
                className="mt-3 w-full bg-yellow-500 hover:bg-black text-white py-2 px-4 rounded-md transition"
              >
                Confirm Pickup Payment
              </button>
            </div>
          </div>

          <div className="text-sm text-black">
            Need help? Contact us at{" "}
            <a
              href="mailto:attufuahevabensanaomi@gmail.com"
              className="text-yellow-500 hover:underline"
            >
              attufuahevabensanaomi@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakePayment;
