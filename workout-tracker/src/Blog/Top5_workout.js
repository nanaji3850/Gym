import React from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout";

const WorkoutRoutinesArticle = () => {
  return (
    <div className="container mx-auto p-6">
      <Layout>
        {/* Full Image without cropping */}
        <div className="mb-8 mt-20">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsDa01O-L6xtrqpmSi-SXi1IKA20XBco2zEQ&s"
            alt="Placeholder for Workout Article"
            className="w-full object-contain h-96" // Ensures full image is displayed
          />
        </div>

        {/* Article Content */}
        <div className="mb-12">
          {/* Large, bold heading */}
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Top 5 Workout Routines for Beginners
          </h1>
          <p className="text-gray-600 mb-2">November 4, 2024</p>
          <p className="text-lg mb-4">
            Starting a fitness journey can be daunting, especially for
            beginners. It’s essential to find a workout routine that is both
            effective and enjoyable. In this article, we will explore five
            beginner-friendly workout routines that can help you build a solid
            foundation. Each routine is designed to be simple yet impactful,
            ensuring you stay motivated and engaged.
          </p>
          <p className="text-lg mb-4">
            The first routine focuses on bodyweight exercises, which are perfect
            for those who may not have access to a gym. Exercises like push-ups,
            squats, and lunges can be performed anywhere and require no
            equipment. This routine helps build strength and endurance while
            allowing you to learn proper form and technique. As you progress,
            you can increase the number of repetitions or add variations to keep
            things interesting.
          </p>
          <p className="text-lg mb-4">
            Another great option is a low-impact cardio routine that includes
            activities like walking, cycling, or swimming. These exercises are
            gentle on the joints and can be easily adjusted to match your
            fitness level. Incorporating cardio into your routine not only
            improves cardiovascular health but also aids in weight management.
            Remember, consistency is key, and finding activities you enjoy will
            make it easier to stick with your fitness goals.
          </p>
        </div>
      </Layout>
    </div>
  );
};

export default WorkoutRoutinesArticle;
