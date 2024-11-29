// src/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://gym.birlaventures.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Login successful", data);
        // Save token to localStorage (or sessionStorage) for further API requests
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("username", username);
        navigate("/"); // Redirect to home page
      } else {
        alert(data.detail); // Show error if username/password is incorrect
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  const handleSignupClick = () => {
    navigate("/signup"); // Redirect to signup page
  };

  const handleForgotPasswordClick = () => {
    navigate("/forgot-password"); // Redirect to forgot password page
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Input */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <span
              onClick={handleForgotPasswordClick}
              className="text-sm text-blue-500 cursor-pointer hover:underline"
            >
              Forgot Password?
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>

        {/* SignUp Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <span
              onClick={handleSignupClick}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              SignUp
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
