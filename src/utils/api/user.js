import axios from '../../core/axios'

export default {
    signUp: (postData) => axios.post(`user/register/`, postData),
    signIn: (postData) => axios.post(`o/token/`, {
        ...postData,
        "grant_type": "password"
    }),
    getMe: () => axios.get('user/me/'),
    refreshToken: () => axios.post('o/token/', {
        refresh_token: localStorage.refresh_token,
        "grant_type": "refresh_token"
    })
}