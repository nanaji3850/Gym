// Blog.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout";

const Blog = () => {
  const navigate = useNavigate();
  const handleGetStartedClick = () => {
    navigate("/get-started"); // Use navigate to go to GetStarted page
  };
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        {/* Header */}
        <Layout>
          {/* Main Content */}
          <div className="container mx-auto px-6 lg:px-8 pt-32 mt-20">
            {/* Welcome Section */}
            <section className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-4 transition-transform duration-300 transform hover:scale-110">
                Welcome to Our Fitness Blog
              </h1>
              <p className="text-lg text-gray-600 transition-transform duration-300 transform hover:scale-110">
                Explore a wealth of fitness tips, workout routines, and health
                advice designed to inspire and guide you on your fitness
                journey. Stay informed and motivated with our expert insights.
              </p>
            </section>

            {/* Latest Articles Section */}
            <section className="text-center mb-12">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4 transition-transform duration-300 transform hover:scale-110">
                Latest Articles
              </h2>
              <p className="text-gray-600 mb-6 transition-transform duration-300 transform hover:scale-110">
                Explore our latest insights on fitness, nutrition, and
                motivation to help you achieve your goals.
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
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToPQe7e6RG8pstfMwQTjGXTfPBSGI-c89PxA&s"
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
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsDa01O-L6xtrqpmSi-SXi1IKA20XBco2zEQ&s"
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
                    src="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/rockcms/2024-06/gain-strength-diet-tips-zz-240627-394239.jpg"
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
                    src="https://getswoly.com/cdn/shop/articles/taking-creatine-on-rest-days_jpeg_e7dad73f-7994-4bb8-83d4-65d6d2b53628_1200x.jpg?v=1709945222"
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
        </Layout>
      </div>
      <section className="bg-gray-100 py-16 px-8 text-center shadow-md ">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">
          Need More Help?
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Contact us for any additional questions or support regarding the
          GymFluencer.
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
