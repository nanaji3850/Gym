import React, { useEffect, useRef, useState } from "react";
import { Pose, POSE_CONNECTIONS } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import axios from "axios";

const CALORIES_PER_REP = {
  "Push-ups": 0.32,
  Squats: 0.31,
  "Pull-ups": 0.98,
  Deadlifts: 1.23,
  "Bicep Curls": 0.25,
};

const WorkoutTracker = ({ onWorkoutControl }) => {
  const videoRef = useRef(null);
  const [workoutType, setWorkoutType] = useState(""); // Initialize state for workoutType
  const workoutTypeRef = useRef("");
  const [BodyWeight, setBodyWeight] = useState("");
  const BodyWeightRef = useRef("");
  const canvasRef = useRef(null);
  const [reps, setReps] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  //   const [selectedWorkout, setSelectedWorkout] = useState(workoutType);
  const [camera, setCamera] = useState(null);
  const [isLeftDown, setIsLeftDown] = useState(false);
  const [isRightDown, setIsRightDown] = useState(false);
  const isLeftDownRef = useRef(false);
  const isRightDownRef = useRef(false);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [repsData, setRepsData] = useState("");
  const downAngleRef = useRef(0);
  const TopAngleRef = useRef(0);
  const upAngleRef = useRef(0);
  const repCountedRef = useRef(false); // Track if a rep has been counted
  const supportsPlaysInline = "playsInline" in HTMLVideoElement.prototype;

  const username = localStorage.getItem("username");
  console.log("user:", username);

  // Backend URL
  const backendUrl = "https://gym.birlaventures.com/api/workout-data"; // Replace with your backend's endpoint

  useEffect(() => {
    if (!isRunning) {
      // Prepare the data to send
      const data = {
        username,
        workoutType,
        reps,
        caloriesBurned,
        repsData,
      };
      console.log("Sending data to backend:", data);
      // Send data to the backend
      axios
        .post(backendUrl, data)
        .then((response) => {
          console.log("Data sent successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error sending data:", error);
        });
    }
  }, [isRunning]); // Trigger only when `isRunning` changes

  const angleBetweenThreePoints = (p1, p2, p3) => {
    const radians =
      Math.atan2(p3.y - p2.y, p3.x - p2.x) -
      Math.atan2(p1.y - p2.y, p1.x - p2.x);
    let angle = Math.abs(radians * (180.0 / Math.PI));
    if (angle > 180) angle = 360 - angle;
    return angle;
  };

  useEffect(() => {
    workoutTypeRef.current = workoutType;
    console.log("Workout type updated in ref:", workoutTypeRef.current);
  }, [workoutType]);

  useEffect(() => {
    BodyWeightRef.current = BodyWeight;
    console.log("BodyWeight updated in ref:", BodyWeightRef.current);
  }, [BodyWeight]);

  //   useEffect(() => {
  //     if (workoutType) {
  //       setSelectedWorkout(workoutType);
  //       console.log("SelectedWorkout:", selectedWorkout);
  //     }
  //   }, [workoutType]);

  useEffect(() => {
    isLeftDownRef.current = isLeftDown;
  }, [isLeftDown]);

  useEffect(() => {
    isRightDownRef.current = isRightDown;
  }, [isRightDown]);

  const checkWorkout = (
    workoutType,
    shoulder,
    elbow,
    wrist,
    hip,
    knee,
    ankle,
    isDown,
    setDown,
    setUp
  ) => {
    console.log("workout:", workoutType);
    const workouts = {
      "Bicep Curls": () => {
        const angle = angleBetweenThreePoints(shoulder, elbow, wrist);
        console.log("Bicep curl angle:", angle, "Is Down:", isDown);
        if (angle > 160) {
          setDown(true);
          downAngleRef.current = Math.max(downAngleRef.current, angle);
        }
        if (angle < 60 && isDown) {
          setDown(false); // Arm bent, complete rep
          upAngleRef.current = Math.max(upAngleRef.current, angle); // Capture "up" angle
          return true; // Count rep
        }
        return false;
      },
      "Push-ups": () => {
        const angle = angleBetweenThreePoints(shoulder, elbow, wrist);
        console.log("Pushup angle:", angle, "Is Down:", isDown);
        if (angle > 160) {
          setDown(true); // Body straight, start rep
          upAngleRef.current = Math.max(upAngleRef.current, angle);
        }
        if (angle < 90 && isDown) {
          setDown(false); // Body lowered, complete rep
          // setDown(angle);
          downAngleRef.current = Math.max(downAngleRef.current, angle);
          return true; // Count rep
        }
        return false;
      },
      "Pull-ups": () => {
        const angle = angleBetweenThreePoints(shoulder, elbow, wrist);
        console.log("Pull-up angle:", angle, "Is Down:", isDown);
        if (angle > 160) {
          setDown(true); // Arms extended, start rep
          downAngleRef.current = Math.max(downAngleRef.current, angle);
        }
        if (angle < 70 && isDown) {
          setDown(false); // Arms bent, complete rep
          upAngleRef.current = Math.max(upAngleRef.current, angle); // Capture "up" angle
          return true; // Count rep
        }
        return false;
      },

      Squats: () => {
        const angle = angleBetweenThreePoints(hip, knee, ankle);
        console.log("Squat angle:", angle, "Is Down:", isDown);
        if (angle > 160) {
          setDown(true); // Standing position, start rep
          upAngleRef.current = Math.max(upAngleRef.current, angle);
        }
        if (angle < 70 && isDown) {
          setDown(false); // Squat position, complete rep
          downAngleRef.current = Math.max(downAngleRef.current, angle);
          return true; // Count rep
        }
        return false;
      },
      Deadlifts: () => {
        const angle = angleBetweenThreePoints(shoulder, hip, knee);
        console.log("Deadlift angle:", angle, "Is Down:", isDown);
        if (angle > 170) {
          setDown(true); // Standing position, start rep
          upAngleRef.current = Math.max(upAngleRef.current, angle);
        }
        if (angle < 100 && isDown) {
          setDown(false); // Lowered position, complete rep
          downAngleRef.current = Math.max(downAngleRef.current, angle);
          return true; // Count rep
        }
        return false;
      },
    };
    return workouts[workoutType]?.() || false;
  };

  const handleWorkoutLogic = (landmarks) => {
    console.log("Handling workout logic...");

    console.log("workoutType from ref222:", workoutTypeRef.current);

    const leftShoulder = landmarks[11];
    const leftElbow = landmarks[13];
    const leftWrist = landmarks[15];
    const leftHip = landmarks[23];
    const leftKnee = landmarks[25];
    const leftAnkle = landmarks[27];

    const rightShoulder = landmarks[12];
    const rightElbow = landmarks[14];
    const rightWrist = landmarks[16];
    const rightHip = landmarks[24];
    const rightKnee = landmarks[26];
    const rightAnkle = landmarks[28];

    // console.log(
    //   "Left side landmarks:",
    //   leftShoulder,
    //   leftElbow,
    //   leftWrist,
    //   leftHip,
    //   leftKnee,
    //   leftAnkle
    // );
    // console.log(
    //   "Right side landmarks:",
    //   rightShoulder,
    //   rightElbow,
    //   rightWrist,
    //   rightHip,
    //   rightKnee,
    //   rightAnkle
    // );
    const workoutType = workoutTypeRef.current;

    let leftCount = checkWorkout(
      workoutType,
      leftShoulder,
      leftElbow,
      leftWrist,
      leftHip,
      leftKnee,
      leftAnkle,
      isLeftDownRef.current, // Use the ref here
      (value) => {
        setIsLeftDown(value);
        isLeftDownRef.current = value; // Update the ref immediately
      },
      (angle) => {
        upAngleRef.current = angle; // Capture the "up" angle
      }
    );

    let rightCount = checkWorkout(
      workoutType,
      rightShoulder,
      rightElbow,
      rightWrist,
      rightHip,
      rightKnee,
      rightAnkle,
      isRightDownRef.current,
      (value) => {
        setIsRightDown(value);
        isRightDownRef.current = value;
      },

      (angle) => {
        upAngleRef.current = angle; // Capture the "up" angle
      }
    );

    console.log("Left rep count:", leftCount, "Right rep count:", rightCount);

    if ((leftCount || rightCount) && !repCountedRef.current) {
      repCountedRef.current = true; // Prevent counting the same rep twice
      updateRepsAndData();
    }
  };
  const updateRepsAndData = () => {
    setReps((prev) => {
      const newReps = prev + 1;
      console.log("Rep counted. Total reps:", newReps);
      // Calculate calories burned
      const calories =
        CALORIES_PER_REP[workoutTypeRef.current] * (BodyWeightRef.current / 70);
      setCaloriesBurned((prev) => prev + calories);

      // Add rep data
      const currentDownAngle = downAngleRef.current;
      const currentUpAngle = upAngleRef.current;

      // Add rep data
      setRepsData((prev) => {
        // Prevent duplicate updates using a flag or additional condition
        const lastLoggedRep = parseInt(
          prev
            .split("\n")
            .slice(-2)[0]
            ?.match(/Rep: (\d+)/)?.[1],
          10
        );
        if (lastLoggedRep === newReps) {
          console.log(`Duplicate Rep detected: ${newReps}, skipping update.`);
          return prev; // Skip duplicate entries
        }
        const newRepData = `Rep: ${newReps}, Angle (down): ${currentDownAngle}, Angle (up): ${currentUpAngle}\n`;

        console.log("11:", newRepData);
        return prev + newRepData;
      });

      // Delay angle reset to avoid logging zero
      setTimeout(() => {
        downAngleRef.current = 0;
        upAngleRef.current = 0;
        repCountedRef.current = false; // Reset rep count flag after a delay
      }, 500);

      return newReps;
    });
  };

  const onResults = (results) => {
    console.log("Is running:", isRunning);
    console.log("workoutType in ref:", workoutTypeRef.current);

    if (!isRunning) return;

    // console.log("Pose results:", results);
    // console.log("Pose landmarks:", results.poseLandmarks);

    if (!results.poseLandmarks) {
      console.error("Pose landmarks not detected.");
      return;
    }

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    canvasElement.width = videoRef.current.videoWidth;
    canvasElement.height = videoRef.current.videoHeight;

    // console.log(
    //   "Canvas dimensions:",
    //   canvasElement.width,
    //   canvasElement.height
    // );

    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    console.log("Drawing landmarks on canvas...");

    if (results.poseLandmarks) {
      console.log("Received pose landmarks:", results.poseLandmarks);
      drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
        color: "#00FF00",
        lineWidth: 4,
      });
      drawLandmarks(canvasCtx, results.poseLandmarks, {
        color: "#FF0000",
        lineWidth: 2,
      });
      console.log("workoutType from ref111:", workoutTypeRef.current);
      handleWorkoutLogic(results.poseLandmarks);
    } else {
      console.error("Pose landmarks not detected.");
      return;
    }
  };

  useEffect(() => {
    const pose = new Pose({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });
    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    console.log("Pose model initialized:", pose);
    pose.onResults(onResults);

    if (videoRef.current) {
      console.log("Video element ready:", videoRef.current);
      console.log("Video playing?", !videoRef.current.paused);

      const cam = new Camera(videoRef.current, {
        onFrame: async () => {
          console.log("Sending frame to pose model...");
          try {
            await pose.send({ image: videoRef.current });
          } catch (error) {
            console.error("Error sending frame to pose model:", error);
          }
        },
        width: 1280,
        height: 720,
      });
      setCamera(cam);
    }
  }, []);

  const startWorkout = (type, weight) => {
    setWorkoutType(type);
    setBodyWeight(weight);
    setReps(0);
    setCaloriesBurned(0);
    setRepsData("");
    setIsRunning(true);
    camera
      ?.start()
      .catch((error) => console.error("Camera start failed:", error));
  };

  const stopWorkout = () => {
    setIsRunning(false);
    camera?.stop();
  };

  useEffect(() => {
    if (onWorkoutControl) {
      onWorkoutControl({
        startWorkout,
        stopWorkout,
      });
    }
  }, [onWorkoutControl, camera]);

  return (
    <div className="relative">
      <div className="absolute top-4 left-4 bg-gray-800 text-white py-2 px-4 rounded-lg shadow-md z-10">
        Reps: {reps}
      </div>
      <div className="absolute top-16 left-4 bg-gray-800 text-white py-2 px-4 rounded-lg shadow-md z-10">
        Calories: {caloriesBurned.toFixed(2)}
      </div>
      {/* <pre>{repsData}</pre> */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        playsInline={supportsPlaysInline}
        muted
      ></video>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      ></canvas>
    </div>
  );
};

export default WorkoutTracker;
