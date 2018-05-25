import React, { Component } from 'react';
import { getWord } from './localizer';
import textFile from './locales/swe-words';

export default class Game extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            settingsCompleted: false,
            nrOfTeams: 2,
            timeLimit: 20,
            currentlyPassed: 0,
            nrOfPassesLimit: 2,
            nrOfRounds: 999,
            gameIsActive: false,
            hideIncorrect: false,
            currentWord: this.getRandomWord(),
            teams: new Map()
         };
         for (let i = 1; i < this.state.nrOfTeams + 1; i++) this.state.teams.set(i, 0);
         this.handleNrTeamsChange = this.handleNrTeamsChange.bind(this);
         this.handleNrRoundsChange = this.handleNrRoundsChange.bind(this);
         this.handleTimeLimitChange = this.handleTimeLimitChange.bind(this);
         this.handleChangeWordCorrect = this.handleChangeWordCorrect.bind(this);
         this.handleChangeWordIncorrect = this.handleChangeWordIncorrect.bind(this);
         this.handleNrOfPassesLimitChange = this.handleNrOfPassesLimitChange.bind(this);
    }

    handleNrTeamsChange(event) { this.setState({ nrOfTeams: parseInt(event.target.value) }); }
    handleNrRoundsChange(event) { this.setState({ nrOfRounds: parseInt(event.target.value)}); }
    handleTimeLimitChange(event) { this.setState({ timeLimit: parseInt(event.target.value)}); }
    handleNrOfPassesLimitChange(event) { this.setState({ nrOfPassesLimit: parseInt(event.target.value)}); }
    handleChangeWordCorrect(event) {
        const points = this.state.teams.get(this.state.currentTeam);
        this.state.teams.set(this.state.currentTeam, points + 1);
        this.setState({ 
            currentWord: this.getRandomWord(),
        });
    }
    handleChangeWordIncorrect(event) {
        this.setState({ 
            currentWord: this.getRandomWord(),
            currentlyPassed: this.state.currentlyPassed + 1
         });
        if (this.state.currentlyPassed > 0) this.setState({ hideIncorrect: true });
    }

    getRandomWord() {
        const index = Math.floor(Math.random() * textFile.length);
        console.log(index);
        return textFile[index];
    }

    startGame() {
        this.setState({ gameIsActive: true });
        this.setState({ timeLeft: this.state.timeLimit });
        const timer = setInterval(() => {
            this.setState({ timeLeft: this.state.timeLeft - 1 })
        }, 1000);
        setTimeout(() => {
            this.setState({ 
                gameIsActive: false,
                currentlyPassed: 0,
                hideIncorrect: false,
                currentTeam: (this.state.currentTeam % this.state.nrOfTeams) + 1
             });
            clearInterval(timer);
        }, this.state.timeLimit * 1000)
    }

    renderOptions(from, to, skip) {
        return [...Array(to + 1).keys()].filter(i => i >= from && (i + from) % skip === 0).map(i => <option value={i}>{i}</option>);
    }

    render() {
        if (!this.state.settingsCompleted) { 
            return (<div>
                <p>{getWord('selectTeamsText', this.props.locale)}:</p>
                <select value={this.state.nrOfTeams} onChange={this.handleNrTeamsChange}>
                    {this.renderOptions(2, 7, 1)}
                </select>
                <p>{getWord('selectRoundsText', this.props.locale)}?</p>
                <select value={this.state.nrOfRounds} onChange={this.handleNrRoundsChange}>
                    {this.renderOptions(5, 20, 5)}
                    <option value="999">{getWord('indefinite', this.props.locale)}</option>
                </select>
                <p>{getWord('selectTimeLimit', this.props.locale)}:</p>
                <select value={this.state.timeLimit} onChange={this.handleTimeLimitChange}>
                    {this.renderOptions(15, 60, 5)}
                    <option value="999">{getWord('none', this.props.locale)}</option>
                </select>
                <p>{getWord('selectNumberOfPasses', this.props.locale)}:</p>
                <select value={this.state.nrOfPassesLimit} onChange={this.handleNrOfPassesLimitChange}>
                    {this.renderOptions(0, 2, 1)}
                    <option value="999">{getWord('none', this.props.locale)}</option>
                </select>
                <br />
                <button onClick={() => this.setState({ 
                    settingsCompleted: true,
                    currentTeam: 1,
                    }) }>{getWord('finishedWithSettings', this.props.locale)}!</button>
              </div>)
        }
        return <div>
            {!this.state.gameIsActive ? <div>
                <p>{getWord('getReadyTeam', this.props.locale)} {this.state.currentTeam}</p>
                <button onClick={() => this.startGame()}>{getWord('begin', this.props.locale)}</button>
            </div> : null}
            {this.state.gameIsActive ? <div>
                <p>{getWord('currentTeam', this.props.locale)}: {this.state.currentTeam}</p>
                <p>{getWord('currentTeamPoints', this.props.locale)}: {this.state.teams.get(this.state.currentTeam)}</p>
                <h1>{this.state.currentWord}</h1>
                <button onClick={this.handleChangeWordCorrect}>Correct</button>
                {!this.state.hideIncorrect ? <button onClick={this.handleChangeWordIncorrect}>Incorrect</button> : null}
                <h1>Time left: {this.state.timeLeft}</h1>
            </div> : null}
            </div>;
    }
}