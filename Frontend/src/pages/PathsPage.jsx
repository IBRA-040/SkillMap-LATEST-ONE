import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSwaps } from "../Context/SwapContext";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const PathsPage = () => {
  const { swappedItems, setSwappedItems } = useSwaps();
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleDeleteClick = (index) => {
    setSelectedIndex(index);
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    const updatedItems = swappedItems.filter((_, i) => i !== selectedIndex);
    setSwappedItems(updatedItems);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex items-center gap-2 mb-6">
        <Link to="/account">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="text-2xl text-gray-700 hover:text-gray-900 transition"
          />
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Your Paths</h1>
      </div>

      {/* Path Table */}
      {swappedItems.length > 0 ? (
        <div className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 bg-gray-800 text-white font-semibold text-xs sm:text-sm md:text-base p-4 text-center">
            <div className="text-left">Path Title</div>
            <div>Offered By</div>
            <div className="hidden lg:block">Status</div>
            <div>Actions</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {swappedItems.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 py-3 px-2 sm:px-4 hover:bg-gray-100 transition items-center text-center"
              >
                <div className="text-gray-800 font-medium text-left">{item.title}</div>
                <div className="text-gray-600">{item.offeredBy}</div>
                <div className="hidden lg:block">
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-semibold 
                      ${
                        item.status === "On-site"
                          ? "bg-yellow-200 text-yellow-800"
                          : item.status === "Online"
                          ? "bg-green-200 text-green-800"
                          : !item.status
                          ? "bg-red-200 text-red-800"
                          : "bg-gray-200 text-gray-800"
                      }`}
                  >
                    {item.status ? item.status : "Incomplete"}
                  </span>
                </div>
                <div>
                  <button
                    onClick={() => handleDeleteClick(index)}
                    className="text-red-500 hover:text-red-700 transition cursor-pointer"
                    title="Remove Path"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-4 text-gray-600 text-center text-lg">No Paths added yet.</p>
      )}

      {/* MUI Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="font-bold">Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this path?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PathsPage;
