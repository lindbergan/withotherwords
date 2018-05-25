import React, { Component } from 'react';
import { getWord } from './localizer';

export default class Game extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            settingsCompleted: false,
            nrOfTeams: 2,
            timeLimit: 20,
            nrOfRounds: 999,
            gameIsActive: false
         };
         this.handleNrTeamsChange = this.handleNrTeamsChange.bind(this);
         this.handleNrRoundsChange = this.handleNrRoundsChange.bind(this);
         this.handleTimeLimitChange = this.handleTimeLimitChange.bind(this);
    }

    handleNrTeamsChange(event) { this.setState({ nrOfTeams: parseInt(event.target.value) }); }
    handleNrRoundsChange(event) { this.setState({ nrOfRounds: parseInt(event.target.value)}); }
    handleTimeLimitChange(event) { this.setState({ timeLimit: parseInt(event.target.value)}); }

    startGame() {
        this.setState({ gameIsActive: true });
        this.setState({ timeLeft: this.state.timeLimit });
        const timer = setInterval(() => {
            this.setState({ timeLeft: this.state.timeLeft - 1})
        }, 1000);
        setTimeout(() => {
            this.setState({ gameIsActive: false });
            clearInterval(timer);
        }, this.state.timeLimit * 1000)
    }

    render() {
        if (!this.state.settingsCompleted) { 
            return (<div>
                <p>{getWord('selectTeamsText', this.props.locale)}:</p>
                <select value={this.state.nrOfTeams} onChange={this.handleNrTeamsChange}>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                </select>
                <p>{getWord('selectRoundsText', this.props.locale)}?</p>
                <select value={this.state.nrOfRounds} onChange={this.handleNrRoundsChange}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="999">{getWord('indefinite', this.props.locale)}</option>
                </select>
                <p>{getWord('selectTimeLimit', this.props.locale)}:</p>
                <select value={this.state.timeLimit} onChange={this.handleTimeLimitChange}>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                    <option value="35">35</option>
                    <option value="40">40</option>
                    <option value="45">45</option>
                    <option value="50">50</option>
                    <option value="55">55</option>
                    <option value="60">60</option>
                    <option value="999">{getWord('none', this.props.locale)}</option>
                </select>
                <br />
                <button onClick={() => this.setState({ 
                    settingsCompleted: true,
                    currentTeam: 1,
                    }) }>Done? Start playing!</button>
              </div>)
        }
        return <div>
            {!this.state.gameIsActive ? <div>
                <p>Get ready Team {this.state.currentTeam}</p>
                <button onClick={() => this.startGame()}>Begin</button>
            </div> : null}
            {this.state.gameIsActive ? <div>
                <p>Current team: {this.state.currentTeam}</p>
                <p>Current team's points: 10</p>
                <h1>Word</h1>
                <button>Correct</button>
                <button>Incorrect</button>
                <h1>Time left: {this.state.timeLeft}</h1>
            </div> : null}
            </div>;
    }
}