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
        width: "90%",
        margin: "auto",
        align: "center",
        padding: "20px",
        paddingBottom: "30px",
    },
    space: {
        margin: "20px 0 20px 0",
    },
    subtitle: {
        marginBottom: "20px",
    },
    sources: {
        fontSize: "16pt"
    }
}))

export default function Sources() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <CssBaseline />
            <Grid container spacing={1} className={classes.root}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h2" align="center" className={classes.title}>
                        Data Sources
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.subtitle}>
                    <Paper className={classes.paper}>
                        <Typography component="body1" variant="body1" className={classes.sources}>
                            <ol>
                                <li>Positive Cases / Total Cases / Total Deaths Geo Chart</li>
                                    <ul>
                                        <li>States Current and Historical Data Set: Covidtracking.com</li>
                                    </ul>
                                <li>Obesity in the US Bar Chart</li>
                                    <ul>
                                        <li>Nutrition, Physical Activity, and Obesity - Behavioral Risk Factor Surveillance System: https://chronicdata.data.cdc.gov</li>
                                    </ul>
                                <li>Tobacco Use in the United States </li>
                                    <ul>
                                        <li>Smoking Status by State Data Set: https://data.cdc.gov</li>
                                    </ul>
                                <li>COVID-19 Deaths in the United States by Sex / by Age Group Graphs</li>
                                    <ul>
                                        <li>Original COVID-19 Death Counts by Sex, Age, and State Data Set: https://data.cdc.gov</li>
                                    </ul>

                            </ol>
                        </Typography>
                    </Paper>
                </Grid>
                
            </Grid>
        </React.Fragment>
    )
}