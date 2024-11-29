// import React, { useState } from "react";

// const UserInfoForm = () => {
//   const [formData, setFormData] = useState({
//     personal_information: {
//       age: "",
//       gender: "",
//       height: "",
//       weight: "",
//       activity_level: "",
//       fitness_level: "",
//       injuries: "",
//       medical_conditions: "",
//       exercise_experience: [],
//       goal: "",
//       specific_goal: "",
//     },
//     workout_preferences: {
//       focus_areas: [],
//       workout_types: [],
//       workout_setting: "",
//       days_available: [],
//       time_per_day: "",
//       exercise_types: [],
//       preferred_intensity: "",
//       targeted_duration: "",
//     },
//     diet_preferences: {
//       diet_type: "",
//       allergies: [],
//       dislikes: [],
//       nutritional_needs: "",
//       meals_per_day: "",
//       daily_diet: "",
//       meal_portion_size: "",
//       calorie_intake_goal: "",
//       macronutrient_ratio: "",
//     },
//   });

//   const handleChange = (section, field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         [field]: value,
//       },
//     }));
//   };

//   const handleArrayChange = (section, field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         [field]: [...value],
//       },
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//     alert("Form submitted! Check the console for details.");
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-md">
//       <h1 className="text-2xl font-bold text-center mb-4">
//         User Information Form
//       </h1>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Personal Information Section */}
//         <fieldset className="border rounded-md p-4">
//           <legend className="text-lg font-semibold">
//             Personal Information
//           </legend>
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               type="number"
//               placeholder="Age"
//               value={formData.personal_information.age}
//               onChange={(e) =>
//                 handleChange("personal_information", "age", e.target.value)
//               }
//               className="border p-2 rounded-md w-full"
//             />
//             <select
//               value={formData.personal_information.gender}
//               onChange={(e) =>
//                 handleChange("personal_information", "gender", e.target.value)
//               }
//               className="border p-2 rounded-md w-full"
//             >
//               <option value="">Gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//             <input
//               type="text"
//               placeholder="Height (cm)"
//               value={formData.personal_information.height}
//               onChange={(e) =>
//                 handleChange("personal_information", "height", e.target.value)
//               }
//               className="border p-2 rounded-md w-full"
//             />
//             <input
//               type="text"
//               placeholder="Weight (kg)"
//               value={formData.personal_information.weight}
//               onChange={(e) =>
//                 handleChange("personal_information", "weight", e.target.value)
//               }
//               className="border p-2 rounded-md w-full"
//             />
//             <input
//               type="text"
//               placeholder="Activity Level"
//               value={formData.personal_information.activity_level}
//               onChange={(e) =>
//                 handleChange(
//                   "personal_information",
//                   "activity_level",
//                   e.target.value
//                 )
//               }
//               className="border p-2 rounded-md w-full"
//             />
//             <input
//               type="text"
//               placeholder="Fitness Level"
//               value={formData.personal_information.fitness_level}
//               onChange={(e) =>
//                 handleChange(
//                   "personal_information",
//                   "fitness_level",
//                   e.target.value
//                 )
//               }
//               className="border p-2 rounded-md w-full"
//             />
//             <textarea
//               placeholder="Injuries"
//               value={formData.personal_information.injuries}
//               onChange={(e) =>
//                 handleChange("personal_information", "injuries", e.target.value)
//               }
//               className="border p-2 rounded-md w-full"
//             />
//             <textarea
//               placeholder="Medical Conditions"
//               value={formData.personal_information.medical_conditions}
//               onChange={(e) =>
//                 handleChange(
//                   "personal_information",
//                   "medical_conditions",
//                   e.target.value
//                 )
//               }
//               className="border p-2 rounded-md w-full"
//             />
//             <input
//               type="text"
//               placeholder="Exercise Experience"
//               value={formData.personal_information.exercise_experience.join(
//                 ", "
//               )}
//               onChange={(e) =>
//                 handleArrayChange(
//                   "personal_information",
//                   "exercise_experience",
//                   e.target.value.split(", ")
//                 )
//               }
//               className="border p-2 rounded-md w-full"
//             />
//             <input
//               type="text"
//               placeholder="Goal"
//               value={formData.personal_information.goal}
//               onChange={(e) =>
//                 handleChange("personal_information", "goal", e.target.value)
//               }
//               className="border p-2 rounded-md w-full"
//             />
//             <textarea
//               placeholder="Specific Goal"
//               value={formData.personal_information.specific_goal}
//               onChange={(e) =>
//                 handleChange(
//                   "personal_information",
//                   "specific_goal",
//                   e.target.value
//                 )
//               }
//               className="border p-2 rounded-md w-full"
//             />
//           </div>
//         </fieldset>

