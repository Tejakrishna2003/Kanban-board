import React from "react";
import { Grid, Paper, Box, styled } from "@mui/material";

import CustomMoreButton from "./moreButton";
import CustomAddButton from "./Button";
import FeatureRequest from "./FeatureRequest";
import ProfileIcon from "./UserIcon";
import StatusIcon from "./StatusIcon";

const CustomLabel = styled("label")({
  display: "flex",
  alignItems: "center",
  padding: "0px",
});

// CustomTicketCard component to display individual tickets
const CustomTicketCard = ({ ticket, priorityIcons, statusIcons }) => {
  return (
    <Paper style={{ padding: "8px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "0.2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              margin: "0",
              fontSize: 14,
              marginBottom: "0.4rem",
            }}
          >
            {ticket.id}
          </p>
        </div>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <StatusIcon status={ticket.status} statusIcons={statusIcons} />
          <p
            style={{
              marginTop: "0",
              paddingTop: "0",
              fontSize: 15,
              fontWeight: "600",
              marginBottom: "1rem",
            }}
          >
            {ticket.title}
          </p>
        </Box>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {priorityIcons[ticket.priority]}
          <FeatureRequest tag={ticket.tag[0]} />
        </div>
      </div>
    </Paper>
  );
};

// GroupUser component to display grouped tickets by user
const GroupUser = ({
  data,
  groupedTickets_user,
  priorityIcons,
  statusIcons,
  priorityValues,
  priorityLabels,
  statusValues,
}) => {
  const getUserAvailability = (userId) => {
    const user = data.users.find((user) => user.id === userId);
    return user?.available || false;
  };

  return (
    <React.Fragment>
      {Object.keys(groupedTickets_user).map((userId) => {
        // Get user details by userId
        const user = data.users.find((user) => user.id === userId);
        const username = user ? user.name : "No Name"; // Fallback if no user found

        return (
          <Grid item lg={2.4} key={userId} padding={2}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <CustomLabel>
                {/* Profile Icon and User Name */}
                <ProfileIcon
                  userId={userId}
                  username={username}
                  getUserAvailability={getUserAvailability}
                />

                {/* Display User Name and Ticket Count */}
                <h4
                  style={{ margin: "0", fontWeight: "500", marginLeft: "0.8rem" }}
                >
                  {username}
                </h4>
                <h4
                  style={{
                    margin: "0",
                    fontWeight: "400",
                    marginLeft: "0.5rem",
                  }}
                >
                  {groupedTickets_user[userId]?.length || 0}
                </h4>
              </CustomLabel>
              <div style={{ marginLeft: "auto" }}>
                <CustomAddButton
                  groupId={userId}
                  users={data.users}
                  status={statusValues}
                  priority={priorityLabels}
                />
                <CustomMoreButton />
              </div>
            </div>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {groupedTickets_user[userId].map((ticket) => (
                <li key={ticket.id} style={{ marginBottom: "8px" }}>
                  {/* Pass props to CustomTicketCard */}
                  <CustomTicketCard
                    ticket={ticket}
                    priorityIcons={priorityIcons}
                    statusIcons={statusIcons}
                  />
                </li>
              ))}
            </ul>
          </Grid>
        );
      })}
    </React.Fragment>
  );
};

export default GroupUser;
