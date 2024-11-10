import React from "react";
import { Link } from "react-router-dom";

const WorkoutRoutinesArticle = () => {
  return (
    <div className="container mx-auto p-6">
      <header className="bg-white shadow-md py-8 fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Left Side: Logo */}
          <a href="#home" className="text-3xl font-bold text-orange-500">
            {/* Use Link component for navigation */}
            <Link to="/" className="text-3xl font-bold text-orange-500">
              GymFluencer
            </Link>
          </a>

          {/* Right Side: Buttons */}
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
      {/* Full Image without cropping */}
      <div className="mb-8 mt-20">
        <img
          src="https://10web-site.ai/125/wp-content/uploads/sites/137/2024/11/tenweb_media_IQWyOeZD.webp"
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
          Starting a fitness journey can be daunting, especially for beginners.
          It’s essential to find a workout routine that is both effective and
          enjoyable. In this article, we will explore five beginner-friendly
          workout routines that can help you build a solid foundation. Each
          routine is designed to be simple yet impactful, ensuring you stay
          motivated and engaged.
        </p>
        <p className="text-lg mb-4">
          The first routine focuses on bodyweight exercises, which are perfect
          for those who may not have access to a gym. Exercises like push-ups,
          squats, and lunges can be performed anywhere and require no equipment.
          This routine helps build strength and endurance while allowing you to
          learn proper form and technique. As you progress, you can increase the
          number of repetitions or add variations to keep things interesting.
        </p>
        <p className="text-lg mb-4">
          Another great option is a low-impact cardio routine that includes
          activities like walking, cycling, or swimming. These exercises are
          gentle on the joints and can be easily adjusted to match your fitness
          level. Incorporating cardio into your routine not only improves
          cardiovascular health but also aids in weight management. Remember,
          consistency is key, and finding activities you enjoy will make it
          easier to stick with your fitness goals.
        </p>
      </div>
    </div>
  );
};

export default WorkoutRoutinesArticle;
