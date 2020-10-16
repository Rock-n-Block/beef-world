import { topicApi } from '../../utils/api'
import refreshTokenWrapper from '../../utils/refreshTokenWrapper';

const actions = {
    setTopicsData: data => ({
        type: 'TOPICS:SET_DATA',
        payload: data
    }),
    getTopicsData: () => dispatch => {
        refreshTokenWrapper(topicApi.getTopics, () => { }, () => { })
            .then(({ data }) => dispatch(actions.setTopicsData(data)))
            .catch(err => console.log(err))
    },
    cardLike: (topic_id, post_id, value) => dispatch => {
        refreshTokenWrapper(topicApi.cardLike, () => { }, () => { }, { topic_id, post_id, value })
            .then(() => {
                dispatch(actions.getTopicsData())
            })
            .catch(err => console.log(err))
    }
}

export default actions;