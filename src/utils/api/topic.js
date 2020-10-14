import axios from '../../core/axios'

export default {
    getTopics: () => axios.get('/topics/'),
    createTopic: (data) => axios.post('/topics/', data)
}