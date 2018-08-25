import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {CircularProgress, Button} from '@material-ui/core';

import {getWord, getCorrectTextFile} from '../utils/localizer';
import {initGa} from './ga';

import '../css/game.css';

export default class Game extends Component {
  constructor(props) {
    super(props);
    const teams = new Map();
    for (let i = 1; i < props.nrOfTeams + 1; i++) {
      teams.set(i, 0); // Init team's score
    }
    const hideIfTooManyPasses = props.nrOfPassesLimit < 1;
    this.textFile = getCorrectTextFile(props.locale);
    this.state = {
      teams,
      gameIsActive: false,
      hideIfTooManyPasses,
      currentTeamsPoints: 0,
      currentTeam: 1,
      currentWord: this.getRandomWord(),
      currentlyPassed: 0,
      timeLeft: props.timeLimit,
      totalRoundNr: 1,
      roundNr: 1,
      disableBeginButton: false,
      disableForASecond: false,
    };
    initGa();
  }

  saveScore = () => {
    const teams = this.state.teams;
    teams.set(this.state.currentTeam, this.state.currentTeamsPoints);
    this.setState(teams);
  }

  handleChangeWordCorrect = () => {
    const currentTeamsNewPoints = this.state.currentTeamsPoints + 1;
    this.setState({currentTeamsPoints: currentTeamsNewPoints});
    this.nextWord();
  }

  nextWord = () => {
    this.setState({
      currentWord: this.getRandomWord(),
      disableForASecond: true,
    });
    setTimeout(() => this.setState({disableForASecond: false}), 500);
  }

  hideIfTooManyPasses = () => {
    if (this.state.currentlyPassed >= this.props.nrOfPassesLimit - 1) {
      this.setState({hideIfTooManyPasses: true});
    }
  }

  handleChangeWordIncorrect = () => {
    const newPassedAmount = this.state.currentlyPassed + 1;
    this.setState({currentlyPassed: newPassedAmount});
    this.hideIfTooManyPasses();
    this.nextWord();
  }

  getRandomWord = () => {
    const index = Math.floor(Math.random() * this.textFile.length);
    return this.textFile[index];
  }

  startTimer = () => {
    return setInterval(() => {
      const newTime = this.state.timeLeft - 1;
      this.setState({timeLeft: newTime});
    }, 1000);
  }

  startGame = () => {
    this.setState({gameIsActive: true});
    const timer = this.startTimer();
    setTimeout(() => {
      this.resetForNextRound();
      clearInterval(timer);
    }, this.props.timeLimit * 1000);
  }

  resetForNextRound = () => {
    this.setState({
      gameIsActive: false,
      hideIfTooManyPasses: this.props.nrOfPassesLimit === 0,
      currentlyPassed: 0,
      timeLeft: this.props.timeLimit,
      totalRoundNr: this.state.totalRoundNr + 1,
      roundNr: Math.ceil((this.state.totalRoundNr + 1) / this.props.nrOfTeams),
      disableBeginButton: true,
    });
    this.nextTeam();
    this.startDisabledTimer();
  }

  nextTeam = () => {
    this.saveScore();
    const newCurrentTeamNr =
    (this.state.currentTeam % this.props.nrOfTeams) + 1;
    this.setState({
      currentTeam: newCurrentTeamNr,
      currentTeamsPoints: this.state.teams.get(newCurrentTeamNr),
      currentWord: this.getRandomWord(),
    });
  }

  renderTeamPoints = () => {
    if (this.state.teams) {
      let listOfElements = [];
      for (let [id, points] of this.state.teams) {
        listOfElements.push(
          <h4 key={id}>
            {`${getWord('teams', this.props.locale)} ${id} - 
            ${getWord('points', this.props.locale)}: ${points}`}
          </h4>);
      }
      return listOfElements;
    }
    return null;
  }

  gameIsFinished = () => {
    return (<div className="centeredGameEnd" fluid={true}>
      {this.renderTeamPoints()}
      <Link to="/">
        <Button variant="contained" color="primary"
          size="large">{getWord('playAgain', this.props.locale)}?
        </Button>
      </Link>
    </div>);
  }

  renderRoundText = () => {
    return <h3>
      {`${getWord('getReadyForNextRound', this.props.locale)}: 
        ${this.state.roundNr}`}
    </h3>;
  }

  startDisabledTimer = () => {
    setTimeout(() => {
      this.setState({disableBeginButton: false});
    }, 1500);
  }

