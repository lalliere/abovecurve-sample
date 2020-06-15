import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../../actions/authActions";
import classnames from "classnames";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import styles from "./login.module.scss";
import Image from "./aboveCurve.png";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };

  render() {
    const { errors } = this.state;
    return (
      <Grid container component="main" className={styles.Login}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7}>
          <img
              src={Image}
              alt="Above Curve Logo"
          >
          </img>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={styles.paper}>
            <Avatar className={styles.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h4" className={styles.title}>
              Sign in
            </Typography>
            <form className={styles.form} noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  label="Email Address"
                  autoComplete="email"
                  autoFocus
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound,
                  })}
                />
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <div className="input-field col s12">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  name="password"
                  label="Password"
                  autoComplete="current-password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect,
                  })}
                />
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={styles.submit}
                href="/welcomepage"
              >
                Sign In
              </Button>
              <Grid container className={styles.spacing}>
                <Grid item xs>
                  <Link href="#" variant="body2" className={styles.linkText}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2" className={styles.linkText}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                >
                  {"Copyright © "}
                  <Link color="inherit" href="https:abovecurve.com">
                    Above Curve
                  </Link>{" "}
                  {new Date().getFullYear()}
                  {"."}
                </Typography>
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginUser })(Login);
