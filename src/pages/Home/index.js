import React from 'react';
import Masonry from 'react-masonry-component';
import classNames from 'classnames';
import axios from 'axios';
import { useRouteMatch, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { filterActions } from '../../redux/actions';
import { PostCard } from '../../components';
import { topicApi } from '../../utils/api';
import refreshTokenWrapper from '../../utils/refreshTokenWrapper';

import './Home.scss'

const Home = () => {

    const { path, params } = useRouteMatch();
    const dispatch = useDispatch();

    const tabs = [
        {
            link: 'trending',
            text: 'TRENDING'
        },
        {
            link: 'hot',
            text: 'HOT'
        },
        {
            link: 'popular',
            text: 'POPULAR'
        },
        {
            link: 'editors',
            text: 'EDITOR’S PICK'
        }
    ]

    const [cards, setCards] = React.useState([])

    const { activeTab, activeSort, userId } = useSelector(({ filter, user }) => {
        return {
            activeTab: filter.sort,
            activeSort: filter.filter,
            userId: user.id
        }
    })


    // React.useEffect(() => {
    //     axios.get('http://localhost:3000/data.json').then(({ data }) => {
    //         setCards(data.data)
    //     })
    // }, [])

    React.useEffect(() => {
        refreshTokenWrapper(topicApi.getTopics, () => { }, () => { }).then(({ data }) => setCards(data)).catch(err => console.log(err))
    }, [])

    React.useEffect(() => {
        const sortName = path.split('/')[1] ? path.split('/')[1] : 'trending'

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
                                return <PostCard topicId={card.id} topicTitle={`${card.left_theme} vs ${card.right_theme}`} key={index} {...card.post} type="grid" to="topic" />
                            })
                        }
                    </Masonry>
                </div>
            </div>
        </div>
    );
}

export default Home;
