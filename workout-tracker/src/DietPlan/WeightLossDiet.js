import React from "react";
import { Link } from "react-router-dom";

const WeightLossDiet = () => {
  return (
    <div className="p-8">
      <header className="bg-white shadow-md py-8 fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Use Link component for navigation */}
          <Link
            to="/"
            className="text-3xl font-extrabold text-black-500 shadow-md transition-transform duration-300 transform hover:scale-110"
          >
            GymFluencer
          </Link>

          <nav className="hidden md:flex space-x-8 text-gray-700 bg-white shadow-lg p-4 rounded-lg font-semibold">
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

          <div className="space-x-4">
            <button className="px-6 py-2 bg-green-600 rounded-full border-2 border-white text-white shadow-lg hover:bg-green-400 hover:shadow-xl">
              Download Now
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-20">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Weight Loss Diet Plan
        </h1>

        {/* Goal Section */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Goal</h2>
          <p className="text-lg">
            Lose fat and reduce body weight while maintaining muscle mass.
          </p>
        </section>

        {/* Diet Focus Section */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Diet Focus</h2>
          <p className="text-lg">
            High protein, moderate carbs, and healthy fats.
          </p>
        </section>

        {/* Best Diet Plan Section */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Best Diet Plan</h2>
          <p className="text-lg">
            Calories: Slight calorie deficit (20-30% less than maintenance).
          </p>

          {/* Macronutrients Section */}
          <h3 className="text-xl font-semibold mt-4">Macronutrients</h3>
          <ul className="list-disc ml-6 text-lg">
            <li>
              <strong>Protein:</strong> 1.6–2.2 grams per kg of body weight.
            </li>
            <li>
              <strong>Carbs:</strong> 30-40% of total calories.
            </li>
            <li>
              <strong>Fats:</strong> 20-30% of total calories.
            </li>
          </ul>
        </section>

        {/* Foods to Include Section */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Foods to Include</h2>
          <ul className="list-disc ml-6 text-lg">
            <li>Lean meats (chicken, turkey)</li>
            <li>Fish</li>
            <li>Leafy greens</li>
            <li>Low-glycemic carbs (sweet potatoes, brown rice)</li>
            <li>Healthy fats (avocados, nuts, olive oil)</li>
          </ul>
        </section>

        {/* Sample Meal Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">Sample Meal</h2>
          <p className="text-lg">
            Grilled chicken breast, quinoa, and broccoli with olive oil.
          </p>
        </section>

        {/* Placeholder for image */}
        <section className="mt-6">
          <div className="bg-gray-100 h-64 rounded-lg">
            {/* Add an image relevant to the diet plan */}
            <img
              src="https://i.pinimg.com/originals/34/16/ee/3416ee87f5a488ce4583cc8b7ec4cf76.png" // Replace with your actual image URL
              alt="Grilled chicken breast, quinoa, and broccoli"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default WeightLossDiet;
