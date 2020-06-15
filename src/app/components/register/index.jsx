import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../../actions/authActions";
import classnames from "classnames";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import styles from "./register.module.scss";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      firstName: this.state.name,
      lastName: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <Container component="main" maxWidth="xs" className={styles.Register}>
        <CssBaseline />
        <div className={styles.paper}>
          <Avatar className={styles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4" className={styles.title}>
            Sign up
          </Typography>
          <form className={styles.form} noValidate onSubmit={this.onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="firstName"
                  type="text"
                  label="First Name"
                  autoFocus
                  className={classnames("", {
                    invalid: errors.name,
                  })}
                />
                <span className="red-text">{errors.name}</span>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="lname"
                  name="lastName"
                  variant="outlined"
                  required
                  fullWidth
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="lastName"
                  type="text"
                  label="Last Name"
                  autoFocus
                  className={classnames("", {
                    invalid: errors.name,
                  })}
                />
                <span className="red-text">{errors.name}</span>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  className={classnames("", {
                    invalid: errors.email,
                  })}
                />
                <span className="red-text">{errors.email}</span>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  className={classnames("", {
                    invalid: errors.password,
                  })}
                />
                <span className="red-text">{errors.password}</span>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password2"
                  label="Confirm Password"
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  autoComplete="current-password"
                  className={classnames("", {
                    invalid: errors.password2,
                  })}
                />
                <span className="red-text">{errors.password2}</span>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive emails from Above Curve."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={styles.submit}
            >
              Sign up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2" className={styles.linkText}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https:abovecurve.com">
              Above Curve
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStatetoProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStatetoProps, { registerUser })(withRouter(Register));
