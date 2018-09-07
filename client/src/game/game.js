import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
  CircularProgress,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import Chart from 'react-google-charts';

import {getWord, getCorrectTextFile} from '../utils/localizer';
import {initGa} from './ga';
import {Layout} from './layout';

import '../css/game.css';
import '../css/global.css';

const Title = ({locale}) => (
  <h1 className="title">{getWord('welcomeText', locale)}</h1>
);

const GameIsFinished = ({locale, teams}) => (
  <div>
    <TeamPoints locale={locale} teams={teams}/>
    <div className="begin-button">
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        size="large">
        {getWord('playAgain', locale)}?
      </Button>
    </div>
  </div>
);

const CurrentTeamText = ({locale, currentTeam}) => (<h2 className="team-text">
  {`${getWord('getReadyTeam', locale)} ${currentTeam}`}
</h2>);

const RoundText = ({locale, roundNr}) => (<h3 className="round-text">
  {`${getWord('getReadyForNextRound', locale)} ${roundNr}`}
</h3>);

const TeamPoints = ({locale, teams}) => {
  let data = [['Team', 'Points', {role: 'style'}]];
  for (let i = 1; i < teams.size + 1; i++) {
    const team = teams.get(i);
    data.push([`Team ${i}`, team, '#44B39D']);
  }
  const options = {
    hAxis: {viewWindow: {min: 0}},
    vAxis: {viewWindow: {min: 0}},
    legend: 'none',
  };
  return (<Chart
    options={options}
    chartType="ColumnChart"
    width="100%"
    height="200px"
    data={data}
  />);
};

const AlertDialog = ({locale, alertIsOpen, handleClose}) => (
  <Dialog
    open={alertIsOpen}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description">
    <DialogTitle id="alert-dialog-title">
      {`${getWord('giveUp', locale)}?`}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {`${getWord('areYouSure', locale)}?`}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button component={Link} to="/" onClick={handleClose} color="primary">
        {`${getWord('giveUp', locale)}`}
      </Button>
      <Button onClick={handleClose} variant="contained"
        color="primary" autoFocus>
        {`${getWord('cancel', locale)}`}
      </Button>
    </DialogActions>
  </Dialog>
);

const GiveUpButton = ({locale, alertIsOpen, handleOpen, handleClose}) => (<div>
  <Button
    variant="contained"
    onClick={handleOpen}
    style={{
      'background': '#FB4049',
      'marginTop': 15,
      '&:hover': {
        'background': '#F4131E',
      },
    }}
    color="primary">
    {getWord('giveUp', locale)}
  </Button>
  <AlertDialog locale={locale}
    alertIsOpen={alertIsOpen}
    handleClose={handleClose} />
</div>);

export default class Game extends Component {
  constructor(props) {
    super(props);
    const teams = new Map();
    for (let i = 1; i < props.nrOfTeams + 1; i++) {
      teams.set(i, Math.floor(Math.random()*25)); // Init team's score
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
      alertIsOpen: false,
    };
    initGa();
  }

  componentDidMount = () => {
    /* Event listeners to disable zoomimg */
    document.addEventListener('gesturestart', function(e) {
      e.preventDefault();
    });

    document.addEventListener('touchmove', function(event) {
      event = event.originalEvent || event;
      if (event.scale !== 1) {
        event.preventDefault();
      }
    }, false);
  }

  handleAlertClickOpen = () => {
    this.setState({alertIsOpen: true});
  };

  handleAlertClickClose = () => {
    this.setState({alertIsOpen: false});
  };

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

  renderBeginButton = (locale, disableBeginButton) => {
    if (disableBeginButton) {
      return <div className="begin-button"><Button
        disabled
        color="primary"
        variant="contained"
        onClick={() => this.startGame()}>
        {getWord('begin', locale)}
      </Button></div>;
    } else {
      return <div className="begin-button"><Button
        color="primary"
        variant="contained"
        onClick={() => this.startGame()}>
        {getWord('begin', locale)}
      </Button></div>;
    }
  };

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

  startDisabledTimer = () => {
    setTimeout(() => {
      this.setState({disableBeginButton: false});
    }, 1500);
  }

  renderCorrectButton = () => {
    const isOnlyButtonStyle =
      this.state.hideIfTooManyPasses ? 'column-centered' : '';
    if (this.state.disableForASecond) {
      return (
        <button className={`image-button correct-button 
          correct-button-disabled ${isOnlyButtonStyle}`}>
          <img src="/icons/checkbox-marked-circle.svg" alt="correct button" />
        </button>
      );
    } else {
      return (
        <button
          className={`image-button correct-button ${isOnlyButtonStyle}`}
          onClick={this.handleChangeWordCorrect}>
          <img src="/icons/checkbox-marked-circle.svg" alt="correct button" />
        </button>
      );
    }
  }

  renderPassButton = () => {
    if (!this.state.hideIfTooManyPasses) {
      if (this.state.disableForASecond) {
        return (
          <button className="image-button pass-button pass-button-disabled"
            onClick={this.handleChangeWordIncorrect}>
            <img src="/icons/close-circle.svg" alt="pass button" />
          </button>);
      } else {
        return (
          <button className="image-button pass-button"
            onClick={this.handleChangeWordIncorrect}>
            <img src="/icons/close-circle.svg" alt="pass button" />
          </button>);
      }
    } else {
      return null;
    }
  }

  renderTheWord = () =>
    (<h1 className='the-word'>{this.state.currentWord}</h1>);

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
    return (<div className="time-left-container">
      <CircularProgress
        thickness={4.5}
        max={1}
        variant="static"
        style={{color}}
        value={(this.state.timeLeft/this.props.timeLimit)*100}
        size={100}
      />
      <h3 className="time-left" style={{color}}>
        {this.state.timeLeft}s
      </h3>
    </div>);
  }

  render = () => {
    const {
      locale,
      nrOfRounds,
    } = this.props;

    const {
      gameIsActive,
      roundNr,
      currentTeam,
      disableBeginButton,
      teams,
      currentTeamsPoints,
    } = this.state;

    if (!gameIsActive) {
      if (roundNr - 1 === nrOfRounds) {
        return <GameIsFinished locale={locale} teams={teams} />;
      } else {
        return (
          <Layout>
            <Title locale={locale}/>
            <CurrentTeamText locale={locale} currentTeam={currentTeam}/>
            <RoundText locale={locale} roundNr={roundNr}/>
            <TeamPoints locale={locale} teams={teams}/>
            {this.renderBeginButton(locale, disableBeginButton)}
            <GiveUpButton locale={locale}
              alertIsOpen={this.state.alertIsOpen}
              handleOpen={this.handleAlertClickOpen}
              handleClose={this.handleAlertClickClose} />
          </Layout>);
      }
    }

    return (
      <Layout>
        <Title locale={locale}/>
        <hr />
        <CurrentTeamText locale={locale} currentTeam={currentTeam}/>
        <RoundText locale={locale} roundNr={roundNr}/>
        <h4 className="score-text">
          {`${getWord('currentTeamPoints', locale)} ${currentTeamsPoints}`}
        </h4>
        <hr />
        {this.renderTheWord()}
        <hr />
        <div className="button-grid-game">
          {this.renderCorrectButton()}
          {this.renderPassButton()}
        </div>
        {this.renderTimeLeft()}
      </Layout>

    );
  }
}
