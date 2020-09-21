import React, { Fragment } from 'react';
import renderHTML from 'react-render-html';
import classNames from 'classnames';
import format from 'date-fns/format'

import { TopicCard } from '../../components';

import './Topic.scss'

import placedArrowImg from '../../assets/img/placed-arrow.svg';
import worstArrowImg from '../../assets/img/worst-arrow.svg';

const TopicPage = () => {

    const [activeTab, setActiveTab] = React.useState(0)

    const tabs = ['HOT', 'NEW', 'TOP']

    const data = {
        title: 'Roman Empire vs Carthage',
        date: 'Fri Sep 18 2020 13:43:15 GMT+0300 (Москва, стандартное время)',
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
                "topicname": "politics"
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
                "topicname": "politics"
            },
        ]
    }

    const replaceVsStr = (str) => {
        return str.replace('vs', '<span>vs</span>')
    }

    const formatDate = (date) => {
        return format(new Date(date), 'd MMM Y')
    }

    return (
        <div className="topic">
            <div className="topic__row row">
                <div className="topic__title">{renderHTML(replaceVsStr(data.title))}</div>
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
                    <div className="topic__statistic">
                        <div className="topic__statistic-item">
                            <div className="topic__statistic-item-box">
                                <div className="topic__statistic-item-content">{data.placets.length + data.worsts.length}</div>
                                <div className="topic__statistic-item-head">Posts</div>
                            </div>
                        </div>
                        <div className="topic__statistic-item">
                            <img src={placedArrowImg} alt="" />
                            <div className="topic__statistic-item-box">
                                <div className="topic__statistic-item-content">33.3k</div>
                                <div className="topic__statistic-item-head">Placet!</div>
                            </div>
                        </div>
                        <div className="topic__statistic-item">
                            <img src={worstArrowImg} alt="" />
                            <div className="topic__statistic-item-box">
                                <div className="topic__statistic-item-content">24k</div>
                                <div className="topic__statistic-item-head">Against</div>
                            </div>
                        </div>
                        <div className="topic__statistic-item">
                            <div className="topic__statistic-item-box">
                                <div className="topic__statistic-item-content">{formatDate(data.date)}</div>
                                <div className="topic__statistic-item-head">Created</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="topic__content">
                    <div className="topic__content-box">
                        <div className="topic__content-wrapper">
                            <div className="topic__content-btn">
                                <div className="topic__content-btn-plus"><span>+</span></div>
                                <div className="topic__content-btn-text">Make a Placet post</div>
                            </div>
                            <span>•  {data.placets.length} posts</span>
                        </div>
                        {data.placets &&
                            data.placets.map((card, index) => {
                                return <TopicCard key={index} {...card} type="column" to="post" />
                            })
                        }
                    </div>
                    <div className="topic__content-box">
                        <div className="topic__content-wrapper">
                            <div className="topic__content-btn">
                                <div className="topic__content-btn-plus topic__content-btn-plus--yellow"><span>+</span></div>
                                <div className="topic__content-btn-text topic__content-btn-text--yellow">Make a Worst post</div>
                            </div>
                            <span>•  {data.worsts.length} posts</span>
                        </div>
                        {data.worsts &&
                            data.worsts.map((card, index) => {
                                return <TopicCard key={index} {...card} type="column" to="post" />
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopicPage;
