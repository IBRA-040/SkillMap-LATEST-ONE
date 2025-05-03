// src/pages/ProfilePage.js
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getUserById } from "../Data/Api";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (!storedUser?.id) {
          setError("User not logged in");
          setLoading(false);
          return;
        }

        const user = await getUserById(storedUser.id);
        setUserData(user);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div className="p-4 text-gray-500">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!userData) return <div className="p-4 text-red-500">User not found.</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto bg-white shadow-md rounded-md mt-6">
      <div className="flex gap-3">
        <Link to="/account" className="text-primary text-xl sm:text-2xl">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <h2 className="text-2xl font-bold mb-4 text-primary">Your Profile</h2>
      </div>
      <div className="space-y-3">
        <div>
          <strong>Name:</strong> {`${userData.firstName} ${userData.lastName}`}
        </div>

        <div>
          <strong>Email:</strong> {userData.email}
        </div>
        <div>
          <strong>Date Of Birth:</strong>{" "}
          {new Date(userData.birthdate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
