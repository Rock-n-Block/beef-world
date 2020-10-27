import React from 'react';
import { Avatar, Input } from 'antd';
import { useSelector } from 'react-redux';

import { Comment } from '../../components';

import './Comments.scss'

import defaultAvatarImg from '../../assets/img/default-avatar.svg';

const { TextArea } = Input;

const Comments = ({ comments, handleSendComment, handleCommentLike, isAuth }) => {
    const user = useSelector(({ user }) => user)
    const [commentText, setCommentText] = React.useState('')

    const handleSend = (key, value, parent_id, func) => {
        if (!isAuth) return

        if ((key === 'Enter' || key === 'Btn') && value.trim().length) {
            handleSendComment(value, parent_id)
            debugger
            func()
        } else if ((key === 'Enter' || key === 'Btn') && !value.trim().length) {
            func()
        }
    }

    return (
        <div className="comments" id="comments">
            <div className="comments__title">
                {comments && comments.length} COMMENTS
            </div>
            {isAuth && <div className="comments__box">
                {user.avatar ? <Avatar
                    src={user.avatar}
                /> : <Avatar
                        src={defaultAvatarImg}
                    />}
                <TextArea value={commentText} onKeyUp={(e) => handleSend(e.key, commentText, null, () => { setCommentText('') })} onChange={(e) => setCommentText(e.target.value)} autoSize={{ minRows: 1, maxRows: 20 }} size="large" className="comments__input" placeholder="Add your comment" />
                <button className="comments__btn" onClick={() => handleSend('Btn', commentText, null, () => { setCommentText('') })} disabled={!commentText}>Post</button>
            </div>}
            {
                comments && comments.map((comment, index) => {
                    return (
                        <Comment isAuth={isAuth} userData={comment.user} currentUser={user} handleCommentLike={handleCommentLike} handleSend={handleSend} key={comment.likes + comment.dislikes + index + comment.created} {...comment} />
                    )
                })
            }
        </div >
    );
}

export default Comments;
