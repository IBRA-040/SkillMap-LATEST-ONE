import { useEffect, useState } from "react";
import AccountMenu from "../button/AccountMenu";
import LogoutIcon from "@mui/icons-material/Logout";

const AccountHeader = () => {
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
    if (storedUser.firstName) {
      setFirstName(storedUser.firstName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    window.location.href = "/";
  };

  return (
    <div className="flex justify-between items-center bg-gray-50 px-6 sm:px-10 py-4 rounded-md shadow-sm">
      <div>
        <h1 className="text-base sm:text-lg font-semibold text-gray-800">
          Welcome back, <span className="text-primary">{firstName}</span>!
        </h1>
        <p className="text-sm text-gray-500">Nice to see you! Have a great day.</p>
      </div>

      <div className="flex items-center gap-x-4">
        <AccountMenu />
        <button
          onClick={handleLogout}
          aria-label="Logout"
          className="text-red-600 hover:text-red-800 transition-colors duration-200 cursor-pointer"
        >
          <LogoutIcon sx={{ fontSize: 28 }} />
        </button>
      </div>
    </div>
  );
};

export default AccountHeader;
