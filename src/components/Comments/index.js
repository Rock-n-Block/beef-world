import React from 'react';
import { Avatar, Input } from 'antd';

import { Comment } from '../../components';
import { topicApi } from '../../utils/api';
import refreshTokenWrapper from '../../utils/refreshTokenWrapper';

import './Comments.scss'

const { TextArea } = Input;

const Comments = ({ comments, handleSendComment }) => {
    const [commentText, setCommentText] = React.useState('')

    const handleChange = (e) => {
        if (e.key === 'Enter' && commentText.trim().length) {
            handleSendComment(e.target.value)
            setCommentText('')
        } else if (e.key === 'Enter' && !commentText.trim().length) {
            setCommentText('')
        }
    }

    return (
        <div className="comments">
            <div className="comments__title">
                24 COMMENTS
            </div>
            <div className="comments__box">
                <Avatar
                    src="https://sun9-26.userapi.com/impf/RI0zS2_e7QuwGaNG2ji5sqYSgKNe950uz9a5fA/MJyaN_JHbvU.jpg?size=50x0&quality=88&crop=268,0,1535,1535&sign=025ed0b2dd6137a7d9b22daeacbeb330&ava=1"
                />
                <TextArea value={commentText} onKeyUp={handleChange} onChange={(e) => setCommentText(e.target.value)} autoSize={{ minRows: 1, maxRows: 20 }} size="large" className="comments__input" placeholder="Add your comment" />
                <button className="comments__btn" onClick={() => { handleSendComment(commentText); setCommentText('') }} disabled={!commentText}>Post</button>
            </div>
            {
                comments && comments.map((comment, index) => {
                    return (
                        <Comment key={comment.likes + comment.dislikes + index} {...comment} />
                    )
                })
            }
        </div>
    );
}

export default Comments;
