import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Scrollbar } from 'react-scrollbars-custom';

import './Navbar.scss'

const Navbar = ({ isOpen }) => {

    const [activeTab, setActiveTab] = React.useState(0)

    const tabs = [
        {
            link: 'trending',
            text: 'Trending'
        },
        {
            link: 'hot',
            text: 'Hot'
        },
        {
            link: 'popular',
            text: 'Popular'
        },
        {
            link: 'editors',
            text: 'Editor’s Pick'
        },
    ]

    const topics = [
        {
            link: 'animals',
            text: 'Animals'
        },
        {
            link: 'music',
            text: 'Music'
        },
        {
            link: 'News and Politics',
            text: 'news'
        },
        {
            link: 'sports',
            text: 'Sports'
        },
        {
            link: 'science',
            text: 'Science'
        },
        {
            link: 'meme',
            text: 'Meme'
        },
        {
            link: 'celebrity',
            text: 'Celebrity'
        },
        {
            link: 'uncategorized',
            text: 'Uncategorized'
        },
    ]

    return (
        <div className={classNames('navbar', {
            'active': isOpen
        })}>
            <Scrollbar className="navbar__scroll" style={{ width: '100%', height: '100%' }}>
                <div className="navbar__text">
                    Post your video, meme, etcetera, or any video that already exists online. Every week the most popular post of the month will receive <span className="navbar__text--red">100 USD</span> from us! Press "Make a Post" to begin.
            </div>
                <div className="navbar__links">
                    {
                        tabs.map((item, index) => {
                            return (
                                <Link key={index} onClick={() => setActiveTab(index)} className={classNames('navbar__links-item', {
                                    'active': index === activeTab
                                })} to={`/${item.link}`}>
                                    <div className="navbar__links-item-box">
                                        {
                                            index === activeTab ? <img src={require(`../../assets/img/tabs/${item.link}-active.svg`)} alt="" /> : <img src={require(`../../assets/img/tabs/${item.link}.svg`)} alt="" />
                                        }
                                    </div>
                                    <span>{item.text}</span>
                                </Link>
                            )
                        })
                    }
                </div>
                <div className="navbar__topics">
                    <div className="navbar__topics-title">topic</div>
                    {
                        topics.map((item, index) => {
                            return (
                                <Link key={index} className="navbar__topics-item" to={`/topic/${item.link}`}>
                                    <div className="navbar__topics-item-img"></div>
                                    <span className="navbar__topics-item-text">{item.text}</span>
                                </Link>
                            )
                        })
                    }
                </div>
                <div className="navbar__more">
                    <div className="navbar__more-title">MORE BEEF DOT WORLD</div>
                    <a href="/" className="navbar__more-link">Community</a>
                    <a href="/" className="navbar__more-link">Terms</a>
                    <a href="/" className="navbar__more-link">Privacy</a>
                    <a href="/" className="navbar__more-link">Contact Us</a>
                </div>
            </Scrollbar>
        </div>
    );
}

export default Navbar;
