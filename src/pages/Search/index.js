import React from 'react';
import Masonry from 'react-masonry-component';
import { Link, useLocation, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { TopicStatistic, PostCard } from '../../components';
import { topicApi } from '../../utils/api';

import './Search.scss'

const Search = ({ history }) => {
    const location = useLocation()

    const [data, setData] = React.useState([])
    const [searchText, setSearchText] = React.useState('')

    const isAuth = useSelector(({ user }) => user.isAuth)
    const params = new URLSearchParams(location.search)

    const handleGetData = () => {
        if (params.get('to_search')) {
            const text = params.get('to_search')
            setSearchText(text)
            topicApi.search(text)
                .then(({ data }) => {
                    setData(data)
                })
                .catch(err => console.log(err))
        }

        if (params.get('search_by_tag')) {
            const tag = params.get('search_by_tag')
            setSearchText(tag)
            topicApi.searchByTag(tag)
                .then(({ data }) => {
                    setData(data)
                })
                .catch(err => console.log(err))
        }
    }
    React.useEffect(() => {
        handleGetData()
    }, [params.get('to_search'), params.get('search_by_tag')])

    return (
        <div className="search">
            <div className="search__row row">
                {
                    (data.topics && data.topics.length) ? (
                        <>
                            <div className="search__title">Topics</div>
                            <div className="search__subtitle">{data.topics.length} results topic for {searchText}</div>
                            {
                                data.topics.map(topic => {
                                    return <Link to={`/topic/${topic.id}`} className="search__topic">
                                        <div className="search__topic-title">{topic.left_theme} <span>vs</span> {topic.right_theme}</div>
                                        <TopicStatistic posts={data.topics.length} placet={topic.left_rating} against={topic.right_rating} date={topic.created} />
                                    </Link>
                                })
                            }
                        </>
                    ) : ''
                }
                {
                    (data.posts && data.posts.length) ? (
                        <>
                            <div className="search__title">Post</div>
                            <div className="search__subtitle">{data.posts.length} results post for {searchText}</div>
                            <div className="search__posts">

                                <Masonry options={{
                                    transitionDuration: 0
                                }}>
                                    {
                                        data.posts.map((card, index) => {
                                            return <PostCard isAuth={isAuth} key={index} {...card} topicId={card.topic.id} type="grid" to="post" />
                                        })
                                    }
                                </Masonry>
                            </div>
                        </>
                    ) : []
                }
            </div>
        </div>
    );
}

export default withRouter(Search);
