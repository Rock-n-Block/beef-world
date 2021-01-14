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
    const infoRef = React.useRef();
    const dispatch = useDispatch();

    const { topicId } = useParams()

    const { topicData, user } = useSelector(({ topics, user }) => {
        return {
            topicData: topics.currentTopic,
            user
        }
    })

    let scrollPrev = 0;

    const [activeTab, setActiveTab] = React.useState('hot')
    const [isModalOpen, setIsModalOpen] = React.useState(false)
    const [modalTitle, setModalTitle] = React.useState('')
    const [isSub, setIsSub] = React.useState(false)
    const [isMobileScroll, setIsMobileScroll] = React.useState(false)
    const [isScrollToBottom, setIsScrollToBottom] = React.useState(false)
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

    const getTopicData = (order_type) => {
        dispatch(topicActions.getTopicData(topicId, order_type))
    }

    const handleLike = (topic_id, post_id, value) => {
        dispatch(topicActions.cardLike(topic_id, post_id, value, 'getTopicData', topic_id))
    }

    const handleScroll = () => {
        let topCoord = infoRef.current.getBoundingClientRect().top

        if (topCoord < 63) {
            setIsMobileScroll(true)
            if (window.pageYOffset > scrollPrev) {
                if (window.pageYOffset - scrollPrev > 30 && window.pageYOffset > 120) {
                    setIsScrollToBottom(true)
                    scrollPrev = window.pageYOffset
                }
            } else {
                setIsScrollToBottom(false)
                scrollPrev = window.pageYOffset
            }

        } else {
            setIsMobileScroll(false)
            setIsScrollToBottom(false)
        }

    }

    const handleFilter = (tab) => {
        setActiveTab(tab)
        getTopicData(tab)
    }

    React.useEffect(() => {
        if (window.innerWidth < 991) {
            window.addEventListener('scroll', handleScroll)

            return () => {
                window.removeEventListener('scroll', handleScroll)
            }
        }
    }, [])

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
        return <PostCard isAuth={user.isAuth} handleLike={(value) => (handleLike(topicData.id, card.id, value))} userData={user.id === card.user.id ? user : card.user} topicId={topicData.id} key={index} {...card} type="column" to="post" />
    })

    const rightPosts = topicData.right && topicData.right.map((card, index) => {
        return <PostCard isAuth={user.isAuth} handleLike={(value) => (handleLike(topicData.id, card.id, value))} userData={user.id === card.user.id ? user : card.user} topicId={topicData.id} key={index} {...card} type="column" to="post" />
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
                <div className={classNames('topic__info', {
                    'active': isMobileScroll,
                    'toBottom': isScrollToBottom
                })} ref={infoRef}>

                    {window.innerWidth < 991 &&
                        <div className="topic__wrapper topic__navbar">
                            <div onClick={() => { setIsLeftContentOpen(true); setIsRightContentOpen(false) }} className={classNames('topic__navbar-item', {
                                'active': isLeftContentOpen
                            })}>{topicData.left_theme && topicData.left_theme}</div>
                            <div onClick={() => { setIsLeftContentOpen(false); setIsRightContentOpen(true) }} className={classNames('topic__navbar-item', {
                                'active': isRightContentOpen
                            })}>{topicData.right_theme && topicData.right_theme}</div>
                        </div>
                    }
                    {window.innerWidth < 991 && topicData &&
                        <div className="topic__wrapper topic__statistic">
                            <div className="topic__statistic-wrapper">

                                <div className="topic__statistic-item">
                                    <div className="topic__statistic-item-content placet">{topicData.left_rating}</div>
                                    <div className="topic__statistic-item-head">Placet!</div>
                                </div>
                                <div className="topic__statistic-item">
                                    <div className="topic__statistic-item-content against">{topicData.right_rating}</div>
                                    <div className="topic__statistic-item-head">Against!</div>
                                </div>
                            </div>
                            {
                                isLeftContentOpen && user.isAuth ?
                                    <div className="topic__content-btn" onClick={() => handleOpenModal(topicData.left_theme, false)}>
                                        <div className="topic__content-btn-plus"><span>+</span></div>
                                        <div className="topic__content-btn-text">Make a post</div>
                                    </div> :
                                    <div className="topic__content-btn" onClick={() => handleOpenModal(topicData.right_theme, true)}>
                                        <div className="topic__content-btn-plus topic__content-btn-plus--yellow"><span>+</span></div>
                                        <div className="topic__content-btn-text topic__content-btn-text--yellow">Make a post</div>
                                    </div>
                            }
                        </div>
                    }
                    <div className="topic__wrapper topic__filter">
                        <div className="topic__sort">
                            {
                                tabs.map((tab, index) => {
                                    return <div key={index} onClick={() => handleFilter(tab.toLowerCase())} className={classNames('topic__sort-item', {
                                        'active': tab.toLowerCase() === activeTab
                                    })}>{tab}</div>
                                })
                            }
                        </div>

                        {topicData && window.innerWidth > 991 && <TopicStatistic posts={(topicData.left && topicData.left) ? topicData.left.length + topicData.right.length : 0} placet={topicData.left_rating} against={topicData.right_rating} date={topicData.created} />}

                    </div>
                </div>
                <div className='topic__content'>
                    <div className={classNames('topic__content-box', {
                        'mobile--hidden': !isLeftContentOpen
                    })}>
                        {window.innerWidth > 991 && <div className="topic__content-wrapper">
                            <div className="topic__content-name">{topicData.left_theme}</div>
                            <div className="topic__content-make">
                                <span>{topicData.left && topicData.left.length} posts</span>
                                {user.isAuth &&
                                    <>
                                        <span>&nbsp;&nbsp;&nbsp;•</span>
                                        <div className="topic__content-btn" onClick={() => handleOpenModal(topicData.left_theme, false)}>
                                            <div className="topic__content-btn-plus"><span>+</span></div>
                                            <div className="topic__content-btn-text">Make a post</div>
                                        </div>
                                    </>
                                }
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
                                <span>{topicData.right && topicData.right.length} posts</span>
                                {user.isAuth && <>
                                    <span>&nbsp;&nbsp;&nbsp;•</span>
                                    <div className="topic__content-btn" onClick={() => handleOpenModal(topicData.right_theme, true)}>
                                        <div className="topic__content-btn-plus topic__content-btn-plus--yellow"><span>+</span></div>
                                        <div className="topic__content-btn-text topic__content-btn-text--yellow">Make a post</div>
                                    </div>
                                </>}
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
