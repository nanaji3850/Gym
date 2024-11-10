// import React, { useState, useEffect } from "react";
// import io from "socket.io-client";
// import axios from "axios";

// const socket = io("http://localhost:5000", {
//   pingInterval: 25000, // Send a ping every 25 seconds
//   pingTimeout: 60000, // Allow 60 seconds for a pong response before closing
// }); // Connect to Flask-SocketIO

// function GetStarted() {
//   const [file, setFile] = useState(null);
//   const [source, setSource] = useState("file");
//   const [summary, setSummary] = useState(null);
//   const [frame, setFrame] = useState(null); // State for video frames
//   const [error, setError] = useState(""); // State to show error messages
//   const [workoutType, setWorkoutType] = useState(""); // Selected workout type
//   const [feedback, setFeedback] = useState(""); // New state for real-time feedback

//   useEffect(() => {
//     // Listen for frame data
//     socket.on("frame", (frameData) => {
//       setFrame(
//         `data:image/jpeg;base64,${btoa(
//           new Uint8Array(frameData).reduce(
//             (data, byte) => data + String.fromCharCode(byte),
//             ""
//           )
//         )}`
//       );
//     });

//     // Listen for summary data
//     socket.on("summary", (data) => {
//       setSummary(data);
//     });

//     // Listen for real-time feedback data
//     socket.on("feedback", (data) => {
//       console.log(data);
//       setFeedback(data.feedback); // Update feedback state with the specific property
//     });

//     return () => {
//       socket.off("frame");
//       socket.off("summary");
//       socket.off("feedback");
//     };
//   }, []);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     uploadFile(selectedFile); // Automatically upload the file
//   };

//   const uploadFile = (file) => {
//     const formData = new FormData();
//     formData.append("file", file);

//     return axios
//       .post("http://localhost:5000/upload", formData)
//       .then((response) => {
//         console.log("File uploaded successfully");
//         return response.data.filename; // Return filename for further use
//       })
//       .catch((error) => {
//         console.error("Error uploading file:", error);
//         return null; // Return null if there's an error
//       });
//   };

//   const handleUpload = async () => {
//     if (source === "file") {
//       // Ensure a file is selected
//       if (!file) {
//         setError("Please select a file to upload.");
//         return;
//       }

//       // Attempt to upload the file and get the filename
//       const filename = await uploadFile(file);
//       if (filename) {
//         // Only emit if the filename is valid
//         socket.emit("start_workout", {
//           source: "file",
//           filename: filename,
//           workout_type: workoutType, // Pass workout type to backend
//         });
//       } else {
//         console.error("File upload failed; workout not started.");
//       }
//     } else if (source === "0") {
//       // Emit directly if using the live camera
//       socket.emit("start_workout", {
//         source: "0",
//         workout_type: workoutType, // Include workout type
//       });
//     }
//   };

//   const handleSourceChange = (e) => {
//     setSource(e.target.value);
//     setFile(null); // Clear the selected file if changing source
//     setError(""); // Clear any previous errors
//   };

//   const handleStopWorkout = () => {
//     socket.emit("stop_workout");
//   };

//   return (
//     <>
//       <header className="bg-white shadow-md py-8 fixed top-0 left-0 w-full z-50">
//         <div className="container mx-auto flex justify-between items-center px-4">
//           {/* Left Side: Logo */}
//           <a href="#home" className="text-3xl font-bold text-orange-500">
//             GymFluencer
//           </a>

//           {/* Middle: Navigation Links */}
//           <nav className="hidden md:flex space-x-8 text-gray-700">
//             <a href="#features" className="text-lg hover:text-orange-500">
//               Features
//             </a>
//             <a href="#blog" className="text-lg hover:text-orange-500">
//               Blog
//             </a>
//             <a href="#faqs" className="text-lg hover:text-orange-500">
//               FAQs
//             </a>
//           </nav>

