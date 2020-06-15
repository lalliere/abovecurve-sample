import React from "react";
// import styles from "./questionPage.module.scss";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from '@material-ui/core/CardActions';
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import stateImg from "./assets/viewbyState.png";
import usImg from "./assets/viewbyUS.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "10vh",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  title: {
    textAlign: "center",
    marginBottom: "40px",
  },
  card: {
    maxWidth: 450,
  },
  media: {
    height: 250,
  },
  grid: {
    flexGrow: 1,
    alignItems: "center",
  },
}));

export default function WelcomePage(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid item xs={12}>
        <Typography
          className={classes.title}
          variant="h2"
          component="h1"
          gutterBottom
        >
          Welcome to Above Curve
        </Typography>
      </Grid>
      <Grid container justify="center" spacing={4} className={classes.grid}>
        <Grid item auto>
          <Card className={classes.card} data-testid="card-options" elevation={3}>
            <CardActionArea>
              <CardMedia
                onClick={props.cardClickHandler}
                className={classes.media}
                data-view={"USView"}
                image={usImg}
                title="View Data for the United States"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  View Data for the United States
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item auto>
          <Card className={classes.card} data-testid="card-options" elevation={3}>
            <CardActionArea>
              <CardMedia
                onClick={props.cardClickHandler}
                data-view={"StateView"}
                className={classes.media}
                image={stateImg}
                title="View Data for an individual US State"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  View Data for an Individual State
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
