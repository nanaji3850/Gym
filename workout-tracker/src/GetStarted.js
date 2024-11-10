import React from "react";
import { useNavigate, Link } from "react-router-dom";

const workouts = [
  {
    id: 1,
    name: "Push-ups",
    image:
      "https://media.istockphoto.com/id/586364084/photo/determined-athlete-doing-push-ups-on-kettlebells-in-gym.jpg?s=612x612&w=0&k=20&c=En8Pxj2KOYJxwBBV4woKANK2Ebc2aHLlAv5tuWHJOQg=",
    description: "A basic exercise for upper body strength.",
  },
  {
    id: 2,
    name: "Squats",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvzkl6y6AHZLERZNGtVzN_wdjpMrGOqw49mA&s",
    description: "A foundational exercise for lower body strength.",
  },
  {
    id: 3,
    name: "Pull-ups",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQVjFKa3taZj-3WVotzOAYYNoUwFOg3HCcCg&s",
    description: "An effective exercise for upper body and back strength.",
  },
  {
    id: 4,
    name: "Deadlifts",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLOVRiUCTOpkH1GfM22mwgA03n2kZ_y-KxYA&s",
    description: "A compound movement that works the entire body.",
  },
  {
    id: 5,
    name: "Bicep Curls",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS53lOaga9uHgA5r2YLmhtXEL8CU39P_Tv1QQ&s",
    description: "Isolate your biceps for defined arms.",
  },
];

const workoutPlans = [
  {
    id: 1,
    name: "Beginner",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHBLpMaM0cwiaCTG1ZKxzia7GXrr7-bmfaLQ&s",
    description:
      "Start your fitness journey with simple and effective exercises.",
    route: "/beginner",
  },
  {
    id: 2,
    name: "Intermediate",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5ytMdrI3oiPtu0dXcLsENZ3VV2TpfqlNSRA&s",
    description: "Level up your fitness with more challenging exercises.",
    route: "/intermediate",
  },
  {
    id: 3,
    name: "Advanced",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2j3FlywArG-w5c83YYwzI4tv19K-yLPmI5g&s",
    description: "Push your limits with high-intensity and complex movements.",
    route: "/advance",
  },
  {
    id: 4,
    name: "personalized workout plan",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAPx6T1GvVTIXY9ARHGv9UFPN7057s2hh2yQ&s",
    description: "Create your own workout plan",
    route: "/fitness-form",
  },
];

function GetStarted() {
  const navigate = useNavigate();

  const handleWorkoutClick = (workout) => {
    navigate(`/workout_analysis/${workout.id}`, {
      state: { workoutType: workout.name },
    });
  };

  // Handle the click event to navigate to the respective workout plan page
  const handleWorkoutPlanClick = (plan) => {
    navigate(plan.route); // Navigate based on the route defined in the plan object
  };

  return (
    <>
      <header className="bg-white shadow-md py-8 fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center px-4">
          <a href="#home" className="text-3xl font-bold text-orange-500">
            {/* Use Link component for navigation */}
            <Link to="/" className="text-3xl font-bold text-orange-500">
              GymFluencer
            </Link>
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

      <div className="hero-section1 bg-cover bg-center h-screen flex flex-col items-center justify-center text-black text-center pt-16">
        <h1 className="text-4xl md:text-5xl font-bold">
          Track Your Fitness Journey
        </h1>
        <p className="text-lg md:text-xl max-w-lg mt-4 font-bold">
          Discover the ultimate fitness companion with GymFluencer. Effortlessly
          log your workouts, count reps, and track calories burned. Stay
          motivated and achieve your goals with our user-friendly interface.
        </p>
      </div>

      <div className="container mx-auto py-10 mt-10">
        <h2 className="text-4xl font-bold text-center mb-6">
          Select Your Workout
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className="border rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-200"
              onClick={() => handleWorkoutClick(workout)}
            >
              <img
                src={workout.image}
                alt={workout.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold">{workout.name}</h3>
                <p className="text-gray-600">{workout.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workout Plan Section */}
      {/* Workout Plan Section */}
      <div className="container mx-auto py-10 mt-10">
        <h2 className="text-4xl font-bold text-center mb-6">
          Select Your Workout Plan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {workoutPlans.map((plan) => (
            <div
              key={plan.id}
              className="border rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-200"
              onClick={() => handleWorkoutPlanClick(plan)}
            >
              <img
                src={plan.image}
                alt={plan.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="text-gray-600">{plan.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; 2024 GymFluencer. All rights reserved.</p>
      </footer>
    </>
  );
}

export default GetStarted;
