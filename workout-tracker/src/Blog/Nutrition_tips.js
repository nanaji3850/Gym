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
          src="https://10web-site.ai/125/wp-content/uploads/sites/137/2024/11/tenweb_media_1EYdvcQ5.webp"
          alt="Placeholder for Article"
          className="w-full object-contain h-96" // Adjusts image to show full height without cropping
        />
      </div>

      {/* Article Content */}
      <div className="mb-12">
        {/* Large, bold heading */}
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Nutrition Tips for Optimal Performance
        </h1>

        <p className="text-lg mb-4">
          Nutrition plays a crucial role in achieving your fitness goals,
          whether you’re looking to lose weight, build muscle, or improve
          endurance. Understanding the right balance of macronutrients—proteins,
          fats, and carbohydrates—is essential for fueling your workouts. In
          this article, we will discuss key nutrition tips that can help
          optimize your performance and recovery.
        </p>
        <p className="text-lg mb-4">
          First and foremost, it’s important to consume a balanced diet rich in
          whole foods. Incorporating lean proteins, healthy fats, and complex
          carbohydrates will provide your body with the necessary nutrients to
          perform at its best. Pre-workout meals should focus on carbohydrates
          for energy, while post-workout meals should include protein to aid in
          muscle recovery. Hydration is also vital; drinking enough water
          before, during, and after exercise can significantly impact your
          performance.
        </p>
        <p className="text-lg mb-4">
          Additionally, consider timing your meals around your workouts. Eating
          a small snack or meal 30 minutes to an hour before exercising can give
          you the energy boost you need. After your workout, aim to refuel
          within 30 minutes to maximize recovery. By paying attention to your
          nutrition, you can enhance your overall fitness experience and achieve
          your goals more effectively.
        </p>
      </div>
    </div>
  );
};

export default Nutrition_tip;
