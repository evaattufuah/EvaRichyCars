// src/pages/BlogPost.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import benz from "../assets/Images/brownandwhitesidedesktop-hd-mercedes-benz-eqs-wallpaper-image.jpg";
import benz1 from "../assets/Images/hd-mercedes-benz-gle-wallpaper-image.jpg"
import benz2 from "../assets/Images/greysidedesktop-hd-lexus-nx-wallpaper-image.jpg"
// Full blog post content — replace with CMS/Markdown later
const blogPosts = {
  1: {
    title: "Mercedes-Benz Vision EQXX: The Future of Electric Luxury",
    date: "November 18, 2022",
    image: benz,
    content: `
      <p>Deep inside a private Dubai villa lies one of the most exclusive car collections in the Middle East. Owned by a reclusive billionaire, this garage houses over 30 hypercars, including a rare Mercedes-Benz Vision EQXX — a concept car that redefines efficiency and luxury.</p>
      <p>Security is so tight that even family members need biometric clearance to enter. The facility includes climate-controlled bays, a private showroom, and a dedicated maintenance team that works 24/7.</p>
      <p>"This isn't just a garage — it's a sanctuary for automotive art," says the collector, who wishes to remain anonymous.</p>
    `,
  },
  2: {
    title: "How The New Mercedes-Benz SLS AMG on the track",
    date: "December 28, 2015",
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200",
    content: `
      <p>We took the legendary SLS AMG to Dubai Autodrome for a full-day track test. With 563 horsepower and a 0-60 time of 3.7 seconds, it remains one of the most thrilling analog supercars ever built.</p>
      <p>The gullwing doors aren’t just for show — they provide excellent access even in tight paddock spaces. On the track, the car’s balance and steering feel are unmatched by modern electric rivals.</p>
      <p>Despite being over a decade old, the SLS AMG still turns heads and delivers raw, unfiltered driving joy.</p>
    `,
  },
  3: {
    title: "We believe the cars we offer are the highest quality",
    date: "December 1, 2015",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200",
    content: `
      <p>At EvaRichyCars, every vehicle undergoes a rigorous 150-point inspection before it’s listed for rent or sale. We believe that luxury isn’t just about brand names — it’s about reliability, performance, and peace of mind.</p>
      <p>Our fleet is serviced weekly, sanitized after every use, and maintained by certified technicians who specialize in high-performance vehicles.</p>
      <p>Whether you’re renting for a weekend or buying for life, you can trust that what you see is what you get — no hidden issues, no surprises.</p>
    `,
  },
  4: {
    title: "All colors & trims are always in stock",
    date: "December 1, 2015",
    image: benz2,
    content: `
      <p><strong>Why wait weeks — or months — for your dream car?</strong></p>

      <p>At EvaRichyCars, we’ve reimagined the luxury car buying experience. Forget the endless backorders, the “maybe next quarter” promises, and the compromise on color or trim. We believe if you’ve fallen in love with a car, you should be able to drive it home — <em>today</em>.</p>

      <h3>The Inventory Revolution</h3>
      <p>Unlike traditional dealerships that operate on a “build-to-order” model (which often means waiting 8–16 weeks), EvaRichyCars maintains a dynamic, rotating inventory of over 50 premium vehicles — ready to drive off the lot. From matte black Lamborghinis that scream stealth and power, to pearl-white Range Rovers that exude elegance and sophistication, we stock what our clients want — not just what’s easiest to order.</p>

            <p><strong>Forget waiting weeks. At EvaRichyCars, your dream car is ready to drive — today.</strong></p>

      <p>We keep over 50 premium vehicles in stock — from matte black Lamborghinis to pearl-white Range Rovers — in every popular color and trim. No backorders. No compromises.</p>

      <p>Our real-time inventory system covers Dubai, Abu Dhabi, and Sharjah. See it online? It’s available. Pick it up. Or we’ll deliver it within 48 hours.</p>

      <p>Every car is inspected, certified, and ready to go. Because luxury shouldn’t make you wait.</p>

      <p><strong>Drive what you love. Now.</strong></p>

    `,
  },
  5: {
    title: "Tap yourself on the back for being a savvy car shopper",
    date: "April 24, 2025",
          image: benz1,
    content: `
      <p>You’ve done your research, compared options, and chosen a service that values transparency. That’s worth celebrating!</p>
      <p>At EvaRichyCars, we reward smart customers with loyalty discounts, free upgrades, and priority booking during peak seasons.</p>
      <p>Because we believe the best clients aren’t just buyers — they’re partners in the automotive experience.</p>
    `,
  },
  6: {
    title: "Nissan vehicles are distributed throughout the United States",
    date: "December 1, 2015",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200",
    content: `
      <p>While our focus is on luxury and performance vehicles in the UAE, we also partner with Nissan USA to offer special import options for collectors and enthusiasts.</p>
      <p>From the GT-R Nismo to the electric Ariya, Nissan’s engineering excellence complements our high-end fleet.</p>
      <p>Custom orders can be placed through our concierge service with delivery in 8–12 weeks.</p>
    `,
  },
};

const BlogPost = () => {
  const { id } = useParams();
  const postId = parseInt(id, 10);
  const post = blogPosts[postId];

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-800 text-white flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
          <Link to="/blog" className="text-yellow-500 hover:text-yellow-400">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto p-6 md:p-12 text-white min-h-screen bg-gray-800">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-64 md:h-96 object-cover rounded-lg mb-8 shadow-lg"
      />
      <div className="text-yellow-500 text-sm mb-2">{post.date}</div>
      <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
        {post.title}
      </h1>
      <div
        className="text-gray-300 text-lg leading-relaxed space-y-4"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <div className="mt-10 pt-6 border-t border-gray-800">
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-400 font-medium"
        >
          ← Back to Blog
        </Link>
      </div>
    </article>
  );
};

export default BlogPost;
