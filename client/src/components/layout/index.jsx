import React from "react";
import PropTypes from "prop-types";
import Header from "./Nav";
import Footer from "./Footer";
import { makeStyles } from "@material-ui/core/styles";
import { Outlet } from "react-router-dom";
// Custom hook for styling
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh", // Set minimum height to fill the screen height
  },
  content: {
    flexGrow: 1, // Allows the content to fill the space between header and footerAdd padding to bottom equal to the footer's height
  },
  footer: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    // If you know the exact height of the footer, set it here
    // height: '64px', // Example footer height
  },
}));
const PageLayout = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />

      <Outlet />
      <Footer className={classes.footer} />
    </div>
  );
};
PageLayout.propTypes = {
  children: PropTypes.node,
};
PageLayout.defaultProps = {
  children: null,
};
export default PageLayout;
