import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { notification } from 'antd';
import { Tweet } from 'react-twitter-widgets'

import { Time, Statistic } from '../../components';
import { youtubeApi } from '../../utils/api';
import youtubeParser from '../../utils/youtubeParser';
import tweetParser from '../../utils/tweetParser';

import commentsImg from '../../assets/img/comments.svg'
import shareImg from '../../assets/img/share.svg'
import defaultAvatar from '../../assets/img/default-avatar.svg';
import copyImg from '../../assets/img/copy.svg';
import copyCloseImg from '../../assets/img/copy-close.svg';

import './PostCard.scss'

const PostCard = ({ userData, created, text, tags, likes, user_reaction, comments, type, topicTitle, title, id, topicId, handleLike, link, to, isAuth }) => {

    const [img, setImg] = React.useState(null)

    React.useEffect(() => {
        const id = youtubeParser(link)

        if (id) {

            youtubeApi.get('/search', {
                params: {
                    q: id,
                }
            }).then(({ data }) => {
                setImg(data.items[0].snippet.thumbnails.high.url)
            })
        }
    }, [link])

    const notificationBlock = () => {
        notification.open({
            message: 'Copied link',
            placement: "bottomLeft",
            icon: <img src={copyImg} alt="" />,
            closeIcon: <img src={copyCloseImg} alt="" />
        });
    };

    return (
        <div className={classNames('card', {
            'card__grid': type === 'grid',
            'card__column': type === 'column',
            'only-text': !img && !link
        })}>
            <div className="card__box">
                <Link to={to === 'topic' ? `/topic/${topicId}` : `/topic/${topicId}/post/${id}`}>
                    <div className="card__head">
                        <div className="card__avatar">
                            {userData && userData.avatar !== null ? <img src={userData && userData.avatar} alt={userData && userData.username} /> : <img src={defaultAvatar} alt={userData && userData.username} />}
                        </div>
                        <div className="card__name">
                            {userData && userData.username && <>by <span>{userData && userData.username}</span>  •</>} <span className="card__name-time">{created && <Time date={created} />}</span>
                        </div>
                    </div>
                    {
                        img && <img src={img} alt="" className="card__img" />
                    }
                    {
                        link && youtubeParser(link) && !img && <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${youtubeParser(link)}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                    }
                    {link && tweetParser(link) && !img &&
                        <div className="card__link">
                            <Tweet tweetId={tweetParser(link)} options={{ theme: "dark" }} />
                            <Link to={to === 'topic' ? `/topic/${topicId}` : `/topic/${topicId}/post/${id}`} className="card__link-item"></Link>
                        </div>
                    }
                    {
                        topicTitle && <div className="card__title" dangerouslySetInnerHTML={{ __html: topicTitle }}></div>
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
                                return <Link key={index} to={`/search/?search_by_tag=${tag.name}`} className="card__tags-item tag">#{tag.name}</Link>
                            })
                        }
                    </div>
                }
                <div className="card__wrapper">
                    <Statistic count={likes} like={user_reaction} handleLike={handleLike} isAuth={isAuth} />
                    <Link to={`/topic/${topicId}/post/${id}/#comments`} className="card__comments">
                        <img src={commentsImg} alt="" />
                        <span>{comments}</span>
                    </Link>
                    <CopyToClipboard onCopy={notificationBlock} text={window.location.origin + (type === 'grid' ? `/topic/${topicId}` : `/topic/${topicId}/post/${id}`)}>
                        <div className="card__share">
                            <img src={shareImg} alt="" />
                            <span>Share</span>
                        </div>
                    </CopyToClipboard>
                </div>
            </div>
        </div>
    );
}

export default PostCard;
