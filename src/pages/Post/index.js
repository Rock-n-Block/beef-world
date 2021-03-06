import React from 'react';
import { Scrollbar } from 'react-scrollbars-custom';
import { Link, useParams } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSelector, useDispatch } from 'react-redux';
import { notification } from 'antd';
import { Tweet } from 'react-twitter-widgets'

import { PostCard, VideoPlayer, Time, Smiles, Comments, Statistic } from '../../components';
import { topicApi } from '../../utils/api';
import refreshTokenWrapper from '../../utils/refreshTokenWrapper';
import { topicActions } from '../../redux/actions';
import youtubeParser from '../../utils/youtubeParser';
import tweetParser from '../../utils/tweetParser';

import './Post.scss'

import shareImg from '../../assets/img/share.svg'
import defaultAvatarImg from '../../assets/img/default-avatar.svg';
import copyImg from '../../assets/img/copy.svg';
import copyCloseImg from '../../assets/img/copy-close.svg';

const PostPage = (props) => {
    const dispatch = useDispatch();
    const { topicId, postId } = useParams()

    const data = {
        title: 'Please do not RT this video',
        video: 'https://www.youtube.com/watch?v=LUXloQM3eA0&ab_channel=BadComedian',
        avatar: "https://sun9-26.userapi.com/impf/RI0zS2_e7QuwGaNG2ji5sqYSgKNe950uz9a5fA/MJyaN_JHbvU.jpg?size=50x0&quality=88&crop=268,0,1535,1535&sign=025ed0b2dd6137a7d9b22daeacbeb330&ava=1",
        "name": "Profile name",
        "date": "Thu Sep 17 2019 14:47:08",
        "text": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum consequuntur veritatis dicta eligendi, quibusdam exercitationem molestias asperiores numquam quisquam sapiente ipsa iste perferendis, sint nihil praesentium, maiores expedita molestiae unde!",
        "tags": [
            "History",
            "Romanempire",
            "Carthage",
            "Romanempire",
            "Carthage",
            "Romanempire",
            "Carthage"
        ],
        "comments": 24,
        views: 123,
        smiles: {
            values: {
                hate: 3,
                confused: 12,
                fail: 5,
                fun: 123,
                geeky: 1,
                love: 8,
                lol: 45,
                omg: 0,
                win: 0
            },
            choose: 'hate'
        },
        comments: [
            {
                author: 'Arlene McCoy',
                avatar: "https://sun9-26.userapi.com/impf/RI0zS2_e7QuwGaNG2ji5sqYSgKNe950uz9a5fA/MJyaN_JHbvU.jpg?size=50x0&quality=88&crop=268,0,1535,1535&sign=025ed0b2dd6137a7d9b22daeacbeb330&ava=1",
                text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad ratione aliquid, odio nihil commodi sint esse laboriosam ipsum totam labore temporibus illo consequuntur. Odio atque illum aperiam dolorum fuga nemo.',
                date: 'Mon Sep 21 2020 17:54:15',
                likes: 100,
                dislikes: 1,
                liked: true,
                replies: [
                    {
                        author: 'Arlene McCoy',
                        avatar: "https://sun9-26.userapi.com/impf/RI0zS2_e7QuwGaNG2ji5sqYSgKNe950uz9a5fA/MJyaN_JHbvU.jpg?size=50x0&quality=88&crop=268,0,1535,1535&sign=025ed0b2dd6137a7d9b22daeacbeb330&ava=1",
                        text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad ratione aliquid, odio nihil commodi sint esse laboriosam ipsum totam labore temporibus illo consequuntur. Odio atque illum aperiam dolorum fuga nemo.',
                        date: 'Mon Sep 21 2020 17:54:15',
                        likes: 100,
                        dislikes: 1,
                        disliked: true
                    },
                    {
                        author: 'Arlene McCoy',
                        avatar: "https://sun9-26.userapi.com/impf/RI0zS2_e7QuwGaNG2ji5sqYSgKNe950uz9a5fA/MJyaN_JHbvU.jpg?size=50x0&quality=88&crop=268,0,1535,1535&sign=025ed0b2dd6137a7d9b22daeacbeb330&ava=1",
                        text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad ratione aliquid, odio nihil commodi sint esse laboriosam ipsum totam labore temporibus illo consequuntur. Odio atque illum aperiam dolorum fuga nemo.',
                        date: 'Mon Sep 21 2020 17:54:15',
                        likes: 100,
                        dislikes: 1,
                        replies: [
                            {
                                author: 'Arlene McCoy',
                                avatar: "https://sun9-26.userapi.com/impf/RI0zS2_e7QuwGaNG2ji5sqYSgKNe950uz9a5fA/MJyaN_JHbvU.jpg?size=50x0&quality=88&crop=268,0,1535,1535&sign=025ed0b2dd6137a7d9b22daeacbeb330&ava=1",
                                text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad ratione aliquid, odio nihil commodi sint esse laboriosam ipsum totam labore temporibus illo consequuntur. Odio atque illum aperiam dolorum fuga nemo.',
                                date: 'Mon Sep 21 2020 17:54:15',
                                likes: 100,
                                dislikes: 1,
                                disliked: true
                            },
                            {
                                author: 'Arlene McCoy',
                                avatar: "https://sun9-26.userapi.com/impf/RI0zS2_e7QuwGaNG2ji5sqYSgKNe950uz9a5fA/MJyaN_JHbvU.jpg?size=50x0&quality=88&crop=268,0,1535,1535&sign=025ed0b2dd6137a7d9b22daeacbeb330&ava=1",
                                text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad ratione aliquid, odio nihil commodi sint esse laboriosam ipsum totam labore temporibus illo consequuntur. Odio atque illum aperiam dolorum fuga nemo.',
                                date: 'Mon Sep 21 2020 17:54:15',
                                likes: 100,
                                dislikes: 1,
                            }
                        ]
                    }
                ]
            }
        ]
    }

    const notificationBlock = () => {
        notification.open({
            message: 'Copied link',
            placement: "bottomLeft",
            icon: <img src={copyImg} alt="" />,
            closeIcon: <img src={copyCloseImg} alt="" />
        });
    };


    const getPostData = () => {

        dispatch(topicActions.getPostData(topicId, postId))
    }

    const handleLike = (topic_id, post_id, value) => {
        dispatch(topicActions.cardLike(topic_id, post_id, value, 'getPostData', topic_id, post_id))
    }

    const handleCommentLike = (comment_id, value) => {
        if (!user.isAuth) return
        refreshTokenWrapper(topicApi.commentLike, () => { }, () => { }, { topic_id: topicId, post_id: postId, comment_id, value })
            .then(() => {
                getPostData()
            })
            .catch(err => console.log(err))
    }

    const handleSendComment = (text, parent_comment = null) => {
        refreshTokenWrapper(topicApi.createComment, () => { }, () => { }, { topic_id: topicId, post_id: postId, commentText: { text: text.trim(), parent_comment } })
            .then(() => {
                getPostData()
            })
            .catch(err => console.log(err))
    }

    const handleChooseReaction = (smile) => {
        refreshTokenWrapper(topicApi.sendPostReaction, () => { }, () => { }, { topic_id: topicId, post_id: postId, smile })
            .then(({ data }) => {
                getPostData()
                // dispatch(topicActions.setPostData(data))
            })
            .catch(err => console.log(err))
    }

    const { cards, postData, user } = useSelector(({ topics, user }) => {
        return {
            cards: topics.cards,
            postData: topics.currentPost,
            user
        }
    })

    const handleScrollToComments = () => {
        const commentBlock = document.querySelector(props.location.hash)
        var top = commentBlock.getBoundingClientRect().top;
        var bottom = commentBlock.getBoundingClientRect().bottom;
        if (top > 200 && postData.comments.length > 10) {
            window.requestAnimationFrame(handleScrollToComments);
            window.scrollBy(0, top - top / 10);
        }
        if (bottom > 10 && postData.comments.length < 10) {
            window.scrollTo(0, document.body.scrollHeight);
        }
    }

    React.useEffect(() => {
        getPostData()
    }, [postId])

    React.useEffect(() => {
        if (props.location.hash && postData.comments) {
            handleScrollToComments()
        }
    }, [postData])

    return (
        <div className="post">
            <div className="post__wrapper">
                {postData.link && youtubeParser(postData.link) &&

                    <div className="post__video">
                        <VideoPlayer video={postData.link} />
                    </div>
                }
                {postData.link && tweetParser(postData.link) &&
                    <div className="post__tweet">
                        <Tweet tweetId={tweetParser(postData.link)} options={{ theme: "dark" }} />
                    </div>
                }
                <div className="post__content">
                    <div className="post__info">
                        <div className="post__info-box">
                            <div className="post__info-wrapper">
                                <div className="post__info-person-box">
                                    <div className="post__info-avatar">
                                        {postData.user && postData.user.avatar ? <img src={postData.user.avatar} alt="" /> : <img src={defaultAvatarImg} alt="" />}
                                    </div>
                                    <div>
                                        {postData.title && <div className="post__info-title">{postData.title}</div>}
                                        <div className="post__info-person">
                                            by <span>{postData.user && postData.user.username}</span> • <span className="post__info-person-time">{postData.created && <Time date={postData.created} />}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="post__info-container">
                                {postData.likes !== undefined && <Statistic isAuth={user.isAuth} handleLike={(value) => (handleLike(topicId, postId, value))} count={postData.likes} like={postData.user_reaction} />}
                                <div className="post__info-views">{postData.views} views</div>
                            </div>
                            {postData.text && <div className="post__info-text">{postData.text}</div>}
                            {
                                postData.tags && <div className="post__info-tags">
                                    {
                                        postData.tags.map((tag, index) => {
                                            return <Link key={index} to={`/search/?search_by_tag=${tag.name}`} className="post__info-tags-item tag">#{tag.name}</Link>
                                        })
                                    }
                                </div>
                            }
                            <div className="post__socials">
                                {postData.topic && <Link to={`/topic/${topicId}`} className="post__topic-title">{postData.topic.left_theme} <span>vs</span> {postData.topic.right_theme}</Link>}
                                <CopyToClipboard onCopy={notificationBlock} text={window.location.origin + `/topic/${topicId}/post/${postId}`}>
                                    <div className="post__socials-item post__socials-item--share">
                                        <img src={shareImg} alt="" />
                                        <div className="post__socials-item-text">Сopy link</div>
                                    </div>
                                </CopyToClipboard>
                            </div>
                            {postData.reactions && <Smiles values={postData.reactions} choose={postData.user_choose_reaction} handleChooseReaction={handleChooseReaction} />}
                            <div className="post__comments">
                                <Comments isAuth={user.isAuth} handleCommentLike={(comment_id, value) => handleCommentLike(comment_id, value)} handleSendComment={handleSendComment} comments={postData.comments && postData.comments} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {window.innerWidth > 991 && <div className="post__trends">
                <div className="post__trends-title">Random Posts</div>
                {(cards && cards.length) &&
                    <Scrollbar className="navbar__scroll" style={{ width: '100%', height: '100%' }}>
                        {
                            cards.map((card, index) => {
                                return <PostCard isAuth={user.isAuth} userData={user.id === card.post.user.id ? user : card.post.user} topicId={card.id} topicTitle={`${card.left_theme} vs ${card.right_theme}`} key={index} {...card.post} type="column" />
                            })
                        }
                    </Scrollbar>}
            </div>}
        </div>
    );
}

export default PostPage;
