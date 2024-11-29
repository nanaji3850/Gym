// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Corrected import
import Home from "./Home";
import GetStarted from "./GetStarted";
import ContactUs from "./ContactUs";
import WorkoutAnalysis from "./workout_analysis";
import WeightLossDiet from "./DietPlan/WeightLossDiet";
import MuscleBuilding from "./DietPlan/MuscleBuilding";
import Beginner from "./workout_plan/Beginner";
import FitnessForm from "./workout_plan/FitnessForm";
import DietPlanForm from "./DietPlan/DietPlanForm";
// import Workout_diet_planform from "./DietPlan/Workout_diet_planform";
import Intermediate from "./workout_plan/Intermediate";
import Advance from "./workout_plan/Advance";
import Blog from "./Blog/Blog";
import FitnessJourneyArticle from "./Blog/FitnessJourneyArticle";
import Top5_workout from "./Blog/Top5_workout";
import Nutrition_tips from "./Blog/Nutrition_tips";
import ImportantOfRestDays from "./Blog/ImportantOfRestDays";
import DietPlan from "./DietPlan/DietPlan";
import WorkoutPlanPage from "./workout_plan/WorkoutPlanPage";
import SignUp from "./SignUp";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import WorkoutDetails from "./WorkoutDetails";
import DietDetails from "./DietDetails";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/workout_analysis/:id" element={<WorkoutAnalysis />} />
        <Route path="/weight-loss-diet" element={<WeightLossDiet />} />
        <Route path="/muscle_building" element={<MuscleBuilding />} />
        <Route path="/beginner" element={<Beginner />} />
        <Route path="/intermediate" element={<Intermediate />} />
        <Route path="/advance" element={<Advance />} />
        <Route path="/fitness-form" element={<FitnessForm />} />
        <Route path="/Diet-form" element={<DietPlanForm />} />
        {/* <Route path="/workout_Diet-form" element={<Workout_diet_planform />} /> */}
        <Route path="/fitness-journey" element={<FitnessJourneyArticle />} />
        <Route path="/Top5_workout" element={<Top5_workout />} />
        <Route path="/Nutrition_tip" element={<Nutrition_tips />} />
        <Route path="/Rest_days" element={<ImportantOfRestDays />} />
        <Route path="/diet-plan" element={<DietPlan />} />
        <Route path="/workout-plans" element={<WorkoutPlanPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/workout-plan/:planId" element={<WorkoutDetails />} />
        <Route path="/diet-plan/:planId" element={<DietDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
