
const initialState = {
    isOpenSignIn: false,
    isOpenSignUp: false
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'MODAL:SIGNIN_TOGGLE':
            return {
                ...state,
                isOpenSignIn: payload
            };
        case 'MODAL:SIGNUP_TOGGLE':
            return {
                ...state,
                isOpenSignUp: payload
            };
        default:
            return state
    }
}