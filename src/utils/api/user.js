import axios from '../../core/axios'

export default {
    signUp: (postData) => axios.post(`user/register/`, postData),
    signIn: (postData) => axios.post(`o/token/`, {
        ...postData,
        "grant_type": "password"
    }).then(({ data }) => {

        localStorage.access_token = data.access_token
        localStorage.refresh_token = data.refresh_token

        window.axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.access_token}`
    }),
    getMe: () => axios.get('user/me/'),
    uploadAvatar: (formData) => axios.put('user/avatar/', formData),
    refreshToken: () => axios.post('o/token/', {
        refresh_token: localStorage.refresh_token,
        "grant_type": "refresh_token"
    }).then(({ data }) => {

        localStorage.access_token = data.access_token
        localStorage.refresh_token = data.refresh_token

        window.axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.access_token}`
    })
}