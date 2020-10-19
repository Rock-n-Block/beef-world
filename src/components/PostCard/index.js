import React from 'react';
import classNames from 'classnames';
import { HashLink as Link } from 'react-router-hash-link';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { notification } from 'antd';

import { Time, Statistic } from '../../components';
import { youtubeApi } from '../../utils/api';

import commentsImg from '../../assets/img/comments.svg'
import shareImg from '../../assets/img/share.svg'
import defaultAvatar from '../../assets/img/default-avatar.svg';
import copyImg from '../../assets/img/copy.svg';
import copyCloseImg from '../../assets/img/copy-close.svg';

import './PostCard.scss'

const PostCard = ({ user, created, text, tags, likes, user_reaction, comments, type, topicTitle, title, id, topicId, handleLike, link, to }) => {

    const [img, setImg] = React.useState(null)

    const youtube_parser = (url) => {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
    }
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
                <Link to={to === 'topic' ? `/topic/${topicId}` : `/topic/${topicId}/post/${id}`} className="card__link">
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
                        link && <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${youtube_parser(link)}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
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
                                return <Link key={index} to={`/topics/${tag}`} className="card__tags-item tag">#{tag}</Link>
                            })
                        }
                    </div>
                }
                <div className="card__wrapper">
                    <Statistic count={likes} like={user_reaction} handleLike={handleLike} />
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
