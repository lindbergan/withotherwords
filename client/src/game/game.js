import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  CircularProgress,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import Chart from "react-google-charts";

import { getWord, getCorrectTextFile } from "../utils/localizer";
import { Layout } from "./layout";

import "../css/game.css";
import "../css/global.css";

const Title = ({ locale }) => (
  <h1 className="title">{getWord("welcomeText", locale)}</h1>
);

const GameIsFinished = ({ locale, teams }) => (
  <Layout>
    <Title locale={locale} />
    <TeamPoints locale={locale} teams={teams} />
    <div className="begin-button">
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        size="large"
      >
        {getWord("playAgain", locale)}?
      </Button>
    </div>
  </Layout>
);

const CurrentTeamText = ({ currentTeam }) => (
  <h2 className="team-text">{`${currentTeam.name}`}</h2>
);

const RoundText = ({ locale, roundNr }) => (
  <h3 className="round-text">
    {`${getWord("getReadyForNextRound", locale)} ${roundNr}`}
  </h3>
);

const TeamPoints = ({ locale, teams }) => {
  let data = [
    [
      `${getWord("teams", locale)}`,
      `${getWord("points", locale)}`,
      { role: "style" }
    ]
  ];
  for (let i = 0; i < teams.size; i++) {
    const team = teams.get(i);
    data.push([`${team.name}`, team.points, "#44B39D"]);
  }
  const options = {
    hAxis: { viewWindow: { min: 0 } },
    vAxis: { viewWindow: { min: 0 } },
    legend: "none"
  };
  return (
    <Chart
      options={options}
      chartType="ColumnChart"
      width="100%"
      height="200px"
      data={data}
    />
  );
};

const AlertDialog = ({ locale, alertIsOpen, handleClose }) => (
  <Dialog
    open={alertIsOpen}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {`${getWord("giveUp", locale)}?`}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {`${getWord("areYouSure", locale)}?`}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button component={Link} to="/" onClick={handleClose} color="primary">
        {`${getWord("giveUp", locale)}`}
      </Button>
      <Button
        onClick={handleClose}
        variant="contained"
        color="primary"
        autoFocus
      >
        {`${getWord("cancel", locale)}`}
      </Button>
    </DialogActions>
  </Dialog>
);

const GiveUpButton = ({ locale, alertIsOpen, handleOpen, handleClose }) => (
  <div>
    <Button
      variant="contained"
      onClick={handleOpen}
      style={{
        background: "#FB4049",
        marginTop: 15,
        "&:hover": {
          background: "#F4131E"
        }
      }}
      color="primary"
    >
      {getWord("giveUp", locale)}
    </Button>
    <AlertDialog
      locale={locale}
      alertIsOpen={alertIsOpen}
      handleClose={handleClose}
    />
  </div>
);

const BeginButton = ({ locale, disableBeginButton, startGame }) => {
  if (disableBeginButton) {
    return (
      <div className="begin-button">
        <Button
          disabled
          color="primary"
          variant="contained"
          onClick={() => startGame()}
        >
          {getWord("begin", locale)}
        </Button>
      </div>
    );
  } else {
    return (
      <div className="begin-button">
        <Button color="primary" variant="contained" onClick={() => startGame()}>
          {getWord("begin", locale)}
        </Button>
      </div>
    );
  }
};

const CurrentTeamPoints = ({ locale, currentTeam }) => (
  <h4 className="score-text">
    {`${getWord("currentTeamPoints", locale)} ${currentTeam.points}`}
  </h4>
);

const TheWord = ({ currentWord }) => (
  <h1 className="the-word">{currentWord}</h1>
);

const ActionButtons = ({
  hideIfTooManyPasses,
  disableForASecond,
  handleChangeWordCorrect,
  handleChangeWordIncorrect
}) => (
  <div className="button-grid-game">
    <CorrectButton
      hideIfTooManyPasses={hideIfTooManyPasses}
      disableForASecond={disableForASecond}
      handleChangeWordCorrect={handleChangeWordCorrect}
    />
    <PassButton
      hideIfTooManyPasses={hideIfTooManyPasses}
      disableForASecond={disableForASecond}
      handleChangeWordIncorrect={handleChangeWordIncorrect}
    />
  </div>
);