  renderBeginButton = () => {
    if (this.state.disableBeginButton) {
      return <Button disabled
        className="beginButton"
        bsStyle="success"
        onClick={() => this.startGame()}>
        {getWord('begin', this.props.locale)}
      </Button>;
    } else {
      return <Button className="beginButton"
        bsStyle="success"
        onClick={() => this.startGame()}>
        {getWord('begin', this.props.locale)}
      </Button>;
    }
  }

  renderCorrectButton = () => {
    if (this.state.disableForASecond) {
      return <Button disabled
        className="correctButton"
        bsStyle="success"
        onClick={this.handleChangeWordCorrect}>
        {getWord('correct', this.props.locale)}
      </Button>;
    } else {
      return <Button className="correctButton"
        bsStyle="success"
        onClick={this.handleChangeWordCorrect}>
        {getWord('correct', this.props.locale)}
      </Button>;
    }
  }

  renderPassButton = () => {
    if (!this.state.hideIfTooManyPasses) {
      if (this.state.disableForASecond) {
        return <Button disabled
          className="passButton"
          bsStyle="danger"
          onClick={this.handleChangeWordIncorrect}>
          {getWord('incorrect', this.props.locale)}
        </Button>;
      } else {
        return <Button className="passButton"
          bsStyle="danger"
          onClick={this.handleChangeWordIncorrect}>
          {getWord('incorrect', this.props.locale)}
        </Button>;
      }
    } else {
      return null;
    }
  }

  renderTheWord = () => {
    return <h1 className='theWord'>{this.state.currentWord}</h1>;
  }

  getColorBasedOnTime = () => {
    if (this.state.timeLeft/this.props.timeLimit > 0.9) {
      return '#28a745';
    } else if (this.state.timeLeft/this.props.timeLimit > 0.8) {
      return '#64DD17';
    } else if (this.state.timeLeft/this.props.timeLimit > 0.7) {
      return '#AEEA00';
    } else if (this.state.timeLeft/this.props.timeLimit > 0.6) {
      return '#FFD600';
    } else if (this.state.timeLeft/this.props.timeLimit > 0.5) {
      return '#FFAB00';
    } else if (this.state.timeLeft/this.props.timeLimit > 0.4) {
      return '#FFAB40';
    } else if (this.state.timeLeft/this.props.timeLimit > 0.3) {
      return '#FF6D00';
    } else if (this.state.timeLeft/this.props.timeLimit > 0.2) {
      return '#FF6E40';
    } else if (this.state.timeLeft/this.props.timeLimit > 0.15) {
      return '#FF3D00';
    } else {
      return '#dc3545';
    }
  }

  renderTimeLeft = () => {
    const color = this.getColorBasedOnTime();
    return (<div>
      <CircularProgress
        thickness={4.5}
        max={1}
        variant="static"
        style={{color}}
        value={(this.state.timeLeft/this.props.timeLimit)*100}
        size={100}
      />
      <h3 className="timeLeft" style={{color}}>
        {this.state.timeLeft}s
      </h3>
    </div>);
  }

  render = () => {
    if (!this.state.gameIsActive) {
      if (this.state.roundNr - 1 === this.props.nrOfRounds) {
        return this.gameIsFinished();
      } else {
        return (<div className="centeredGame" fluid={true}>
          <h1 className="titleText">
            {getWord('welcomeText', this.props.locale)}
          </h1>
          <h2>
            {`${getWord('getReadyTeam', this.props.locale)}
             ${this.state.currentTeam}`}
          </h2>
          {this.renderRoundText()}
          {this.renderTeamPoints()}
          {this.renderBeginButton()}
        </div>);
      }
    }

    /*
            Event listeners to disable zoomimg
        */

    document.addEventListener('gesturestart', function(e) {
      e.preventDefault();
    });
    document.addEventListener('touchmove', function(event) {
      event = event.originalEvent || event;
      if (event.scale !== 1) {
        event.preventDefault();
      }
    }, false);

    /*
          End of event listeners
        */

    return (<div className="centeredGame" fluid={true}>
      <h1 className="titleText">{getWord('welcomeText', this.props.locale)}</h1>
      {this.renderRoundText()}
      <h4>
        {getWord('currentTeam', this.props.locale)}: {this.state.currentTeam}
      </h4>
      <h4>
        {`${getWord('currentTeamPoints', this.props.locale)}: 
        ${this.state.currentTeamsPoints}`}
      </h4>
      {this.renderTheWord()}
      {this.renderCorrectButton()}
      {this.renderPassButton()}
      {this.renderTimeLeft()}
    </div>);
  }
}
