// components/ProfilePopover.jsx
import { Popover, Typography, TextField, Button, Box } from "@mui/material";
import PropTypes from "prop-types";

const ProfilePopover = ({ open, anchorEl, onClose, formData, error, onChange, onSave }) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
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
        onChange={onChange}
      />
      <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={onChange} />
      <TextField label="Email" name="email" value={formData.email} onChange={onChange} />
      <TextField
        label="Birthdate"
        name="birthdate"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={formData.birthdate}
        onChange={onChange}
      />

      <Box display="flex" gap={2} justifyContent="center" mt={2}>
        <Button
          onClick={onSave}
          sx={{
            backgroundColor: "var(--color-primary)",
            color: "white",
            "&:hover": { backgroundColor: "var(--color-tertiary)" },
          }}
        >
          Save
        </Button>
        <Button
          onClick={onClose}
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
  );
};

ProfilePopover.propTypes = {
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.any,
  onClose: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    birthdate: PropTypes.string,
  }).isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ProfilePopover;
