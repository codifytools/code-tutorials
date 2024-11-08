import React, { useEffect, Fragment } from 'react';
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';
import SEO from './components/SEO.jsx';

export const App = () => {
  useEffect(() => { window.prerenderReady = true; }, []);

  return (
    <Fragment>
      <SEO
        title="Welcome to Meteor!"
        description="Welcome to Meteor page description"
        url="/"
        image="www.example.com/image.png"
      />

      <h1>Welcome to Meteor!</h1>
      <Hello/>
      <Info/>
    </Fragment>
  );
};
