import React from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout";

function Advanced() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <Layout>
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-20">
          <section className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900">
              Advanced Workout Plan
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Push your limits with an intense workout routine designed for
              advanced fitness enthusiasts.
            </p>
          </section>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Goal:</h2>
          <p className="text-lg text-gray-700 mb-6">
            Build muscle strength, endurance, and improve athletic performance.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Schedule:
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            5 days per week (e.g., Monday, Wednesday, Friday, Saturday, Sunday).
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Workout Routine:
          </h2>

          <div className="space-y-8">
            {/* Day 1: Upper Body Power */}
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                Day 1: Upper Body Power
              </h3>
              <div className="flex flex-wrap gap-6 mt-4">
                <div className="w-full sm:w-1/2 lg:w-1/3">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpp3YsDeKwzA4TxsxZ62IREr1ns4LZAGojvA&s"
                    alt="Weighted Pull-Ups"
                    className="w-full rounded-lg shadow-md"
                  />
                  <p className="mt-2 text-center text-gray-600">
                    Weighted Pull-Ups
                  </p>
                </div>
                <div className="w-full sm:w-1/2 lg:w-1/3">
                  <img
                    src="https://thumbs.dreamstime.com/b/middle-aged-woman-doing-bench-press-gym-332563532.jpg"
                    alt="Bench Press"
                    className="w-full rounded-lg shadow-md"
                  />
                  <p className="mt-2 text-center text-gray-600">Bench Press</p>
                </div>
                <div className="w-full sm:w-1/2 lg:w-1/3">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx8kWCm7-Gch2w9CgrGGL6WroAC1ZQHf1tjg&s"
                    alt="Overhead Shoulder Press"
                    className="w-full rounded-lg shadow-md"
                  />
                  <p className="mt-2 text-center text-gray-600">
                    Overhead Shoulder Press
                  </p>
                </div>
              </div>
              <p className="mt-4 text-gray-700">
                Warm-up: 10 mins dynamic stretching
              </p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Weighted Pull-Ups: 5 sets of 8 reps</li>
                <li>Bench Press: 4 sets of 8 reps</li>
                <li>Overhead Shoulder Press: 4 sets of 10 reps</li>
                <li>Tricep Dips: 4 sets of 12 reps</li>
              </ul>
            </div>

            {/* Day 2: Lower Body Power */}
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                Day 2: Lower Body Power
              </h3>
              <div className="flex flex-wrap gap-6 mt-4">
                <div className="w-full sm:w-1/2 lg:w-1/3">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR47BmGuYDYlDeFlB314ZiRAw6OzSrRlCVNsw&s"
                    alt="Barbell Squats"
                    className="w-full rounded-lg shadow-md"
                  />
                  <p className="mt-2 text-center text-gray-600">
                    Barbell Squats
                  </p>
                </div>
                <div className="w-full sm:w-1/2 lg:w-1/3">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCqsTLqWhn_7ueJcU0y6fG_ciDWyfF7FONDA&s"
                    alt="Deadlifts"
                    className="w-full rounded-lg shadow-md"
                  />
                  <p className="mt-2 text-center text-gray-600">Deadlifts</p>
                </div>
                <div className="w-full sm:w-1/2 lg:w-1/3">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7PzWSxzFHddRlPyjCct_q2Gkgi6RiVM4TrA&s"
                    alt="Bulgarian Split Squats"
                    className="w-full rounded-lg shadow-md"
                  />
                  <p className="mt-2 text-center text-gray-600">
                    Bulgarian Split Squats
                  </p>
                </div>
              </div>
              <p className="mt-4 text-gray-700">
                Warm-up: 10 mins of light jogging
              </p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Barbell Squats: 5 sets of 6 reps</li>
                <li>Deadlifts: 5 sets of 5 reps</li>
                <li>Bulgarian Split Squats: 4 sets of 8 reps per leg</li>
                <li>Calf Raises: 4 sets of 15 reps</li>
              </ul>
            </div>

            {/* Day 3: Functional Circuit */}
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                Day 3: Functional Circuit
              </h3>
              <div className="flex flex-wrap gap-6 mt-4">
                <div className="w-full sm:w-1/2 lg:w-1/3">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0JB9Vb83V_gEmD2nL27UtmoLa8C_FmrCTzQ&s"
                    alt="Battle Ropes"
                    className="w-full rounded-lg shadow-md"
                  />
                  <p className="mt-2 text-center text-gray-600">Battle Ropes</p>
                </div>
                <div className="w-full sm:w-1/2 lg:w-1/3">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0ZP4bvuPBa2IJwQTNHyKNiSciqrNfhF5qHQ&s"
                    alt="Box Jumps"
                    className="w-full rounded-lg shadow-md"
                  />
                  <p className="mt-2 text-center text-gray-600">Box Jumps</p>
                </div>
                <div className="w-full sm:w-1/2 lg:w-1/3">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1fQr2xX7ciZAKZH_ZKUnQ_oa6BNNFUqBosg&s"
                    alt="Kettlebell Swings"
                    className="w-full rounded-lg shadow-md"
                  />
                  <p className="mt-2 text-center text-gray-600">
                    Kettlebell Swings
                  </p>
                </div>
              </div>
              <p className="mt-4 text-gray-700">Warm-up: 5 mins jump rope</p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Battle Ropes: 4 sets of 45 seconds</li>
                <li>Box Jumps: 4 sets of 15 reps</li>
                <li>Kettlebell Swings: 4 sets of 20 reps</li>
                <li>Burpees: 3 sets of 20 reps</li>
              </ul>
            </div>

            {/* Day 4: Core & Conditioning */}
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                Day 4: Core & Conditioning
              </h3>
              <div className="flex flex-wrap gap-6 mt-4">
                <div className="w-full sm:w-1/2 lg:w-1/3">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQubZsNmHvlBQNAvt8r3ZDhc0SHbVyC8wBo_g&s"
                    alt="Hanging Leg Raises"
                    className="w-full rounded-lg shadow-md"
                  />
                  <p className="mt-2 text-center text-gray-600">
                    Hanging Leg Raises
                  </p>
                </div>
                <div className="w-full sm:w-1/2 lg:w-1/3">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOo2DIU1JDHO7ZuAk9Kf-rvP2Hn6zXG1B4DA&s"
                    alt="Russian Twists"
                    className="w-full rounded-lg shadow-md"
                  />
                  <p className="mt-2 text-center text-gray-600">
                    Russian Twists
                  </p>
                </div>
                <div className="w-full sm:w-1/2 lg:w-1/3">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN0iWW8eHewLHcBNX454mmXhtYLGWTcraaWg&s"
                    alt="Bicycle Crunches"
                    className="w-full rounded-lg shadow-md"
                  />
                  <p className="mt-2 text-center text-gray-600">
                    Bicycle Crunches
                  </p>
                </div>
              </div>
              <ul className="list-disc pl-6 text-gray-700 mt-4">
                <li>Hanging Leg Raises: 4 sets of 12 reps</li>
                <li>Russian Twists: 4 sets of 20 reps</li>
                <li>Bicycle Crunches: 4 sets of 20 reps</li>
                <li>Plank: 4 sets of 1 minute</li>
              </ul>
            </div>

            {/* Cool-down */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Cool-down:
              </h2>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Quad Stretch: 3 sets of 30 seconds per leg</li>
                <li>Hamstring Stretch: 3 sets of 30 seconds per leg</li>
                <li>Seated Forward Bend: 3 sets of 30 seconds</li>
                <li>Cat-Cow Stretch: 3 sets of 30 seconds</li>
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Advanced;
