import { useState, useEffect } from "react";
import { IconButton, Avatar, Popover, Typography, TextField, Button, Box } from "@mui/material";
import { updateUserById } from "../../Data/Api";

const AccountMenu = () => {
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    birthdate: "",
  });

  const [formData, setFormData] = useState({});
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

  const handleOpenPopover = (event) => {
    setPopoverAnchor(event.currentTarget);
  };

  const handleClosePopover = () => {
    setPopoverAnchor(null);
  };

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
      handleClosePopover();
    } catch (err) {
      console.error(err);
      setError("Failed to update profile. Try again.");
    }
  };

  const popoverOpen = Boolean(popoverAnchor);

  return (
    <div className="relative z-50">
      <IconButton onClick={handleOpenPopover}>
        <Avatar sx={{ bgcolor: "var(--color-primary)", color: "white" }}>
          {getInitials(user.firstName, user.lastName)}
        </Avatar>
      </IconButton>

      {popoverOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={handleClosePopover}
        />
      )}

      <Popover
        open={popoverOpen}
        anchorEl={popoverAnchor}
        onClose={handleClosePopover}
        anchorReference="anchorPosition"
        anchorPosition={{
          top: window.innerHeight / 2,
          left: window.innerWidth / 2,
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        PaperProps={{
          sx: {
            zIndex: 50,
            padding: 4,
            width: 350,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          },
        }}
      >
        <Typography variant="h6" textAlign="center">
          Edit Profile
        </Typography>

        {error && (
          <Typography color="error" fontSize={14}>
            {error}
          </Typography>
        )}

        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
        />
        <TextField label="Email" name="email" value={formData.email} onChange={handleInputChange} />
        <TextField
          label="Birthdate"
          name="birthdate"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.birthdate}
          onChange={handleInputChange}
        />

        <Box display="flex" gap={2} justifyContent="center" mt={2}>
          <Button
            onClick={handleSave}
            sx={{
              backgroundColor: "var(--color-primary)",
              color: "white",
              "&:hover": { backgroundColor: "var(--color-tertiary)" },
            }}
          >
            Save
          </Button>
          <Button
            onClick={handleClosePopover}
            sx={{
              backgroundColor: "#6c757d",
              color: "white",
              "&:hover": { backgroundColor: "#5a6268" },
            }}
          >
            Cancel
          </Button>
        </Box>
      </Popover>
    </div>
  );
};

export default AccountMenu;
