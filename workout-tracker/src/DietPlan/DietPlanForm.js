import React, { useState } from "react";
// import io from "socket.io-client";
import { marked } from "marked";

// const socket = io("http://localhost:8000");

function DietPlanForm() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "",
    goal: "",
    specificGoal: "",
    dietType: "",
    allergies: "",
    dislikes: "",
    medicalConditions: "",
    nutritionalNeeds: "",
    mealsPerDay: "",
    cookingHabits: "",
    budget: "",
    dailyDiet: "",
    eatingOutFrequency: "",
  });

  const [dietPlan, setDietPlan] = useState(null);

  //   useEffect(() => {
  //     // Listen for the diet plan emitted from the backend
  //     socket.on("diet_plan", (data) => {
  //       setDietPlan(data.diet_plan);
  //     });

  //     return () => {
  //       socket.off("diet_plan");
  //     };
  //   }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
          ? [...prevData[name], value]
          : prevData[name].filter((item) => item !== value),
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dietData = {
      age: formData.age,
      gender: formData.gender,
      height: formData.height,
      weight: formData.weight,
      activityLevel: formData.activityLevel,
      goal: formData.goal,
      specificGoal: formData.specificGoal,
      dietType: formData.dietType,
      allergies: formData.allergies,
      medicalConditions: formData.medicalConditions,
      dislikes: formData.dislikes,
      nutritionalNeeds: formData.nutritionalNeeds,
      mealsPerDay: formData.mealsPerDay,
      cookingHabits: formData.cookingHabits,
      budget: formData.budget,
      dailyDiet: formData.dailyDiet,
      eatingOutFrequency: formData.eatingOutFrequency,
    };

    try {
      const response = await fetch(
        "http://34.229.143.21:3000/submit_diet_info",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dietData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        // Set the workout plan from the response
        setDietPlan(result.diet_plan);
      } else {
        console.error("Error:", result.message);
      }
    } catch (error) {
      console.error("Error submitting fitness data:", error);
    }
  };

  return (
    <>
      <header className="bg-white shadow-md py-8 fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center px-4">
          <a href="#home" className="text-3xl font-bold text-orange-500">
            GymFluencer
          </a>

          {/* <nav className="hidden md:flex space-x-8 text-gray-700">
            <a href="#features" className="text-lg hover:text-orange-500">
              Features
            </a>
            <a href="#blog" className="text-lg hover:text-orange-500">
              Blog
            </a>
            <a href="#faqs" className="text-lg hover:text-orange-500">
              FAQs
            </a>
          </nav> */}

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 mt-20">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 space-y-8"
        >
          <h2 className="text-4xl font-bold text-center text-green-600">
            Personalized Diet Plan Form
          </h2>

          {/* Personal Details */}
          <section>
            <h3 className="text-2xl font-semibold text-green-600 mb-4">
              Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="number"
                name="height"
                placeholder="Height (cm)"
                value={formData.height}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="weight"
                placeholder="Weight (kg)"
                value={formData.weight}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Activity Level</option>
                <option value="Sedentary">Sedentary</option>
                <option value="Moderate">Moderate</option>
                <option value="Active">Active</option>
              </select>
            </div>
          </section>

          {/* Dietary Goals */}
          <section>
            <h3 className="text-2xl font-semibold text-green-600 mb-4">
              Dietary Goals
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <select
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Goal</option>
                <option value="Weight Loss">Weight Loss</option>
                <option value="Weight Gain">Weight Gain</option>
                <option value="Maintenance">Maintenance</option>
              </select>
              <input
                type="text"
                name="specificGoal"
                placeholder="Specific Goal (e.g., muscle gain)"
                value={formData.specificGoal}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </section>

          {/* Dietary Preferences and Restrictions */}
          <section>
            <h3 className="text-2xl font-semibold text-green-600 mb-4">
              Dietary Preferences and Restrictions
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <select
                name="dietType"
                value={formData.dietType}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Diet Type</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Keto">Keto</option>
              </select>
              <input
                type="text"
                name="allergies"
                placeholder="Food Allergies or Intolerances"
                value={formData.allergies}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="dislikes"
                placeholder="Foods You Dislike"
                value={formData.dislikes}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </section>

          {/* Health Information */}
          <section>
            <h3 className="text-2xl font-semibold text-green-600 mb-4">
              Health Information
            </h3>
            <input
              type="text"
              name="medicalConditions"
              placeholder="Medical Conditions (e.g., diabetes)"
              value={formData.medicalConditions}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="nutritionalNeeds"
              placeholder="Nutritional Needs (e.g., high protein)"
              value={formData.nutritionalNeeds}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
            />
          </section>

          {/* Meal and Lifestyle Preferences */}
          <section>
            <h3 className="text-2xl font-semibold text-green-600 mb-4">
              Meal and Lifestyle Preferences
            </h3>
            <input
              type="number"
              name="mealsPerDay"
              placeholder="Preferred Meals per Day"
              value={formData.mealsPerDay}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="cookingHabits"
              placeholder="Cooking Habits"
              value={formData.cookingHabits}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
            />
            <input
              type="text"
              name="budget"
              placeholder="Budget Considerations"
              value={formData.budget}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
            />
          </section>

          {/* Current Eating Habits */}
          <section>
            <h3 className="text-2xl font-semibold text-green-600 mb-4">
              Current Eating Habits
            </h3>
            <input
              type="text"
              name="dailyDiet"
              placeholder="Typical Daily Diet"
              value={formData.dailyDiet}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="eatingOutFrequency"
              placeholder="Frequency of Eating Out"
              value={formData.eatingOutFrequency}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
            />
          </section>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </form>

        <section>
          {dietPlan && (
            <div className="mt-6 p-4 bg-blue-100 rounded-lg">
              <h3 className="text-2xl font-bold text-blue-700">
                Your Diet Plan
              </h3>
              <div
                className="prose lg:prose-xl"
                dangerouslySetInnerHTML={{ __html: marked(dietPlan) }}
              ></div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default DietPlanForm;
