import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { Time, Statistic } from '../../components';
import { facebookApi } from '../../utils/api';

import commentsImg from '../../assets/img/comments.svg'
import shareImg from '../../assets/img/share.svg'

import './PostCard.scss'

const PostCard = ({ avatar, name, date, img, text, tags, statistic, comments, type, topicName, to, topicTitle, postTitle }) => {
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
                <Link to={`/${to}/${topicName}`} className="card__link">
                    <div className="card__head">
                        <div className="card__avatar">
                            <img src={avatar} alt={name} />
                        </div>
                        <div className="card__name">
                            by <span>{name}</span>  • <span className="card__name-time">{date && <Time date={date} />}</span>
                        </div>
                    </div>
                    {
                        img && <img src={img} alt="" className="card__img" />
                    }
                    {
                        topicTitle && <div className="card__title">{topicTitle}</div>
                    }
                    {
                        postTitle && <div className="card__title-post">{postTitle}</div>
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
                    <Statistic {...statistic} />
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