//           {/* Right Side: Buttons */}
//           <div className="space-x-4">
//             <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
//               Get Started
//             </button>
//             <button className="px-4 py-2 bg-transparent border-2 border-orange-500 text-orange-500 rounded hover:bg-orange-500 hover:text-white">
//               Download Now
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <div className="hero-section1 bg-cover bg-center h-screen flex flex-col items-center justify-center text-white text-center pt-16">
//         <h1 className="text-4xl md:text-5xl font-bold">
//           Track Your Fitness Journey
//         </h1>
//         <p className="text-lg md:text-xl max-w-lg mt-4">
//           Discover the ultimate fitness companion with GymFluencer. Effortlessly
//           log your workouts, count reps, and track calories burned. Stay
//           motivated and achieve your goals with our user-friendly interface.
//         </p>
//         <div className="buttons mt-6 space-x-4">
//           <button className="px-6 py-2 bg-orange-500 rounded hover:bg-orange-600 text-white">
//             Get Started
//           </button>
//           <button className="px-6 py-2 bg-transparent border-2 border-orange-500 rounded hover:bg-orange-500 hover:text-white text-orange-500">
//             Learn More
//           </button>
//         </div>
//       </div>

//       <section className="flex flex-col items-center w-full p-8">
//         <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//           <h2 className="text-2xl font-semibold mb-4">Workout Tracker</h2>

//           {/* Workout Type Selector */}
//           <select
//             value={workoutType}
//             onChange={(e) => setWorkoutType(e.target.value)}
//             required
//             className="form-select mb-3 border rounded p-2 w-full"
//           >
//             <option value="">Select Workout</option>
//             <option value="Push-ups">Push-ups</option>
//             <option value="Squats">Squats</option>
//             <option value="Pull-ups">Pull-ups</option>
//             <option value="Deadlifts">Deadlifts</option>
//             <option value="Bicep Curls">Bicep Curls</option>
//           </select>

//           {/* Source Options */}
//           <div className="flex justify-around mb-3">
//             <label className="flex items-center">
//               <input
//                 type="radio"
//                 value="file"
//                 checked={source === "file"}
//                 onChange={handleSourceChange}
//                 className="mr-2"
//               />
//               Upload a Recorded Video
//             </label>
//             <label className="flex items-center">
//               <input
//                 type="radio"
//                 value="0"
//                 checked={source === "0"}
//                 onChange={handleSourceChange}
//                 className="mr-2"
//               />
//               Use Live Camera
//             </label>
//           </div>

//           {/* File Input for Video Upload */}
//           {source === "file" && (
//             <input
//               type="file"
//               onChange={handleFileChange}
//               className="border rounded p-2 w-full mb-4"
//             />
//           )}
//           {error && <p className="text-red-500">{error}</p>}

//           {/* Start and Stop Workout Buttons */}
//           <button
//             className="bg-blue-600 text-white rounded p-2 w-full mb-2"
//             onClick={handleUpload}
//           >
//             Start Workout
//           </button>
//           <button
//             onClick={handleStopWorkout}
//             className="bg-red-600 text-white rounded p-2 w-full"
//           >
//             Stop Workout
//           </button>

//           {/* Video Frame Display */}
//           <div className="mt-4">
//             {frame && (
//               <img
//                 src={frame}
//                 alt="Workout Frame"
//                 className="rounded-lg shadow-md"
//               />
//             )}
//           </div>

//           {/* Feedback Display */}
//           {feedback && (
//             <div className="mt-3 p-4 rounded shadow bg-gray-100">
//               <h4 className="font-semibold">Real-time Feedback</h4>
//               <p>
//                 {typeof feedback === "string"
//                   ? feedback
//                   : JSON.stringify(feedback)}
//               </p>
//             </div>
//           )}

//           {/* Workout Summary */}
//           {summary && (
//             <div className="mt-4 p-4 rounded shadow bg-gray-50">
//               <h2 className="text-lg font-semibold">Workout Summary</h2>
//               {Object.keys(summary).map((workout) => (
//                 <div key={workout} className="my-2">
//                   <p>
//                     <strong className="font-semibold">Workout:</strong>{" "}
//                     {workout}
//                   </p>
//                   <p>
//                     <strong className="font-semibold">Total Reps:</strong>{" "}
//                     {summary[workout].reps}
//                   </p>
//                   <p>
//                     <strong className="font-semibold">Total Calories:</strong>{" "}
//                     {summary[workout].calories.toFixed(2)}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* New Section Before Footer */}
//       <footer className="bg-gray-800 text-white text-center py-4">
//         <p>&copy; 2024 GymFluencer. All rights reserved.</p>
//       </footer>
//     </>
//   );
// }

// export default GetStarted;

import React from "react";
import { useNavigate } from "react-router-dom";

