import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import styles from "./landing.module.scss";
class Landing extends Component {
  render() {
    return (
      //<div className="container valign-wrapper">
      <Grid container direction="row" justify="center" alignItems="center">
        <div className="row">
          <div className="col s12 center-align">
            <h1>Welcome to Above Curve</h1>
            <p>Please either log in or register and account with us.</p>
            <br />
            <div className="col s6">
              <Button variant="contained" size="large" justify="center">
                <Link to="/login" className={styles.Button}>
                  Log In
                </Link>
              </Button>
            </div>
            <br />
            <div className="col s6">
              <Button variant="contained" size="large" justify="center">
                <Link to="/register" className={styles.Button}>
                  Register
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Grid>
      //</div>
    );
  }
}
export default Landing;
