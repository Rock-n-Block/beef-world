import axios from '../../core/axios'

export default {
    getTopics: (order_by) => axios.get(`/topics/?order_type=${order_by}`),
    createTopic: (data) => axios.post('/topics/', data),
    getTopic: (id) => axios.get(`/topics/${id}/`),
    createPost: (postData) => axios.post(`/topics/${postData.id}/posts/`, postData.data),
    getPost: ({ topic_id, post_id }) => axios.get(`/topics/${topic_id}/posts/${post_id}/?order_type=new`),
    createComment: ({ topic_id, post_id, commentText }) => axios.post(`/topics/${topic_id}/posts/${post_id}/comments/`, commentText),
    search: (searchText) => axios.get(`/topics/search/?to_search=${searchText}`),
    cardLike: ({ topic_id, post_id, value }) => axios.post(`/topics/${topic_id}/posts/${post_id}/like/`, value),
    commentLike: ({ topic_id, post_id, comment_id, value }) => axios.post(`/topics/${topic_id}/posts/${post_id}/comments/${comment_id}/like/`, value)
}