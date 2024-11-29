import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [username, setUsername] = useState(null);
  const [dietPlans, setDietPlans] = useState([]);
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [showDietDropdown, setShowDietDropdown] = useState(false);
  const [showWorkoutDropdown, setShowWorkoutDropdown] = useState(false);
  const navigate = useNavigate();

  const userId = localStorage.getItem("username");

  // Fetch Diet and Workout plans
  useEffect(() => {
    fetch(`http://localhost:8000/api/user/diet-plans?user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setDietPlans(data.diet_plans || []);
        localStorage.setItem(
          "dietPlans",
          JSON.stringify(data.diet_plans || [])
        );
      })
      .catch((err) => console.error("Error fetching diet plans:", err));

    fetch(`http://localhost:8000/api/user/workout-plans?user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setWorkoutPlans(data.workout_plans || []);
        localStorage.setItem(
          "workoutPlans",
          JSON.stringify(data.workout_plans || [])
        );
      })
      .catch((err) => console.error("Error fetching workout plans:", err));

    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [userId]);

  const handleGetStartedClick = () => navigate("/get-started");
  const handleLoginClick = () => navigate("/login");
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("access_token");
    setUsername(null);
    setDropdownVisible(false);
    navigate("/");
  };
  const handleUsernameClick = () => setDropdownVisible((prev) => !prev);
  const handleWorkoutClick = (index) => navigate(`/workout-plan/${index}`);
  const handleDietClick = (index) => navigate(`/diet-plan/${index}`);

  return (
    <header className="bg-white shadow-md py-6 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link
          to="/"
          className="text-3xl font-extrabold text-black-500 shadow-md transition-transform duration-300 transform hover:scale-110"
        >
          GymFluencer
        </Link>
        <nav className="hidden md:flex space-x-8 text-gray-700 bg-white p-1 rounded-lg font-semibold">
          <Link
            to="/"
            href="#features"
            className="text-lg hover:text-orange-500 transition-colors"
          >
            Features
          </Link>
          {/* Diet Plan Dropdown */}
          <div className="relative">
            <button
              className="text-lg hover:text-orange-500"
              onClick={() => (window.location.href = "/diet-plan")}
            >
              Diet Plan
              <span
                className="ml-1 text-base cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDietDropdown(!showDietDropdown);
                }}
              >
                ▼
              </span>
            </button>
            {showDietDropdown && (
              <ul className="absolute bg-white border border-gray-200 shadow-lg rounded-lg w-48 mt-2">
                {dietPlans.length > 0 ? (
                  dietPlans.map((plan, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleDietClick(index)}
                    >
                      Your Diet Plan {index + 1}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-700">No Diet Plans</li>
                )}
              </ul>
            )}
          </div>
          {/* Workout Plan Dropdown */}
          <div className="relative">
            <button
              className="text-lg hover:text-orange-500"
              onClick={() => (window.location.href = "/workout-plans")}
            >
              Workout Plans
              <span
                className="ml-1 text-base cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowWorkoutDropdown(!showWorkoutDropdown);
                }}
              >
                ▼
              </span>
            </button>
            {showWorkoutDropdown && (
              <ul className="absolute bg-white border border-gray-200 shadow-lg rounded-lg w-48 mt-2">
                {workoutPlans.length > 0 ? (
                  workoutPlans.map((plan, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleWorkoutClick(index)}
                    >
                      Your Workout Plan {index + 1}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-700">No Workout Plans</li>
                )}
              </ul>
            )}
          </div>
          <a href="/blog" className="text-lg hover:text-orange-500">
            Blog
          </a>
          <Link
            to="/"
            href="#faqs"
            className="text-lg hover:text-orange-500 transition-colors"
          >
            FAQs
          </Link>
          <a href="/contact" className="text-lg hover:text-blue-500">
            Contact Us
          </a>
        </nav>
        <div className="space-x-4 flex items-center">
          <button
            className="px-6 py-2 bg-green-600 rounded-full text-white"
            onClick={handleGetStartedClick}
          >
            Get Started
          </button>
          {!username ? (
            <button
              className="px-6 py-2 bg-green-600 rounded-full text-white"
              onClick={handleLoginClick}
            >
              Login
            </button>
          ) : (
            <div className="relative">
              <button
                className="px-6 py-2 bg-gray-200 rounded-full text-black"
                onClick={handleUsernameClick}
              >
                {username ? username.charAt(0).toUpperCase() : ""}
              </button>
              {dropdownVisible && (
                <ul className="absolute right-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-lg w-48">
                  <li
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
