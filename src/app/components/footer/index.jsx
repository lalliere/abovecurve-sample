import React from "react";
import logo from "./assets/ac_logo_24.png";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "10vh",
    position: "fixed",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    zIndex: "2",
    boxShadow: "0 2px 12px 6px rgba(0, 0, 0, 0.1)",
    bottom: 0,
    width: "100%",
  }
}))

export default function Footer() {
  const classes = useStyles();

  return (
    <BottomNavigation className={classes.root} showLabels>
      <img src={logo} alt="Above Curve" data-testid="ac-footer-logo"></img>
    </BottomNavigation>
  );
}