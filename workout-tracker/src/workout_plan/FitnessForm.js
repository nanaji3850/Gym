import React, { useState } from "react";
// import io from "socket.io-client";
import { marked } from "marked";
// import { Link } from "react-router-dom";
import Layout from "../Layout";

// const socket = io("http://localhost:8000");
function FitnessForm() {
  const [formData, setFormData] = useState({
    goals: [],
    focusAreas: [],
    fitnessLevel: "",
    exerciseExperience: [],
    activityLevel: "",
    age: "",
    height: "",
    weight: "",
    injuries: "",
    medicalConditions: "",
    workoutTypes: [],
    workoutSetting: "",
    daysAvailable: [],
  });

  const [workoutPlan, setWorkoutPlan] = useState(null);
  const username = localStorage.getItem("username");

  // useEffect(() => {
  //   // Listen for the workout plan emitted from the backend
  //   socket.on("workout_plan", (data) => {
  //     setWorkoutPlan(data.workout_plan);
  //   });

  //   return () => {
  //     socket.off("workout_plan");
  //   };
  // }, []);

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

    const fitnessData = {
      goals: formData.goals,
      focusAreas: formData.focusAreas,
      fitnessLevel: formData.fitnessLevel,
      exerciseExperience: formData.exerciseExperience,
      activityLevel: formData.activityLevel,
      age: formData.age,
      height: formData.height,
      weight: formData.weight,
      injuries: formData.injuries,
      medicalConditions: formData.medicalConditions,
      workoutTypes: formData.workoutTypes,
      workoutSetting: formData.workoutSetting,
      equipment: formData.equipment,
      daysAvailable: formData.daysAvailable,
      timePerSession: formData.timePerSession,
      bestTime: formData.bestTime,
      intensityLevel: formData.intensityLevel,
      progressionPreference: formData.progressionPreference,
      timestamp: new Date().toISOString(),
    };
    const data = { ...fitnessData, username };

    try {
      const response = await fetch(
        "https://gym.birlaventures.com:8000/submit_fitness_info",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      if (response.ok) {
        // Set the workout plan from the response
        setWorkoutPlan(result.workout_plan);
      } else {
        console.error("Error:", result.message);
      }
    } catch (error) {
      console.error("Error submitting fitness data:", error);
    }
  };

  return (
    <>
      <Layout>
        <div className="min-h-screen flex justify-center items-center bg-blue-100 p-6 mt-20">
          <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
              Personalized Workout Plan Form
            </h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* 1. User’s Fitness Goals */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-blue-600">
                  1. Fitness Goals
                </h3>
                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Primary Goals:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                    {[
                      "Weight Loss",
                      "Muscle Gain",
                      "Endurance",
                      "Flexibility",
                      "Overall Fitness",
                    ].map((goal) => (
                      <label key={goal} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="goals"
                          value={goal}
                          onChange={handleChange}
                          className="mr-2 text-blue-600"
                        />
                        {goal}
                      </label>
                    ))}
                  </div>
                </div>

                <label className="block text-lg font-medium text-gray-700 mt-4">
                  Specific Areas of Focus:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                  {["Upper Body", "Lower Body", "Core", "Full Body"].map(
                    (focus) => (
                      <label key={focus} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="focusAreas"
                          value={focus}
                          onChange={handleChange}
                          className="mr-2 text-blue-600"
                        />
                        {focus}
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* 2. Current Fitness Level */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-blue-600">
                  2. Current Fitness Level
                </h3>
                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Fitness Level:
                  </label>
                  <div className="flex gap-6 mt-2">
                    {["Beginner", "Intermediate", "Advanced"].map((level) => (
                      <label key={level} className="inline-flex items-center">
                        <input
                          type="radio"
                          name="fitnessLevel"
                          value={level}
                          onChange={handleChange}
                          className="mr-2 text-blue-600"
                        />
                        {level}
                      </label>
                    ))}
                  </div>
                </div>

                <label className="block text-lg font-medium text-gray-700 mt-4">
                  Exercise Experience:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                  {["Squats", "Push-Ups", "Cardio Machines", "Others"].map(
                    (exercise) => (
                      <label
                        key={exercise}
                        className="inline-flex items-center"
                      >
                        <input
                          type="checkbox"
                          name="exerciseExperience"
                          value={exercise}
                          onChange={handleChange}
                          className="mr-2 text-blue-600"
                        />
                        {exercise}
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* 3. Physical Measurements and Health Info */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-blue-600">
                  3. Physical Measurements and Health Info
                </h3>
                <label className="block text-lg font-medium text-gray-700">
                  Age:
                </label>
                <input
                  type="number"
                  name="age"
                  onChange={handleChange}
                  className="w-full p-3 mt-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />

                <label className="block text-lg font-medium text-gray-700 mt-4">
                  Height:
                </label>
                <input
                  type="text"
                  name="height"
                  onChange={handleChange}
                  className="w-full p-3 mt-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />

                <label className="block text-lg font-medium text-gray-700 mt-4">
                  Weight:
                </label>
                <input
                  type="text"
                  name="weight"
                  onChange={handleChange}
                  className="w-full p-3 mt-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />

                <label className="block text-lg font-medium text-gray-700 mt-4">
                  Injuries or Physical Limitations:
                </label>
                <textarea
                  name="injuries"
                  onChange={handleChange}
                  className="w-full p-3 mt-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                ></textarea>

                <label className="block text-lg font-medium text-gray-700 mt-4">
                  Medical Conditions:
                </label>
                <textarea
                  name="medicalConditions"
                  onChange={handleChange}
                  className="w-full p-3 mt-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                ></textarea>
              </div>

              {/* 4. Workout Preferences */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-blue-600">
                  4. Workout Preferences
                </h3>
                <label className="block text-lg font-medium text-gray-700">
                  Preferred Workout Types:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                  {[
                    "Strength Training",
                    "Cardio",
                    "Yoga",
                    "HIIT",
                    "Bodyweight",
                  ].map((type) => (
                    <label key={type} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="workoutTypes"
                        value={type}
                        onChange={handleChange}
                        className="mr-2 text-blue-600"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              {/* 5. Schedule and Time Availability */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-blue-600">
                  5. Schedule and Time Availability
                </h3>
                <label className="block text-lg font-medium text-gray-700">
                  Days Available for Workouts:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((day) => (
                    <label key={day} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="daysAvailable"
                        value={day}
                        onChange={handleChange}
                        className="mr-2 text-blue-600"
                      />
                      {day}
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Submit
              </button>
            </form>

            {workoutPlan && (
              <div className="mt-6 p-4 bg-green-100 rounded-lg">
                <h3 className="text-2xl font-bold text-green-700">
                  Your Workout Plan
                </h3>
                {/* Render HTML content safely using dangerouslySetInnerHTML */}
                <div
                  className="prose lg:prose-xl"
                  dangerouslySetInnerHTML={{ __html: marked(workoutPlan) }}
                ></div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}

export default FitnessForm;
