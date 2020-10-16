import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Time, Statistic } from '../../components';
import { youtubeApi } from '../../utils/api';

import commentsImg from '../../assets/img/comments.svg'
import shareImg from '../../assets/img/share.svg'
import defaultAvatar from '../../assets/img/default-avatar.svg';

import './PostCard.scss'

const PostCard = ({ user, created, text, tags, likes, user_reaction, comments, type, topicName, topicTitle, title, id, topicId, handleLike }) => {

    const [img, setImg] = React.useState(null)

    // const youtube_parser = (url) => {
    //     var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    //     var match = url.match(regExp);
    //     return (match && match[7].length == 11) ? match[7] : false;
    // }
    // React.useEffect(() => {
    //     const id = youtube_parser('https://www.youtube.com/watch?v=vbvyNnw8Qjg&ab_channel=LiveAid')

    //     if (id) {

    //         youtubeApi.get('/search', {
    //             params: {
    //                 q: id,
    //             }
    //         }).then(({ data }) => {
    //             // setImg(data.items[0].snippet.thumbnails.hight.url)
    //             console.log(data)
    //         })
    //     }
    // })
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
                    <Statistic count={likes} like={user_reaction} handleLike={handleLike} />
                    <Link to={`/topic/${topicName}`} className="card__comments">
                        <img src={commentsImg} alt="" />
                        <span>{comments}</span>
                    </Link>
                    <CopyToClipboard text={window.location.origin + (type === 'grid' ? `/topic/${topicId}` : `/topic/${topicId}/post/${id}`)}>
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
