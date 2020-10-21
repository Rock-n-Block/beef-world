import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { HomePage, TopicPage, PostPage, MakeTopicPage, ProfilePage, CommunityPage, TestPage, SearchPage, PrivacyPage, TermsPage } from './pages';
import { Header } from './components';
import { facebookActions, userActions, topicActions } from './redux/actions';
import { facebookApi, twitterApi } from './utils/api';
import { Modal } from './components';
import { SignInForm, SignUpForm } from './modules';
import { modalActions } from './redux/actions';

import './styles/style.scss'

function App() {
  const dispatch = useDispatch()

  const { isOpenSignIn, isOpenSignUp, isAuth } = useSelector((state) => {
    return {
      isOpenSignIn: state.modal.isOpenSignIn,
      isOpenSignUp: state.modal.isOpenSignUp,
      ...state.user
    }
  })
  const handleOkSignInModal = () => {
    dispatch(modalActions.toggleSignInModal(false))
  }
  const handleOkSignUpModal = () => {
    dispatch(modalActions.toggleSignUpModal(false))
  }


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
    twitterApi.getTwitterApi()
  }, [])

  React.useEffect(() => {
    dispatch(topicActions.getTopicsData())
  }, [])


  React.useEffect(() => {
    dispatch(userActions.getMe())
  }, [])

  return (
    <div className="wrapper">
      <Header />
      <Route exact path={'/'} component={HomePage}></Route>
      <Route exact path={['/hot', '/hot/:topic']} component={HomePage}></Route>
      <Route exact path={['/new', '/new/:topic']} component={HomePage}></Route>
      <Route exact path={['/top', '/top/:topic']} component={HomePage}></Route>
      <Route exact path={['/legendary', '/legendary/:topic']} component={HomePage}></Route>
      <Route exact path={'/topic/:topicId'} component={TopicPage}></Route>
      <Route path={'/topic/:topicId/post/:postId'} component={PostPage}></Route>
      <Route exact path={'/make'} render={() => isAuth ? <MakeTopicPage /> : <Redirect to="/" />}></Route>
      <Route exact path={'/profile'} render={() => isAuth ? <ProfilePage /> : <Redirect to="/" />}></Route>
      <Route exact path={'/search'} component={SearchPage}></Route>

      <Route exact path={'/community'} component={CommunityPage}></Route>
      <Route exact path={'/privacy'} component={PrivacyPage}></Route>
      <Route exact path={'/terms'} component={TermsPage}></Route>


      <Route exact path={'/test'} component={TestPage}></Route>


      <Modal isOpen={isOpenSignIn} handleOk={handleOkSignInModal}>
        <SignInForm />
      </Modal>
      <Modal isOpen={isOpenSignUp} handleOk={handleOkSignUpModal}>
        <SignUpForm />
      </Modal>
    </div>
  );
}

export default App;
