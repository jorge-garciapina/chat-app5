import { useQuery } from "@apollo/client";
import { INFO_QUERY } from "../../graphql/userQueries";
import { useRetrieveContactRequests } from "./contactRequestLogic";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import React, { useState } from "react";

import AppBarComponent from "./dashboardElements/AppBarComponent";
import StaticDrawerComponent from "./dashboardElements/StaticDrawerComponent";
import MainContentComponent from "./dashboardElements/MainContentComponent";

const defaultTheme = createTheme();

export default function Dashboard() {
  const [content, setContent] = useState(null);
  const {
    data: infoData,
    loading: infoLoading,
    error: infoError,
    refetch: refetchInfo,
  } = useQuery(INFO_QUERY, {
    fetchPolicy: "no-cache",
  });

  // Use the custom hook
  const { contactRequests, refetch: refetchContactRequests } =
    useRetrieveContactRequests();

  const handleContactsClick = async () => {
    setContent("contacts");
    await refetchContactRequests(); // Refetch contact requests every time
    await refetchInfo(); // Refetch INFO_QUERY
  };

  const username = infoData?.userInfo?.username || "Dashboard";

  if (infoLoading) return <p>Loading...</p>;
  if (infoError) return <p>Error: {infoError.message}</p>;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBarComponent username={username} />
        <StaticDrawerComponent onContactsClick={handleContactsClick} />
        <MainContentComponent
          content={content}
          infoData={infoData}
          contactRequests={contactRequests}
        />
      </Box>
    </ThemeProvider>
  );
}
