import React, { createElement, useState } from 'react';
import { Comment as CommentAntd, Avatar, Input } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';

import { Time } from '../../components';

import './Comment.scss'

import replyImg from '../../assets/img/reply.svg';
import defaultAvatarImg from '../../assets/img/default-avatar.svg';

const { TextArea } = Input;

const Comment = ({ handleSend, comments, user, avatar, text, created, likes, dislikes, id, user_reaction, handleCommentLike }) => {
    const replyInputRef = React.useRef();

    const [isShowReaplies, setIsShowReplies] = React.useState(true)
    const [isRepling, setIsRepling] = React.useState(false)
    const [replyText, setReplyText] = React.useState('')

    const handleOpenReplyBlock = () => {
        setIsRepling(true);
    }

    const actions = [
        <span onClick={() => handleCommentLike(id, { value: true })}>
            {user_reaction ? <LikeFilled style={{ color: "rgba(255,255,255,0.5)", fontSize: '14px' }} /> : <LikeOutlined style={{ color: "rgba(255,255,255,0.5)", fontSize: '14px' }} />}
            <span className="comment-action">{likes}</span>
        </span>,
        <span onClick={() => handleCommentLike(id, { value: false })}>
            {(!user_reaction && user_reaction !== null) ? <DislikeFilled style={{ color: "rgba(255,255,255,0.5)", fontSize: '14px' }} /> : <DislikeOutlined style={{ color: "rgba(255,255,255,0.5)", fontSize: '14px' }} />}
            <span className="comment-action">{dislikes}</span>
        </span>,
        <span onClick={handleOpenReplyBlock} key="comment-basic-reply-to">Reply</span>,
    ];

    return (
        <div className="comment">
            <CommentAntd
                actions={actions}
                author={<a>{user && user.username}</a>}
                avatar={
                    <Avatar
                        src={avatar ? avatar : defaultAvatarImg}
                        alt={user && user.username}
                    />
                }
                content={
                    <p>{text}</p>
                }
                datetime={
                    <span>•&nbsp;&nbsp;&nbsp;<Time date={created} /></span>
                }
            >
                {
                    isRepling &&
                    <div className="comment__reply-box">
                        <div className="comment__reply-wrapper">
                            <Avatar
                                src={avatar ? avatar : defaultAvatarImg}
                                alt={user && user.username}
                            />
                            <TextArea onKeyUp={(e) => handleSend(e.key, replyText, id, () => setReplyText(''))} value={replyText} onChange={(e) => setReplyText(e.target.value)} ref={replyInputRef} autoSize={{ minRows: 1, maxRows: 20 }} size="large" className="comment__reply-input" placeholder="Add your reply" />
                        </div>
                        <div className="comment__reply-btns">
                            <div className="comment__reply-cancel" onClick={() => setIsRepling(false)}>Cancel</div>
                            <button className="comment__reply-post" disabled={replyText == ''} onClick={() => handleSend('Btn', replyText, id, () => setReplyText(''))}>Post</button>
                        </div>
                    </div>
                }
                {comments.length ?
                    <div className="comment__reply-btn" onClick={() => setIsShowReplies(!isShowReaplies)}>
                        <img src={replyImg} alt="" />
                        <span>{isShowReaplies ? 'Hide Replies' : 'Show Replies'}</span>
                    </div> : ''
                }
                {
                    ((comments.length && isShowReaplies)) ? comments.reverse().map((comment, index) => {
                        return <Comment handleCommentLike={handleCommentLike} handleSend={handleSend} key={comment.likes + comment.dislikes + index} {...comment} />
                    }) : ''
                }
            </CommentAntd>
        </div>
    );
};

export default Comment;