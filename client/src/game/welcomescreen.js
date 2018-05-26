import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { getWord } from '../utils/localizer';

export const WelcomeScreen = (props) => {

    const renderChooseLanguage = () => {
        return (<div>
            <p>{getWord('getStartedText', props.locale)}:</p>
            <img src="icons/sweden-flag-round-icon-64.png" onClick={() => props.changeLanguage('sv-SE')} alt="swedish flag"/>
            <p>{getWord('or', props.locale)}</p>
            <img src="icons/united-states-of-america-flag-round-icon-64.png" onClick={() => props.changeLanguage('en-US')} alt="american flag"/>
        </div>);
      }
        
    return (<div>
        <h1>{getWord('welcomeText', props.locale)}</h1>
        { renderChooseLanguage() }
        <Link to="/game">
            <Button bsStyle="primary"
                    bsSize="large"
            >{getWord('startPlayingText', props.locale)}
            </Button>
        </Link>
        </div>)
}