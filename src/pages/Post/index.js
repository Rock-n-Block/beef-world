import React from 'react';
import { Scrollbar } from 'react-scrollbars-custom';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { PostCard, VideoPlayer, Time, Smiles, Comments, Statistic } from '../../components';
import { topicApi } from '../../utils/api';
import refreshTokenWrapper from '../../utils/refreshTokenWrapper';

import './Post.scss'

import fbImg from '../../assets/img/social/fb.svg';
import twImg from '../../assets/img/social/tw.svg';
import shareImg from '../../assets/img/share-arrow.svg';
import defaultAvatarImg from '../../assets/img/default-avatar.svg';

const PostPage = (props) => {

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


    const [cards, setCards] = React.useState([])
    const [postData, setPostData] = React.useState({})


    React.useEffect(() => {
        axios.get('http://localhost:3000/data.json').then(({ data }) => {
            setCards(data.data)
        })
    }, [])

    React.useEffect(() => {
        const topic_id = props.match.params.topicId
        const post_id = props.match.params.postId
        refreshTokenWrapper(topicApi.getPost, () => { }, () => { }, { topic_id, post_id })
            .then(({ data }) => {
                setPostData(data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className="post">
            <div className="post__wrapper">
                {postData.link && <VideoPlayer video={postData.link} />}
                <div className="post__content">
                    {postData.likes !== undefined && <Statistic count={postData.likes} like={postData.user_reaction} />}
                    <div className="post__info-views">{postData.views}k views</div>
                    <div className="post__info">
                        <div className="post__info-box">
                            <div className="post__info-wrapper">
                                <div className="post__info-person-box">
                                    <div className="post__info-avatar">
                                        {postData.user ? <img src={data.avatar} alt="" /> : <img src={defaultAvatarImg} alt="" />}
                                    </div>
                                    <div>
                                        {postData.title && <div className="post__info-title">{postData.title}</div>}
                                        <div className="post__info-person">
                                            by <span>{data.name}</span> • <span className="post__info-person-time">{postData.created && <Time date={postData.created} />}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {postData.text && <div className="post__info-text">{postData.text}</div>}
                            {
                                postData.tags && <div className="post__info-tags">
                                    {
                                        data.tags.map((tag, index) => {
                                            return <Link key={index} to={`/topics/${tag}`} className="post__info-tags-item tag">#{tag}</Link>
                                        })
                                    }
                                </div>
                            }
                            <div className="post__socials">
                                <div className="post__socials-item post__socials-item--fb">
                                    <div className="post__socials-item-img">
                                        <img src={fbImg} alt="" />
                                    </div>
                                    <div className="post__socials-item-text">Facebook</div>
                                </div>
                                <div className="post__socials-item post__socials-item--tw">
                                    <div className="post__socials-item-img">
                                        <img src={twImg} alt="" />
                                    </div>
                                    <div className="post__socials-item-text">Twitter</div>
                                </div>
                                <div className="post__socials-item post__socials-item--share">
                                    <img src={shareImg} alt="" />
                                    <div className="post__socials-item-text">Share</div>
                                </div>
                            </div>
                            <Smiles {...data.smiles} />
                            <div className="post__comments">
                                <Comments comments={postData.comments} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="post__trends">
                <div className="post__trends-title">Trends for you</div>
                <Scrollbar className="navbar__scroll" style={{ width: '100%', height: '100%' }}>
                    {cards &&
                        cards.map((card, index) => {
                            return <PostCard key={index} {...card} type="column" />
                        })
                    }
                </Scrollbar>
            </div>
        </div>
    );
}

export default PostPage;
