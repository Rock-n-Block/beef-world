export default {
    login: data => ({
        type: 'FACEBOOK:LOGIN',
        payload: data
    }),
    logout: () => ({
        type: 'FACEBOOK:LOGOUT'
    })
}