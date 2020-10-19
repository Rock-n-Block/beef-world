import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { topicApi } from '../../utils/api';
import { userActions } from '../../redux/actions';
import refreshTokenWrapper from '../../utils/refreshTokenWrapper';

import { Make } from '../../modules';

import './MakePost.scss'

const MakePostPage = () => {

    const dispatch = useDispatch();
    const history = useHistory()

    const handleCreateTopic = (topic) => {
        refreshTokenWrapper(topicApi.createTopic, () => console.log('refreshToken'), () => dispatch(userActions.logout()), topic)
            .then(({ data }) => {
                history.push({
                    pathname: `/topic/${data.id}`,
                    state: {
                        data: data
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="m-post">
            <div className="m-post__title">Make a Topic</div>
            <Make type="topic" handleCreate={handleCreateTopic} />
        </div>
    );
}

export default MakePostPage;
