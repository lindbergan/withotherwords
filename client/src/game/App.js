import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Game from './game';
import { Settings } from './settings';
import { WelcomeScreen } from './welcomescreen';

class App extends Component {

  constructor() {
    super();
    this.state = {
      locale: 'sv-SE',
      nrOfTeams: 2,
      nrOfRounds: 5,
      timeLimit: 15,
      nrOfPassesLimit: 0
    };
    this.changeLanguage = this.changeLanguage.bind(this);
    this.handleNrTeamsChange = this.handleNrTeamsChange.bind(this);
    this.handleNrRoundsChange = this.handleNrRoundsChange.bind(this);
    this.handleTimeLimitChange = this.handleTimeLimitChange.bind(this);
    this.handleNrOfPassesLimitChange = this.handleNrOfPassesLimitChange.bind(this);
  }

  handleNrTeamsChange(event) { this.setState({ nrOfTeams: event.target.value }); }
  handleNrRoundsChange(event) { this.setState({ nrOfRounds: event.target.value }); }
  handleTimeLimitChange(event) { this.setState({ timeLimit: event.target.value }); }
  handleNrOfPassesLimitChange(event) { this.setState({ nrOfPassesLimit: event.target.value }); }

  changeLanguage(locale) { this.setState({ locale }); }

  render() {
    return (
      <Router>
        <div>
          <Route exact={true} 
                  path="/"
                  component={() => <WelcomeScreen 
                    locale={this.state.locale} 
                    changeLanguage={(locale) => this.changeLanguage(locale)}
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
                    />}
          />
          <Route path="/game"
                  component={() => <Game 
                    locale={this.state.locale} 
                    nrOfTeams={this.state.nrOfTeams}
                    nrOfRounds={this.state.nrOfRounds}
                    timeLimit={this.state.timeLimit}
                    nrOfPassesLimit={this.state.nrOfPassesLimit}
                    />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
