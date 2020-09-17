import React from 'react';
import Masonry from 'react-masonry-component';
import classNames from 'classnames';
import axios from 'axios';

import { TopicCard } from '../../components';

import './Home.scss'

const Home = () => {

    const tabs = ['TRENDING', 'HOT', 'POPULAR']

    const [cards, setCards] = React.useState([])
    const [activeTab, setActiveTab] = React.useState(0)


    React.useEffect(() => {
        axios.get('http://localhost:3000/data.json').then(({ data }) => {
            setCards(data.data)
        })
    }, [])

    return (
        <div className="home">
            <div className="home__row row">
                <div className="home__navbar">
                    {
                        tabs.map((tab, index) => {
                            return <div onClick={() => setActiveTab(index)} key={index} className={classNames('home__navbar-item', {
                                'active': index === activeTab
                            })}>{tab}</div>
                        })
                    }

                </div>
                <div className="home__cards">
                    <Masonry options={{
                        transitionDuration: 0
                    }}>
                        {cards &&
                            cards.map((card, index) => {
                                return <TopicCard key={index} {...card} type="grid" />
                            })
                        }
                    </Masonry>
                </div>
            </div>
        </div>
    );
}

export default Home;
