import React from 'react';
import { Route } from 'react-router-dom'

import { HomePage, TopicPage, PostPage, MakeTopicPage, ProfilePage, CommunityPage } from './pages';
import { Header } from './components';

import './styles/style.scss'

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Route exact path={'/'} component={HomePage}></Route>
      <Route exact path={['/trending', '/trending/:topic']} component={HomePage}></Route>
      <Route exact path={['/hot', '/hot/:topic']} component={HomePage}></Route>
      <Route exact path={['/popular', '/popular/:topic']} component={HomePage}></Route>
      <Route exact path={['/editors', '/editors/:topic']} component={HomePage}></Route>
      <Route path={'/topic/:id'} component={TopicPage}></Route>
      <Route path={'/post/:id'} component={PostPage}></Route>
      <Route exact path={'/make'} component={MakeTopicPage}></Route>
      <Route path={'/profile/:id'} component={ProfilePage}></Route>
      <Route exact path={'/community'} component={CommunityPage}></Route>
    </div>
  );
}

export default App;
