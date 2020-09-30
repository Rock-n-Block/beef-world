import React from 'react';
import Masonry from 'react-masonry-component';

import { TopicStatistic, PostCard } from '../../components';

import './Search.scss'

const Search = (props) => {

    const [data, setData] = React.useState([])

    React.useEffect(() => {
        setData(props.location.state.data)
    })

    return (
        <div className="search">
            <div className="search__row row">
                {
                    data.topics && (
                        <>
                            <div className="search__title">Topics</div>
                            <div className="search__subtitle">7 results tocip for pizza</div>
                            {
                                data.topics.map(topic => {
                                    return <div className="search__topic">
                                        <div className="search__topic-title">{topic.leftTheme} <span>vs</span> {topic.rightTheme}</div>
                                        <TopicStatistic posts="4" placet={topic.placet} against={topic.against} date={topic.date} />
                                    </div>
                                })
                            }
                        </>
                    )
                }
                {
                    data.posts && (
                        <>
                            <div className="search__title">Topics</div>
                            <div className="search__subtitle">7 results tocip for pizza</div>
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
                    )
                }
            </div>
        </div>
    );
}

export default Search;
