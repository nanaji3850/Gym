import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Update this line
import "./Home.css";
const Home = () => {
  // const initialValue = "";
  const navigate = useNavigate(); // Use useNavigate instead
  // const [someState, setSomeState] = useState(initialValue);
  // State to track which FAQ is open
  const [openFAQ, setOpenFAQ] = useState(null);

  // Function to toggle answer visibility
  const toggleAnswer = (faqId) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

  const handleGetStartedClick = () => {
    navigate("/get-started"); // Use navigate to go to GetStarted page
  };

  return (
    <div>
      {/* Header Section */}
      <header className="bg-white shadow-md py-8 fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Left Side: Logo */}
          <a href="#home" className="text-3xl font-bold text-orange-500">
            GymFluencer
          </a>

          {/* Middle: Navigation Links */}
          <nav className="hidden md:flex space-x-8 text-gray-700">
            <a href="#features" className="text-lg hover:text-orange-500">
              Features
            </a>
            <a href="/blog" className="text-lg hover:text-orange-500">
              Blog
            </a>
            <a href="#faqs" className="text-lg hover:text-orange-500">
              FAQs
            </a>
          </nav>

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

      {/* Hero Section */}
      <div
        id="home"
        className="hero-section bg-cover bg-center h-screen flex flex-col items-center justify-center text-white text-center pt-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold">
          Track Your Fitness Journey
        </h1>
        <p className="text-lg md:text-xl max-w-lg mt-4">
          Discover the ultimate fitness companion with GymFluencer. Effortlessly
          log your workouts, count reps, and track calories burned. Stay
          motivated and achieve your goals with our user-friendly interface.
        </p>
        <div className="buttons mt-6 space-x-4">
          <button
            className="px-6 py-2 bg-green-600 rounded-full border-2 border-white text-white shadow-lg hover:bg-green-400 hover:shadow-xl"
            onClick={handleGetStartedClick}
          >
            Get Started
          </button>
          <button className="px-6 py-2 bg-transparent rounded-full border-2 border-white text-white shadow-lg hover:bg-green-400 hover:shadow-xl">
            Learn More
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="features-section py-16 bg-gray-100">
        <div className="container mx-auto flex flex-col md:flex-row items-center text-center md:text-left space-y-6 md:space-y-0 md:space-x-8">
          <div className="features-heading md:w-1/3">
            <h2 className="text-3xl text-orange-500 font-semibold">
              Discover Our App's Key Features
            </h2>
          </div>
          <div className="features-description md:w-2/3">
            <p className="text-xl text-gray-700">
              GymFluencer is your ultimate fitness companion, designed to help
              you track your workouts with ease. Our app allows you to log
              exercises, count reps, and calculate calories burned, all through
              a user-friendly interface. Whether you’re a beginner or a seasoned
              athlete, our app will keep you motivated and on track.
            </p>
          </div>
        </div>

        {/* Feature Images Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 container mx-auto">
          {/* First Image and Content */}
          <div className="flex flex-col items-center text-center">
            <img
              src="https://10web-site.ai/125/wp-content/uploads/sites/137/2024/11/tenweb_media_cApR2UsM.webp"
              alt="Effortless Workout Logging"
              className="w-3/4 object-contain rounded-lg mb-4 fadeInImage"
            />
            <h3 className="text-2xl font-semibold">
              Effortless Workout Logging
            </h3>
            <p className="text-gray-700 mt-4">
              Easily log your workouts and monitor your progress over time with
              our intuitive logging feature. Stay organized and track your
              fitness journey with precision.
            </p>
          </div>

          {/* Second Image and Content */}
          <div className="flex flex-col items-center text-center">
            <img
              src="https://10web-site.ai/125/wp-content/uploads/sites/137/2024/11/tenweb_media_9G5pk73k.webp"
              alt="Accurate Rep Counting"
              className="w-3/4 object-contain rounded-lg mb-4 fade-in"
            />
            <h3 className="text-2xl font-semibold">Accurate Rep Counting</h3>
            <p className="text-gray-700 mt-4">
              Count your reps accurately with our app, ensuring each workout is
              tracked effectively. Perfect for maintaining consistency and
              improving your performance.
            </p>
          </div>

          {/* Third Image and Content */}
          <div className="flex flex-col items-center text-center">
            <img
              src="https://10web-site.ai/125/wp-content/uploads/sites/137/2024/11/tenweb_media_MgjrARDS.webp"
              alt="Calorie Calculation Made Easy"
              className="w-3/4 object-contain rounded-lg mb-4 fade-in"
            />
            <h3 className="text-2xl font-semibold">
              Calorie Calculation Made Easy
            </h3>
            <p className="text-gray-700 mt-4">
              Calculate calories burned during your workouts to help manage your
              fitness goals. Our app provides precise data to keep you informed
              and motivated.
            </p>
          </div>

          <div className="flex flex-col items-center text-center mt-4">
            <img
              src="https://media.istockphoto.com/id/154961329/photo/exercise-schedule.jpg?s=612x612&w=0&k=20&c=4cVjbGIa82QmVA_lxA9JW0LZrCao6PaJSmvystWqINk="
              alt="Effortless Workout Logging"
              className="w-3/4 object-contain rounded-lg mb-4 fade-in"
            />
            <h3 className="text-2xl font-semibold">
              personalized workout plan
            </h3>
            <p className="text-gray-700 mt-4">
              An AI-powered personalized workout plan adapts exercises to your
              fitness level, goals, and progress, helping you stay motivated and
              achieve results faster.
            </p>
          </div>

          <div className="flex flex-col items-center text-center mt-4">
            <img
              src="https://t4.ftcdn.net/jpg/01/82/40/43/360_F_182404327_IFFLPLSstIccSD1Qy2kccZSWNIswrJ9z.jpg"
              alt="Effortless Workout Logging"
              className="w-3/4 object-contain rounded-lg mb-4 fade-in"
            />
            <h3 className="text-2xl font-semibold">personalized Diet plan</h3>
            <p className="text-gray-700 mt-4">
              An AI diet plan customizes meals to your health goals,
              preferences, and lifestyle, offering tailored, nutritious
              suggestions to support optimal wellness.
            </p>
          </div>
        </div>
      </div>

      {/* Step Section */}
      <div className="step-section py-16 bg-white">
        <div className="container mx-auto">
          {/* Step 1 */}
          <div className="flex items-center text-center md:text-left mb-12">
            <a href="#home" className="md:w-1/2">
              <img
                src="https://10web-site.ai/125/wp-content/uploads/sites/137/2024/11/tenweb_media_Trl6VOLI.webp"
                alt="Step 1: Open the app"
                className="w-3/4 object-contain rounded-lg mb-4 cursor-pointer fade-in"
              />
            </a>
            <div className="md:w-1/2 md:pl-6">
              <a href="#home">
                <h3 className="text-5xl font-semibold text-orange-600 cursor-pointer">
                  Step 1: Open the app
                </h3>
              </a>
              <a href="#home">
                <p className="text-xl text-gray-800 mt-4 cursor-pointer">
                  Start by opening the GymFluencer app on your smartphone. The
                  intuitive home screen gives you quick access to all features.
                </p>
              </a>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-center text-center md:text-left mb-12">
            <div className="md:w-1/2 md:pr-6">
              <a href="#home">
                <h3 className="text-5xl font-semibold text-orange-600 cursor-pointer">
                  Step 2: Log Your Exercises
                </h3>
              </a>
              <a href="#home">
                <p className="text-xl text-gray-800 mt-4 cursor-pointer">
                  Easily log your exercises by selecting from a wide range of
                  activities. Track your progress with detailed logs.
                </p>
              </a>
            </div>
            <a href="#home" className="md:w-1/2">
              <img
                src="https://10web-site.ai/125/wp-content/uploads/sites/137/2024/11/tenweb_media_xhrd64lC.webp"
                alt="Step 2: Log Your Exercises"
                className="w-3/4 object-contain rounded-lg mb-4 cursor-pointer"
              />
            </a>
          </div>

          {/* Step 3 */}
          <div className="flex items-center text-center md:text-left mb-12">
            <a href="#home" className="md:w-1/2">
              <img
                src="https://10web-site.ai/125/wp-content/uploads/sites/137/2024/11/tenweb_media_GuNbS7jd.webp"
                alt="Step 3: Count Your Reps"
                className="w-3/4 object-contain rounded-lg mb-4 cursor-pointer"
              />
            </a>
            <div className="md:w-1/2 md:pl-6">
              <a href="#home">
                <h3 className="text-5xl font-semibold text-orange-600 cursor-pointer">
                  Step 3: Count Your Reps
                </h3>
              </a>
              <a href="#home">
                <p className="text-xl text-gray-800 mt-4 cursor-pointer">
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
                <h3 className="text-5xl font-semibold text-orange-600 cursor-pointer">
                  Step 4: Track Your Progress
                </h3>
              </a>
              <a href="#home">
                <p className="text-xl text-gray-800 mt-4 cursor-pointer">
                  Review your workout stats and progress over time to stay
                  motivated and reach your fitness goals.
                </p>
              </a>
            </div>
            <a href="#home" className="md:w-1/2">
              <img
                src="https://10web-site.ai/125/wp-content/uploads/sites/137/2024/11/tenweb_media_9PLQkVJu.webp"
                alt="Step 4: Track Your Progress"
                className="w-3/4 object-contain rounded-lg mb-4 cursor-pointer"
              />
            </a>
          </div>

          <div class="flex items-center text-center md:text-left mb-12">
            <a href="#home" class="md:w-1/2">
              <img
                src="https://10web-site.ai/125/wp-content/uploads/sites/137/2024/11/tenweb_media_JlDEzv2X.webp"
                alt="Step 5: Review Your Progress"
                class="w-3/4 object-contain rounded-lg mb-4 cursor-pointer"
              />
            </a>
            <div class="md:w-1/2 md:pl-6">
              <a href="#home">
                <h3 class="text-5xl font-semibold text-orange-600 cursor-pointer">
                  Step 5: Review Your Progress
                </h3>
              </a>
              <a href="#home">
                <p class="text-xl text-gray-800 mt-4 cursor-pointer">
                  Check your workout summaries and progress over time to stay
                  motivated and achieve your fitness goals.
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="what-users-say py-16 bg-gray-100">
        <div class="container mx-auto text-center">
          <h2 class="text-5xl text-orange-500 font-semibold mb-6">
            What Users <span class="text-red-500">Say</span>
          </h2>
          <div class="flex flex-wrap justify-center">
            <div class="w-full md:w-1/3 p-4">
              <div class="border rounded-lg p-8 bg-gray-400">
                <h3 class="text-xl font-semibold">"Best Fitness App!"</h3>
                <p class="text-white mt-2">
                  GymFluencer has transformed the way I work out. The rep
                  counting feature is a game-changer!
                </p>
                <div class="mt-2">
                  <span class="text-yellow-400 text-3xl">★★★★★</span>
                </div>
              </div>
            </div>

            <div class="w-full md:w-1/3 p-4">
              <div class="border rounded-lg p-8 bg-gray-400">
                <h3 class="text-xl font-semibold">"So Easy to Use!"</h3>
                <p class="text-white mt-2">
                  I love how user-friendly the app is. Logging workouts has
                  never been easier!
                </p>
                <div class="mt-2">
                  <span class="text-yellow-400 text-3xl">★★★★★</span>
                </div>
              </div>
            </div>

            <div class="w-full md:w-1/3 p-4">
              <div class="border rounded-lg p-8 bg-gray-400">
                <h3 class="text-xl font-semibold">
                  "Incredible Progress Tracker!"
                </h3>
                <p class="text-white mt-2">
                  I've seen amazing results since using GymFluencer. The
                  progress tracking feature keeps me motivated!
                </p>
                <div class="mt-2">
                  <span class="text-yellow-400 text-3xl">★★★★★</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="faqs" class="faqs-section py-16 bg-gray-100">
        <div class="container mx-auto">
          <h2 class="text-5xl font-bold mb-4 text-left">FAQs</h2>
          <p class="text-xl text-green-500 mb-8 text-left">
            Find answers to your questions about the GymFluencer app, designed
            to enhance your fitness journey.
          </p>

          <div class="space-y-4">
            <div className="border-b border-gray-600 pb-4">
              <h3
                className="text-3xl font-semibold cursor-pointer flex justify-between items-center transition-all duration-500 hover:text-green-500"
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
                className="text-3xl font-semibold cursor-pointer flex justify-between items-center transition-all duration-500 hover:text-green-500"
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
                Yes, you can track calories burned through the app's integrated
                tracking features.
              </p>
            </div>
            <div className="border-b border-gray-600 pb-4">
              <h3
                className="text-3xl font-semibold cursor-pointer flex justify-between items-center transition-all duration-500 hover:text-green-500"
                onClick={() => toggleAnswer("faq3")}
              >
                Is the app suitable for beginners?
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
                className="text-3xl font-semibold cursor-pointer flex justify-between items-center transition-all duration-500 hover:text-green-500"
                onClick={() => toggleAnswer("faq4")}
              >
                What features does the app offer?
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
                className="text-3xl font-semibold cursor-pointer flex justify-between items-center transition-all duration-500 hover:text-green-500"
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
