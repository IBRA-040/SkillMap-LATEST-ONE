import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const RegisterForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    marketing_accept: false,
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    if (formData.password !== formData.password_confirmation) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/register", {
        firstName: formData.first_name,
        lastName: formData.last_name,
        email: formData.email,
        password: formData.password,
      });

      console.log("Response Data:", response.data);

      setSuccessMessage("Registration successful!");

      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        marketing_accept: false,
      });
    } catch (err) {
      console.error("Error Response:", err.response?.data);

      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="h-fit mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8 shadow-lg rounded-4xl bg-white">
      <h1 className="text-black text-2xl font-semibold">Create a new account</h1>

      {error && <p className="text-red-600 mt-2">{error}</p>}
      {successMessage && <p className="text-green-600 mt-2">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="FirstName"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-200 rounded-md bg-white text-sm text-gray-700 shadow-md focus:outline-none"
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="LastName"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-200 rounded-md bg-white text-sm text-gray-700 shadow-md focus:outline-none"
          />
        </div>

        <div className="col-span-6">
          <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-200 rounded-md bg-white text-sm text-gray-700 shadow-md focus:outline-none"
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-200 rounded-md bg-white text-sm text-gray-700 shadow-md focus:outline-none"
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
            Password Confirmation
          </label>
          <input
            type="password"
            id="PasswordConfirmation"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-200 rounded-md bg-white text-sm text-gray-700 shadow-md focus:outline-none"
          />
        </div>
        <div className="col-span-6">
          <p className="text-sm text-gray-500">
            By creating an account, you agree to our
            <a href="#" className="text-gray-700 underline mx-1">
              terms and conditions
            </a>
            and
            <a href="#" className="text-gray-700 underline mx-1">
              privacy policy
            </a>
            .
          </p>
        </div>

        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
          <button
            type="submit"
            className="inline-block shrink-0 rounded-md border border-secondary bg-secondary px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-secondary cursor-pointer"
          >
            Create an account
          </button>

          <p className="mt-4 text-sm text-gray-500 sm:mt-0">
            Already have an account?
            <button type="button" onClick={onLogin} className="ms-2 underline cursor-pointer">
              Log in
            </button>
            .
          </p>
        </div>
      </form>
    </div>
  );
};

RegisterForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default RegisterForm;
