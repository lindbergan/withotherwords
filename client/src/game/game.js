import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { getWord } from '../utils/localizer';
import textFile from '../locales/swe-words';

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

    handleNrTeamsChange(event) { this.setState({ nrOfTeams: event.target.value }); }
    handleNrRoundsChange(event) { this.setState({ nrOfRounds: event.target.value }); }
    handleTimeLimitChange(event) { this.setState({ timeLimit: event.target.value }); }
    handleNrOfPassesLimitChange(event) { this.setState({ nrOfPassesLimit: event.target.value }); }
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
                <Button bsStyle="primary" onClick={() => this.setState({ 
                    settingsCompleted: true,
                    currentTeam: 1,
                    }) }>{getWord('finishedWithSettings', this.props.locale)}!</Button>
              </div>)
        }
        return <div>
            {!this.state.gameIsActive ? <div>
                <p>{getWord('getReadyTeam', this.props.locale)} {this.state.currentTeam}</p>
                <Button bsStyle="success" onClick={() => this.startGame()}>{getWord('begin', this.props.locale)}</Button>
            </div> : null}
            {this.state.gameIsActive ? <div>
                <p>{getWord('currentTeam', this.props.locale)}: {this.state.currentTeam}</p>
                <p>{getWord('currentTeamPoints', this.props.locale)}: {this.state.teams.get(this.state.currentTeam)}</p>
                <h1>{this.state.currentWord}</h1>
                <Button bsStyle="success" onClick={this.handleChangeWordCorrect}>{getWord('correct', this.props.locale)}</Button>
                {!this.state.hideIncorrect ? <Button bsStyle="danger" onClick={this.handleChangeWordIncorrect}>{getWord('incorrect', this.props.locale)}</Button> : null}
                <h4>{getWord('timeLeft', this.props.locale)}: {this.state.timeLeft}</h4>
            </div> : null}
            </div>;
    }
}