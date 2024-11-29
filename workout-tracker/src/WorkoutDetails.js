import React from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout"; // Import Layout

const WorkoutDetails = () => {
  const { planId } = useParams();
  const workoutPlans = JSON.parse(localStorage.getItem("workoutPlans")) || [];
  const selectedPlan = workoutPlans[parseInt(planId, 10)];

  return (
    <Layout>
      {" "}
      {/* Wrap the content with Layout */}
      <div className="min-h-screen bg-gray-100 flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold text-gray-800">
              Workout Plan Details
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Detailed information for your selected workout plan.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            {selectedPlan ? (
              <pre className="whitespace-pre-wrap break-words text-sm text-gray-700">
                {selectedPlan}
              </pre>
            ) : (
              <p className="text-lg font-medium text-red-600">
                No workout plan found for the selected ID.
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WorkoutDetails;
