
const initialState = {
    id: '',
    email: '',
    username: '',
    isAuth: !!window.localStorage.access_token,
    avatar: ''
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'USER:SET_DATA':
            return {
                ...state,
                ...payload,
                isAuth: true
            };
        case 'USER:SET_USERNAME':
            return {
                ...state,
                username: payload,
                isAuth: true
            };
        case 'USER:SET_PHOTO':
            return {
                ...state,
                avatar: payload
            };
        case 'USER:LOGOUT':
            return {
                ...state,
                avatar: '',
                username: '',
                isAuth: false
            };
        default:
            return state
    }
}