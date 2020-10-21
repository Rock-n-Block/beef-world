import React from 'react';
import classNames from 'classnames';
import { Scrollbar } from 'react-scrollbars-custom';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { PostCard, Modal, TopicStatistic } from '../../components';
import { Make } from '../../modules';
import { topicApi } from '../../utils/api';
import refreshTokenWrapper from '../../utils/refreshTokenWrapper';
import { topicActions } from '../../redux/actions';

import './Topic.scss'

import closeModalImg from '../../assets/img/close-cross.svg';
// import subImg from '../../assets/img/sub.svg';
// import subActiveImg from '../../assets/img/sub-active.svg';

const TopicPage = (props) => {
    const dispatch = useDispatch();
    const data = {
        leftTheme: 'Roman Empire',
        rightTheme: 'Carthage',
        date: 'Fri Sep 18 2020 13:43:15 GMT+0300 (Москва, стандартное время)',
        subscribe: false,
        placet: '33.3k',
        against: '24k',
        placets: [
            {
                "avatar": "https://sun9-26.userapi.com/impf/RI0zS2_e7QuwGaNG2ji5sqYSgKNe950uz9a5fA/MJyaN_JHbvU.jpg?size=50x0&quality=88&crop=268,0,1535,1535&sign=025ed0b2dd6137a7d9b22daeacbeb330&ava=1",
                "name": "Profile name",
                "date": "Thu Sep 17 2019 14:47:08",
                "img": "https://sun9-60.userapi.com/YrDO9d497x3HGKgbxMdLApdCk2LhEMiTG5_wTw/pGg1uxrvfg8.jpg",
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
                "statistic": {
                    "count": 391,
                    "like": ""
                },
                "comments": 24,
                "topicname": "politics"
            },
            {
                "avatar": "https://sun9-26.userapi.com/impf/RI0zS2_e7QuwGaNG2ji5sqYSgKNe950uz9a5fA/MJyaN_JHbvU.jpg?size=50x0&quality=88&crop=268,0,1535,1535&sign=025ed0b2dd6137a7d9b22daeacbeb330&ava=1",
                "name": "Profile name",
                "date": "Thu Sep 17 2020 14:47:01",
                "img": "https://sun9-12.userapi.com/9uHycz_uOrXv4-mlGdS_6ASC3C31Fvgsbh3xSg/VUa1Deizs8g.jpg",
                "tags": ["History", "Romanempire", "Carthage"],
                "statistic": {
                    "count": 391,
                    "like": ""
                },
                "comments": 24,
                "topicname": "politics"
            },
        ],
        worsts: [
            {
                "avatar": "https://sun9-26.userapi.com/impf/RI0zS2_e7QuwGaNG2ji5sqYSgKNe950uz9a5fA/MJyaN_JHbvU.jpg?size=50x0&quality=88&crop=268,0,1535,1535&sign=025ed0b2dd6137a7d9b22daeacbeb330&ava=1",
                "name": "Profile name",
                "date": "Thu Sep 17 2020 14:47:08",
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
                "statistic": {
                    "count": 391,
                    "like": ""
                },
                "comments": 24,
            },
            {
                "avatar": "https://sun9-26.userapi.com/impf/RI0zS2_e7QuwGaNG2ji5sqYSgKNe950uz9a5fA/MJyaN_JHbvU.jpg?size=50x0&quality=88&crop=268,0,1535,1535&sign=025ed0b2dd6137a7d9b22daeacbeb330&ava=1",
                "name": "Profile name",
                "date": "Thu Sep 17 2020 14:47:08",
                "img": "https://sun9-60.userapi.com/YrDO9d497x3HGKgbxMdLApdCk2LhEMiTG5_wTw/pGg1uxrvfg8.jpg",
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
                "statistic": {
                    "count": 391,
                    "like": ""
                },
                "comments": 24,
            },
        ]
    }

    const { topicId } = useParams()

    const topicData = useSelector(({ topics }) => topics.currentTopic)

    const [activeTab, setActiveTab] = React.useState(0)
    const [isModalOpen, setIsModalOpen] = React.useState(false)
    const [modalTitle, setModalTitle] = React.useState('')
    const [isSub, setIsSub] = React.useState(false)
    const [isRightSideNewPost, RightSideNewPost] = React.useState(false)


    const [isRightContentOpen, setIsRightContentOpen] = React.useState(true)
    const [isLeftContentOpen, setIsLeftContentOpen] = React.useState(true)

    const tabs = ['HOT', 'NEW', 'TOP']

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const handleOpenModal = (modalTitle, is_right_side) => {
        setModalTitle(modalTitle)
        setIsModalOpen(true)
        RightSideNewPost(is_right_side)
    }

    const handleSubscribe = () => {
        setIsSub(!isSub)
    }

    const getTopicData = () => {
        dispatch(topicActions.getTopicData(topicId))
    }

    const handleLike = (topic_id, post_id, value) => {
        dispatch(topicActions.cardLike(topic_id, post_id, value, 'getTopicData', topic_id))
    }

    React.useEffect(() => {
        if (window.innerWidth < 991) {
            setIsRightContentOpen(false)
        }
        getTopicData()

    }, [])

    const handleCreatePost = (postData) => {
        refreshTokenWrapper(topicApi.createPost, () => { getTopicData() }, () => { }, { data: { ...postData, is_right_side: isRightSideNewPost }, id: topicData.id })
            .then(({ data }) => {
                setIsModalOpen(false)
            })
            .catch(err => console.log(err))
    }

    const contentWrapper = window.innerWidth > 991 ? Scrollbar : 'div'

    const leftPosts = topicData.left && topicData.left.map((card, index) => {
        return <PostCard handleLike={(value) => (handleLike(topicData.id, card.id, value))} topicId={topicData.id} key={index} {...card} type="column" to="post" />
    })

    const rightPosts = topicData.right && topicData.right.map((card, index) => {
        return <PostCard handleLike={(value) => (handleLike(topicData.id, card.id, value))} topicId={topicData.id} key={index} {...card} type="column" to="post" />
    })

    return (
        <div className="topic">
            <div className="topic__row row">
                <div className="topic__title">
                    <p>{topicData.left_theme}<span> vs </span>{topicData.right_theme}</p>
                    {/* <div className="topic__sub btn btn--gray" onClick={handleSubscribe}>
                        {
                            isSub ? <img src={subActiveImg} alt="" /> : <img src={subImg} alt="" />
                        }
                        <span>subscribe</span>
                    </div> */}
                </div>
                <div className="topic__wrapper">
                    <div className="topic__navbar">
                        {
                            tabs.map((tab, index) => {
                                return <div key={index} onClick={() => setActiveTab(index)} className={classNames('topic__navbar-item', {
                                    'active': index === activeTab
                                })}>{tab}</div>
                            })
                        }
                    </div>

                    {topicData && window.innerWidth > 991 && <TopicStatistic posts={(topicData.left && topicData.left) ? topicData.left.length + topicData.right.length : 0} placet={topicData.left_rating} against={topicData.right_rating} date={topicData.created} />}

                </div>
                <div className={classNames('topic__content', {
                    'mobile--hidden': !isLeftContentOpen
                })}>
                    <div className="topic__content-box">
                        {window.innerWidth > 991 && <div className="topic__content-wrapper">
                            <div className="topic__content-name">{topicData.left_theme}</div>
                            <div className="topic__content-make">
                                <span>{topicData.left && topicData.left.length} posts&nbsp;&nbsp;&nbsp;•</span>
                                <div className="topic__content-btn" onClick={() => handleOpenModal(topicData.left_theme, false)}>
                                    <div className="topic__content-btn-plus"><span>+</span></div>
                                    <div className="topic__content-btn-text">Make a post</div>
                                </div>
                            </div>
                        </div>}
                        {leftPosts && leftPosts.length &&
                            React.createElement(contentWrapper, [], leftPosts)
                        }
                    </div>
                    <div className={classNames('topic__content-box', {
                        'mobile--hidden': !isRightContentOpen
                    })}>
                        {window.innerWidth > 991 && <div className="topic__content-wrapper">
                            <div className="topic__content-name">{topicData.right_theme}</div>
                            <div className="topic__content-make">
                                <span>{topicData.right && topicData.right.length} posts&nbsp;&nbsp;&nbsp;•</span>
                                <div className="topic__content-btn" onClick={() => handleOpenModal(topicData.right_theme, true)}>
                                    <div className="topic__content-btn-plus topic__content-btn-plus--yellow"><span>+</span></div>
                                    <div className="topic__content-btn-text topic__content-btn-text--yellow">Make a post</div>
                                </div>
                            </div>
                        </div>}
                        {rightPosts && rightPosts.length &&
                            React.createElement(contentWrapper, [], rightPosts)
                        }
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} handleOk={handleCloseModal}>
                <div className="topic__make">
                    <div className="topic__make-title">Make a post for {modalTitle}</div>
                    <img className="topic__make-img" onClick={handleCloseModal} src={closeModalImg} alt="" />
                    <Make type="post" handleCreate={handleCreatePost} />
                </div>
            </Modal>
        </div>

    );
}

export default TopicPage;
