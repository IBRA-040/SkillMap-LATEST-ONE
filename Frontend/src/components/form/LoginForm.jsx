import { useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LoginForm = ({ onSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-sm sm:w-md  max-w-xl sm:max-w-2xl md:max-w-3xl bg-white shadow-lg rounded-4xl p-6 sm:p-10">
        <h1 className="text-sm sm:text-lg md:text-xl font-semibold justify-start text-primary">
          Log In & Level Up Your Skills
        </h1>

        <form onSubmit={handleLogin} className="mt-6 space-y-6">
          {error && <p className="text-red-500 text-start">{error}</p>}

          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl p-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              placeholder="Enter email"
              required
              autoComplete="email"
              disabled={isLoading}
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl p-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              placeholder="Enter password"
              required
              autoComplete="current-password"
              disabled={isLoading}
            />
            <span
              className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer"
              onClick={() => !isLoading && setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} className="text-gray-400 size-4" />
              ) : (
                <FontAwesomeIcon icon={faEye} className="text-gray-400 size-4" />
              )}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              No account?
              <button
                type="button"
                onClick={onSignUp}
                className="underline ml-1 cursor-pointer hover:text-primary"
                disabled={isLoading}
              >
                Sign up
              </button>
            </p>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 text-sm font-medium text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  onSignUp: PropTypes.func.isRequired,
};

export default LoginForm;
