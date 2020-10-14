
const initialState = {
    username: '',
    isAuth: !!window.localStorage.access_token,
    photo: ''
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
                photo: payload
            };
        case 'USER:LOGOUT':
            return {
                ...state,
                photo: '',
                username: '',
                isAuth: false
            };
        default:
            return state
    }
}