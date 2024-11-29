import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";

const WorkoutPlanPage = () => {
  const navigate = useNavigate();

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
      description:
        "Push your limits with high-intensity and complex movements.",
      route: "/advance",
    },
    {
      id: 4,
      name: "Personalized Workout Plan",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAPx6T1GvVTIXY9ARHGv9UFPN7057s2hh2yQ&s",
      description: "Create your own workout plan.",
      route: "/fitness-form",
    },
  ];

  const handleWorkoutPlanClick = (plan) => {
    navigate(plan.route);
  };
  // const handleGetStartedClick = () => {
  //   navigate("/get-started"); // Use navigate to go to GetStarted page
  // };

  return (
    <>
      <Layout>
        <div className="container mx-auto py-10 mt-40">
          <div className="w-full text-center relative">
            <h2 className="text-4xl font-extrabold mb-6 text-black shadow-md transition-transform duration-300 transform hover:scale-110">
              Select Your Workout Plan
            </h2>
            <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-24 h-1 bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 rounded-lg"></span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-20">
            {workoutPlans.map((plan) => (
              <div
                key={plan.id}
                className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-110 hover:shadow-2xl"
                onClick={() => handleWorkoutPlanClick(plan)}
              >
                {/* Image Section */}
                <img
                  src={plan.image}
                  alt={plan.name}
                  className="w-full h-56 object-cover"
                />
                {/* Overlay with Title and Description */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-90 hover:opacity-100 transition duration-300">
                  <div className="absolute bottom-0 p-6">
                    <h3 className="text-lg md:text-xl font-bold text-white">
                      {plan.name}
                    </h3>
                    <p className="text-sm md:text-base text-gray-200 mt-2">
                      {plan.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <section className="bg-white py-16 px-8 text-center shadow-md">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            Need More Help?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Contact us for any additional questions or support regarding the
            GymFluencer.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="bg-blue-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-700 transition-all"
          >
            Contact Support
          </button>
        </section>
        <footer className="bg-gray-800 text-white text-center py-4">
          <p>&copy; 2024 GymFluencer. All rights reserved.</p>
        </footer>
      </Layout>
    </>
  );
};

export default WorkoutPlanPage;
