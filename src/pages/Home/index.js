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
        },
        {
            link: 'legendary',
            text: 'LEGENDARY'
        }
    ]

    const { activeTab, activeSort, cards } = useSelector(({ filter, user, topics }) => {
        return {
            activeTab: filter.sort,
            activeSort: filter.filter,
            cards: topics.cards
        }
    })


    const handleLike = (topic_id, post_id, value) => {
        console.log(value, topic_id, post_id)

        dispatch(topicActions.cardLike(topic_id, post_id, value))
    }

    React.useEffect(() => {
        const sortName = path.split('/')[1] ? path.split('/')[1] : 'hot'

        dispatch(filterActions.setMainSort(sortName))

        if (params.topic) {
            dispatch(filterActions.setMainFilter(params.topic))
        }
    }, [path])


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
                    <Masonry options={{
                        transitionDuration: 0
                    }}>
                        {cards &&
                            cards.map((card, index) => {
                                return <PostCard handleLike={(value) => (handleLike(card.id, card.post.id, value))} topicId={card.id} topicTitle={`${card.left_theme} vs ${card.right_theme}`} key={index} {...card.post} type="grid" to="topic" />
                            })
                        }
                    </Masonry>
                </div>
            </div>
        </div>
    );
}

export default Home;
