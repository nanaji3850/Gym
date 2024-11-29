import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Update this line
import "./Home.css";
const Home = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  const [dietPlans, setDietPlans] = useState([]);
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [showDietDropdown, setShowDietDropdown] = useState(false);
  const [showWorkoutDropdown, setShowWorkoutDropdown] = useState(false);
  // const [selectedDietPlan, setSelectedDietPlan] = useState(null); // state to track selected diet plan
  // const [selectedWorkoutPlan, setSelectedWorkoutPlan] = useState(null); // state to track selected workout plan

  // Get the logged-in username from localStorage
  const userId = localStorage.getItem("username");
  console.log("Retrieved User ID:", userId);

  useEffect(() => {
    // Fetch diet plans

    fetch(`https://34.229.143.21:8000/api/user/diet-plans?user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setDietPlans(data.diet_plans || []);
        localStorage.setItem(
          "dietPlans",
          JSON.stringify(data.diet_plans || [])
        );
      })
      .catch((err) => console.error("Error fetching diet plans:", err));

    // Fetch workout plans

    fetch(`https://34.229.143.21:8000/api/user/workout-plans?user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Workout Plans Data:", data);
        setWorkoutPlans(data.workout_plans || []);

        // Store workout plans in localStorage
        localStorage.setItem(
          "workoutPlans",
          JSON.stringify(data.workout_plans || [])
        );
      })

      .catch((err) => console.error("Error fetching workout plans:", err));
  }, [userId]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const [openFAQ, setOpenFAQ] = useState(null);

  // Function to toggle answer visibility
  const toggleAnswer = (faqId) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

  const handleGetStartedClick = () => {
    navigate("/get-started"); // Use navigate to go to GetStarted page
  };

  const handleLoginClick = () => {
    navigate("/login"); // Redirect to login page
  };

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem("username");
    localStorage.removeItem("access_token");
    setUsername(null);
    setDropdownVisible(false);
    navigate("/"); // Redirect to login page
  };
  const handleUsernameClick = () => {
    setDropdownVisible((prev) => !prev); // Toggle dropdown visibility
  };

  const handleWorkoutClick = (index) => {
    navigate(`/workout-plan/${index}`);
  };

  const handleDietClick = (index) => {
    navigate(`/diet-plan/${index}`); // set selected diet plan
  };

  return (
    <div>
      {/* Header Section */}
      <header className="bg-white shadow-md py-6 fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Left Side: Logo */}
          <a
            href="#home"
            className="text-3xl font-extrabold text-black-500 shadow-md transition-transform duration-300 transform hover:scale-110"
          >
            GymFluencer
          </a>

          {/* Middle: Navigation Links */}
          <nav className="hidden md:flex space-x-8 text-gray-700 bg-white  p-1 rounded-lg font-semibold">
            <a
              href="#features"
              className="text-lg hover:text-orange-500 transition-colors transition-transform duration-300 transform hover:scale-110"
            >
              Features
            </a>
            <div className="relative">
              <button
                className="text-lg hover:text-orange-500 transition-colors transition-transform duration-300 transform hover:scale-110 flex items-center"
                onClick={() => (window.location.href = "/diet-plan")} // Redirect on clicking "Diet Plan"
              >
                Diet Plan
                <span
                  className="ml-1 text-base cursor-pointer hover:text-green-500"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering parent click
                    setShowDietDropdown(!showDietDropdown); // Toggle dropdown
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

            {/* Workout Plans Dropdown */}
            <div className="relative">
              <button
                className="text-lg hover:text-orange-500 transition-colors transition-transform duration-300 transform hover:scale-110 flex items-center"
                onClick={() => (window.location.href = "/workout-plans")} // Redirect on clicking "Workout Plans"
              >
                Workout Plans
                <span
                  className="ml-1 text-base cursor-pointer hover:text-green-500"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering parent click
                    setShowWorkoutDropdown(!showWorkoutDropdown); // Toggle dropdown
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
                    <li className="px-4 py-2 text-gray-700">
                      No Workout Plans
                    </li>
                  )}
                </ul>
              )}
            </div>
            {/* <Link
              to="/workout_Diet-form"
              className="text-lg hover:text-orange-500 transition-colors transition-transform duration-300 transform hover:scale-110"
            >
              Workout&Diet Plans
            </Link> */}

            <a
              href="/blog"
              className="text-lg hover:text-orange-500 transition-colors transition-transform duration-300 transform hover:scale-110"
            >
              Blog
            </a>
            <a
              href="#faqs"
              className="text-lg hover:text-orange-500 transition-colors transition-transform duration-300 transform hover:scale-110"
            >
              FAQs
            </a>
            <a
              href="/contact"
              className="text-lg hover:text-blue-500 transition-colors transition-transform duration-300 transform hover:scale-110"
            >
              Contact Us
            </a>
          </nav>

          {/* Right Side: Buttons */}
          <div className="space-x-4 flex items-center">
            {/* Always show Get Started button */}
            <button
              className="px-6 py-2 bg-green-600 rounded-full border-2 border-white text-white shadow-lg hover:bg-green-400 hover:shadow-xl hover:scale-105 transform transition-all duration-300"
              onClick={handleGetStartedClick}
            >
              Get Started
            </button>

            {/* Only show Login button if username is not present */}
            {!username ? (
              <button
                className="px-6 py-2 bg-green-600 rounded-full border-2 border-white text-white shadow-lg hover:bg-green-400 hover:shadow-xl hover:scale-105 transform transition-all duration-300"
                onClick={handleLoginClick}
              >
                Login
              </button>
            ) : (
              // Show username and dropdown if logged in
              <div className="relative">
                <button
                  className="px-6 py-2 bg-gray-200 rounded-full text-black shadow-lg hover:bg-gray-300 transform transition-all duration-300"
                  onClick={handleUsernameClick}
                >
                  {username ? username.charAt(0).toUpperCase() : ""}
                </button>
                {/* Dropdown menu - Initially hidden */}
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
      {/* Display Selected Plan Details */}
      {/* <div className="mt-12">
        {selectedDietPlan && (
          <div>
            <h2>Your Selected Diet Plan</h2>
            <p>{selectedDietPlan.name}</p>
            <p>{selectedDietPlan.details}</p>
          </div>
        )}
        {selectedWorkoutPlan && (
          <div>
            <h2>Your Selected Workout Plan</h2>
            <p>{selectedWorkoutPlan.name}</p>
            <p>{selectedWorkoutPlan.details}</p>
          </div>
        )}
      </div> */}

      {/* Hero Section */}
      <div
        id="home"
        className="hero-section bg-cover bg-center h-screen flex flex-col items-center justify-center text-white text-center pt-16 relative overflow-hidden "
      >
        {/* Animated Heading */}
        <h1 className="text-4xl md:text-5xl font-bold relative opacity-0 animate-heading ">
          Track Your Fitness Journey
        </h1>

        {/* Animated Paragraph */}
        <p className="text-lg md:text-xl max-w-lg mt-4 opacity-0 animate-paragraph">
          Discover the ultimate fitness companion with GymFluencer. Effortlessly
          log your workouts, count reps, and track calories burned. Stay
          motivated and achieve your goals with our user-friendly interface.
        </p>

        <div className="buttons mt-6 space-x-4">
          {/* <button
            className="px-6 py-2 bg-green-600 rounded-full border-2 border-white text-white shadow-lg hover:bg-green-400 hover:shadow-xl hover:scale-105 transform transition-all duration-300"
            onClick={handleGetStartedClick}
          >
            Get Started
          </button> */}
          {/* <button className="px-6 py-2 bg-transparent rounded-full border-2 border-white text-white shadow-lg hover:bg-green-400 hover:shadow-xl hover:scale-105 transform transition-all duration-300">
            Learn More
          </button> */}
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="features-section py-16 bg-gray-100">
        <div className="container mx-auto flex flex-col md:flex-row items-center text-center md:text-left space-y-6 md:space-y-0 md:space-x-8">
          <div className="features-heading md:w-1/3">
            <h2 className="text-3xl text-orange-500 font-semibold transition-transform duration-300 transform hover:scale-110">
              Discover Our App's Key Features
            </h2>
          </div>
          <div className="features-description md:w-2/3">
            <p className="text-xl text-gray-700 font-semibold transition-transform duration-300 transform hover:scale-110">
              GymFluencer is your ultimate fitness companion, designed to help
              you track your workouts with ease. Our application allows you to
              log exercises, count reps, and calculate calories burned, all
              through a user-friendly interface. Whether you’re a beginner or a
              seasoned athlete, our app will keep you motivated and on track.
            </p>
          </div>
        </div>

        {/* Feature Images Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 container mx-auto mt-20">
          {/* First Image and Content */}
          <div className="flex flex-col items-center text-center transition-transform duration-300 transform hover:scale-110">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR_s8UeYtpJ3dOox5yUAO65DQrNg1foGTxuQ&s"
              alt="Effortless Workout Logging"
              className="w-3/4 object-contain rounded-lg mb-4 fadeInUp"
            />
            <h3 className="text-2xl font-semibold transition-transform duration-300 transform hover:scale-110">
              Effortless Workout Logging
            </h3>
            <p className="text-gray-700 mt-4 transition-transform duration-300 transform hover:scale-110">
              Easily log your workouts and monitor your progress over time with
              our intuitive logging feature. Stay organized and track your
              fitness journey with precision.
            </p>
          </div>

          {/* Second Image and Content */}
          <div className="flex flex-col items-center text-center transition-transform duration-300 transform hover:scale-110">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9Bc6IYpr8HNechbgQ5VrhfREhsWxjrxErUxtvwDO5TU0UpA61R-HSuXuciemi2wZb6Dk&usqp=CAU"
              alt="Accurate Rep Counting"
              className="w-3/4 object-contain rounded-lg mb-4  fadeInImage"
            />
            <h3 className="text-2xl font-semibold transition-transform duration-300 transform hover:scale-110">
              Accurate Rep Counting
            </h3>
            <p className="text-gray-700 mt-4 transition-transform duration-300 transform hover:scale-110">
              Count your reps accurately with our app, ensuring each workout is
              tracked effectively. Perfect for maintaining consistency and
              improving your performance.
            </p>
          </div>

          {/* Third Image and Content */}
          <div className="flex flex-col items-center text-center transition-transform duration-300 transform hover:scale-110">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaB1ZB0RCPmnhKla38zd4C1jOPazRuZxp-1g&s"
              alt="Calorie Calculation Made Easy"
              className="w-3/4 object-contain rounded-lg mb-4  fadeInImage"
            />
            <h3 className="text-2xl font-semibold transition-transform duration-300 transform hover:scale-110">
              Calorie Calculation Made Easy
            </h3>
            <p className="text-gray-700 mt-4 transition-transform duration-300 transform hover:scale-110">
              Calculate calories burned during your workouts to help manage your
              fitness goals. Our app provides precise data to keep you informed
              and motivated.
            </p>
          </div>

          <div className="flex flex-col items-center text-center mt-4 transition-transform duration-300 transform hover:scale-110">
            <img
              src="https://media.istockphoto.com/id/154961329/photo/exercise-schedule.jpg?s=612x612&w=0&k=20&c=4cVjbGIa82QmVA_lxA9JW0LZrCao6PaJSmvystWqINk="
              alt="Effortless Workout Logging"
              className="w-3/4 object-contain rounded-lg mb-4  fadeInImage"
            />
            <h3 className="text-2xl font-semibold transition-transform duration-300 transform hover:scale-110">
              personalized workout plan
            </h3>
            <p className="text-gray-700 mt-4 transition-transform duration-300 transform hover:scale-110">
              An AI-powered personalized workout plan adapts exercises to your
              fitness level, goals, and progress, helping you stay motivated and
              achieve results faster.
            </p>
          </div>

          <div className="flex flex-col items-center text-center mt-4 transition-transform duration-300 transform hover:scale-110">
            <img
              src="https://t4.ftcdn.net/jpg/01/82/40/43/360_F_182404327_IFFLPLSstIccSD1Qy2kccZSWNIswrJ9z.jpg"
              alt="Effortless Workout Logging"
              className="w-3/4 object-contain rounded-lg mb-4  fadeInImage"
            />
            <h3 className="text-2xl font-semibold transition-transform duration-300 transform hover:scale-110">
              personalized Diet plan
            </h3>
            <p className="text-gray-700 mt-4 transition-transform duration-300 transform hover:scale-110">
              An AI diet plan customizes meals to your health goals,
              preferences, and lifestyle, offering tailored, nutritious
              suggestions to support optimal wellness.
            </p>
          </div>
        </div>
      </div>

      {/* Step Section */}
      <div className="step-section py-16 bg-white ">
        <div className="container mx-auto">
          {/* Step 1 */}
          <div className="flex items-center text-center md:text-left mb-12 ">
            <a
              href="#home"
              className="md:w-1/2 transition-transform duration-300 transform hover:scale-105"
            >
              <img
                src="https://files.oaiusercontent.com/file-Dt7EJVrzusq7vxHvYkoec7?se=2024-11-29T10%3A23%3A39Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D138d7413-516d-4a75-a1bd-1a502b73f441.webp&sig=dKfK6k8ouIELddeqABdttBTH80UvC5vb3H5O1QHo4io%3D"
                alt="Step 1: Open the app"
                className="w-3/4 object-contain rounded-lg mb-4 cursor-pointer animate-slideUp "
              />
            </a>
            <div className="md:w-1/2 md:pl-6 transition-transform duration-300 transform hover:scale-110">
              <a href="#home">
                <h3 className="text-4xl font-semibold text-orange-600 cursor-pointer transition-transform duration-300 transform hover:scale-105">
                  Step 1: Click on Get Started
                </h3>
              </a>
              <a href="#home">
                <p className="text-xl text-gray-800 mt-4 cursor-pointer transition-transform duration-300 transform hover:scale-105">
                  Start by opening the GymFluencer. The intuitive home screen
                  gives you quick access to all features.
                </p>
              </a>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-center text-center md:text-left mb-12">
            <div className="md:w-1/2 md:pr-6">
              <a href="#home">
                <h3 className="text-4xl font-semibold text-orange-600 cursor-pointer transition-transform duration-300 transform hover:scale-105">
                  Step 2: Log Your Exercises
                </h3>
              </a>
              <a href="#home">
                <p className="text-xl text-gray-800 mt-4 cursor-pointer transition-transform duration-300 transform hover:scale-105">
                  Easily log your exercises by selecting from a wide range of
                  activities. Track your progress with detailed logs.
                </p>
              </a>
            </div>
            <a
              href="#home"
              className="md:w-1/2 transition-transform duration-300 transform hover:scale-105"
            >
              <img
                src="https://files.oaiusercontent.com/file-Jm3FbjogCdDYjSPTSWAXAM?se=2024-11-29T10%3A28%3A38Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dd76ad764-662a-45c3-a4d2-c38adbeff9c3.webp&sig=kwhnYrWFPztbEmYsu2s3STGjPKkmwnHmZOSi0PRXqyM%3D"
                alt="Step 2: Log Your Exercises"
                className="w-3/4 object-contain rounded-lg mb-4 cursor-pointer"
              />
            </a>
          </div>

          {/* Step 3 */}
          <div className="flex items-center text-center md:text-left mb-12">
            <a
              href="#home"
              className="md:w-1/2 transition-transform duration-300 transform hover:scale-105"
            >
              <img
                src="https://files.oaiusercontent.com/file-SN5qPgX9fdFn1zaLpBA4SR?se=2024-11-29T10%3A30%3A49Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D4a912b47-d3c7-4343-a581-2e0c86a3d4e1.webp&sig=Fvd5a0dZ6weRYFuZufjjU9QlPtP/krJjlS6jlXhNpo0%3D"
                alt="Step 3: Count Your Reps"
                className="w-3/4 object-contain rounded-lg mb-4 cursor-pointer"
              />
            </a>
            <div className="md:w-1/2 md:pl-6">
              <a href="#home">
                <h3 className="text-4xl font-semibold text-orange-600 cursor-pointer transition-transform duration-300 transform hover:scale-105">
                  Step 3: Count Your Reps
                </h3>
              </a>
              <a href="#home">
                <p className="text-xl text-gray-800 mt-4 cursor-pointer transition-transform duration-300 transform hover:scale-105">
                  Count your reps with precision, ensuring every detail is
                  logged. Stay informed on your progress.
                </p>
              </a>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-center text-center md:text-left mb-12">
            <div className="md:w-1/2 md:pr-6">
              <a href="#home">
                <h3 className="text-4xl font-semibold text-orange-600 cursor-pointer transition-transform duration-300 transform hover:scale-105">
                  Step 4: Track Your Progress
                </h3>
              </a>
              <a href="#home">
                <p className="text-xl text-gray-800 mt-4 cursor-pointer transition-transform duration-300 transform hover:scale-105">
                  Review your workout stats and progress over time to stay
                  motivated and reach your fitness goals.
                </p>
              </a>
            </div>
            <a
              href="#home"
              className="md:w-1/2 transition-transform duration-300 transform hover:scale-105"
            >
              <img
                src="https://files.oaiusercontent.com/file-65X1jtRdFthGQeRt6sEB4Z?se=2024-11-29T10%3A36%3A21Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D0c3b89f5-b70f-4071-86c4-aced70a1cd39.webp&sig=7JnJPkFCSvTzeIOsR%2BcX5Dytpvu7gP1ORlnd6s46uY8%3D"
                alt="Step 4: Track Your Progress"
                className="w-3/4 object-contain rounded-lg mb-4 cursor-pointer"
              />
            </a>
          </div>

          <div className="flex items-center text-center md:text-left mb-12">
            <a
              href="#home"
              className="md:w-1/2 transition-transform duration-300 transform hover:scale-105"
            >
              <img
                src="https://files.oaiusercontent.com/file-AkoCw8kU8W3rU6RmhUmbtS?se=2024-11-29T10%3A33%3A26Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Db636e58a-560a-49f7-9ad2-520fcfbfaeca.webp&sig=tG7Adpv7IWQZ6VBl6FHfWyofIdDnNw9TVKFiQxkaCyc%3D"
                alt="Step 5: Review Your Progress"
                className="w-3/4 object-contain rounded-lg mb-4 cursor-pointer"
              />
            </a>
            <div className="md:w-1/2 md:pl-6">
              <a href="#home">
                <h3 className="text-4xl font-semibold text-orange-600 cursor-pointer transition-transform duration-300 transform hover:scale-105">
                  Step 5: Review Your Progress
                </h3>
              </a>
              <a href="#home">
                <p className="text-xl text-gray-800 mt-4 cursor-pointer transition-transform duration-300 transform hover:scale-105">
                  Check your workout summaries and progress over time to stay
                  motivated and achieve your fitness goals.
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="what-users-say py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl text-black-500 font-semibold mb-6 transition-transform duration-300 transform hover:scale-110">
            What Users <span className="text-red-500">Say</span>
          </h2>
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-1/3 p-4 transition-transform duration-300 transform hover:scale-110">
              <div className="border rounded-lg p-8 bg-gray-400">
                <h3 className="text-xl font-semibold">"Best Fitness App!"</h3>
                <p className="text-white mt-2">
                  GymFluencer has transformed the way I work out. The rep
                  counting feature is a game-changer!
                </p>
                <div className="mt-2">
                  <span className="text-yellow-400 text-3xl">★★★★★</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/3 p-4 transition-transform duration-300 transform hover:scale-110">
              <div className="border rounded-lg p-8 bg-gray-400">
                <h3 className="text-xl font-semibold">"So Easy to Use!"</h3>
                <p className="text-white mt-2">
                  I love how user-friendly the app is. Logging workouts has
                  never been easier!
                </p>
                <div className="mt-2">
                  <span className="text-yellow-400 text-3xl">★★★★★</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/3 p-4 transition-transform duration-300 transform hover:scale-110">
              <div className="border rounded-lg p-8 bg-gray-400">
                <h3 className="text-xl font-semibold">
                  "Incredible Progress Tracker!"
                </h3>
                <p className="text-white mt-2">
                  I've seen amazing results since using GymFluencer. The
                  progress tracking feature keeps me motivated!
                </p>
                <div className="mt-2">
                  <span className="text-yellow-400 text-3xl">★★★★★</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="faqs" className="faqs-section py-16 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-left">FAQs</h2>
          <p className="text-xl text-green-500 mb-8 text-left">
            Find answers to your questions about the GymFluencer application,
            designed to enhance your fitness journey.
          </p>

          <div className="space-y-4">
            <div className="border-b border-gray-600 pb-4">
              <h3
                className="text-2xl font-semibold cursor-pointer flex justify-between items-center transition-all duration-500 hover:text-green-500"
                onClick={() => toggleAnswer("faq1")}
              >
                How do I log my workouts?
                <span className="text-gray-600 ml-2 transition-transform duration-300">
                  <i
                    className={`fas fa-caret-${
                      openFAQ === "faq1" ? "up" : "down"
                    }`}
                  ></i>
                </span>
              </h3>
              <p
                className={`text-xl text-gray-600 transition-all duration-500 ${
                  openFAQ === "faq1"
                    ? "max-h-screen"
                    : "max-h-0 overflow-hidden"
                }`}
              >
                You can easily log your workouts by selecting the exercise,
                entering the duration, and tracking your reps.
              </p>
            </div>
            <div className="border-b border-gray-600 pb-4">
              <h3
                className="text-2xl font-semibold cursor-pointer flex justify-between items-center transition-all duration-500 hover:text-green-500"
                onClick={() => toggleAnswer("faq2")}
              >
                Can I track my calories burned?
                <span className="text-gray-600 ml-2 transition-transform duration-300">
                  <i
                    className={`fas fa-caret-${
                      openFAQ === "faq2" ? "up" : "down"
                    }`}
                  ></i>
                </span>
              </h3>
              <p
                className={`text-xl text-gray-600 transition-all duration-500 ${
                  openFAQ === "faq2"
                    ? "max-h-screen"
                    : "max-h-0 overflow-hidden"
                }`}
              >
                Yes, you can track calories burned through the application
                integrated tracking features.
              </p>
            </div>
            <div className="border-b border-gray-600 pb-4">
              <h3
                className="text-2xl font-semibold cursor-pointer flex justify-between items-center transition-all duration-500 hover:text-green-500"
                onClick={() => toggleAnswer("faq3")}
              >
                Is this application suitable for beginners?
                <span className="text-gray-600 ml-2 transition-transform duration-300">
                  <i
                    className={`fas fa-caret-${
                      openFAQ === "faq3" ? "up" : "down"
                    }`}
                  ></i>
                </span>
              </h3>
              <p
                className={`text-xl text-gray-600 transition-all duration-500 ${
                  openFAQ === "faq3"
                    ? "max-h-screen"
                    : "max-h-0 overflow-hidden"
                }`}
              >
                Absolutely! GymFluencer is designed to be user-friendly and
                suitable for all fitness levels.
              </p>
            </div>
            <div className="border-b border-gray-600 pb-4">
              <h3
                className="text-2xl font-semibold cursor-pointer flex justify-between items-center transition-all duration-500 hover:text-green-500"
                onClick={() => toggleAnswer("faq4")}
              >
                What features does the application offer?
                <span className="text-gray-600 ml-2 transition-transform duration-300">
                  <i
                    className={`fas fa-caret-${
                      openFAQ === "faq4" ? "up" : "down"
                    }`}
                  ></i>
                </span>
              </h3>
              <p
                className={`text-xl text-gray-600 transition-all duration-500 ${
                  openFAQ === "faq4"
                    ? "max-h-screen"
                    : "max-h-0 overflow-hidden"
                }`}
              >
                The app offers workout logging, rep counting, calorie tracking,
                and progress reviews.
              </p>
            </div>
            <div className="border-b border-gray-600 pb-4">
              <h3
                className="text-2xl font-semibold cursor-pointer flex justify-between items-center transition-all duration-500 hover:text-green-500"
                onClick={() => toggleAnswer("faq5")}
              >
                How can I reset my password?
                <span className="text-gray-600 ml-2 transition-transform duration-300">
                  <i
                    className={`fas fa-caret-${
                      openFAQ === "faq5" ? "up" : "down"
                    }`}
                  ></i>
                </span>
              </h3>
              <p
                className={`text-xl text-gray-600 transition-all duration-500 ${
                  openFAQ === "faq5"
                    ? "max-h-screen"
                    : "max-h-0 overflow-hidden"
                }`}
              >
                You can reset your password by going to the login screen and
                selecting "Forgot Password."
              </p>
            </div>{" "}
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; 2024 GymFluencer. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
