// SignInForm.jsx-- Manually confirm the user


// UPDATE auth.users 
// SET email_confirmed_at = NOW()
// WHERE email = 'ndukwudonald3@gmail.com';

import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Link, useNavigate } from "react-router-dom";

const AccountCreationForm = ({ isVisible = true }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      // ✅ Success! User is now signed in
      console.log("Signed in as:", data.user.email);
      alert(
        "✅ Welcome back, " + (data.user.user_metadata?.name || "friend") + "!"
      );

      // Optional: redirect to dashboard/profile
      navigate("/landing_page"); // or "/"
    } catch (err) {
      console.error("Sign-in error:", err);
      alert(
        "❌ Sign-in failed: " + (err.message || "Invalid email or password")
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return null;
const handleForgotPassword = async () => {
  const email = prompt("Please enter your email address:");
  if (!email) return;

  setLoading(true);

  try {
    // 🔑 Supabase sends a password reset link to the user’s email
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      // Optional: override default redirect URL
      redirectTo: `${window.location.origin}/update-password`,
    });

    if (error) throw error;

    alert(
      `✅ Password reset link sent to ${email}.\n\nCheck your inbox (and spam folder).`
    );
  } catch (err) {
    console.error("Reset error:", err);
    alert("❌ Failed to send reset email: " + (err.message || "Unknown error"));
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative overflow-hidden rounded-2xl bg-yellow-500 shadow-2xl">
        {/* Gradient */}
        <div
          className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-black via-black to-black"
          style={{
            clipPath: "polygon(0 0, 100% 0, 80% 100%, 0 100%)",
          }}
        ></div>

        <div className="relative z-10 p-8">
          <h1 className="mb-6 text-center text-2xl font-bold text-white">
            Sign In
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-white"
              >
                E-mail Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-white text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>

          
            {/* Forgot password */}
            <div className="text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-white hover:underline"
                disabled={loading}
              >
                Forgot password?
              </button>
            </div>
            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 rounded-lg py-3 text-sm font-semibold text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-blue-700 focus:ring-blue-500"
                }`}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
              <Link
                to="/sign_up"
                type="button"
                className="flex-1 rounded-lg border border-gray-300 bg-white py-3 text-sm font-semibold text-gray-700 text-center leading-6 transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountCreationForm;
