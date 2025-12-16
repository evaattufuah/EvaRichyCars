// src/pages/PurchasesPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import Navbar from "./Navbar";

const PurchasesPage = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchases = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/sign_in");
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from("purchases")
        .select(
          `
          id,
          created_at,
          amount,
          status,
          EvaRichyProduct (
            name,
            image_url
          )
        `
        )
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching purchases:", error);
        setError("Failed to load purchases.");
      } else {
        setPurchases(data || []);
      }
      setLoading(false);
    };

    fetchPurchases();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">

        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading your purchase history...</p>
            </div>

      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-md text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          {/* Back Button (Left) */}
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-black transition"
          >
            ← Back to Inventory
          </button>

          {/* Title (Centered) */}
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold text-gray-900">Your Purchases</h1>
            <p className="mt-2 text-gray-600">
              {purchases.length === 0
                ? "You haven’t made any purchases yet."
                : `You have ${purchases.length} ${
                    purchases.length === 1 ? "purchase" : "purchases"
                  }.`}
            </p>
          </div>

          {/* Empty space on right (for balance) */}
          <div className="w-40"></div>
        </div>
        {/* Empty State */}
        {purchases.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center max-w-2xl mx-auto">
            <div className="text-6xl mb-6">🛍️</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Ready to get started?
            </h2>
            <p className="text-gray-600 mb-6">
              Browse our shop and unlock premium features today.
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition shadow-md"
            >
              Browse Products
            </button>
          </div>
        )}

        {/* Purchases List */}
        {purchases.length > 0 && (
          <div className="space-y-5">
            {purchases.map((purchase) => (
              <div
                key={purchase.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition"
              >
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-5">
                    {/* Product Image */}
                    <div className="flex-shrink-0 w-24 h-24">
                      {purchase.EvaRichyProduct?.image_url ? (
                        <img
                          src={purchase.EvaRichyProduct.image_url}
                          alt={purchase.EvaRichyProduct.name}
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-10 h-10 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {purchase.EvaRichyProduct?.name ||
                              "Unnamed Product"}
                          </h3>
                          <p className="mt-1 text-gray-500 text-sm">
                            Purchased on{" "}
                            <time dateTime={purchase.created_at}>
                              {new Date(purchase.created_at).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </time>
                          </p>
                        </div>
                        <div className="mt-2 sm:mt-0">
                          <span
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                            bg-green-100 text-green-800"
                          >
                            ✅{" "}
                            {purchase.status.charAt(0).toUpperCase() +
                              purchase.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <div className="text-2xl font-bold text-gray-900">
                          ${parseFloat(purchase.amount || 0).toFixed(2)}
                        </div>
                        {/* Optional: Add "View Receipt" or "Download PDF" later */}
                        {/* <button className="text-sm text-blue-600 hover:underline">
                          View Receipt
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer CTA */}
        {/* {purchases.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Want more? Explore our latest offers.
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition shadow-md"
            >
              Browse More Products
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default PurchasesPage;
