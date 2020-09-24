export default {
    toggleSignInModal: data => ({
        type: 'MODAL:SIGNIN_TOGGLE',
        payload: data
    }),
    toggleSignUpModal: data => ({
        type: 'MODAL:SIGNUP_TOGGLE',
        payload: data
    })
}