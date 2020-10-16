import React from 'react';
import Masonry from 'react-masonry-component';
import { Link } from 'react-router-dom';

import { TopicStatistic, PostCard } from '../../components';

import './Search.scss'

const Search = (props) => {

    const [data, setData] = React.useState([])

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
                            <div className="search__subtitle">{data.topics.length} results topic for pizza</div>
                            {
                                data.topics.map(topic => {
                                    return <Link to={`/topic/${topic.id}`} className="search__topic">
                                        <div className="search__topic-title">{topic.left_theme} <span>vs</span> {topic.right_theme}</div>
                                        <TopicStatistic posts={data.topics.length} placet={0} against={0} date={topic.created} />
                                    </Link>
                                })
                            }
                        </>
                    ) : ''
                }
                {
                    (data.posts && data.posts.length) ? (
                        <>
                            <div className="search__title">Topics</div>
                            <div className="search__subtitle">{data.posts.length} results tocip for pizza</div>
                            <div className="search__posts">

                                <Masonry options={{
                                    transitionDuration: 0
                                }}>
                                    {
                                        data.posts.map((card, index) => {
                                            return <PostCard key={index} {...card} type="grid" to="post" />
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