const TimeLeft = ({ timeLeft, timeLimit }) => {
  const color = getColorBasedOnTime(timeLeft, timeLimit);
  return (
    <div className="time-left-container">
      <CircularProgress
        thickness={4.5}
        max={1}
        variant="static"
        style={{ color }}
        value={(timeLeft / timeLimit) * 100}
        size={100}
      />
      <h3 className="time-left" style={{ color }}>
        {timeLeft}s
      </h3>
    </div>
  );
};

const getColorBasedOnTime = (timeLeft, timeLimit) => {
  if (timeLeft / timeLimit > 0.9) {
    return "#28a745";
  } else if (timeLeft / timeLimit > 0.8) {
    return "#64DD17";
  } else if (timeLeft / timeLimit > 0.7) {
    return "#AEEA00";
  } else if (timeLeft / timeLimit > 0.6) {
    return "#FFD600";
  } else if (timeLeft / timeLimit > 0.5) {
    return "#FFAB00";
  } else if (timeLeft / timeLimit > 0.4) {
    return "#FFAB40";
  } else if (timeLeft / timeLimit > 0.3) {
    return "#FF6D00";
  } else if (timeLeft / timeLimit > 0.2) {
    return "#FF6E40";
  } else if (timeLeft / timeLimit > 0.15) {
    return "#FF3D00";
  } else {
    return "#dc3545";
  }
};

const CorrectButton = ({
  hideIfTooManyPasses,
  disableForASecond,
  handleChangeWordCorrect
}) => {
  const isOnlyButtonStyle = hideIfTooManyPasses ? "column-centered" : "";
  if (disableForASecond) {
    return (
      <button
        className={`image-button correct-button 
        correct-button-disabled ${isOnlyButtonStyle}`}
      >
        <img src="/icons/checkbox-marked-circle.svg" alt="correct button" />
      </button>
    );
  } else {
    return (
      <button
        className={`image-button correct-button ${isOnlyButtonStyle}`}
        onClick={handleChangeWordCorrect}
      >
        <img src="/icons/checkbox-marked-circle.svg" alt="correct button" />
      </button>
    );
  }
};

const PassButton = ({
  hideIfTooManyPasses,
  disableForASecond,
  handleChangeWordIncorrect
}) => {
  if (!hideIfTooManyPasses) {
    if (disableForASecond) {
      return (
        <button
          className="image-button pass-button pass-button-disabled"
          onClick={handleChangeWordIncorrect}
        >
          <img src="/icons/close-circle.svg" alt="pass button" />
        </button>
      );
    } else {
      return (
        <button
          className="image-button pass-button"
          onClick={handleChangeWordIncorrect}
        >
          <img src="/icons/close-circle.svg" alt="pass button" />
        </button>
      );
    }
  } else {
    return null;
  }
};

export default class Game extends Component {
  constructor(props) {
    super(props);
    const teams = new Map();
    for (let i = 0; i < props.nrOfTeams; i++) {
      teams.set(i, {
        index: i,
        name: `${getWord("team", props.locale)} ${i + 1}`,
        points: 0
      });
    }
    this.textFile = getCorrectTextFile(props.locale);
    this.state = {
      teams,
      currentTeam: teams.get(0),
      currentWord: this.getRandomWord(),
      hideIfTooManyPasses: props.nrOfPassesLimit < 1,
      timeLeft: props.timeLimit,
      currentlyPassed: 0,
      totalRoundNr: 1,
      roundNr: 1,
      gameIsActive: false,
      disableBeginButton: false,
      disableForASecond: false,
      alertIsOpen: false
    };
    document.title = getWord("title-game", props.locale);
  }

  componentDidMount = () => {
    /* Event listeners to disable zoomimg */
    document.addEventListener("gesturestart", function(e) {
      e.preventDefault();
    });

    document.addEventListener(
      "touchmove",
      function(event) {
        event = event.originalEvent || event;
        if (event.scale !== 1) {
          event.preventDefault();
        }
      },
      false
    );
  };

  handleAlertClickOpen = () => {
    this.setState({ alertIsOpen: true });
  };

  handleAlertClickClose = () => {
    this.setState({ alertIsOpen: false });
  };

  saveScore = () => {
    const { teams, currentTeam } = this.state;
    const { index } = currentTeam;
    teams.set(index, currentTeam);
    this.setState({ teams: teams });
  };

