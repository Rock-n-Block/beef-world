export default {
    setUserName: data => ({
        type: 'USER:SET_USERNAME',
        payload: data
    }),
    setUserPhoto: data => ({
        type: 'USER:SET_PHOTO',
        payload: data
    }),
    logout: () => ({
        type: 'USER:LOGOUT'
    }),
}