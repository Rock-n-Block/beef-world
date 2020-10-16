import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { Time, Statistic } from '../../components';
import { facebookApi } from '../../utils/api';

import commentsImg from '../../assets/img/comments.svg'
import shareImg from '../../assets/img/share.svg'
import defaultAvatar from '../../assets/img/default-avatar.svg';

import './PostCard.scss'

const PostCard = ({ user, created, img, text, tags, likes, user_reaction, comments, type, topicName, to, topicTitle, title, id, topicId }) => {
    const handleShare = () => {
        const url = window.location.origin + `/${to}/${topicName}`;
        facebookApi.share(url)
    }

    return (
        <div className={classNames('card', {
            'card__grid': type === 'grid',
            'card__column': type === 'column',
            'only-text': !img
        })}>
            <div className="card__box">
                <Link to={type === 'grid' ? `/topic/${topicId}` : `/topic/${topicId}/post/${id}`} className="card__link">
                    <div className="card__head">
                        <div className="card__avatar">
                            {user && user.avatar !== null ? <img src={user && user.avatar} alt={user && user.username} /> : <img src={defaultAvatar} alt={user && user.username} />}
                        </div>
                        <div className="card__name">
                            {user && user.username && <>by <span>{user && user.username}</span>  •</>} <span className="card__name-time">{created && <Time date={created} />}</span>
                        </div>
                    </div>
                    {
                        img && <img src={img} alt="" className="card__img" />
                    }
                    {
                        topicTitle && <div className="card__title">{topicTitle}</div>
                    }
                    {
                        title && <div className="card__title-post">{title}</div>
                    }
                    {
                        text && <div className="card__text">{text}</div>
                    }
                </Link>
                {
                    tags && <div className="card__tags">
                        {
                            tags.map((tag, index) => {
                                return <Link key={index} to={`/topics/${tag}`} className="card__tags-item tag">#{tag}</Link>
                            })
                        }
                    </div>
                }
                <div to={`/topic/${topicName}`} className="card__wrapper">
                    <Statistic count={likes} like={user_reaction} />
                    <Link to={`/topic/${topicName}`} className="card__comments">
                        <img src={commentsImg} alt="" />
                        <span>{comments}</span>
                    </Link>
                    <div className="card__share" onClick={handleShare}>
                        <img src={shareImg} alt="" />
                        <span>Share</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostCard;
