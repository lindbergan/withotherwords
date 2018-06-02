import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { getWord } from '../utils/localizer';
import { Grid, Row } from 'react-bootstrap';
import ReactGA from 'react-ga';
import '../css/welcomescreen.css';

export const WelcomeScreen = props => {
    if (process.env.NODE_ENV === 'production') {
        ReactGA.initialize('UA-117093777-2');
        ReactGA.pageview(window.location.pathname + window.location.search);
    }
    const isSweSelected = () => {
        if (props.locale === 'sv-SE') return 'selected';
        else return '';
    };

    const isUsSelected = () => {
        if (props.locale === 'en-US') return 'selected';
        else return '';
    }

    const renderChooseLanguage = () => {
        return (<div className="chooseLanguage spacing">
            <h5 className="getStartedText">{getWord('getStartedText', props.locale)}</h5>
            <div className="centeredImages spacing">
                <img className={`border-black primary ${isSweSelected()}`} src="icons/sweden-flag-round-icon-64.png" onClick={() => props.changeLanguage('sv-SE')} alt="swedish flag"/>
                <img className={`border-black primary ${isUsSelected()}`} src="icons/united-states-of-america-flag-round-icon-64.png" onClick={() => props.changeLanguage('en-US')} alt="american flag"/>
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