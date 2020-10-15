import React, { Fragment } from 'react';
import classNames from 'classnames';
import { Scrollbar } from 'react-scrollbars-custom';

import { PostCard, Modal, Make, TopicStatistic } from '../../components';
import { topicApi } from '../../utils/api';
import refreshTokenWrapper from '../../utils/refreshTokenWrapper';

import './Topic.scss'

import closeModalImg from '../../assets/img/close-cross.svg';
import subImg from '../../assets/img/sub.svg';
import subActiveImg from '../../assets/img/sub-active.svg';
import topic from '../../utils/api/topic';

const TopicPage = (props) => {
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

    const [activeTab, setActiveTab] = React.useState(0)
    const [isModalOpen, setIsModalOpen] = React.useState(false)
    const [modalTitle, setModalTitle] = React.useState('')
    const [isSub, setIsSub] = React.useState(data.subscribe)
    const [isRightSideNewPost, RightSideNewPost] = React.useState(false)

    const [topicData, setTopicData] = React.useState({})

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

    React.useEffect(() => {
        if (props.location.state) {
            setTopicData(props.location.state.data)
        } else {
            refreshTokenWrapper(topicApi.getTopic, () => { }, () => { }, props.match.params.id)
                .then(({ data }) => {
                    setTopicData(data)
                })
                .catch(err => console.log(err))
        }
    }, [])

    const handleCreatePost = (postData) => {
        refreshTokenWrapper(topicApi.createPost, () => { }, () => { }, { data: { ...postData, is_right_side: isRightSideNewPost }, id: props.match.params.id })
            .then(({ data }) => console.log(data, 'created_post'))
            .catch(err => console.log(err))
    }

    return (
        <div className="topic">
            <div className="topic__row row">
                <div className="topic__title">
                    <p>{data.leftTheme}<span> vs </span>{data.rightTheme}</p>
                    <div className="topic__sub btn btn--gray" onClick={handleSubscribe}>
                        {
                            isSub ? <img src={subActiveImg} alt="" /> : <img src={subImg} alt="" />
                        }
                        <span>subscribe</span>
                    </div>
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

                    <TopicStatistic posts={data.placets.length + data.worsts.length} placet={data.placet} against={data.against} date={data.date} />

                </div>
                <div className="topic__content">
                    <div className="topic__content-box">
                        <div className="topic__content-wrapper">
                            <div className="topic__content-name">{data.leftTheme}</div>
                            <div className="topic__content-make">
                                <span>{data.placets.length} posts&nbsp;&nbsp;&nbsp;•</span>
                                <div className="topic__content-btn" onClick={() => handleOpenModal(data.leftTheme, false)}>
                                    <div className="topic__content-btn-plus"><span>+</span></div>
                                    <div className="topic__content-btn-text">Make a post</div>
                                </div>
                            </div>
                        </div>

                        <Scrollbar className="navbar__scroll" style={{ width: '100%', height: '100%' }}>
                            {data.placets &&
                                data.placets.map((card, index) => {
                                    return <PostCard key={index} {...card} type="column" to="post" />
                                })
                            }
                        </Scrollbar>
                    </div>
                    <div className="topic__content-box">
                        <div className="topic__content-wrapper">
                            <div className="topic__content-name">{data.rightTheme}</div>
                            <div className="topic__content-make">
                                <span>{data.placets.length} posts&nbsp;&nbsp;&nbsp;•</span>
                                <div className="topic__content-btn" onClick={() => handleOpenModal(data.rightTheme, true)}>
                                    <div className="topic__content-btn-plus topic__content-btn-plus--yellow"><span>+</span></div>
                                    <div className="topic__content-btn-text topic__content-btn-text--yellow">Make a post</div>
                                </div>
                            </div>
                        </div>
                        <Scrollbar className="navbar__scroll" style={{ width: '100%', height: '100%' }}>
                            {data.worsts &&
                                data.worsts.map((card, index) => {
                                    return <PostCard key={index} {...card} type="column" to="post" />
                                })
                            }
                        </Scrollbar>
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
