import React from "react";

const WeightLossDiet = () => {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
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
