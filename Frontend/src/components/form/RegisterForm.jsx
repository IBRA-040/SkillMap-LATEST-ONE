import { useState } from "react";
import PropTypes from "prop-types";
import confetti from "canvas-confetti";

const RegisterForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    birthdate: "",
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

    if (formData.password !== formData.password_confirmation) {
      setError("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          firstName: formData.first_name,
          lastName: formData.last_name,
          email: formData.email,
          password: formData.password,
          birthdate: formData.birthdate,
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error("Invalid server response");
      }

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccessMessage("Registration successful! Redirecting to login...");

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        birthdate: "",
      });

      setTimeout(() => {
        onLogin();
      }, 2000);
    } catch (err) {
      console.error("Registration Error:", err);
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full sm:w-md max-w-md sm:max-w-lg md:max-w-2xl bg-white shadow-lg rounded-4xl p-6 sm:p-10">
        <h1 className="text-sm sm:text-lg md:text-xl font-semibold text-primary">
          Create a new account
        </h1>

        {error && <p className="text-red-600 mt-4 text-start">{error}</p>}
        {successMessage && <p className="text-green-600 mt-4 text-center">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-6 gap-6">
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
              disabled={isLoading}
              className="w-full h-1 border-2 border-gray-200 rounded-xl p-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary disabled:opacity-50"
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
              disabled={isLoading}
              className="w-full  h-1 border-2 border-gray-200 rounded-xl p-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary disabled:opacity-50"
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
              disabled={isLoading}
              className="w-full  h-1 border-2 border-gray-200 rounded-xl p-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary disabled:opacity-50"
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
              disabled={isLoading}
              className="w-full h-1 border-2 border-gray-200 rounded-xl p-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary disabled:opacity-50"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="PasswordConfirmation"
              className="block text-sm font-medium text-gray-700"
            >
              Password Confirmation
            </label>
            <input
              type="password"
              id="PasswordConfirmation"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="w-full  h-1 border-2 border-gray-200 rounded-xl p-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary disabled:opacity-50"
            />
          </div>

          <div className="col-span-6">
            <label htmlFor="Birthdate" className="block text-sm font-medium text-gray-700">
              Birthdate
            </label>
            <input
              type="date"
              id="Birthdate"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="w-full h-1 sm:w-1/2 border-2 border-gray-200 rounded-xl p-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary disabled:opacity-50"
            />
          </div>

          <div className="col-span-6">
            <p className="text-sm text-gray-500">
              By creating an account, you agree to our
              <a href="#" className="text-gray-700 underline mx-1 hover:text-secondary">
                terms and conditions
              </a>
              and
              <a href="#" className="text-gray-700 underline mx-1 hover:text-secondary">
                privacy policy
              </a>
              .
            </p>
          </div>

          <div className="col-span-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-8 py-3 text-sm font-medium text-white bg-secondary border border-secondary rounded-md hover:bg-transparent hover:text-secondary transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isLoading ? "Creating account..." : "Create an account"}
            </button>
            <p className="text-sm text-gray-500">
              Already have an account?
              <button
                type="button"
                onClick={onLogin}
                className="ml-1 underline cursor-pointer hover:text-secondary"
                disabled={isLoading}
              >
                Log in
              </button>
              .
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

RegisterForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default RegisterForm;
