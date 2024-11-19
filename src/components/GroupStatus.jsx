import React from "react";
import { Grid, Paper, styled } from "@mui/material";

import CustomMoreButton from "./moreButton";
import CustomAddButton from "./Button";
import FeatureRequest from "./FeatureRequest";
import ProfileIcon from "./UserIcon";

// CustomTicketCard component to display individual tickets
const CustomTicketCard = ({ ticket, getUserAvailability, priorityIcons, data }) => {
  const { userId, title, priority, tag } = ticket;
  const user = data.users.find((user) => user.id === userId);
  const username = user ? user.name : "No Name";

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
              marginBottom: "0.2rem",
            }}
          >
            {ticket.id}
          </p>
          <ProfileIcon
            userId={userId}
            getUserAvailability={getUserAvailability}
            username={username}
          />
        </div>
        <p
          style={{
            margin: "0",
            fontSize: 15,
            fontWeight: "600",
            marginBottom: "1rem",
          }}
        >
          {title}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {priorityIcons[priority]}
          <FeatureRequest tag={tag[0]} />
        </div>
      </div>
    </Paper>
  );
};

const CustomLabel = styled("label")({
  display: "flex",
  alignItems: "center",
  padding: "0px",
});

// GroupStatus component to display grouped tickets based on their status
const GroupStatus = ({
  data,
  groupedTickets_status,
  priorityIcons,
  statusIcons,
  priorityLabels,
  statusValues,
}) => {
  // Get the availability of a user by their userId
  const getUserAvailability = (userId) => {
    const user = data.users.find((user) => user.id === userId);

    // Return user details or fallback if user is not found
    return user
      ? { name: user.name, available: user.available }
      : { name: "N/A", available: false }; // Default to "N/A" if user not found
  };

  return (
    <React.Fragment>
      {statusValues.map((status) => (
        <Grid item lg={2.4} key={status} padding={2}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <CustomLabel>
              <img
                src={statusIcons[status]}
                alt="Status Icon"
                style={{ width: 16, height: 16, marginRight: 4 }}
              />
              <h4
                style={{ margin: "0", fontWeight: "500", marginLeft: "0.8rem" }}
              >
                {status}
              </h4>
              <h4
                style={{
                  margin: "0",
                  fontWeight: "400",
                  marginLeft: "0.5rem",
                }}
              >
                {groupedTickets_status[status]?.length || 0}
              </h4>
            </CustomLabel>
            <div style={{ marginLeft: "auto" }}>
              <CustomAddButton
                groupId={status}
                users={data.users}
                status={statusValues}
                priority={priorityLabels}
              />
              <CustomMoreButton />
            </div>
          </div>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {groupedTickets_status[status]
              ? groupedTickets_status[status].map((ticket) => (
                  <li key={ticket.id} style={{ marginBottom: "8px" }}>
                    {/* Pass data and other necessary props to CustomTicketCard */}
                    <CustomTicketCard
                      ticket={ticket}
                      getUserAvailability={getUserAvailability}
                      priorityIcons={priorityIcons}
                      data={data} // Pass the full data object to CustomTicketCard
                    />
                  </li>
                ))
              : null}
          </ul>
        </Grid>
      ))}
    </React.Fragment>
  );
};

export default GroupStatus;
