import axios from '../../core/axios'

export default {
    getTopics: () => axios.get('/topics/'),
    createTopic: (data) => axios.post('/topics/', data),
    getTopic: (id) => axios.get(`/topics/${id}/`),
    createPost: (postData) => axios.post(`/topics/${postData.id}/posts/`, postData.data),
    getPost: ({ topic_id, post_id }) => axios.get(`/topics/${topic_id}/posts/${post_id}/`)
}