import { useState, useEffect } from "react";
import { IconButton, Avatar, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import { updateUserById } from "../../Data/Api";
import ProfilePopover from "./ProfilePopover";

const AccountMenu = () => {
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    birthdate: "",
  });

  const [formData, setFormData] = useState({});
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      const correctedDate = new Date(storedUser.birthdate).toLocaleDateString("en-CA");
      setUser(storedUser);
      setFormData({
        firstName: storedUser.firstName,
        lastName: storedUser.lastName,
        email: storedUser.email,
        birthdate: correctedDate,
      });
    }
  }, []);

  const getInitials = (first, last) => `${first?.[0] || ""}${last?.[0] || ""}`.toUpperCase();

  const handleAvatarClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };

  const handleEditProfile = () => {
    setPopoverAnchor(menuAnchor);
    handleCloseMenu();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    window.location.href = "/";
  };

  const handlePopoverClose = () => setPopoverAnchor(null);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      const updatedUser = await updateUserById(user.id, formData);
      const correctedDate = new Date(updatedUser.birthdate).toLocaleDateString("en-CA");
      const cleanedUser = { ...updatedUser, birthdate: correctedDate };
      localStorage.setItem("loggedInUser", JSON.stringify(cleanedUser));
      setUser(cleanedUser);
      handlePopoverClose();
    } catch (err) {
      console.error(err);
      setError("Failed to update profile. Try again.");
    }
  };

  const popoverOpen = Boolean(popoverAnchor);
  const menuOpen = Boolean(menuAnchor);

  return (
    <div>
      <IconButton onClick={handleAvatarClick}>
        <Avatar sx={{ bgcolor: "var(--color-secondary)", color: "white" }}>
          {getInitials(user.firstName, user.lastName)}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={menuAnchor}
        open={menuOpen}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleEditProfile}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit Profile</ListItemText>
        </MenuItem>
        <MenuItem sx={{ color: "red" }} onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon sx={{ color: "red" }} fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>

      <ProfilePopover
        open={popoverOpen}
        anchorEl={popoverAnchor}
        onClose={handlePopoverClose}
        formData={formData}
        error={error}
        onChange={handleInputChange}
        onSave={handleSave}
      />
    </div>
  );
};

export default AccountMenu;
