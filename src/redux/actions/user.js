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
    signUp: data => dispatch => {
        return userApi.signUp(data)
    },
    getMe: () => dispatch => {
        userApi.getMe().then(({ data }) => {
            dispatch(actions.setUserData(data))
        })
            .catch(err => console.log(err))
    },
    signIn: data => dispatch => {
        return userApi.signIn(data).then(({ data }) => {
            localStorage.access_token = data.access_token
            localStorage.refresh_token = data.refresh_token

            dispatch(actions.getMe())
        })
    }
}

export default actions;