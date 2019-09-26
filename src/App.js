import React from 'react';
import Amplify from 'aws-amplify';
import awsmobile from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import Home from './containers/home';
import './App.css';

Amplify.configure(awsmobile);

function App() {
  return (
    <div className="App">
      <header>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </header>
      <Home />
    </div>
  );
}

export default withAuthenticator(App, true);
