import PropTypes from "prop-types";
import AccountMenu from "../button/AccountMenu";

const AccountHeader = () => {
  return (
    <div className="flex justify-between items-center bg-gray-100 px-10 py-3 gap-5 ">
      <div>
        <div className="flex">
          <h1 className="text-sm sm:text-l font-bold text-primary">Welcome Back</h1>
        </div>
        <p className="text-xs sm:text-l text-gray-500">Nice to see you! Have a great day</p>
      </div>
      <div className="flex items-center gap-4">
        <AccountMenu />
      </div>
    </div>
  );
};

AccountHeader.propTypes = {
  pathsCount: PropTypes.number.isRequired,
};

export default AccountHeader;
