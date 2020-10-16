import React, { createElement, useState } from 'react';
import { Comment, Avatar, Input } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';

import { Time } from '../../components';

import './Comment.scss'

import replyImg from '../../assets/img/reply.svg';
import defaultAvatarImg from '../../assets/img/default-avatar.svg';

const { TextArea } = Input;

const CommentComponent = ({ replies, user, avatar, text, created, likes, dislikes, liked, disliked }) => {
    const replyInputRef = React.useRef();

    const [likesCount, setLikes] = useState(likes || 0);
    const [dislikesCount, setDislikes] = useState(dislikes || 0);
    const [action, setAction] = useState(liked ? 'liked' : disliked ? 'disliked' : null);
    const [isShowReaplies, setIsShowReplies] = React.useState(false)
    const [isRepling, setIsRepling] = React.useState(false)
    const [replyText, setReplyText] = React.useState('')

    const like = () => {
        const newLikes = likesCount + 1
        const newDislikes = dislikesCount - 1
        setLikes(newLikes);
        setDislikes(newDislikes);
        setAction('liked');
    };

    const dislike = () => {
        const newLikes = likesCount - 1
        const newDislikes = dislikesCount + 1
        setLikes(newLikes);
        setDislikes(newDislikes);
        setAction('disliked');
    };

    const actions = [
        <span onClick={like}>
            {action === 'liked' ? <LikeFilled style={{ color: "rgba(255,255,255,0.5)", fontSize: '14px' }} /> : <LikeOutlined style={{ color: "rgba(255,255,255,0.5)", fontSize: '14px' }} />}
            <span className="comment-action">{likesCount}</span>
        </span>,
        <span onClick={dislike}>
            {action === 'disliked' ? <DislikeFilled style={{ color: "rgba(255,255,255,0.5)", fontSize: '14px' }} /> : <DislikeOutlined style={{ color: "rgba(255,255,255,0.5)", fontSize: '14px' }} />}
            <span className="comment-action">{dislikesCount}</span>
        </span>,
        <span onClick={() => setIsRepling(true)} key="comment-basic-reply-to">Reply</span>,
    ];

    return (
        <div className="comment">
            <Comment
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
                            <TextArea value={replyText} onChange={(e) => setReplyText(e.target.value)} ref={replyInputRef} autoSize={{ minRows: 1, maxRows: 20 }} size="large" className="comment__reply-input" placeholder="Add your reply" />
                        </div>
                        <div className="comment__reply-btns">
                            <div className="comment__reply-cancel" onClick={() => setIsRepling(false)}>Cancel</div>
                            <button className="comment__reply-post" disabled={replyText == ''}>Post</button>
                        </div>
                    </div>
                }
                {replies &&
                    <div className="comment__reply-btn" onClick={() => setIsShowReplies(!isShowReaplies)}>
                        <img src={replyImg} alt="" />
                        <span>{isShowReaplies ? 'Hide Replies' : 'Show Replies'}</span>
                    </div>
                }
                {
                    (replies && isShowReaplies) && replies.map((comment, index) => {
                        return <CommentComponent key={comment.likes + comment.dislikes + index} {...comment} />
                    })
                }
            </Comment>
        </div>
    );
};

export default CommentComponent;