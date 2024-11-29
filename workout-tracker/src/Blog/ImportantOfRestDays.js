import React from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout";
const Nutrition_tip = () => {
  return (
    <div className="container mx-auto p-6">
      <Layout>
        {/* Full Image without cropping */}
        <div className="mb-8 mt-20">
          <img
            src="https://getswoly.com/cdn/shop/articles/taking-creatine-on-rest-days_jpeg_e7dad73f-7994-4bb8-83d4-65d6d2b53628_1200x.jpg?v=1709945222"
            alt="Placeholder for Article"
            className="w-full object-contain h-96" // Adjusts image to show full height without cropping
          />
        </div>

        {/* Article Content */}
        <div className="mb-12">
          {/* Large, bold heading */}
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            The Importance of Rest Days
          </h1>

          <p className="text-lg mb-4">
            Many fitness enthusiasts often overlook the importance of rest days,
            believing that more workouts equate to better results. However, rest
            days are crucial for recovery and overall performance. In this
            article, we will delve into the significance of taking time off from
            intense workouts and how it can benefit your fitness journey.
          </p>
          <p className="text-lg mb-4">
            When you exercise, your muscles undergo stress and tiny tears, which
            is a natural part of building strength. Rest days allow your muscles
            to repair and grow, ultimately leading to improved performance.
            Without adequate rest, you risk overtraining, which can lead to
            fatigue, decreased motivation, and even injury. Listening to your
            body and recognizing when it needs a break is vital for long-term
            success.
          </p>
          <p className="text-lg mb-4">
            Incorporating active recovery on rest days, such as light stretching
            or yoga, can also be beneficial. These activities promote blood flow
            and help alleviate muscle soreness without putting additional strain
            on your body. Remember, rest is not a sign of weakness; it’s an
            essential component of a balanced fitness routine that will help you
            achieve your goals sustainably.
          </p>
        </div>
      </Layout>
    </div>
  );
};

export default Nutrition_tip;
