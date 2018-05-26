import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Game from './game';
import { WelcomeScreen } from './welcomescreen';

class App extends Component {

  constructor() {
    super();
    this.state = {
      locale: 'sv-SE'
    };
    this.changeLanguage = this.changeLanguage.bind(this);
  }

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
          <Route path="/game"
                  component={() => <Game locale={this.state.locale} />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
