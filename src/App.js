import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { HomePage, TopicPage, PostPage, MakeTopicPage, ProfilePage, CommunityPage, TestPage, SearchPage } from './pages';
import { Header } from './components';
import { facebookActions, userActions } from './redux/actions';
import { facebookApi } from './utils/api';

import './styles/style.scss'

function App() {
  const dispatch = useDispatch()

  const isAuth = useSelector(({ user }) => user.isAuth)

  React.useEffect(() => {
    const facebookInterval = setInterval(() => {
      facebookApi.getFacebookApi()


      if (window.FB) {
        clearInterval(facebookInterval)
        window.FB.init({
          appId: '336672787749717',
          autoLogAppEvents: true,
          xfbml: true,
          version: 'v8.0'
        });

        facebookApi.getLoginStatus().then(res => {
          dispatch(facebookActions.login(res))

          facebookApi.getUserPhoto(res.authResponse.userID).then(res => {
            dispatch(userActions.setUserPhoto(res))
          })

          facebookApi.getMe().then(name => dispatch(userActions.setUserName(name)))
        })
      }
    }, 100)
  }, [])

  React.useEffect(() => {
    dispatch(userActions.getMe())
  }, [])

  return (
    <div className="wrapper">
      <Header />
      <Route exact path={'/'} component={HomePage}></Route>
      <Route exact path={['/trending', '/trending/:topic']} component={HomePage}></Route>
      <Route exact path={['/hot', '/hot/:topic']} component={HomePage}></Route>
      <Route exact path={['/popular', '/popular/:topic']} component={HomePage}></Route>
      <Route exact path={['/editors', '/editors/:topic']} component={HomePage}></Route>
      <Route exact path={'/topic/:id'} component={TopicPage}></Route>
      <Route path={'/topic/:topicId/post/:postId'} component={PostPage}></Route>
      <Route exact path={'/make'} render={() => isAuth ? <MakeTopicPage /> : <Redirect to="/" />}></Route>
      <Route path={'/profile/:id'} render={() => isAuth ? <ProfilePage /> : <Redirect to="/" />}></Route>
      <Route exact path={'/community'} component={CommunityPage}></Route>
      <Route exact path={'/search'} component={SearchPage}></Route>


      <Route exact path={'/test'} component={TestPage}></Route>
    </div>
  );
}

export default App;
