import React from "react";
// import { Link } from "react-router-dom";
import Layout from "../Layout";

function Beginner() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <Layout>
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-20">
          <section className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900">
              Beginner Workout Plan
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Build basic strength, improve mobility, and establish workout
              consistency.
            </p>
          </section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Goal:</h2>
          <p className="text-lg text-gray-700 mb-6">
            Build basic strength, improve mobility, and establish workout
            consistency.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Schedule:
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            3 days per week (e.g., Monday, Wednesday, Friday).
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Workout Routine:
          </h2>

          <div className="space-y-8">
            {/* Day 1: Full Body */}
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                Day 1: Full Body (Strength & Core)
              </h3>
              <div className="flex flex-wrap gap-6 mt-4">
                <div className="w-full sm:w-1/2 lg:w-1/3">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_pO9n0phiCSu_cw3uN7vSyx5xxkEGlYKsag&s"
                    alt="Push Ups"
                    className="w-full rounded-lg shadow-md"
                  />
                  <p className="mt-2 text-center text-gray-600">Push-Ups</p>
                </div>
                <div className="w-full sm:w-1/2 lg:w-1/3">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLySnMV93NmVnf5ljsCPv9UWBm8j5y3VCZeg&s"
                    alt="Bodyweight Squats"
                    className="w-full rounded-lg shadow-md"
                  />
                  <p className="mt-2 text-center text-gray-600">
                    Bodyweight Squats
                  </p>
                </div>
                <div className="w-full sm:w-1/2 lg:w-1/3">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQHZ0t9_LjbSRvnoE8VrlAa0ljaL4ulx2WTw&s"
                    alt="Glute Bridges"
                    className="w-full rounded-lg shadow-md"
                  />
                  <p className="mt-2 text-center text-gray-600">
                    Glute Bridges
                  </p>
                </div>
              </div>
              <p className="mt-4 text-gray-700">
                Warm-up: 5 mins brisk walk or light jog
              </p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Push-Ups: 3 sets of 8-10 reps (kneeling if needed)</li>
                <li>Bodyweight Squats: 3 sets of 12 reps</li>
                <li>Glute Bridges: 3 sets of 12 reps</li>
                <li>Plank Hold: 3 sets of 20 seconds</li>
                <li>Mountain Climbers: 3 sets of 15 seconds</li>
              </ul>
            </div>

            {/* Day 2: Cardio & Core */}
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                Day 2: Cardio & Core
              </h3>
              <div className="flex flex-wrap gap-6 mt-4">
                <div className="w-full sm:w-1/2 lg:w-1/3">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUJXLptWfThHpzdztzryl3ZCB_gGDTDf2ooA&s"
                    alt="Jump Rope"
                    className="w-full rounded-lg shadow-md"
                  />
                  <p className="mt-2 text-center text-gray-600">Jump Rope</p>
                </div>
                <div className="w-full sm:w-1/2 lg:w-1/3">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzk4RYbc4FdQP7-6Fz4oimmv2D3GReMs7Lpw&s"
                    alt="Russian Twists"
                    className="w-full rounded-lg shadow-md"
                  />
                  <p className="mt-2 text-center text-gray-600">
                    Russian Twists
                  </p>
                </div>
                <div className="w-full sm:w-1/2 lg:w-1/3">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6LmcdVcMB_dUlEfStwXnYpA6yCm32VxmWYA&s"
                    alt="Bicycle Crunches"
                    className="w-full rounded-lg shadow-md"
                  />
                  <p className="mt-2 text-center text-gray-600">
                    Bicycle Crunches
                  </p>
                </div>
              </div>
              <p className="mt-4 text-gray-700">
                Warm-up: 5 mins brisk walk or light jog
              </p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Jump Rope: 3 sets of 30 seconds</li>
                <li>
                  Russian Twists: 3 sets of 15 reps per side (holding light
                  weight if available)
                </li>
                <li>Standing Knee Tucks: 3 sets of 15 reps per leg</li>
                <li>Bicycle Crunches: 3 sets of 15 reps</li>
              </ul>
            </div>

            {/* Day 3: Strength & Flexibility */}
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                Day 3: Strength & Flexibility
              </h3>
              <div className="flex flex-wrap gap-6 mt-4">
                <div className="w-full sm:w-1/2 lg:w-1/3">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2ejQwT7LooBI3lud5oa0YsBzDm8mYjfiiZA&s"
                    alt="Wall Push Ups"
                    className="w-full rounded-lg shadow-md"
                  />
                  <p className="mt-2 text-center text-gray-600">
                    Wall Push-Ups
                  </p>
                </div>
                <div className="w-full sm:w-1/2 lg:w-1/3">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqFJPlo6s6vepqP6_FrCiK74Zauekclwg3xA&s"
                    alt="Lunges"
                    className="w-full rounded-lg shadow-md"
                  />
                  <p className="mt-2 text-center text-gray-600">Lunges</p>
                </div>
                <div className="w-full sm:w-1/2 lg:w-1/3">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIeOXfE_cs0MYl7GkmncUEr9CBQ_SnwhBpWQ&s"
                    alt="Superman Exercise"
                    className="w-full rounded-lg shadow-md"
                  />
                  <p className="mt-2 text-center text-gray-600">
                    Superman Exercise
                  </p>
                </div>
              </div>
              <p className="mt-4 text-gray-700">
                Warm-up: 5 mins brisk walk or light jog
              </p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Wall Push-Ups: 3 sets of 10 reps</li>
                <li>Lunges: 3 sets of 10 reps per leg</li>
                <li>Standing Calf Raises: 3 sets of 15 reps</li>
                <li>Superman Exercise: 3 sets of 15 seconds</li>
                <li>Stretching: 10-15 mins of full-body stretching</li>
              </ul>
            </div>
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-600">
          <p>&copy; 2024 GymFluencer. All rights reserved.</p>
        </footer>
      </Layout>
    </div>
  );
}

export default Beginner;
