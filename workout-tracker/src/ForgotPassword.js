import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    // Send request to check if the username exists
    try {
      const response = await fetch(
        "https://gym.birlaventures.com/api/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setIsUsernameValid(true); // Username exists, allow to reset password
        setErrorMessage(""); // Clear any previous errors
      } else {
        setErrorMessage(data.detail || "Username not found.");
      }
    } catch (error) {
      setErrorMessage("Error: Unable to process your request.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "https://gym.birlaventures.com/api/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            new_password: newPassword,
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setIsPasswordReset(true); // Password successfully reset
        setErrorMessage(""); // Clear any previous errors
      } else {
        setErrorMessage(data.detail || "Something went wrong.");
      }
    } catch (error) {
      setErrorMessage("Error: Unable to reset password.");
    }
  };

  const handleLoginClick = () => {
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Forgot Password
        </h2>

        <form onSubmit={handleForgotPassword} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-gray-700 text-lg">
              Enter your username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white text-lg rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send Reset Link
          </button>
        </form>

        {errorMessage && (
          <p className="text-red-500 text-center mt-4 text-lg">
            {errorMessage}
          </p>
        )}

        {isUsernameValid && !isPasswordReset && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-center mb-4 text-gray-700">
              Reset Your Password
            </h3>
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-gray-700 text-lg"
                >
                  New Password:
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700 text-lg"
                >
                  Confirm Password:
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-green-500 text-white text-lg rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Reset Password
              </button>
            </form>
          </div>
        )}

        {isPasswordReset && (
          <div className="text-center mt-6">
            <p className="text-green-500 text-lg">
              Password reset successful! Please log in with your new password.
            </p>
            <button
              onClick={handleLoginClick}
              className="mt-4 w-full py-3 bg-blue-500 text-white text-lg rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
