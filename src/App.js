import React from 'react';
import { Route } from 'react-router-dom'

import { HomePage, TopicPage, PostPage } from './pages';
import { Header } from './components';

import './styles/style.scss'

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Route exact path={'/'} component={HomePage}></Route>
      <Route path={'/topic/:id'} component={TopicPage}></Route>
      <Route path={'/post/:id'} component={PostPage}></Route>
    </div>
  );
}

export default App;