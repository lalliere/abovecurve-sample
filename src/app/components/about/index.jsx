import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(4, 0),

    },
    title: {
        margin: "20px 0 20px 0",
    },
    paper: {
        color: theme.palette.text.secondary,
        width: "70%",
        margin: "auto",
        align: "center",
        padding: "20px",
        paddingBottom: "30px"
    },
    space: {
        margin: "20px 0 20px 0",
    },
    subtitle: {
        marginBottom: "20px",
    }
}))

export default function About() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <CssBaseline />
            <Grid container spacing={1} className={classes.root}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h2" align="center" className={classes.title}>
                        About Above Curve
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.subtitle}>
                    <Paper className={classes.paper}>
                        <Typography component="h2" variant="h4" className={classes.subtitle}>
                            Mission
                        </Typography>
                        <Typography component="body1" variant="body1">
                            In light of the current global pandemic, we want to support the advancement of medical research by standardizing a variety of public data sets for researchers to rapidly gain insights backed by reputable and cited sources.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} className={classes.subtitle}>
                    <Paper className={classes.paper}>
                        <Typography component="h2" variant="h4" className={classes.subtitle}>
                            Who are we?
                        </Typography>
                        <Typography component="body1" variant="body1">
                            Above Curve is a registered New Hampshire LLC formed to do good in the world through technology. 
                            It started off as the personal side project, but has gained increasing interest and is currently a small development team consisting of a Database Administrator, Front End Developer, Lead Developer, and a small group of students from the UNH Coding Bootcamp - December 2019 Cohort.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}