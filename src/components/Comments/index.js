import React from 'react';
import { Avatar, Input } from 'antd';
import { useSelector } from 'react-redux';

import { Comment } from '../../components';

import './Comments.scss'

import defaultAvatarImg from '../../assets/img/default-avatar.svg';

const { TextArea } = Input;

const Comments = ({ comments, handleSendComment }) => {
    const avatar = useSelector(({ user }) => user.avatar)
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
                {comments && comments.length} COMMENTS
            </div>
            <div className="comments__box">
                {avatar ? <Avatar
                    src={avatar}
                /> : <Avatar
                        src={defaultAvatarImg}
                    />}
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
