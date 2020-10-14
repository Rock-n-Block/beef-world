import axios from '../../core/axios'

export default {
    signUp: (postData) => axios.post(`user/register/`, postData),
    signIn: (postData) => axios.post(`o/token/`, {
        ...postData,
        "grant_type": "password"
    }),
    getMe: () => axios({
        url: 'user/me/',
        headers: {
            'Authorization': `Bearer ${localStorage.access_token}`
        }
    })
}