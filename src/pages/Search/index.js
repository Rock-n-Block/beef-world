import React from 'react';
import Masonry from 'react-masonry-component';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { TopicStatistic, PostCard } from '../../components';

import './Search.scss'

const Search = (props) => {

    const [data, setData] = React.useState([])

    const isAuth = useSelector(({ user }) => user.isAuth)

    React.useEffect(() => {
        if (props.location.state) {

            setData(props.location.state.data)
        }
    })

    return (
        <div className="search">
            <div className="search__row row">
                {
                    (data.topics && data.topics.length) ? (
                        <>
                            <div className="search__title">Topics</div>
                            <div className="search__subtitle">{data.topics.length} results topic for {data.searchText}</div>
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
                            <div className="search__subtitle">{data.posts.length} results post for {data.searchText}</div>
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

export default Search;
