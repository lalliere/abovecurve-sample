import React, { Component } from "react";
import DeathBySexState from "./visualization/DeathBySexState";
import "./app.css";
import ChartWrapper from "./visualization/ChartWrapper";
import ObesityChart from "./visualization/ObesityChart";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import SmokingChart from "./visualization/SmokingChart";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Footer from "./components/footer";
import WelcomePage from "./components/welcomePage";
import Landing from "./components/landing";
import Register from "./components/register";
import Login from "./components/login";
import PrivateRoute from "./components/privateRoute";
import Dashboard from "./components/dashboard";
import Navbar from "./components/navbar";
import About from "./components/about";
import Sources from "./components/sources";

// NOTE: "UA-164204874-2" Is the tracking ID for Above Curve lcoalhost
// open this app in incognito for it to register in the GA dashboard
// when testing locally.
//const GATRACKING = process.env.REACT_APP_GATRACKING || "UA-164204874-2";

/* 
  When using React Router see this guide for
  impmelemting Google Analytics
  https://github.com/react-ga/react-ga/wiki/React-Router-v4-withTracker
*/

class App extends Component {
  state = {
    data: {},
    selectedState: "",
    singleObesityChartData: this.getSkeletonObesityChartData(),
    masterObesityArray: [],
    masterSmokingArray: [],
    currentPage: "LogInView",

    selectedObesityState: "",
    obesityData: this.getSkeletonObesityChartData(),
    singleStateData: this.getSkeletonObesityChartData(),
    allObesityData: {},

    selectedSmokingState: "",
    smokingData: this.getSkeletonPieData(),
    singleSmokingStateData: this.getSkeletonPieData(),
    allSmokingData: {},
  };

  selectObesityState = (state) => {
    const selectedState = this.state.allObesityData[state];
    const singleStateData = this.getSkeletonObesityChartData();
    singleStateData.labels.push(selectedState.stateName);
    singleStateData.datasets[0].data.push(selectedState.percentage);

    this.setState({
      selectedObesityState: state,
      singleStateData: singleStateData,
    });
  };

  masterSelectState = (state) => {
    const obesityData = this.state.allObesityData[state];
    this.extractSmokingData(state, this.state.masterSmokingArray);

    const singleObesityChartData = this.getSkeletonObesityChartData();
    singleObesityChartData.labels.push(obesityData.stateName);
    singleObesityChartData.datasets[0].data.push(obesityData.percentage);

    this.setState({
      selectedState: state,
      singleObesityChartData: singleObesityChartData,
    });
  };

  getSkeletonObesityChartData() {
    return {
      labels: [],
      datasets: [
        {
          label: "Total Obesity Percentage",
          data: [],
          backgroundColor: "rgba(54, 162, 235, 0.4)",
        },
      ],
    };
  }

  selectSmokingState = (state) => {
    const selectedState = this.state.allSmokingData[state];
    const singleSmokingStateData = this.getSkeletonPieData();
    singleSmokingStateData.labels.push(selectedState.stateName);
    singleSmokingStateData.datasets[0].data.push(selectedState.percentage);

    this.setState({
      selectedSmokingState: state,
      singleSmokingStateData: singleSmokingStateData,
    });
  };

