import React, { useState } from "react";
import { Grid } from "@mui/material";
import { styled } from "@mui/system";
import CssBaseline from "@material-ui/core/CssBaseline";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";


const AdminStyled = styled('div')(({ theme }) => ({
  root: {
    display: "flex",
  },
  //... other styles defined in your code
}));

function Admin() {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <AdminStyled>
      <CssBaseline />
      <Grid container>
        <Grid item xs={12} sm={3} marginBottom={5}>
          <Sidebar handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} draweropen={open}/>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Outlet />
        </Grid>
      </Grid>
    </AdminStyled>
  );
}
export default Admin;