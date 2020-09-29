
const initialState = {
    status: '',
    accessToken: '',
    userID: ''
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'FACEBOOK:LOGIN':
            return {
                ...state,
                status: payload.status,
                accessToken: payload.authResponse.accessToken,
                userID: payload.authResponse.userID
            };
        case 'FACEBOOK:LOGOUT':
            return {
                ...state,
                status: '',
                accessToken: '',
                userID: ''
            };
        default:
            return state
    }
}