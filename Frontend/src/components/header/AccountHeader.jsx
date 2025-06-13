import { useEffect, useState } from "react";
import AccountMenu from "../button/AccountMenu";

const AccountHeader = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
    if (storedUser.firstName) {
      setFirstName(storedUser.firstName);
    }
    if (storedUser.lastName) {
      setLastName(storedUser.lastName);
    }
  }, []);

  return (
    <div className="flex justify-between items-center bg-gray-50 px-6 sm:px-10 py-2 rounded-md shadow-sm">
      <div>
        <h1 className="text-base sm:text-lg font-semibold text-gray-800">
          Welcome back, <span className="text-primary"> {`${firstName} ${lastName}`}</span>!
        </h1>
      </div>

      <div className="flex items-center gap-x-4">
        <AccountMenu />
      </div>
    </div>
  );
};

export default AccountHeader;
