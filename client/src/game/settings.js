import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getWord } from '../utils/localizer';

export const Settings = props => {

    const renderOptions = (from, to, skip) => {
        return [...Array(to + 1).keys()].filter(i => i >= from && (i + from) % skip === 0).map(i => <option value={i} key={i}>{i}</option>);
    }

    return (<div>
        <p>{getWord('selectTeamsText', props.locale)}:</p>
        <select value={props.state.nrOfTeams} 
                onChange={(e) => props.handleNrTeamsChange(e)}>
            {renderOptions(2, 7, 1)}
        </select>
        <p>{getWord('selectRoundsText', props.locale)}?</p>
        <select value={props.state.nrOfRounds}
                onChange={(e) => props.handleNrRoundsChange(e)}>
            {renderOptions(5, 20, 5)}
            <option value="999">{getWord('indefinite', props.locale)}</option>
        </select>
        <p>{getWord('selectTimeLimit', props.locale)}:</p>
        <select value={props.state.timeLimit}
                onChange={(e) => props.handleTimeLimitChange(e)}>
            {renderOptions(15, 60, 5)}
            <option value="999">{getWord('none', props.locale)}</option>
        </select>
        <p>{getWord('selectNumberOfPasses', props.locale)}:</p>
        <select value={props.state.nrOfPassesLimit}
                onChange={(e) => props.handleNrOfPassesLimitChange(e)}>
            {renderOptions(0, 2, 1)}
            <option value="999">{getWord('indefinite', props.locale)}</option>
        </select>
        <br />
        <Link to="/game">
            <Button bsStyle="primary">
            {getWord('finishedWithSettings', props.locale)}!</Button>
        </Link>
      </div>)
};