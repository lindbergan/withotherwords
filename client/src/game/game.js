import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { getWord } from '../utils/localizer';
import sweTextFile from '../locales/swe-words';
import engTextFile from '../locales/eng-words';

export default class Game extends Component {
    constructor(props, context) {
        super(props, context);
        const teams = new Map();
        for (let i = 1; i < props.nrOfTeams + 1; i++) teams.set(i, 0); // Init team's score
        const hideIfTooManyPasses = props.nrOfPassesLimit < 1;
        this.textFile = this.getCorrectTextFile();
        this.state = { 
            teams,
            gameIsActive: false,
            hideIfTooManyPasses,
            currentTeamsPoints: 0,
            currentTeam: 1,
            currentWord: this.getRandomWord(),
            currentlyPassed: 0,
            timeLeft: props.timeLimit
         };
        this.handleChangeWordCorrect = this.handleChangeWordCorrect.bind(this);
        this.handleChangeWordIncorrect = this.handleChangeWordIncorrect.bind(this);
    }

    getCorrectTextFile() {
        switch(this.props.locale) {
            case 'en-US': return engTextFile;
            case 'sv-SE': return sweTextFile;
            default: return sweTextFile;
        }
    }

    saveScore() {
        const teams = this.state.teams;
        teams.set(this.state.currentTeam, this.state.currentTeamsPoints);
        this.setState(teams);
    }

    handleChangeWordCorrect(event) {
        console.log(this);
        const currentTeamsNewPoints = this.state.currentTeamsPoints + 1;
        this.setState({ currentTeamsPoints: currentTeamsNewPoints })
        this.nextWord();
    }

    nextWord() { this.setState({ currentWord: this.getRandomWord() }) }

    hideIfTooManyPasses() {
        if (this.state.currentlyPassed >= this.props.nrOfPassesLimit - 1) { this.setState({ hideIfTooManyPasses: true }) }
    }

    handleChangeWordIncorrect(event) {
        const newPassedAmount = this.state.currentlyPassed + 1;
        this.setState({ currentlyPassed: newPassedAmount })
        this.hideIfTooManyPasses();
        this.nextWord();
    }

    getRandomWord() {
        const index = Math.floor(Math.random() * this.textFile.length);
        return this.textFile[index];
    }

    startTimer() {
        return setInterval(() => {
            const newTime = this.state.timeLeft - 1;
            this.setState({ timeLeft:  newTime });
        }, 1000);
    }

    startGame() {
        this.setState({
            gameIsActive: true
        });
        const timer = this.startTimer();
        setTimeout(() => {
            this.resetForNextRound();
            clearInterval(timer);
        }, this.props.timeLimit * 1000)
    }

    resetForNextRound() {
        this.setState({
            gameIsActive: false,
            hideIfTooManyPasses: this.props.nrOfPassesLimit === 0,
            currentlyPassed: 0,
            timeLeft: this.props.timeLimit
        });
        this.nextTeam();
    }

    nextTeam() {
        this.saveScore();
        const newCurrentTeamNr = (this.state.currentTeam % this.props.nrOfTeams) + 1;
        this.setState({ 
            currentTeam : newCurrentTeamNr,
            currentTeamsPoints: this.state.teams.get(newCurrentTeamNr)
         })
    }

    render() {
        if (!this.state.gameIsActive) {
            return (<div>
            <p>{getWord('getReadyTeam', this.props.locale)} {this.state.currentTeam}</p>
            <Button bsStyle="success" onClick={() => this.startGame()}>{getWord('begin', this.props.locale)}</Button>
            </div>)
        }

        return (<div>
            <p>{getWord('currentTeam', this.props.locale)}: {this.state.currentTeam}</p>
            <p>{getWord('currentTeamPoints', this.props.locale)}: {this.state.currentTeamsPoints}</p>
            <h1>{this.state.currentWord}</h1>
            <Button bsStyle="success" onClick={this.handleChangeWordCorrect}>{getWord('correct', this.props.locale)}</Button>
            {!this.state.hideIfTooManyPasses ? <Button bsStyle="danger" onClick={this.handleChangeWordIncorrect}>{getWord('incorrect', this.props.locale)}</Button> : null}
            <h4>{getWord('timeLeft', this.props.locale)}: {this.state.timeLeft}</h4>
        </div>)
    }
}