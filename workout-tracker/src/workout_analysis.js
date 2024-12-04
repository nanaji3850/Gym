import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

function WorkoutAnalysis() {
  const [file, setFile] = useState(null);
  const [source, setSource] = useState("file");
  const [summary, setSummary] = useState(null);
  const [frame, setFrame] = useState(null);
  const [error, setError] = useState("");
  const [bodyWeight, setBodyWeight] = useState("");
  const [feedback, setFeedback] = useState("");
  const location = useLocation();
  const workoutType = location.state?.workoutType || "";
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const videoRef = useRef(null); // Reference to the video element
  const mediaStream = useRef(null); // Reference to hold the video stream
  const [isSocketOpen, setIsSocketOpen] = useState(false);
  const [isWorkoutRunning, setIsWorkoutRunning] = useState(false); // Workout running state
  const frameInterval = useRef(null); // Reference for frame sending interval
  const [data, setData] = useState([]); // Workout data
  const [loading, setLoading] = useState(false); // Loading state
  const [isFileUploaded, setIsFileUploaded] = useState(false); // Track if file is uploaded
  const [uploadProgress, setUploadProgress] = useState(0); // Track upload progress
  const username = localStorage.getItem("username");

  // Register chart.js components
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement // For Pie Charts
  );

  // Fetch aggregated workout data
  useEffect(() => {
    fetch(
      `https://gym.birlaventures.com/api/get-aggregated-data?user_id=${username}` // Replace with actual API
    )
      .then((res) => res.json())
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  // WebSocket setup and message handling
  useEffect(() => {
    const ws = new WebSocket("wss://gym.birlaventures.com/ws");
    setSocket(ws);

    ws.onopen = () => {
      console.log("WebSocket connection established");
      setIsSocketOpen(true); // Mark WebSocket as open
    };

    ws.onmessage = async (event) => {
      setLoading(false); // Stop loading when a frame or data is received
      if (event.data instanceof Blob) {
        // Handle binary data (image frame)
        const arrayBuffer = await event.data.arrayBuffer();
        const base64String = btoa(
          new Uint8Array(arrayBuffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        setFrame(`data:image/jpeg;base64,${base64String}`);
      } else {
        try {
          // Handle JSON data (summary, feedback, etc.)
          const data = JSON.parse(event.data);
          console.log("Data received from WebSocket:", data);
          if (data.hasOwnProperty("frame")) {
            setFrame(`data:image/jpeg;base64,${data.frame}`);
          } else if (data.hasOwnProperty("summary")) {
            setSummary(data.summary);
          } else if (data.hasOwnProperty("feedback")) {
            setFeedback(data.feedback);
          }
        } catch (error) {
          console.error("Failed to parse JSON:", error);
        }
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  // Start video stream using camera
  const startVideoStream = async () => {
    try {
      mediaStream.current = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      videoRef.current.srcObject = mediaStream.current;
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Error accessing camera. Please ensure camera permissions are granted.");
    }
  };

  // Stop video stream
  const stopVideoStream = () => {
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => track.stop());
      mediaStream.current = null;
    }
  };

  // Send video frame to WebSocket
  const sendVideoFrame = () => {
    if (socket.readyState !== WebSocket.OPEN) {
      console.log(
        "Cannot send frame: Workout not running or WebSocket not open."
      );
      return;
    }

    const canvas = document.createElement("canvas");
    const video = videoRef.current;

    if (!video.videoWidth || !video.videoHeight) {
      console.log("Video not yet ready to send frames.");
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const frameData = canvas.toDataURL("image/jpeg");

    console.log("Sending frame to backend...");

    socket.send(
      JSON.stringify({
        action: "video_frame",
        frame: frameData.split(",")[1],
        workout_type: workoutType,
        body_weight: parseFloat(bodyWeight),
        username: username,
      })
    );
  };

  // Modify the file upload function to track progress
  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return fetch("https://gym.birlaventures.com/api/upload", {
      method: "POST",
      body: formData,
      headers: {
        // Add headers if needed (e.g., Authorization)
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          setUploadProgress(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );
        }
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("File uploaded successfully");
        setIsFileUploaded(true); // Mark file as uploaded
        setUploadProgress(100); // Ensure progress shows as 100% when upload completes
        return data.filename;
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        setError("Error uploading file. Please try again.");
        setUploadProgress(0); // Reset progress on error
        return null;
      });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Ensure only one file is selected
    if (file) {
      setError("You can only upload one video at a time.");
      return;
    }

    setFile(selectedFile);
    setIsFileUploaded(false); // Reset the uploaded state when a new file is selected
    setUploadProgress(0); // Reset the progress bar
  };

  const handleUpload = async () => {
    if (!bodyWeight) {
      setError("Please enter your body weight.");
      return;
    }

    const parsedBodyWeight = parseFloat(bodyWeight);
    setLoading(true); // Start loading when the workout begins

    if (source === "file") {
      if (!file) {
        setError("Please select a file to upload.");
        setLoading(false);
        return;
      }

      // Now trigger the file upload manually on button click
      const filename = await uploadFile(file);
      if (filename) {
        socket.send(
          JSON.stringify({
            action: "start_workout",
            source: "file",
            filename: filename,
            workout_type: workoutType,
            body_weight: parsedBodyWeight,
            username: username,
          })
        );
      } else {
        console.error("File upload failed; workout not started.");
        setLoading(false);
      }
    } else if (source === "0") {
      startVideoStream();
      setIsWorkoutRunning(true);
      frameInterval.current = setInterval(sendVideoFrame, 100); // Send 10 frames per second
    }
  };

  const handleSourceChange = (e) => {
    setSource(e.target.value);
    setFile(null);
    setError("");
    setIsFileUploaded(false);
    setUploadProgress(0); // Reset progress when changing source
  };

  const handleStopWorkout = () => {
    setIsWorkoutRunning(false);

    clearInterval(frameInterval.current);
    stopVideoStream();
    if (socket && socket.readyState === WebSocket.OPEN) {
      console.log("Sending stop_workout action to backend...");
      socket.send(
        JSON.stringify({
          action: "stop_workout",
          workout_type: workoutType,
          username: username,
        })
      );
    } else {
      console.error("WebSocket is not open. Unable to send stop_workout action.");
    }
  };

  return (
    <Layout>
      <div className="hero-section2 bg-cover bg-center h-screen flex flex-col items-center justify-center text-white text-center pt-16">
          <h1 className="text-4xl md:text-5xl font-bold">
            Track Your Fitness Journey
          </h1>
          <p className="text-lg md:text-xl max-w-lg mt-4">
            Discover the ultimate fitness companion with GymFluencer.
            Effortlessly log your workouts, count reps, and track calories
            burned. Stay motivated and achieve your goals with our user-friendly
            interface.
          </p>
        </div>
      <section className="flex flex-col items-center w-full p-8 mt-20">
        <div className="bg-blue-50 p-10 rounded-lg shadow-lg w-full max-w-2xl mb-12">
          <h2 className="text-3xl font-semibold mb-6">Workout Tracker</h2>

          <div className="mb-4">
            <label className="text-lg">Enter Body Weight (kg):</label>
            <input
              type="number"
              value={bodyWeight}
              onChange={(e) => setBodyWeight(e.target.value)}
              className="border rounded p-2 w-full mb-5 text-lg"
            />
          </div>

          <div className="flex justify-around mb-4">
            <label className="flex items-center text-lg">
              <input
                type="radio"
                value="file"
                checked={source === "file"}
                onChange={handleSourceChange}
                className="mr-2"
              />
              Upload a Recorded Video
            </label>
            <label className="flex items-center text-lg">
              <input
                type="radio"
                value="0"
                checked={source === "0"}
                onChange={handleSourceChange}
                className="mr-2"
              />
              Use Live Camera
            </label>
          </div>

          {source === "file" && (
            <div>
              <input
                type="file"
                onChange={handleFileChange}
                className="border rounded p-3 w-full mb-5 text-lg"
                disabled={isFileUploaded} // Disable after file is uploaded
              />
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mb-4">
                  <p>Uploading: {uploadProgress}%</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {source === "0" && (
            <div>
              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full h-64 rounded-lg mb-5"
              />
            </div>
          )}

          {error && <p className="text-red-500 text-lg">{error}</p>}

          <button
            className="bg-gray-800 text-white rounded p-3 w-full mb-3 text-lg hover:bg-gray-700"
            onClick={handleUpload}
            disabled={isFileUploaded || loading} // Disable the button if uploaded or uploading
          >
            {isFileUploaded ? "Uploaded" : loading ? "Uploading..." : "Start Workout"}
          </button>
          <button
            onClick={handleStopWorkout}
            className="bg-gray-800 text-white rounded p-3 w-full mb-3 text-lg hover:bg-gray-700"
          >
            Stop Workout
          </button>

          {loading && (
            <div className="loading-spinner">Processing your workout...</div>
          )}

          {frame && !loading && (
            <div className="mt-6">
              <img
                src={frame}
                alt="Workout Frame"
                className={`rounded-lg shadow-md ${source === "0"
                    ? "w-screen h-auto max-h-screen object-contain"
                    : "w-full"
                  }`}
              />
            </div>
          )}
        </div>
         {/* Workout Summary Section */}
         {summary && Object.keys(summary).length > 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mb-8 mx-auto text-center">
              <h2 className="text-2xl font-semibold mb-6">Workout Summary</h2>
              {Object.keys(summary).map((workout) => (
                <div key={workout} className="my-4">
                  <p className="text-xl">
                    <strong className="font-semibold">Workout:</strong>{" "}
                    {workout}
                  </p>
                  <p className="text-lg mt-2">
                    <strong className="font-semibold">Total Reps:</strong>
                    {summary[workout].reps || 0}
                  </p>
                  <p className="text-lg mt-2">
                    <strong className="font-semibold">Total Calories:</strong>
                    {(summary[workout].calories || 0).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
          {/* Real-time Feedback Section */}
          {feedback && (
            <div className="bg-white p-6 rounded-lg shadow-lg w-full mx-8 my-4">
              <h4 className="text-lg font-semibold mb-3">Real-time Feedback</h4>
              <p>
                {typeof feedback === "string"
                  ? feedback
                  : JSON.stringify(feedback)}
              </p>
            </div>
          )}
      </section>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center gap-8 p-4">
          {loading ? (
            <div className="text-gray-700 text-lg">Loading...</div>
          ) : (
            <>
              <div className="w-full max-w-5xl">
                <BarChart data={data} />
              </div>
              <div className="w-full max-w-2xl">
                <PieChart data={data} />
              </div>
            </>
          )}
        </div>

        <section className="flex flex-wrap justify-center items-center gap-6 w-full p-8 bg-gray-50">
          <h2 className="text-4xl font-semibold mb-6 w-full text-center">
            Diet Plan
          </h2>

          {/* Diet Plans */}
          {[
            {
              id: 1,
              name: "personalize Diet Plan",
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
          ].map((diet) => (
            <div
              key={diet.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
              onClick={() => {
                if (diet.name === "Weight Loss (Fat Loss) Diet Plan") {
                  navigate("/weight-loss-diet"); // Navigate to the weight loss diet page
                } else if (diet.name === "personalize Diet Plan") {
                  navigate("/Diet-form"); // Navigate to another specific diet page
                } else if (
                  diet.name === "Muscle Building (Hypertrophy) Diet Plan"
                ) {
                  navigate("/muscle_building"); // Navigate to another specific diet page
                } else {
                  // Handle other diet plans as necessary
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
                <h3 className="text-lg font-semibold">{diet.name}</h3>
                <p className="text-gray-600">
                  A description of the {diet.name}.
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* New Section Before Footer */}
        <footer className="bg-gray-800 text-white text-center py-4">
          <p>&copy; 2024 GymFluencer. All rights reserved.</p>
        </footer>
    </Layout>
  );
}

export default WorkoutAnalysis;
