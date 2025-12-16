// src/components/AccountMenu.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

const fadeInStyles = `
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}
`;

const AccountMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [loadingPurchases, setLoadingPurchases] = useState(true);
  // ✅ NEW: For bookings
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  // 🔑 Fetch user & purchases + bookings
  useEffect(() => {
    const loadData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const currentUser = session?.user;
      setUser(currentUser);

      if (currentUser) {
        setLoadingPurchases(true);
        // 🛒 Fetch purchases
        const { data: purchaseData, error: purchaseError } = await supabase
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
          .eq("user_id", currentUser.id)
          .order("created_at", { ascending: false })
          .limit(1);

        if (purchaseError) {
          console.error("Error fetching purchases:", purchaseError);
          setPurchases([]);
        } else {
          setPurchases(purchaseData || []);
        }
        setLoadingPurchases(false);

        // 📅 Fetch latest booking
        const { data: bookingData, error: bookingError } = await supabase
          .from("bookings")
          .select("*")
          .eq("user_id", currentUser.id)
          .order("created_at", { ascending: false })
          .limit(1);

        if (bookingError) {
          console.error("Error fetching booking:", bookingError);
          setBookings([]);
        } else {
          setBookings(bookingData || []);
        }
        setLoadingBookings(false);
      }
    };

    loadData();
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsOpen(false);
  };

  // ✅ Extract username & initials
  const getUsername = () => {
    if (!user) return "User";
    return user.user_metadata?.name?.split(" ")[0] || user.email.split("@")[0];
  };

  const getEmailPrefix = () => user?.email?.split("@")[0] || "user";
  const getInitials = () =>
    getUsername()
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);

  const username = getUsername();
  const emailPrefix = getEmailPrefix();
  const initials = getInitials();

  if (!user) return null;

  // Icons
  const Icons = {
    SwitchAccount: () => (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
    SignOut: () => (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17 7l-4.5 4.5L17 16v-2h5V7h-5v2zM11 19H7V5h4v2H9v10h2v2z" />
      </svg>
    ),
    Purchases: () => (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-2.67 0-5.25-1.02-7.3-2.88l4.76-4.76c.67-.67 1.69-.67 2.36 0l4.76 4.76C17.25 18.98 14.67 20 12 20zm0-14c-2.67 0-5.25 1.02-7.3 2.88l4.76 4.76c.67.67 1.69.67 2.36 0l4.76-4.76C17.25 5.02 14.67 4 12 4z" />
      </svg>
    ),
    Chevron: () => (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
      </svg>
    ),
    Package: () => (
      <svg
        className="w-4 h-4 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
    Close: () => (
      <svg
        className="w-4 h-4"
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
    ),
  };

  return (
    <>
      <style>{fadeInStyles}</style>

      <div className="relative">
        <button
          onClick={toggleMenu}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-500 text-white font-bold text-lg hover:bg-gray-600 transition-colors duration-200"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {initials}
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 animate-fadeIn max-h-[80vh] overflow-y-auto">
            {/* Close Button - Top Right */}
            <button
              onClick={closeMenu}
              className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500"
              aria-label="Close menu"
            >
              <Icons.Close />
            </button>

            {/* User Info */}
            <div className="p-4 pt-10 border-b border-gray-200">
              {" "}
              {/* pt-10 adds space for close button */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold">
                  {initials}
                </div>
                <div>
                  <div className="font-semibold">{username}</div>
                  <div className="text-gray-600">@{emailPrefix}</div>
                  <div className="text-blue-600 text-sm mt-1">
                    View your Chat
                  </div>
                </div>
              </div>
            </div>

            <div className="py-2">
              {/* Account Actions */}
              <div className="px-4 py-2">
                <div
                  className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded cursor-pointer text-red-600"
                  onClick={handleSignOut}
                >
                  <Icons.SignOut />
                  <span>Sign out</span>
                </div>
              </div>

              <hr className="my-2 border-gray-200" />

              {/* 🛒 Purchases Section */}
              <div className="px-4 py-2">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Icons.Purchases />
                    <span className="font-medium">Your Purchases</span>
                  </div>
                  <a
                    href="/purchases"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View all
                  </a>
                </div>

                {loadingPurchases ? (
                  <div className="text-sm text-gray-500 py-2 flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Loading purchases...
                  </div>
                ) : purchases.length > 0 ? (
                  <div className="space-y-3">
                    {purchases.map((purchase) => (
                      <div
                        key={purchase.id}
                        className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                      >
                        {purchase.EvaRichyProduct?.image_url ? (
                          <img
                            src={purchase.EvaRichyProduct.image_url}
                            alt={purchase.EvaRichyProduct.name}
                            className="w-10 h-10 rounded object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center text-gray-500">
                            <Icons.Package />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-800 truncate">
                            {purchase.EvaRichyProduct?.name ||
                              "Unnamed Product"}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {new Date(purchase.created_at).toLocaleDateString()}
                          </div>
                          <div className="text-lg font-bold text-gray-900 mt-1">
                            ${parseFloat(purchase.amount || 0).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500 py-4 text-center">
                    🛍️ No purchases yet.
                  </div>
                )}
              </div>
            </div>

            {/* 📅 Bookings Section */}
            <div className="px-4 py-2 mt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
                  </svg>
                  <span className="font-medium">Your Bookings</span>
                </div>
                <a
                  href="/bookings"
                  className="text-sm text-blue-600 hover:underline"
                >
                  View all
                </a>
              </div>

              {loadingBookings ? (
                <div className="text-sm text-gray-500">Loading...</div>
              ) : bookings.length > 0 ? (
                <div className="flex items-start space-x-3 p-2 bg-gray-50 rounded">
                  <div className="text-xs text-gray-600">
                    <div className="font-medium">{bookings[0].car_type}</div>
                    <div>
                      {new Date(bookings[0].pickup_date).toLocaleDateString()}
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        bookings[0].payment_status === "paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {bookings[0].payment_status}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-500 py-2">
                  No bookings yet.
                </div>
              )}
            </div>
          </div>
        )}

        {isOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
      </div>
    </>
  );
};

export default AccountMenu;