//         {/* Workout Preferences Section */}
//         <fieldset className="border rounded-md p-4">
//           <legend className="text-lg font-semibold">Workout Preferences</legend>
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               type="text"
//               placeholder="Focus Areas"
//               value={formData.workout_preferences.focus_areas.join(", ")}
//               onChange={(e) =>
//                 handleArrayChange(
//                   "workout_preferences",
//                   "focus_areas",
//                   e.target.value.split(", ")
//                 )
//               }
//               className="border p-2 rounded-md w-full"
//             />
//             <input
//               type="text"
//               placeholder="Workout Types"
//               value={formData.workout_preferences.workout_types.join(", ")}
//               onChange={(e) =>
//                 handleArrayChange(
//                   "workout_preferences",
//                   "workout_types",
//                   e.target.value.split(", ")
//                 )
//               }
//               className="border p-2 rounded-md w-full"
//             />
//             <input
//               type="text"
//               placeholder="Workout Setting"
//               value={formData.workout_preferences.workout_setting}
//               onChange={(e) =>
//                 handleChange(
//                   "workout_preferences",
//                   "workout_setting",
//                   e.target.value
//                 )
//               }
//               className="border p-2 rounded-md w-full"
//             />
//             <input
//               type="text"
//               placeholder="Days Available"
//               value={formData.workout_preferences.days_available.join(", ")}
//               onChange={(e) =>
//                 handleArrayChange(
//                   "workout_preferences",
//                   "days_available",
//                   e.target.value.split(", ")
//                 )
//               }
//               className="border p-2 rounded-md w-full"
//             />
//             <input
//               type="text"
//               placeholder="Time Per Day"
//               value={formData.workout_preferences.time_per_day}
//               onChange={(e) =>
//                 handleChange(
//                   "workout_preferences",
//                   "time_per_day",
//                   e.target.value
//                 )
//               }
//               className="border p-2 rounded-md w-full"
//             />
//             <input
//               type="text"
//               placeholder="Exercise Types"
//               value={formData.workout_preferences.exercise_types.join(", ")}
//               onChange={(e) =>
//                 handleArrayChange(
//                   "workout_preferences",
//                   "exercise_types",
//                   e.target.value.split(", ")
//                 )
//               }
//               className="border p-2 rounded-md w-full"
//             />
//             <input
//               type="text"
//               placeholder="Preferred Intensity"
//               value={formData.workout_preferences.preferred_intensity}
//               onChange={(e) =>
//                 handleChange(
//                   "workout_preferences",
//                   "preferred_intensity",
//                   e.target.value
//                 )
//               }
//               className="border p-2 rounded-md w-full"
//             />
//             <input
//               type="text"
//               placeholder="Targeted Duration"
//               value={formData.workout_preferences.targeted_duration}
//               onChange={(e) =>
//                 handleChange(
//                   "workout_preferences",
//                   "targeted_duration",
//                   e.target.value
//                 )
//               }
//               className="border p-2 rounded-md w-full"
//             />
//           </div>
//         </fieldset>

//         {/* Diet Preferences Section */}
//         <fieldset className="border rounded-md p-4">
//           <legend className="text-lg font-semibold">Diet Preferences</legend>
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               type="text"
//               placeholder="Diet Type"
//               value={formData.diet_preferences.diet_type}
//               onChange={(e) =>
//                 handleChange("diet_preferences", "diet_type", e.target.value)
//               }
//               className="border p-2 rounded-md w-full"
//             />
//             <input
//               type="text"
//               placeholder="Allergies"
//               value={formData.diet_preferences.allergies.join(", ")}
//               onChange={(e) =>
//                 handleArrayChange(
//                   "diet_preferences",
//                   "allergies",
//                   e.target.value.split(", ")
//                 )
//               }
//               className="border p-2 rounded-md w-full"
//             />
//             <input
//               type="text"
//               placeholder="Dislikes"
//               value={formData.diet_preferences.dislikes.join(", ")}
//               onChange={(e) =>
//                 handleArrayChange(
//                   "diet_preferences",
//                   "dislikes",
//                   e.target.value.split(", ")
//                 )
//               }
//               className="border p-2 rounded-md w-full"
//             />
//             <textarea
//               placeholder="Nutritional Needs"
//               value={formData.diet_preferences.nutritional_needs}
//               onChange={(e) =>
//                 handleChange(
//                   "diet_preferences",
//                   "nutritional_needs",
//                   e.target.value
//                 )
//               }
//               className="border p-2 rounded-md w-full"
//             />
//             <input
//               type="text"
//               placeholder="Meals Per Day"
//               value={formData.diet_preferences.meals_per_day}
//               onChange={(e) =>
//                 handleChange(
//                   "diet_preferences",
//                   "meals_per_day",
//                   e.target.value
//                 )
//               }
//               className="border p-2 rounded-md w-full"
//             />
//             <textarea
//               placeholder="Daily Diet"
//               value={formData.diet_preferences.daily_diet}
//               onChange={(e) =>
//                 handleChange("diet_preferences", "daily_diet", e.target.value)
//               }
//               className="border p-2 rounded-md w-full"
//             />
//             <textarea
//               placeholder="Meal Portion Size"
//               value={formData.diet_preferences.meal_portion_size}
//               onChange={(e) =>
//                 handleChange(
//                   "diet_preferences",
//                   "meal_portion_size",
//                   e.target.value
//                 )
//               }
//               className="border p-2 rounded-md w-full"
//             />
//             <input
//               type="text"
//               placeholder="Calorie Intake Goal"
//               value={formData.diet_preferences.calorie_intake_goal}
//               onChange={(e) =>
//                 handleChange(
//                   "diet_preferences",
//                   "calorie_intake_goal",
//                   e.target.value
//                 )
//               }
//               className="border p-2 rounded-md w-full"
//             />
//             <input
//               type="text"
//               placeholder="Macronutrient Ratio"
//               value={formData.diet_preferences.macronutrient_ratio}
//               onChange={(e) =>
//                 handleChange(
//                   "diet_preferences",
//                   "macronutrient_ratio",
//                   e.target.value
//                 )
//               }
//               className="border p-2 rounded-md w-full"
//             />
//           </div>
//         </fieldset>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600 transition"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UserInfoForm;
