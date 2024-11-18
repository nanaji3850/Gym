import React from "react";
import { Link } from "react-router-dom";
const Nutrition_tip = () => {
  return (
    <div className="container mx-auto p-6">
      <header className="bg-white shadow-md py-8 fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Left Side: Logo */}
          <a href="#home" className="text-3xl font-bold text-orange-500">
            {/* Use Link component for navigation */}
            <Link to="/" className="text-3xl font-bold text-orange-500">
              GymFluencer
            </Link>
          </a>
          <nav className="hidden md:flex space-x-8 text-gray-700 bg-white shadow-lg p-4 rounded-lg">
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

      {/* Full Image without cropping */}
      <div className="mb-8 mt-20">
        <img
          src="https://10web-site.ai/125/wp-content/uploads/sites/137/2024/11/tenweb_media_RLUraFl7.webp"
          alt="Placeholder for Article"
          className="w-full object-contain h-96" // Adjusts image to show full height without cropping
        />
      </div>

      {/* Article Content */}
      <div className="mb-12">
        {/* Large, bold heading */}
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          The Importance of Rest Days
        </h1>

        <p className="text-lg mb-4">
          Many fitness enthusiasts often overlook the importance of rest days,
          believing that more workouts equate to better results. However, rest
          days are crucial for recovery and overall performance. In this
          article, we will delve into the significance of taking time off from
          intense workouts and how it can benefit your fitness journey.
        </p>
        <p className="text-lg mb-4">
          When you exercise, your muscles undergo stress and tiny tears, which
          is a natural part of building strength. Rest days allow your muscles
          to repair and grow, ultimately leading to improved performance.
          Without adequate rest, you risk overtraining, which can lead to
          fatigue, decreased motivation, and even injury. Listening to your body
          and recognizing when it needs a break is vital for long-term success.
        </p>
        <p className="text-lg mb-4">
          Incorporating active recovery on rest days, such as light stretching
          or yoga, can also be beneficial. These activities promote blood flow
          and help alleviate muscle soreness without putting additional strain
          on your body. Remember, rest is not a sign of weakness; it’s an
          essential component of a balanced fitness routine that will help you
          achieve your goals sustainably.
        </p>
      </div>
    </div>
  );
};

export default Nutrition_tip;
