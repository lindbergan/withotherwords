import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Game from './game';
import {Settings} from './settings';
import {WelcomeScreen} from './welcomescreen';
import {initGa} from './ga';
import {ErrorPage} from './404';
import {sweLocale} from '../utils/localizer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      locale: sweLocale,
      nrOfTeams: 2,
      nrOfRounds: 10,
      timeLimit: 45,
      nrOfPassesLimit: 2,
    };
    initGa();
  }

  handleNrTeamsChange = event => {
    this.setState({nrOfTeams: parseInt(event.target.value, 10)});
  }
  handleNrRoundsChange = event => {
    this.setState({nrOfRounds: parseInt(event.target.value, 10)});
  }
  handleTimeLimitChange = event => {
    this.setState({timeLimit: parseInt(event.target.value, 10)});
  }
  handleNrOfPassesLimitChange = event => {
    this.setState({nrOfPassesLimit: parseInt(event.target.value, 10)});
  }

  changeLanguage = locale => {
    this.setState({locale});
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact
            path="/"
            component={() => <WelcomeScreen
              locale={this.state.locale}
              changeLanguage={locale => this.changeLanguage(locale)}
            />}
          />
          <Route exact path="/settings"
            component={() => <Settings
              locale={this.state.locale}
              state={this.state}
              handleNrTeamsChange={this.handleNrTeamsChange}
              handleNrRoundsChange={this.handleNrRoundsChange}
              handleTimeLimitChange={this.handleTimeLimitChange}
              handleNrOfPassesLimitChange={this.handleNrOfPassesLimitChange}
            />}
          />
          <Route exact path="/game"
            component={() => <Game
              locale={this.state.locale}
              nrOfTeams={this.state.nrOfTeams}
              nrOfRounds={this.state.nrOfRounds}
              timeLimit={this.state.timeLimit}
              nrOfPassesLimit={this.state.nrOfPassesLimit}
            />}
          />
          <Route
            component={ErrorPage}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
