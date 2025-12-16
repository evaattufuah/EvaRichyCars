import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient"; // 👈 import your client
import { Link } from "react-router-dom";

const AccountCreationForm = ({ isVisible = true }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isChecked, setIsChecked] = useState(true);
  const [loading, setLoading] = useState(false); // ✨ UX: disable button while submitting

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isChecked) {
      alert("Please agree to the Terms & Conditions.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        const userId = data.user.id;

        console.log("Inserting user with ID:", userId);
        console.log("Name:", formData.name);
        console.log("Email:", formData.email);

        const { error: insertError } = await supabase
          .from("EvaRichyData")
          .insert([
            {
              id: userId,
              name: formData.name,
              email: formData.email,
              password: formData.password,
            },
          ]);

        if (insertError) {
          console.error("Failed to insert user profile:", insertError);
          alert(
            "User created but failed to save profile info: " +
              insertError.message
          );
        } else {
          alert(
            "✅ Account created! Please check your email for a verification link."
          );
          setFormData({ name: "", email: "", password: "" });
        }
      }
    } catch (err) {
      console.error("Sign-up error:", err);
      alert("❌ Sign-up failed: " + (err.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
    console.log("Inserting user with ID:", userId);
    console.log("Name:", formData.name);
    console.log("Email:", formData.email);
  };

  if (!isVisible) return null;

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
            Create your accounts
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>

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
                placeholder="Enter your mail"
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
                minLength={6}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-white text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>

            {/* Terms */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-white">
                By Signing Up, I Agree with{" "}
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Terms & Conditions
                </a>
              </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 rounded-lg py-3 text-sm font-semibold text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-yellow-600 hover:bg-blue-700 focus:ring-blue-500"
                }`}
              >
                {loading ? "Creating..." : "Sign Up"}
              </button>
              <Link
                to="/sign_in"
                type="button"
                className="flex-1 rounded-lg border border-gray-300 bg-white py-3 text-sm font-semibold text-gray-700 text-center leading-6 transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountCreationForm;
