import React from 'react';
import '../css/layout.css';

export const Layout = ({children, showPhoneImage}) => {
  return (
    showPhoneImage ?
      <PhoneImage>
        {children}
      </PhoneImage> :
      <div className="h-v-centered">
        {children}
      </div>);
};

const PhoneImageUrl = 'icons/iphone.svg';

const PhoneImage = props => (
  <div className="centered">
    <img src={PhoneImageUrl} alt="phone background" />
    <div>
      {props.children}
    </div>
  </div>
);
