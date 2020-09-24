import React from 'react';
import { Route } from 'react-router-dom'

import { HomePage, TopicPage, PostPage, MakePostPage, ProfilePage } from './pages';
import { Header } from './components';

import './styles/style.scss'

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Route exact path={'/'} component={HomePage}></Route>
      <Route path={'/topic/:id'} component={TopicPage}></Route>
      <Route path={'/post/:id'} component={PostPage}></Route>
      <Route exact path={'/make'} component={MakePostPage}></Route>
      <Route path={'/profile/:id'} component={ProfilePage}></Route>
    </div>
  );
}

export default App;
