import React from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout";
const FitnessJourneyArticle = () => {
  return (
    <div className="container mx-auto p-6">
      <Layout>
        {/* Full Image without cropping */}
        <div className="mb-8 mt-20">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToPQe7e6RG8pstfMwQTjGXTfPBSGI-c89PxA&s"
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
            ways to keep your enthusiasm alive is essential for long-term
            success. In this article, we will discuss several strategies that
            can help you stay motivated and committed to your fitness goals.
          </p>
          <p className="text-lg mb-4">
            Setting realistic and achievable goals is a great starting point.
            Break down your larger goals into smaller, manageable milestones
            that you can celebrate along the way. This approach not only makes
            your goals feel more attainable but also provides a sense of
            accomplishment as you progress. Additionally, tracking your workouts
            and progress using our app can serve as a constant reminder of how
            far you’ve come.
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
      </Layout>
    </div>
  );
};

export default FitnessJourneyArticle;