const workouts = [
  {
    id: 1,
    name: "Push-ups",
    image:
      "https://media.istockphoto.com/id/586364084/photo/determined-athlete-doing-push-ups-on-kettlebells-in-gym.jpg?s=612x612&w=0&k=20&c=En8Pxj2KOYJxwBBV4woKANK2Ebc2aHLlAv5tuWHJOQg=",
    description: "A basic exercise for upper body strength.",
  },
  {
    id: 2,
    name: "Squats",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvzkl6y6AHZLERZNGtVzN_wdjpMrGOqw49mA&s",
    description: "A foundational exercise for lower body strength.",
  },
  {
    id: 3,
    name: "Pull-ups",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQVjFKa3taZj-3WVotzOAYYNoUwFOg3HCcCg&s",
    description: "An effective exercise for upper body and back strength.",
  },
  {
    id: 4,
    name: "Deadlifts",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLOVRiUCTOpkH1GfM22mwgA03n2kZ_y-KxYA&s",
    description: "A compound movement that works the entire body.",
  },
  {
    id: 5,
    name: "Bicep Curls",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS53lOaga9uHgA5r2YLmhtXEL8CU39P_Tv1QQ&s",
    description: "Isolate your biceps for defined arms.",
  },
];

const workoutPlans = [
  {
    id: 1,
    name: "Beginner",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHBLpMaM0cwiaCTG1ZKxzia7GXrr7-bmfaLQ&s",
    description:
      "Start your fitness journey with simple and effective exercises.",
    route: "/beginner",
  },
  {
    id: 2,
    name: "Intermediate",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5ytMdrI3oiPtu0dXcLsENZ3VV2TpfqlNSRA&s",
    description: "Level up your fitness with more challenging exercises.",
    route: "/workout-plan/intermediate",
  },
  {
    id: 3,
    name: "Advanced",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2j3FlywArG-w5c83YYwzI4tv19K-yLPmI5g&s",
    description: "Push your limits with high-intensity and complex movements.",
    route: "/workout-plan/advanced",
  },
  {
    id: 4,
    name: "personalized workout plan",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAPx6T1GvVTIXY9ARHGv9UFPN7057s2hh2yQ&s",
    description: "Create your own workout plan",
    route: "/fitness-form",
  },
];

function GetStarted() {
  const navigate = useNavigate();

  const handleWorkoutClick = (workout) => {
    navigate(`/workout_analysis/${workout.id}`, {
      state: { workoutType: workout.name },
    });
  };

  // Handle the click event to navigate to the respective workout plan page
  const handleWorkoutPlanClick = (plan) => {
    navigate(plan.route); // Navigate based on the route defined in the plan object
  };

  return (
    <>
      <header className="bg-white shadow-md py-8 fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center px-4">
          <a href="#home" className="text-3xl font-bold text-orange-500">
            GymFluencer
          </a>

          {/* <nav className="hidden md:flex space-x-8 text-gray-700">
            <a href="#features" className="text-lg hover:text-orange-500">
              Features
            </a>
            <a href="#blog" className="text-lg hover:text-orange-500">
              Blog
            </a>
            <a href="#faqs" className="text-lg hover:text-orange-500">
              FAQs
            </a>
          </nav> */}

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

      <div className="hero-section1 bg-cover bg-center h-screen flex flex-col items-center justify-center text-black text-center pt-16">
        <h1 className="text-4xl md:text-5xl font-bold">
          Track Your Fitness Journey
        </h1>
        <p className="text-lg md:text-xl max-w-lg mt-4 font-bold">
          Discover the ultimate fitness companion with GymFluencer. Effortlessly
          log your workouts, count reps, and track calories burned. Stay
          motivated and achieve your goals with our user-friendly interface.
        </p>
      </div>

      <div className="container mx-auto py-10 mt-10">
        <h2 className="text-4xl font-bold text-center mb-6">
          Select Your Workout
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className="border rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-200"
              onClick={() => handleWorkoutClick(workout)}
            >
              <img
                src={workout.image}
                alt={workout.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold">{workout.name}</h3>
                <p className="text-gray-600">{workout.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workout Plan Section */}
      {/* Workout Plan Section */}
      <div className="container mx-auto py-10 mt-10">
        <h2 className="text-4xl font-bold text-center mb-6">
          Select Your Workout Plan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {workoutPlans.map((plan) => (
            <div
              key={plan.id}
              className="border rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-200"
              onClick={() => handleWorkoutPlanClick(plan)}
            >
              <img
                src={plan.image}
                alt={plan.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="text-gray-600">{plan.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; 2024 GymFluencer. All rights reserved.</p>
      </footer>
    </>
  );
}

export default GetStarted;
