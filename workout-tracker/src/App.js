// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Corrected import
import Home from "./Home";
import GetStarted from "./GetStarted";
import WorkoutAnalysis from "./workout_analysis";
import WeightLossDiet from "./DietPlan/WeightLossDiet";
import Beginner from "./workout_plan/Beginner";
import FitnessForm from "./workout_plan/FitnessForm";
import DietPlanForm from "./DietPlan/DietPlanForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/workout_analysis/:id" element={<WorkoutAnalysis />} />
        <Route path="/weight-loss-diet" element={<WeightLossDiet />} />
        <Route path="/beginner" element={<Beginner />} />
        <Route path="/fitness-form" element={<FitnessForm />} />
        <Route path="/Diet-form" element={<DietPlanForm />} />
      </Routes>
    </Router>
  );
}

export default App;
