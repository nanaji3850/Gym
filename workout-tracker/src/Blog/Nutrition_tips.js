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
            src="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/rockcms/2024-06/gain-strength-diet-tips-zz-240627-394239.jpg"
            alt="Placeholder for Article"
            className="w-full object-contain h-96" // Adjusts image to show full height without cropping
          />
        </div>

        {/* Article Content */}
        <div className="mb-12">
          {/* Large, bold heading */}
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Nutrition Tips for Optimal Performance
          </h1>

          <p className="text-lg mb-4">
            Nutrition plays a crucial role in achieving your fitness goals,
            whether you’re looking to lose weight, build muscle, or improve
            endurance. Understanding the right balance of
            macronutrients—proteins, fats, and carbohydrates—is essential for
            fueling your workouts. In this article, we will discuss key
            nutrition tips that can help optimize your performance and recovery.
          </p>
          <p className="text-lg mb-4">
            First and foremost, it’s important to consume a balanced diet rich
            in whole foods. Incorporating lean proteins, healthy fats, and
            complex carbohydrates will provide your body with the necessary
            nutrients to perform at its best. Pre-workout meals should focus on
            carbohydrates for energy, while post-workout meals should include
            protein to aid in muscle recovery. Hydration is also vital; drinking
            enough water before, during, and after exercise can significantly
            impact your performance.
          </p>
          <p className="text-lg mb-4">
            Additionally, consider timing your meals around your workouts.
            Eating a small snack or meal 30 minutes to an hour before exercising
            can give you the energy boost you need. After your workout, aim to
            refuel within 30 minutes to maximize recovery. By paying attention
            to your nutrition, you can enhance your overall fitness experience
            and achieve your goals more effectively.
          </p>
        </div>
      </Layout>
    </div>
  );
};

export default Nutrition_tip;
