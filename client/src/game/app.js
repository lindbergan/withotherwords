import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Game from "./game";
import { Settings } from "./settings";
import { WelcomeScreen } from "./welcomescreen";
import { ErrorPage } from "./404";
import { sweLocale } from "../utils/localizer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: sweLocale,
      nrOfTeams: 2,
      nrOfRounds: 10,
      timeLimit: 45,
      nrOfPassesLimit: 2
    };
  }

  handleNrTeamsChange = event => {
    this.setState({ nrOfTeams: parseInt(event.target.value) });
  };
  handleNrRoundsChange = event => {
    this.setState({ nrOfRounds: parseInt(event.target.value) });
  };
  handleTimeLimitChange = event => {
    this.setState({ timeLimit: parseInt(event.target.value) });
  };
  handleNrOfPassesLimitChange = event => {
    this.setState({ nrOfPassesLimit: parseInt(event.target.value) });
  };

  changeLanguage = locale => {
    this.setState({ locale });
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <WelcomeScreen
                locale={this.state.locale}
                changeLanguage={locale => this.changeLanguage(locale)}
              />
            )}
          />
          <Route
            exact
            path="/settings"
            render={() => (
              <Settings
                locale={this.state.locale}
                state={this.state}
                handleNrTeamsChange={this.handleNrTeamsChange}
                handleNrRoundsChange={this.handleNrRoundsChange}
                handleTimeLimitChange={this.handleTimeLimitChange}
                handleNrOfPassesLimitChange={this.handleNrOfPassesLimitChange}
              />
            )}
          />
          <Route
            exact
            path="/game"
            render={() => (
              <Game
                locale={this.state.locale}
                nrOfTeams={this.state.nrOfTeams}
                nrOfRounds={this.state.nrOfRounds}
                timeLimit={this.state.timeLimit}
                nrOfPassesLimit={this.state.nrOfPassesLimit}
              />
            )}
          />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
