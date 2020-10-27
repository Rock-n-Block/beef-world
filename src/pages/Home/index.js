import React from 'react';
import Masonry from 'react-masonry-component';
import classNames from 'classnames';
import { useRouteMatch, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { filterActions, topicActions } from '../../redux/actions';
import { PostCard } from '../../components';

import './Home.scss'

const Home = () => {

    const { path, params } = useRouteMatch();
    const dispatch = useDispatch();

    const tabs = [
        {
            link: 'hot',
            text: 'HOT'
        },
        {
            link: 'new',
            text: 'NEW'
        },
        {
            link: 'top',
            text: 'TOP'
        }
    ]

    const { activeTab, activeSort, cards, user } = useSelector(({ filter, user, topics }) => {
        return {
            activeTab: filter.sort,
            activeSort: filter.filter,
            cards: topics.cards,
            user
        }
    })


    const handleLike = (topic_id, post_id, value) => {
        dispatch(topicActions.cardLike(topic_id, post_id, value, 'getTopicsData', activeTab, false))
    }

    React.useEffect(() => {
        const sortName = path.split('/')[1] ? path.split('/')[1] : 'hot'

        dispatch(filterActions.setMainSort(sortName))

        if (params.topic) {
            dispatch(filterActions.setMainFilter(params.topic))
        }
    }, [path])


    const gridWrapper = window.innerWidth > 991 ? Masonry : 'div'

    const cardsElements = cards && cards.map((card, index) => {
        return <PostCard isAuth={user.isAuth} handleLike={(value) => (handleLike(card.id, card.post.id, value))} topicId={card.id} topicTitle={`${card.left_theme} <span>vs</span> ${card.right_theme}`} key={index} {...card.post} isMe={user.id === card.post.user.id} userData={card.post.user} type="grid" to="topic" />
    })

    return (
        <div className="home">
            <div className="home__row row">
                <div className="home__navbar">
                    {
                        tabs.map((tab, index) => {
                            return <Link to={`/${tab.link}${activeSort ? `/${activeSort}` : ''}`} key={index} className={classNames('home__navbar-item', {
                                'active': tab.link === activeTab
                            })}>{tab.text}</Link>
                        })
                    }

                </div>
                <div className="home__cards">
                    {
                        React.createElement(gridWrapper, [], cardsElements)
                    }
                </div>
            </div>
        </div>
    );
}

export default Home;
