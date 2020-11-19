import { userApi } from '../../utils/api'
import Cookies from 'js-cookie';

const actions = {
    setUserName: data => ({
        type: 'USER:SET_USERNAME',
        payload: data
    }),
    setUserData: data => ({
        type: 'USER:SET_DATA',
        payload: data
    }),
    setUserPhoto: data => ({
        type: 'USER:SET_PHOTO',
        payload: data
    }),
    logout: () => dispatch => {
        delete localStorage.access_token
        delete localStorage.refresh_token

        window.axios.defaults.headers.common["Authorization"] = ``

        dispatch({
            type: 'USER:LOGOUT'
        })
    },
    signUp: data => () => {
        return userApi.signUp(data)
    },
    getMe: () => dispatch => {
        userApi.getMe().then(({ data }) => {
            dispatch(actions.setUserData(data))
        })
            .catch(() => {
                if (localStorage.refresh_token) {
                    dispatch(actions.refreshToken(actions.getMe))
                }
                else {
                    if (Cookies.get('OAUTH_ACCESS_TOKEN')) {
                        const authCookies = Cookies.get('OAUTH_ACCESS_TOKEN').split(' ')
                        const authType = authCookies[0]
                        const authToken = authCookies[1]

                        userApi.convertToken(authType, authToken)
                            .then(() => {
                                dispatch(actions.getMe())
                            })
                            .catch(err => console.log('err auth'))
                    } else {
                        dispatch(actions.logout())
                    }
                }
            })
    },
    refreshToken: (method) => dispatch => {
        if (localStorage.refresh_token) {
            userApi.refreshToken().then(() => {
                dispatch(method())
            })
                .catch(() => {
                    dispatch(actions.logout())
                })
        } else {
            dispatch(actions.logout())
        }
    },
    signIn: data => dispatch => {
        return userApi.signIn(data).then(() => {
            dispatch(actions.getMe())
        })
    }
}

export default actions;