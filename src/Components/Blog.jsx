// src/components/Blog.jsx
import React from "react";
import { Link } from "react-router-dom"; 
import Navbar from "./Navbar";
import BlogPost from "./BlogPost";
import benz from "../assets/Images/brownandwhitesidedesktop-hd-mercedes-benz-eqs-wallpaper-image.jpg"

import benz1 from "../assets/Images/hd-mercedes-benz-gle-wallpaper-image.jpg"

import benz2 from "../assets/Images/greysidedesktop-hd-lexus-nx-wallpaper-image.jpg"

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "Mercedes-Benz Vision EQXX: The Future of Electric Luxury",
      date: "November 18, 2022",
      image: benz,
      badge: { text: "STOCK POST", color: "bg-orange-500" },
    },
    {
      id: 2,
      title: "How The New Mercedes-Benz SLS AMG on the track",
      date: "june 28, 2025",
      image:
        "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600",
      badge: { text: "STOCK", color: "bg-blue-500" },
    },
    {
      id: 3,
      title: "We believe the cars we offer are the highest quality",
      date: "July 1, 2025",
      image:
        "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=600",
      badge: null,
    },
    {
      id: 4,
      title: "All colors & trims are always in stock",
      date: "March 10, 2024",
      image: benz2,
      badge: null,
    },
    {
      id: 5,
      title: "Tap yourself on the back for being a savvy car shopper",
      date: "April 24, 2025",
      image: benz1,
      badge: null,
    },
    {
      id: 6,
      title: "Nissan vehicles are distributed throughout the United States",
      date: "October 13, 2020",
      image:
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600",
      badge: { text: "STOCK", color: "bg-blue-500" },
    },
  ];

  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-white text-black">
      <Navbar />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl mt-7 md:text-4xl font-bold">
            Latest From Our <span className="text-yellow-500">Blog</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Expert insights, tips, and updates on car rentals, maintenance, and
            luxury automotive trends.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {post.badge && (
                  <div
                    className={`absolute top-2 left-2 ${post.badge.color} text-white text-xs font-bold px-2 py-1 rounded`}
                  >
                    {post.badge.text}
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-3 text-white">{post.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-400 border-t border-gray-700 pt-3">
                  <div className="flex items-center gap-1">
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
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
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.858-.282A5.501 5.501 0 0112 13a5.501 5.501 0 014.858 4.858A9.863 9.863 0 0121 12z"
                      />
                    </svg>
                    <span>No Comments</span>
                  </div>
                </div>
                {/* ✅ Updated: Use Link instead of <a> */}
                <Link
                  to={`/blog/${post.id}`}
                  className="inline-block text-yellow-500 hover:text-yellow-400 font-medium text-sm mt-4"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