  handleChangeWordCorrect = () => {
    const { currentTeam } = this.state;
    const { points } = currentTeam;
    const newTeam = {
      ...currentTeam,
      points: points + 1
    };
    this.setState({ currentTeam: newTeam });
    this.nextWord();
  };

  nextWord = () => {
    this.setState({
      currentWord: this.getRandomWord(),
      disableForASecond: true
    });
    setTimeout(() => this.setState({ disableForASecond: false }), 500);
  };

  hideIfTooManyPasses = () => {
    if (this.state.currentlyPassed >= this.props.nrOfPassesLimit - 1) {
      this.setState({ hideIfTooManyPasses: true });
    }
  };

  handleChangeWordIncorrect = () => {
    const newPassedAmount = this.state.currentlyPassed + 1;
    this.setState({ currentlyPassed: newPassedAmount });
    this.hideIfTooManyPasses();
    this.nextWord();
  };

  getRandomWord = () => {
    const index = Math.floor(Math.random() * this.textFile.length);
    return this.textFile[index];
  };

  startTimer = () => {
    return setInterval(() => {
      const newTime = this.state.timeLeft - 1;
      this.setState({ timeLeft: newTime });
    }, 1000);
  };

  startGame = () => {
    this.setState({ gameIsActive: true });
    const timer = this.startTimer();
    setTimeout(() => {
      this.resetForNextRound();
      clearInterval(timer);
    }, this.props.timeLimit * 1000);
  };

  resetForNextRound = () => {
    this.setState({
      gameIsActive: false,
      hideIfTooManyPasses: this.props.nrOfPassesLimit === 0,
      currentlyPassed: 0,
      timeLeft: this.props.timeLimit,
      totalRoundNr: this.state.totalRoundNr + 1,
      roundNr: Math.ceil((this.state.totalRoundNr + 1) / this.props.nrOfTeams),
      disableBeginButton: true
    });
    this.nextTeam();
    this.startDisabledTimer();
  };

  nextTeam = () => {
    this.saveScore();
    const { teams, currentTeam } = this.state;
    const { nrOfTeams } = this.props;
    const newCurrentTeamNr = (currentTeam.index + 1) % nrOfTeams;
    this.setState({
      currentTeam: teams.get(newCurrentTeamNr),
      currentWord: this.getRandomWord()
    });
  };

  startDisabledTimer = () => {
    setTimeout(() => {
      this.setState({ disableBeginButton: false });
    }, 1500);
  };

  render = () => {
    const { locale, nrOfRounds, timeLimit } = this.props;

    const {
      gameIsActive,
      roundNr,
      currentTeam,
      disableBeginButton,
      teams,
      currentWord,
      timeLeft,
      disableForASecond,
      hideIfTooManyPasses
    } = this.state;

    if (!gameIsActive) {
      if (roundNr - 1 === nrOfRounds) {
        return <GameIsFinished locale={locale} teams={teams} />;
      } else {
        return (
          <Layout>
            <Title locale={locale} />
            <hr />
            <CurrentTeamText currentTeam={currentTeam} />
            <RoundText locale={locale} roundNr={roundNr} />
            <hr />
            <TeamPoints locale={locale} teams={teams} />
            <BeginButton
              locale={locale}
              disableBeginButton={disableBeginButton}
              startGame={this.startGame}
            />
            <GiveUpButton
              locale={locale}
              alertIsOpen={this.state.alertIsOpen}
              handleOpen={this.handleAlertClickOpen}
              handleClose={this.handleAlertClickClose}
            />
          </Layout>
        );
      }
    }

    return (
      <Layout>
        <Title locale={locale} />
        <hr />
        <CurrentTeamText currentTeam={currentTeam} />
        <RoundText locale={locale} roundNr={roundNr} />
        <CurrentTeamPoints locale={locale} currentTeam={currentTeam} />
        <hr />
        <TheWord currentWord={currentWord} />
        <hr />
        <ActionButtons
          hideIfTooManyPasses={hideIfTooManyPasses}
          disableForASecond={disableForASecond}
          handleChangeWordCorrect={this.handleChangeWordCorrect}
          handleChangeWordIncorrect={this.handleChangeWordIncorrect}
        />
        <TimeLeft timeLeft={timeLeft} timeLimit={timeLimit} />
      </Layout>
    );
  };
}
