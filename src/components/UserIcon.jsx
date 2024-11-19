import React from "react";
import Tooltip from "@mui/material/Tooltip";

// Function to get initials from the username
function getInitials(username = "") {
  if (!username.trim()) return "NA"; // Handle empty username
  const words = username.trim().split(" ");
  const initials = words
    .slice(0, 2) // Get up to the first two words
    .map((word) => word.charAt(0).toUpperCase())
    .join(""); // Combine initials
  return initials;
}

// ProfileIcon component
const ProfileIcon = ({ userId, getUserAvailability, username }) => {
  const isOnline = getUserAvailability(userId);

  return (
    <Tooltip title={isOnline ? "Online" : "Offline"} followCursor>
      <div style={{ position: "relative", display: "inline-block" }}>
        {/* Circle containing initials */}
        <div
          style={{
            width: "32px",
            height: "32px",
            backgroundColor: "#007bff",
            color: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            fontWeight: "bold",
            position: "relative",
          }}
        >
          {getInitials(username)}
        </div>
        {/* Online/Offline indicator */}
        <div
          style={{
            width: "10px",
            height: "10px",
            backgroundColor: isOnline ? "#28a745" : "#6c757d",
            borderRadius: "50%",
            position: "absolute",
            bottom: 0,
            right: 0,
            border: "2px solid white",
          }}
        ></div>
      </div>
    </Tooltip>
  );
};

// Default props in case of missing username
ProfileIcon.defaultProps = {
  username: "No Name", // Default name
};

export default ProfileIcon;

