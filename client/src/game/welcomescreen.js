import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { getWord } from '../utils/localizer';
import { Grid, Row } from 'react-bootstrap';
import '../css/welcomescreen.css';

export const WelcomeScreen = (props) => {

    const renderChooseLanguage = () => {
        return (<div className="chooseLanguage spacing">
            <h5>{getWord('getStartedText', props.locale)}</h5>
            <div className="centeredImages spacing">
                <img className="border-black primary" src="icons/sweden-flag-round-icon-64.png" onClick={() => props.changeLanguage('sv-SE')} alt="swedish flag"/>
                <img className="border-black primary" src="icons/united-states-of-america-flag-round-icon-64.png" onClick={() => props.changeLanguage('en-US')} alt="american flag"/>
            </div>
        </div>);
      }
        
    return (<Grid fluid={true} className="centered spacing">
        <Row xs={12} md={12}><h1 className="welcomeText">{getWord('welcomeText', props.locale)}</h1></Row>
        { renderChooseLanguage() }
        <Row><Link to="/settings" className="beginButton spacing">
            <Button bsStyle="primary"
                    bsSize="large"
            >{getWord('startPlayingText', props.locale)}
            </Button>
        </Link></Row>
        </Grid>)
}