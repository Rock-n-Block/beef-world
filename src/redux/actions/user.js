import { userApi } from '../../utils/api'

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
                dispatch(actions.refreshToken(actions.getMe))
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