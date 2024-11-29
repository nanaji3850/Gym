import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ data }) => {
  // Prepare chart data
  const chartData = {
    labels: data.map((item) => item.workout_type),
    datasets: [
      {
        label: "Total Reps",
        data: data.map((item) => item.total_reps),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Total Calories Burned",
        data: data.map((item) => item.total_calories),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  // Configure chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-gray-700 text-center mb-4">
        Workout Summary
      </h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
