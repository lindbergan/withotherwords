import React from 'react';
import ReactDOM from 'react-dom';
import App from './game/App';
import registerServiceWorker from './registerServiceWorker';

const Application = () => (
  <App />
);

ReactDOM.render(<Application />, document.getElementById('root'));
registerServiceWorker();
