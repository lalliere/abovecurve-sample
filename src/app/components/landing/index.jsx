import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import styles from "./landing.module.scss";


class Landing extends Component {
  render() {
    return (
      //<div className="container valign-wrapper">
      <Container fixed>
        <Grid container direction="row" justify="center" alignItems="center" className={styles.Landing}>
          <Grid item xs={12} align="center">
            <Typography className={styles.title} variant="h2" component="h1" gutterBottom>Welcome to Above Curve</Typography>
            <Typography className={styles.subtitle} variant="h5" component="h5" gutterBottom>Please either log in or register an account.</Typography>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2} align="center">
            <Button variant="contained" grouped>
              <Link to="/login" className={styles.button}>
                Log In
              </Link>
            </Button>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2} align="center">
            <Button variant="contained" >
              <Link to="/register" className={styles.button}>
                Register
              </Link>
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
export default Landing;
