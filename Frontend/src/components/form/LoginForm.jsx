import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LoginForm = ({ onSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      const user = response.data.user;

      // Store user data in localStorage (excluding password)
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      // Redirect to account page
      navigate("/account");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="h-fit mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8 shadow-lg rounded-4xl bg-white">
      <div className="mx-auto md:w-2xl max-w-lg">
        <h1 className="text-black text-2xl font-semibold">Log In & Level Up Your Skills</h1>
      </div>

      <form onSubmit={handleLogin} className="mt-8 mb-0 max-w-md space-y-4">
        {error && <p className="text-red-500">{error}</p>}

        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-2xl p-4 text-sm shadow-md focus:outline-none"
            placeholder="Enter email"
            required
            autoComplete="email"
          />
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-2xl p-4 text-sm shadow-md focus:outline-none"
            placeholder="Enter password"
            required
            autoComplete="current-password"
          />
          <span
            className="absolute inset-y-0 end-0 grid place-content-center px-6 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <FontAwesomeIcon icon={faEyeSlash} className="text-gray-400 size-4" />
            ) : (
              <FontAwesomeIcon icon={faEye} className="text-gray-400 size-4" />
            )}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            No account?
            <button type="button" onClick={onSignUp} className="underline ms-2 cursor-pointer">
              Sign up
            </button>
          </p>

          <button
            type="submit"
            className="inline-block shrink-0 rounded-md border border-primary bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-primary cursor-pointer"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  onSignUp: PropTypes.func.isRequired,
};

export default LoginForm;
