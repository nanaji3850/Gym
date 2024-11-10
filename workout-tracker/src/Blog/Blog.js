// Blog.js
import React from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md py-8 fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Left Side: Logo */}
          <a href="#home" className="text-3xl font-bold text-orange-500">
            {/* Use Link component for navigation */}
            <Link to="/" className="text-3xl font-bold text-orange-500">
              GymFluencer
            </Link>
          </a>

          {/* Right Side: Buttons */}
          <div className="space-x-4">
            <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
              Get Started
            </button>
            <button className="px-6 py-2 bg-green-600 rounded-full border-2 border-white text-white shadow-lg hover:bg-green-400 hover:shadow-xl">
              Download Now
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 lg:px-8 pt-32">
        {/* Welcome Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Our Fitness Blog
          </h1>
          <p className="text-lg text-gray-600">
            Explore a wealth of fitness tips, workout routines, and health
            advice designed to inspire and guide you on your fitness journey.
            Stay informed and motivated with our expert insights.
          </p>
        </section>

        {/* Latest Articles Section */}
        <section className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Latest Articles
          </h2>
          <p className="text-gray-600 mb-6">
            Explore our latest insights on fitness, nutrition, and motivation to
            help you achieve your goals.
          </p>
        </section>

        {/* Blog Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Blog Post 1 */}
          <article className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Link to="/fitness-journey" className="block">
              <img
                src="https://10web-site.ai/125/wp-content/uploads/sites/137/2024/11/tenweb_media_CEKoHRGh.webp"
                alt="Motivation"
                className="w-full h-48 object-cover"
              />
            </Link>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                How to Stay Motivated on Your Fitness Journey
              </h3>
              <p className="text-gray-600 mb-4">
                Explore effective strategies to maintain motivation and achieve
                your fitness goals.
              </p>
              <Link
                to="/fitness-journey"
                className="text-orange-500 font-semibold hover:underline"
              >
                Read More
              </Link>
            </div>
          </article>

          {/* Blog Post 2 */}
          <article className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Link to="/Top5_workout" className="block">
              <img
                src="https://10web-site.ai/125/wp-content/uploads/sites/137/2024/11/tenweb_media_IQWyOeZD.webp"
                alt="Motivation"
                className="w-full h-48 object-cover"
              />
            </Link>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Top 5 Workout Routines for Beginners
              </h3>
              <p className="text-gray-600 mb-4">
                Discover the best workout routines tailored for those just
                starting their fitness journey.
              </p>
              <Link
                to="/Top5_workout"
                className="text-orange-500 font-semibold hover:underline"
              >
                Read More
              </Link>
            </div>
          </article>

          {/* Blog Post 3 */}
          <article className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Link to="/Nutrition_tip" className="block">
              <img
                src="https://10web-site.ai/125/wp-content/uploads/sites/137/2024/11/tenweb_media_1EYdvcQ5.webp"
                alt="Nutrition Tips"
                className="w-full h-48 object-cover"
              />
            </Link>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Nutrition Tips for Optimal Performance
              </h3>
              <p className="text-gray-600 mb-4">
                Learn how proper nutrition can enhance your workout performance
                and recovery.
              </p>
              <Link
                to="/Nutrition_tip"
                className="text-orange-500 font-semibold hover:underline"
              >
                Read More
              </Link>
            </div>
          </article>

          {/* Blog Post 4 */}
          <article className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Link to="/Rest_days" className="block">
              <img
                src="https://10web-site.ai/125/wp-content/uploads/sites/137/2024/11/tenweb_media_RLUraFl7.webp"
                alt="Rest Days"
                className="w-full h-48 object-cover"
              />
            </Link>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                The Importance of Rest Days
              </h3>
              <p className="text-gray-600 mb-4">
                Understand why incorporating rest days into your routine is
                essential for long-term success.
              </p>
              <Link
                to="/Rest_days"
                className="text-orange-500 font-semibold hover:underline"
              >
                Read More
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Blog;
