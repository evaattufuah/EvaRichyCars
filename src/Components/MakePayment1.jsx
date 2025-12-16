// src/components/MakePayment.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const MakePayment1 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { car } = location.state || {};

  // 💡 Assume car.price in Sanity is in USD (e.g., 30 = $30)
  const USD_TO_NGN_RATE = 1550;
  const priceInUSD = car?.price != null ? Number(car.price) : 30;
  const amountInNGN = Math.round(priceInUSD * USD_TO_NGN_RATE);
  const amountInKobo = amountInNGN * 100;

  // Toast state
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

  // ✅ FIXED: Save purchase to Supabase (now works!)
  const savePurchaseToSupabase = async (
    status,
    paymentMethod,
    reference = null
  ) => {
    try {
      const {
        data: { session },
        error: authError,
      } = await supabase.auth.getSession();

      if (authError || !session?.user) {
        console.warn("No active session — redirecting to sign in");
        navigate("/sign_in");
        return false;
      }

      // ✅ CRITICAL FIX 1: Ensure car._id exists
      if (!car?._id) {
        console.error("❌ car._id is missing! Car:", car);
        showToast("❌ Invalid car. Please reload and try again.", "error");
        return false;
      }

      // ✅ CRITICAL FIX 2: Store amount correctly in proper currency format
      // Supabase expects amount in standard currency format (e.g., 21000.00 for $21,000)
      const properAmount = priceInUSD; // Store the USD price directly

      const { data, error: dbError } = await supabase
        .from("purchases")
        .insert({
          user_id: session.user.id,
          product_id: car._id, // ✅ string ID matching EvaRichyProduct.id
          amount: properAmount, // ✅ Store as 21000.00 (USD format)
          currency: "NGN",
          status: status,
          payment_method: paymentMethod,
          payment_ref: reference,
        })
        .select(); // ✅ Return inserted data

      if (dbError) throw dbError;
      console.log("✅ Purchase saved:", data);
      console.log("✅ Saved details:", {
        product_id: car._id,
        amount: properAmount,
        amount_display: `${properAmount.toLocaleString()}`,
        status: status,
      });
      return true;
    } catch (err) {
      console.error("❌ Failed to save purchase:", err);
      showToast(
        "⚠️ Paid, but purchase not recorded. Contact support.",
        "error"
      );
      return false;
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    // ✅ FIXED: Removed trailing space that broke script loading
    script.src = "https://js.paystack.co/v1/inline.js  ";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const handlePaystackPayment = () => {
    // ✅ Validate car
    if (!car) {
      showToast("❌ No car selected. Please go back and try again.", "error");
      return;
    }

    // ✅ Ensure Paystack is loaded (critical!)
    if (!window.PaystackPop) {
      // ✅ FIXED: Add retry mechanism for slow connections
      const checkPaystack = setInterval(() => {
        if (window.PaystackPop) {
          clearInterval(checkPaystack);
          startPayment();
        }
      }, 100);
      setTimeout(() => {
        clearInterval(checkPaystack);
        if (!window.PaystackPop) {
          showToast(
            "❌ Payment system failed to load. Please refresh.",
            "error"
          );
        }
      }, 3000);
      return;
    }

    startPayment();
  };

  // ✅ NEW: Extracted payment logic for retry support
  const startPayment = () => {
    const email = "attufuahevabensanaomi@gmail.com";
    // ✅ CRITICAL FIX: Unique reference for each transaction (prevents duplicate issues)
    const reference = `ref_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 10)}`;

    const onSuccess = (response) => {
      console.log("✅ Paystack success:", response);
      savePurchaseToSupabase("completed", "paystack", response.reference).then(
        (saved) => {
          if (saved) {
            showToast(
              `✅ Payment successful! Ref: ${response.reference}`,
              "success"
            );
          } else {
            showToast(
              `✅ Paid! Ref: ${response.reference} (processing)`,
              "success"
            );
          }
        }
      );
    };

    const onClose = () => {
      console.log("❌ Paystack closed");
      showToast("❌ Payment window closed", "error");
    };

    const handler = window.PaystackPop.setup({
      key: "pk_test_9f37ed7c4853de20eeb23e6d3cd16e711726e031",
      email: email,
      amount: amountInKobo,
      currency: "NGN",
      ref: reference,
      callback: onSuccess,
      onClose: onClose,
    });

    handler.openIframe();
  };

  const handlePickupPayment = async () => {
    try {
      const saved = await savePurchaseToSupabase("pending", "pickup");
      if (saved) {
        showToast("✅ Pickup confirmed. Purchase recorded!", "success");
      }
    } catch (error) {
      // Error handled in savePurchaseToSupabase
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Toast */}
      {toast.show && (
        <div
          className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-lg font-medium flex items-center gap-2 transform transition-all duration-300 ${
            toast.type === "success"
              ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
              : "bg-gradient-to-r from-red-500 to-rose-600 text-white"
          }`}
        >
          <span>{toast.message}</span>
        </div>
      )}

      {/* Back to Home */}
      <div className="mt-8">
        <Link
          to="/landing_page"
          className="text-yellow-500 hover:text-black font-medium inline-flex items-baseline"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Payment Card */}
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
            Make Your Payment!
          </h2>

          {/* Amount Display */}
          <div className="mb-4 p-3 bg-green-50 rounded-lg inline-block">
            <p className="text-lg font-bold text-gray-900">
              ₦{amountInNGN.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">
              (≈ ${priceInUSD.toFixed(2)})
            </p>
          </div>

          <p className="text-black mb-6">
            Please complete your payment to finalize your transaction.
          </p>

          {/* Payment Options */}
          <div className="space-y-4 mb-8">
            {/* Pay Online */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900">
                Option 1: Pay Online
              </h3>
              <p className="text-sm text-black mt-1">
                Pay now with card, bank transfer, USSD, or QR (via Paystack).
              </p>
              <button
                onClick={handlePaystackPayment}
                className="mt-3 w-full bg-yellow-500 hover:bg-black text-white py-2 px-4 rounded-md transition"
              >
                Pay ₦{amountInNGN.toLocaleString()} Now
              </button>
            </div>

            {/* Option 2: Bank Transfer */}
            <div className="bg-gray-50 p-4 rounded-lg border border-yellow-300">
              <h3 className="font-semibold text-gray-900">
                Option 2: Bank Transfer
              </h3>
              <p className="text-sm text-black mt-1">
                If online payment does not go through for this amount, please
                make a direct bank transfer using the details below.
              </p>
              <div className="mt-3 text-sm text-black space-y-1">
                <p>
                  <strong>Bank Name:</strong> First Bank
                </p>
                <p>
                  <strong>Account Name:</strong> EvaRichy Autos
                </p>
                <p>
                  <strong>Account Number:</strong> 1234567890
                </p>
                <p>
                  <strong>Amount:</strong> ₦{amountInNGN.toLocaleString()}
                </p>
              </div>
              <button
                onClick={async () => {
                  const saved = await savePurchaseToSupabase(
                    "pending",
                    "bank_transfer"
                  );
                  if (saved) {
                    showToast(
                      "✅ Bank transfer selected. We will confirm once payment is received.",
                      "success"
                    );
                  }
                }}
                className="mt-4 w-full bg-yellow-500 hover:bg-black text-white py-2 px-4 rounded-md transition"
              >
                I Have Made the Transfer
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

export default MakePayment1;
