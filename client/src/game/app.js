import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Game from './game';
import {Settings} from './settings';
import {WelcomeScreen} from './welcomescreen';
import {initGa} from './ga';

class App extends Component {
  constructor() {
    super();
    this.state = {
      locale: 'sv-SE',
      nrOfTeams: 2,
      nrOfRounds: 10,
      timeLimit: 45,
      nrOfPassesLimit: 2,
      settingsAreSet: false,
    };
    initGa();
  }

  componentWillUnmount = () => {
    this.setState({settingsAreSet: false});
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
  handleSettingsAreSet = () => {
    this.setState({settingsAreSet: true});
  }

  changeLanguage = locale => {
    this.setState({locale});
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact={true}
            path="/"
            component={() => <WelcomeScreen
              locale={this.state.locale}
              changeLanguage={locale => this.changeLanguage(locale)}
            />}
          />
          <Route path="/settings"
            component={() => <Settings
              locale={this.state.locale}
              state={this.state}
              handleNrTeamsChange={this.handleNrTeamsChange}
              handleNrRoundsChange={this.handleNrRoundsChange}
              handleTimeLimitChange={this.handleTimeLimitChange}
              handleNrOfPassesLimitChange={this.handleNrOfPassesLimitChange}
              handleSettingsAreSet={this.handleSettingsAreSet}
            />}
          />
          <Route path="/game"
            component={() => <Game
              locale={this.state.locale}
              nrOfTeams={this.state.nrOfTeams}
              nrOfRounds={this.state.nrOfRounds}
              timeLimit={this.state.timeLimit}
              nrOfPassesLimit={this.state.nrOfPassesLimit}
              settingsAreSet={this.state.settingsAreSet}
            />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
