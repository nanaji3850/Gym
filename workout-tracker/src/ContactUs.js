import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "./Layout";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://gym.birlaventures.com/api/submit_contact_form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Something went wrong");
      }

      const result = await response.json();
      console.log("Success:", result);
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };
  const navigate = useNavigate();
  const handleGetStartedClick = () => {
    navigate("/get-started"); // Use navigate to go to GetStarted page
  };

  return (
    <>
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-blue-100 p-6 mt-20">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 max-w-5xl w-full">
            {/* Left Side */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-4xl font-extrabold text-blue-700 mb-4 transition-transform duration-300 transform hover:scale-110">
                Need More Help?
              </h1>
              <p className="text-gray-700 text-lg font-semibold">
                Contact us for any additional questions or support regarding the
                app.
              </p>
            </div>

            {/* Right Side */}
            <div className="lg:w-1/2">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <p className="text-red-500 text-center font-semibold">
                      {error}
                    </p>
                  )}

                  <div>
                    <label
                      htmlFor="name"
                      className="block text-2xl font-bold text-gray-700 "
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full bg-gray-50 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      // placeholder="Your Name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-2xl font-bold text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full bg-gray-50 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      // placeholder="Your Email"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-2xl font-bold text-gray-700"
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full bg-gray-50 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      // placeholder="Your Message"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2"
                  >
                    Contact Support
                  </button>
                </form>
              ) : (
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-green-600 mb-4">
                    Thank You!
                  </h2>
                  <p className="text-gray-700">
                    We have received your message and will get back to you
                    shortly.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <footer className="bg-gray-800 text-white text-center py-4">
          <p>&copy; 2024 GymFluencer. All rights reserved.</p>
        </footer>
      </Layout>
    </>
  );
};

export default ContactUs;
