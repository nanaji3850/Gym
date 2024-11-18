// Blog.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Blog = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-md py-8 fixed top-0 left-0 w-full z-50">
          <div className="container mx-auto flex justify-between items-center px-4">
            {/* Left Side: Logo */}
            <a
              href="#home"
              className="text-3xl font-bold text-orange-500 transition-transform duration-300 transform hover:scale-110"
            >
              {/* Use Link component for navigation */}
              <Link to="/" className="text-3xl font-bold text-orange-500">
                GymFluencer
              </Link>
            </a>
            <nav className="hidden md:flex space-x-8 text-gray-700 bg-white shadow-lg p-4 rounded-lg font-semiboldtransition-transform duration-300 transform hover:scale-110 ">
              {/* <a
              href="#features"
              className="text-lg hover:text-orange-500 transition-colors"
            >
              Features
            </a> */}
              <a
                href="/blog"
                className="text-lg hover:text-orange-500 transition-colors"
              >
                Blog
              </a>
              {/* <a
              href="#faqs"
              className="text-lg hover:text-orange-500 transition-colors"
            >
              FAQs
            </a> */}
              <Link
                to="/diet-plan"
                className="text-lg hover:text-orange-500 transition-colors"
              >
                Diet Plan
              </Link>
              <Link
                to="/workout-plans"
                className="text-lg hover:text-orange-500 transition-colors"
              >
                Workout Plans
              </Link>
            </nav>

            {/* Right Side: Buttons */}
            <div className="space-x-4">
              <button className="px-6 py-2 bg-green-600 rounded-full border-2 border-white text-white shadow-lg hover:bg-green-400 hover:shadow-xl">
                Download Now
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="container mx-auto px-6 lg:px-8 pt-32 mt-20">
          {/* Welcome Section */}
          <section className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 transition-transform duration-300 transform hover:scale-110">
              Welcome to Our Fitness Blog
            </h1>
            <p className="text-lg text-gray-600 transition-transform duration-300 transform hover:scale-110">
              Explore a wealth of fitness tips, workout routines, and health
              advice designed to inspire and guide you on your fitness journey.
              Stay informed and motivated with our expert insights.
            </p>
          </section>

          {/* Latest Articles Section */}
          <section className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 transition-transform duration-300 transform hover:scale-110">
              Latest Articles
            </h2>
            <p className="text-gray-600 mb-6 transition-transform duration-300 transform hover:scale-110">
              Explore our latest insights on fitness, nutrition, and motivation
              to help you achieve your goals.
            </p>
          </section>

          {/* Blog Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {/* Blog Post 1 */}
            <article className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-110">
              <Link
                to="/fitness-journey"
                className="block transition-transform duration-300 transform hover:scale-110"
              >
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
                  Explore effective strategies to maintain motivation and
                  achieve your fitness goals.
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
            <article className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-110">
              <Link
                to="/Top5_workout"
                className="block transition-transform duration-300 transform hover:scale-110"
              >
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
            <article className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-110">
              <Link
                to="/Nutrition_tip"
                className="block transition-transform duration-300 transform hover:scale-110"
              >
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
                  Learn how proper nutrition can enhance your workout
                  performance and recovery.
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
            <article className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-110">
              <Link
                to="/Rest_days"
                className="block transition-transform duration-300 transform hover:scale-110"
              >
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
      <section className="bg-gray-100 py-16 px-8 text-center shadow-md ">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">
          Need More Help?
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Contact us for any additional questions or support regarding the app.
        </p>
        <button
          onClick={() => navigate("/contact")}
          className="bg-blue-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-700 transition-all"
        >
          Contact Support
        </button>
      </section>
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; 2024 GymFluencer. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Blog;
