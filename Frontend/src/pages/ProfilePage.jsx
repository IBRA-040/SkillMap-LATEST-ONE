import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUser,
  faEnvelope,
  faCalendarAlt,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";
import { getUserById, updateUserById } from "../Data/Api";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
        
        if (!token || !storedUser?.id) {
          setError("Please log in to view your profile");
          setLoading(false);
          navigate("/login");
          return;
        }

        const user = await getUserById(storedUser.id);
        setUserData(user);
        setFormData({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          birthdate: user.birthdate,
        });
      } catch (err) {
        if (err.message.includes("401") || err.message.includes("unauthorized")) {
          setError("Your session has expired. Please log in again.");
          localStorage.removeItem("token");
          localStorage.removeItem("loggedInUser");
          navigate("/login");
        } else {
          setError(err.message || "Failed to fetch user data. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setError(null);
      const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
      const updatedUser = await updateUserById(storedUser.id, formData);
      setUserData({ ...userData, ...updatedUser });
      setIsEditing(false);
    } catch (err) {
      if (err.message.includes("401") || err.message.includes("unauthorized")) {
        setError("Your session has expired. Please log in again.");
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        navigate("/login");
      } else {
        setError(err.message || "Failed to update profile. Please try again later.");
      }
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );

  if (!userData)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">User not found.</span>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary px-6 py-4">
        <div className="flex items-center gap-3">
          <Link to="/account" className="text-white hover:text-gray-200 transition-colors">
            <FontAwesomeIcon icon={faArrowLeft} className="text-xl" />
          </Link>
          <h2 className="text-2xl font-bold text-white">Your Profile</h2>
        </div>
      </div>

      <div className="px-10 py-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <FontAwesomeIcon icon={faUser} className="text-primary text-xl" />
            <div>
              <p className={`text-sm text-gray-500 ${isEditing ? "hidden" : ""}`}>Full Name</p>

              {isEditing ? (
                <div className="flex items-center gap-2">
                  <div>
                    <p className="text-sm text-gray-500">First Name</p>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="border px-2 py-1 rounded"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Name</p>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="border px-2 py-1 rounded"
                    />
                  </div>
                </div>
              ) : (
                <p className="font-semibold text-gray-800">{`${userData.firstName} ${userData.lastName}`}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <FontAwesomeIcon icon={faEnvelope} className="text-primary text-xl" />
            <div>
              <p className="text-sm text-gray-500">Email Address</p>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded"
                />
              ) : (
                <p className="font-semibold text-gray-800">{userData.email}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-primary text-xl" />
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              {isEditing ? (
                <input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded"
                />
              ) : (
                <p className="font-semibold text-gray-800">
                  {new Date(userData.birthdate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2 my-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-800 text-white px-4 py-2 rounded-4xl cursor-pointer"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-4xl cursor-pointer"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex gap-2 items-center bg-primary text-white px-4 py-2 rounded-4xl cursor-pointer"
            >
              <FontAwesomeIcon icon={faUserPen} />
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
