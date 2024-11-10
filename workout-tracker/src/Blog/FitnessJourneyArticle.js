import React from "react";
import { Link } from "react-router-dom";
const FitnessJourneyArticle = () => {
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
          src="https://10web-site.ai/125/wp-content/uploads/sites/137/2024/11/tenweb_media_CEKoHRGh.webp"
          alt="Placeholder for Article"
          className="w-full object-contain h-96" // Adjusts image to show full height without cropping
        />
      </div>

      {/* Article Content */}
      <div className="mb-12">
        {/* Large, bold heading */}
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          How to Stay Motivated on Your Fitness Journey
        </h1>

        <p className="text-lg mb-4">
          Staying motivated on your fitness journey can be challenging,
          especially when faced with obstacles or plateaus. However, finding
          ways to keep your enthusiasm alive is essential for long-term success.
          In this article, we will discuss several strategies that can help you
          stay motivated and committed to your fitness goals.
        </p>
        <p className="text-lg mb-4">
          Setting realistic and achievable goals is a great starting point.
          Break down your larger goals into smaller, manageable milestones that
          you can celebrate along the way. This approach not only makes your
          goals feel more attainable but also provides a sense of accomplishment
          as you progress. Additionally, tracking your workouts and progress
          using our app can serve as a constant reminder of how far you’ve come.
        </p>
        <p className="text-lg mb-4">
          Another effective strategy is to find a workout buddy or join a
          fitness community. Exercising with others can provide accountability
          and encouragement, making workouts more enjoyable. Sharing your
          journey with like-minded individuals can also inspire you to push
          through tough days. Remember, motivation can ebb and flow, but by
          implementing these strategies, you can create a sustainable fitness
          routine that keeps you engaged and excited.
        </p>
      </div>
    </div>
  );
};

export default FitnessJourneyArticle;
