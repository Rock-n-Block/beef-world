import { topicApi } from '../../utils/api'
import refreshTokenWrapper from '../../utils/refreshTokenWrapper';

const actions = {
    setTopicsData: data => ({
        type: 'TOPICS:SET_DATA',
        payload: data
    }),
    setTopicData: data => ({
        type: 'TOPICS:SET_CURRENT_TOPIC_DATA',
        payload: data
    }),
    setPostData: data => ({
        type: 'TOPICS:SET_CURRENT_POST_DATA',
        payload: data
    }),
    getTopicsData: (order_by, is_refresh = true) => dispatch => {
        is_refresh && dispatch(actions.setTopicsData([]))
        topicApi.getTopics()
            .then(({ data }) => dispatch(actions.setTopicsData(data)))
            .catch(err => console.log(err))
    },
    getTopicData: (id) => dispatch => {
        topicApi.getTopic(id)
            .then(({ data }) => {
                dispatch(actions.setTopicData(data))
            })
            .catch(err => console.log(err))
    },
    getPostData: (topic_id, post_id) => dispatch => {
        topicApi.getPost({ topic_id, post_id })
            .then(({ data }) => {
                dispatch(actions.setPostData(data))
            })
            .catch(err => {
                console.log(err)
            })
    },
    cardLike: (topic_id, post_id, value, method, ...atrs) => dispatch => {
        refreshTokenWrapper(topicApi.cardLike, () => { }, () => { }, { topic_id, post_id, value })
            .then(() => {
                dispatch(actions[method](...atrs))
            })
            .catch(err => console.log(err))
    }
}

export default actions;