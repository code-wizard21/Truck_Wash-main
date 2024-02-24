import React, { useState, useEffect } from "react";
import { Tab, Box } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import Accept from "./accecpint";
import Washing from "./washing";
import Http from "../../utils/http";

export default function LabTabs() {
  const [value, setValue] = useState("1");
  const [cusList, setCusList] = useState([]);
  const [cusWashed, setCusWashed] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // if (!auth.isLoggedIn) {
    //   navigate("/");
    // }
  }, []);
  useEffect(() => {
    Http.get("/api/driv/getAllAccepted")
      .then((data) => {
        setCusList(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    Http.get("/api/driv/getAllWashed")
      .then((data) => {
        setCusWashed(data.data);
        // setCusList(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: { xs: 2, sm: 4, md: 6, lg: 8 },
      }}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            allowScrollButtonsMobile
            sx={{
              "& .MuiTab-root": {
                fontSize: { sm: "0.875rem", md: "1rem" },
                minWidth: 0,
                padding: { sm: "6px 12px", md: "8px 16px" },
              },
            }}
          >
            <Tab label="Accepted" value="1" />
            <Tab label="Washed" value="2" />
          </TabList>
        </Box>

        <TabPanel value="1">
          <Accept data={cusList} />
        </TabPanel>
        <TabPanel value="2">
          <Washing data={cusWashed} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
