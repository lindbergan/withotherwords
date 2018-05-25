import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import { getWord } from './localizer';
import Game from './game';

class App extends Component {

  constructor() {
    super();
    this.state = {
      locale: 'en-US',
      startGame: false,
    };
  }

  renderChooseLanguage() {
    return (<div>
    <p>{getWord('getStartedText', this.state.locale)}:</p>
    <img src="icons/sweden-flag-round-icon-64.png" onClick={() => this.setState({ locale: 'sv-SE' })} alt="swedish flag"/>
    <p>{getWord('or', this.state.locale)}</p>
    <img src="icons/united-states-of-america-flag-round-icon-64.png" onClick={() => this.setState({ locale: 'en-US' })} alt="american flag"/></div>);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{getWord('welcomeText', this.state.locale)}</h1>
        </header>
        <div className="App-intro">
          {!this.state.startGame ? this.renderChooseLanguage() : null}
        </div>
      {!this.state.startGame ? <Button bsStyle="primary" bsSize="large" onClick={() => this.setState({ startGame: true })}>{getWord('startPlayingText', this.state.locale)}!</Button> : null}
      {this.state.startGame ? <Game locale={this.state.locale}/> : null}
      </div>
    );
  }
}

export default App;
