import ReactGA from 'react-ga';

export const initGa = () => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.initialize('UA-117093777-2');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
};