  getSkeletonPieData() {
    return {
      title: "Tobacco Use Amongst Adults in the United States",
      labels: [],
      datasets: [
        {
          label: "Tobacco Use in Adults",
          data: [],
          backgroundColor: [
            "rgba(161, 134, 148, 0.6)",
            "rgba(33, 131, 128, 0.6)",
            "rgba(107, 7, 7, 0.6)",
            "rgba(207, 209, 26, 0.6)",
            "rgba(242, 233, 220, 0.6)",
          ],
        },
      ],
    };
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  obesityDataFilter(location) {
    const obesityObj = this.getSkeletonObesityChartData();
    const stateObesityObj = {};
    this.state.masterObesityArray.forEach((elem) => {
      if (
        elem.total &&
        elem.question ===
          "Percent of adults aged 18 years and older who have obesity" &&
        elem.locationabbr === location
      ) {
        obesityObj.labels.push(elem.locationdesc);
        obesityObj.datasets[0].data.push(elem.data_value);
        stateObesityObj[elem.locationabbr] = {
          abbr: elem.locationabbr,
          percentage: elem.data_value,
          stateName: elem.locationdesc,
        };
      }
    });
    return obesityObj;
  }

  extractSmokingData(state = "US", data) {
    const smokingObj = this.getSkeletonPieData();
    const stateSmokingObj = {};
    data
      .filter(
        (elem) =>
          elem.locationabbr === state &&
          (elem.measuredesc ===
            "Percent of Former Smokers Among Ever Smokers" ||
            elem.measuredesc === "Current Use" ||
            elem.measuredesc === "CurrentSmoking")
      )
      .forEach((elem) => {
        smokingObj.labels.push(elem.topicdesc.replace(" (Adults)", ""));
        smokingObj.datasets[0].data.push(elem.data_value);

        stateSmokingObj[elem.locationabbr] = {
          abbr: elem.locationabbr,
          percentage: elem.data_value,
          stateName: elem.locationdesc,
        };
        console.log(smokingObj);
      });
    const nonSmoker =
      Math.round(
        (100 -
          smokingObj.datasets[0].data.map(Number).reduce((a, b) => a + b, 0)) *
          100
      ) / 100;
    smokingObj.labels.push("Nonsmoker or Unknown");
    smokingObj.datasets[0].data.push(nonSmoker);

    console.log("Nonsmoker", nonSmoker);

    this.setState({
      smokingData: smokingObj,
      allSmokingData: stateSmokingObj,
    });
    console.log(state);
  }

  componentDidMount() {
    axios
      .get(`https://chronicdata.cdc.gov/resource/hn4x-zwk7.json?$limit=10000`)
      .then((res) => {
        this.setState({ masterObesityArray: res.data });
        const obesityObj = this.getSkeletonObesityChartData();
        const stateObesityObj = {};
        res.data.forEach((elem) => {
          if (
            elem.total &&
            elem.question ===
              "Percent of adults aged 18 years and older who have obesity" &&
            elem.yearstart === "2018" &&
            elem.locationabbr !== "VI" &&
            elem.locationabbr !== "GU" &&
            elem.locationabbr !== "US"
          ) {
            obesityObj.labels.push(elem.locationdesc);
            obesityObj.datasets[0].data.push(elem.data_value);
            stateObesityObj[elem.locationabbr] = {
              abbr: elem.locationabbr,
              percentage: elem.data_value,
              stateName: elem.locationdesc,
            };
          }
        });
        this.setState({
          obesityData: obesityObj,
          allObesityData: stateObesityObj,
        });
        console.log(obesityObj);
      });

    axios
      .get(
        `https://chronicdata.cdc.gov/resource/wsas-xwh5.json?year=2018&gender=Overall&race=All Races&Age=All Ages`
      )
      .then((res) => {
        console.log(res.data);
        this.extractSmokingData("US", res.data);
        this.setState({ masterSmokingArray: res.data });
      });
  }

  // USLandingPage(props) {
  //   const isLoggedIn = props.isLoggedIn;
  //   if (isLoggedIn) {
  //     return (

  //     <Grid container spacing={3}>
  //       <Grid item xs={12} spacing={5}>
  //         <DeathBySexState />
  //       </Grid>
  //       <Grid item xs={12} spacing={5}>
  //         <ObesityChart chartData={this.state.obesityData} />
  //       </Grid>

  //       <Grid item xs={12} spacing={3}>
  //         <SmokingChart
  //           pieChartData={this.state.smokingData}
  //           selectedState={this.state.selectedState}
  //         />
  //       </Grid>
  //     </Grid>)

  //   }
  //   return
  // }

  handleViewDataCardClick = (e) => {
    const currentPage = e.target.dataset.view;
    this.setState({ currentPage });
  };

  renderPage = () => {
    if (this.state.currentPage === "USView") {
      return (
        <>
          <Grid
            container
            spacing={3}
            margin="auto"
            alignItems="center"
            justify="center"
            style={{
              marginBottom: "20px",
            }}
          >
            <Grid item xs={10} spacing={5}>
              <DeathBySexState />
            </Grid>
            <Grid item xs={10} spacing={5}>
              <ObesityChart chartData={this.state.obesityData} />
            </Grid>
            <Grid item xs={10} spacing={3} style={{ marginBottom: "70px" }}>
              <SmokingChart
                pieChartData={this.state.smokingData}
                selectedState={this.state.selectedState}
              />
            </Grid>
          </Grid>
        </>
      );
    } else if (this.state.currentPage === "StateView") {
      return (
        <>
          <Grid container>
            <Grid item>
              <ChartWrapper
                setMasterSelectState={this.masterSelectState}
                pieChartData={this.state.smokingData}
                selectedState={this.state.selectedState}
                obesityChartData={this.state.singleObesityChartData}
              />
            </Grid>
            {/* <Grid item xs={6}>
            <ObesityChart chartData={this.state.singleObesityChartData} />
          </Grid> */}
          </Grid>
        </>
      );
    } else {
      return "";
    }
  };

  render() {
    return (
      <Router>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/about" component={About} />
        <Route exact path="/sources" component={Sources} />
        <Route
          exact
          path="/welcomepage"
          render={() => (
            <WelcomePage cardClickHandler={this.handleViewDataCardClick} />
          )}
        />

        <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
        {/* <this.USLandingPage isLoggedIn={true} /> */}
        {this.renderPage()}
        <Grid container>
          <Grid item>
            {/* <SmokingChart
              pieChartData={this.state.smokingData}
              selectedState={this.state.selectedState}
            />
            <ObesityChart chartData={this.state.obesityData} />
            <ChartWrapper
              obesityChartData={this.state.singleObesityChartData}
              setMasterSelectState={this.masterSelectState}
            />
            <DeathBySexState /> */}
          </Grid>
        </Grid>
        <Footer />
      </Router>
    );
  }
}

export default App;
