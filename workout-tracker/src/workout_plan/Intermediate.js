import React from "react";
import { Link } from "react-router-dom";

function Intermediate() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
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

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-20">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Intermediate Workout Plan
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Take your fitness to the next level with balanced strength,
            endurance, and flexibility training.
          </p>
        </section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Goal:</h2>
        <p className="text-lg text-gray-700 mb-6">
          Improve overall fitness, increase muscle strength, and enhance
          cardiovascular endurance.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Schedule:</h2>
        <p className="text-lg text-gray-700 mb-6">
          4 days per week (e.g., Monday, Tuesday, Thursday, Saturday).
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Workout Routine:
        </h2>

        <div className="space-y-8">
          {/* Day 1: Upper Body Strength */}
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              Day 1: Upper Body Strength
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
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzk4RYbc4FdQP7-6Fz4oimmv2D3GReMs7Lpw&s"
                  alt="Dumbbell Rows"
                  className="w-full rounded-lg shadow-md"
                />
                <p className="mt-2 text-center text-gray-600">Dumbbell Rows</p>
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/3">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLySnMV93NmVnf5ljsCPv9UWBm8j5y3VCZeg&s"
                  alt="Shoulder Press"
                  className="w-full rounded-lg shadow-md"
                />
                <p className="mt-2 text-center text-gray-600">Shoulder Press</p>
              </div>
            </div>
            <p className="mt-4 text-gray-700">Warm-up: 5 mins light cardio</p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Push-Ups: 4 sets of 12 reps</li>
              <li>Dumbbell Rows: 4 sets of 10 reps per side</li>
              <li>Shoulder Press: 4 sets of 12 reps</li>
              <li>Plank Hold: 3 sets of 30 seconds</li>
            </ul>
          </div>

          {/* Day 2: Lower Body & Core */}
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              Day 2: Lower Body & Core
            </h3>
            <div className="flex flex-wrap gap-6 mt-4">
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
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUJXLptWfThHpzdztzryl3ZCB_gGDTDf2ooA&s"
                  alt="Russian Twists"
                  className="w-full rounded-lg shadow-md"
                />
                <p className="mt-2 text-center text-gray-600">Russian Twists</p>
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
            <p className="mt-4 text-gray-700">Warm-up: 5 mins light cardio</p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Lunges: 4 sets of 12 reps per leg</li>
              <li>Russian Twists: 4 sets of 15 reps per side</li>
              <li>Standing Knee Tucks: 4 sets of 15 reps per leg</li>
              <li>Bicycle Crunches: 3 sets of 20 reps</li>
            </ul>
          </div>

          {/* Day 3: Full Body Circuit */}
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              Day 3: Full Body Circuit
            </h3>
            <div className="flex flex-wrap gap-6 mt-4">
              <div className="w-full sm:w-1/2 lg:w-1/3">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_pO9n0phiCSu_cw3uN7vSyx5xxkEGlYKsag&s"
                  alt="Push-Ups"
                  className="w-full rounded-lg shadow-md"
                />
                <p className="mt-2 text-center text-gray-600">Push-Ups</p>
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/3">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIeOXfE_cs0MYl7GkmncUEr9CBQ_SnwhBpWQ&s"
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
                  alt="Burpees"
                  className="w-full rounded-lg shadow-md"
                />
                <p className="mt-2 text-center text-gray-600">Burpees</p>
              </div>
            </div>
            <p className="mt-4 text-gray-700">Warm-up: 5 mins light cardio</p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Push-Ups: 4 sets of 12 reps</li>
              <li>Bodyweight Squats: 4 sets of 15 reps</li>
              <li>Burpees: 3 sets of 10 reps</li>
              <li>Mountain Climbers: 3 sets of 30 seconds</li>
            </ul>
          </div>

          {/* Day 4: Flexibility & Recovery */}
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              Day 4: Flexibility & Recovery
            </h3>
            <p className="mt-4 text-gray-700">
              Full-body stretching and mobility exercises to enhance recovery.
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Quad Stretch: 3 sets of 30 seconds per leg</li>
              <li>Hamstring Stretch: 3 sets of 30 seconds per leg</li>
              <li>Shoulder Stretch: 3 sets of 30 seconds per arm</li>
              <li>Seated Forward Bend: 3 sets of 30 seconds</li>
              <li>Cat-Cow Stretch: 3 sets of 30 seconds</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intermediate;
