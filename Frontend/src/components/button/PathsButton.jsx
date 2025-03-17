import { Badge, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import RouteIcon from "@mui/icons-material/Route";
import { Link } from "react-router-dom";
import { useSwaps } from "../../Context/SwapContext"; // Import useSwaps

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 3,
    padding: "3px",
    fontSize: "10px",
    minWidth: "15px",
    height: "15px",
    backgroundColor: "#6452a1",
    color: "white",
  },
}));

const PathsButton = () => {
  const { pathsCount } = useSwaps(); // Get pathsCount dynamically

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      {/* Paths Button */}
      <Link to="/account/paths">
        <div className="flex items-center gap-2 bg-gray-100 border border-gray-300 hover:bg-gray-200 rounded-full px-3 py-1 cursor-pointer transition">
          <IconButton aria-label="paths" size="small" disableRipple>
            <StyledBadge badgeContent={pathsCount}>
              <RouteIcon sx={{ fontSize: "20px" }} />
            </StyledBadge>
          </IconButton>
          <p className="hidden sm:flex">Paths</p>
        </div>
      </Link>
    </div>
  );
};

export default PathsButton;
