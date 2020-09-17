import React from 'react';
import { Route } from 'react-router-dom'

import { HomePage } from './pages';
import { Header } from './components';

import './styles/style.scss'

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Route exact path={['/', '/trending', '/hot', '/popular']} component={HomePage}></Route>
    </div>
  );
}

export default App;
