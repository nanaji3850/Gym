import React from "react";
// import { Link } from "react-router-dom";
import Layout from "../Layout";

const MuscleBuildingDiet = () => {
  return (
    <div className="p-8">
      <Layout>
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-20">
          <h1 className="text-3xl font-semibold text-center mb-6">
            Muscle Building (Hypertrophy) Diet Plan
          </h1>

          {/* Goal Section */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Goal</h2>
            <p className="text-lg">
              Build muscle mass by providing the body with the necessary
              nutrients and calories to promote hypertrophy and strength.
            </p>
          </section>

          {/* Diet Focus Section */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Diet Focus</h2>
            <p className="text-lg">
              High protein, moderate to high carbs, and healthy fats to fuel
              muscle growth and recovery.
            </p>
          </section>

          {/* Best Diet Plan Section */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Best Diet Plan</h2>
            <p className="text-lg">
              Calories: Slight calorie surplus (10-20% above maintenance) to
              support muscle growth.
            </p>

            {/* Macronutrients Section */}
            <h3 className="text-xl font-semibold mt-4">Macronutrients</h3>
            <ul className="list-disc ml-6 text-lg">
              <li>
                <strong>Protein:</strong> 1.6–2.2 grams per kg of body weight to
                support muscle repair and growth.
              </li>
              <li>
                <strong>Carbs:</strong> 40-50% of total calories to fuel
                workouts and recovery.
              </li>
              <li>
                <strong>Fats:</strong> 20-30% of total calories for hormone
                production and overall health.
              </li>
            </ul>
          </section>

          {/* Foods to Include Section */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Foods to Include</h2>
            <ul className="list-disc ml-6 text-lg">
              <li>Lean meats (chicken, turkey, beef)</li>
              <li>Fish (salmon, tuna)</li>
              <li>Whole grains (brown rice, oats, quinoa)</li>
              <li>Healthy fats (avocados, nuts, olive oil)</li>
              <li>Fruits and vegetables (spinach, berries, broccoli)</li>
              <li>Dairy (Greek yogurt, cottage cheese)</li>
            </ul>
          </section>

          {/* Sample Meal Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">Sample Meal</h2>
            <p className="text-lg">
              Grilled chicken breast, sweet potatoes, steamed broccoli, and a
              serving of quinoa with olive oil.
            </p>
          </section>

          {/* Placeholder for image */}
          <section className="mt-6">
            <div className="bg-gray-100 h-64 rounded-lg">
              {/* Add an image relevant to the diet plan */}
              <img
                src="https://zenaskitchen.com/wp-content/uploads/2022/01/Cajun-Chicken-Sweet-Potato-Bowls.jpg" // Replace with your actual image URL
                alt="Muscle building meal"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </section>
        </div>
      </Layout>
    </div>
  );
};

export default MuscleBuildingDiet;
