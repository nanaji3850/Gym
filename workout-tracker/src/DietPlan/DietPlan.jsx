import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";

const DietPlanPage = () => {
  const navigate = useNavigate();

  const dietPlans = [
    {
      id: 1,
      name: "Personalized Diet Plan",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0f7LzfaL0H06kimUbEqrAj32zkRq3b4iCkQ&s",
    },
    {
      id: 2,
      name: "Weight Loss (Fat Loss) Diet Plan",
      img: "https://www.health-total.com/wp-content/themes/scalia/page_template/images/HT-new-website-Banner-weight-loss-for-woman-mob-banner.jpg",
    },
    {
      id: 3,
      name: "Muscle Building (Hypertrophy) Diet Plan",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxidUuL4q_RA7168UEivMv31hzhN0pB6cN8g&s",
    },
    {
      id: 4,
      name: "Cutting Diet Plan",
      img: "https://fitnessvolt.com/wp-content/uploads/2020/12/cutting-diet-plan.jpg",
    },
    {
      id: 5,
      name: "Endurance/Performance Diet Plan",
      img: "https://images.squarespace-cdn.com/content/v1/60e4262d44d7285f8b935dd1/6772a91f-d19d-4c79-86a4-119abde0e8e3/rice+chickpea+salad.jpg",
    },
    {
      id: 6,
      name: "Keto Diet (Ketogenic)",
      img: "https://www.eatingwell.com/thmb/OjqIt-0hf2URXH1LS9CakKOaiUQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/complete-keto-diet-food-list-what-you-can-and-cannot-eat-if-youre-on-a-ketogenic-diet-3-cd4cd1fc60cb455bbe7eee6e3a7d4d2c.jpg",
    },
    {
      id: 7,
      name: "Vegetarian/Vegan Diet Plan",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5fxsYHcGf7eS8L3X--FGM_9z8TngbCqycgQ&s",
    },
    {
      id: 8,
      name: "Intermittent Fasting Diet Plan",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRc298u2-Ji7aunp33e-irRoSqdpgDBxEVGA&s",
    },
    {
      id: 9,
      name: "Paleo Diet Plan",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCIDi6vAZ2aUSrHoug2W3EeVNJwLtN7V9gTw&s",
    },
  ];

  // const handleGetStartedClick = () => {
  //   navigate("/get-started"); // Use navigate to go to GetStarted page
  // };

  return (
    <>
      <Layout>
        <section className="flex flex-wrap justify-center items-center gap-6 w-full p-8 bg-gray-50 mt-40">
          <div className="w-full text-center">
            <h2 className="text-4xl font-extrabold mb-6 text-black shadow-md transition-transform duration-300 transform hover:scale-110">
              Diet Plan
            </h2>
            <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-24 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-purple-500 rounded-lg"></span>
          </div>

          {dietPlans.map((diet) => (
            <div
              key={diet.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all transform hover:scale-110 hover:shadow-2xl max-w-sm"
              onClick={() => {
                switch (diet.name) {
                  case "Weight Loss (Fat Loss) Diet Plan":
                    navigate("/weight-loss-diet");
                    break;
                  case "Personalized Diet Plan":
                    navigate("/diet-form");
                    break;
                  case "Muscle Building (Hypertrophy) Diet Plan":
                    navigate("/muscle_building");
                    break;
                  default:
                    console.log(`Selected diet: ${diet.name}`);
                }
              }}
            >
              <img
                src={diet.img}
                alt={diet.name}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {diet.name}
                </h3>
                <p className="text-gray-600">
                  A description of the {diet.name}.
                </p>
              </div>
            </div>
          ))}
        </section>
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

export default DietPlanPage;
