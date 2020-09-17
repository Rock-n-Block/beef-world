import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { Time, Statistic } from '../../components';

import commentsImg from '../../assets/img/comments.svg'
import shareImg from '../../assets/img/share.svg'

import './TopicCard.scss'

const TopicCard = ({ avatar, name, date, img, text, tags, statistic, comments, type, topicName }) => {
    return (
        <div className={classNames('card', {
            'card__grid': type === 'grid',
            'only-text': !img
        })}>
            <div className="card__box">
                <Link to={`/topic/${topicName}`} className="card__link">
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
                    <div className="card__share">
                        <img src={shareImg} alt="" />
                        <span>Share</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopicCard;
