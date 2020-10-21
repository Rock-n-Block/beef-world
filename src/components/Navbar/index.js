import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Scrollbar } from 'react-scrollbars-custom';
import { useSelector } from 'react-redux';

import defaultAvatarImg from '../../assets/img/default-avatar.svg';

import './Navbar.scss'

const Navbar = ({ isOpen, navbarRef, handleSignUpOpen, handleSignInOpen, isAuth, avatar }) => {
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
            text: 'Top'
        },
        {
            link: 'legendary',
            text: 'Legendary'
        }
    ]

    const tags = [
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

    const subs = [
        {
            text: 'Roman Empire vs Carthage',
            link: '123'
        },
        {
            text: 'Right vs Left',
            link: '123'
        },
        {
            text: 'Soft vs Hard',
            link: '123'
        },
    ]


    const { activeTab, activeSort } = useSelector(({ filter }) => {
        return {
            activeTab: filter.sort,
            activeSort: filter.filter
        }
    })

    return (
        <div ref={navbarRef} className={classNames('navbar', {
            'active': isOpen
        })}>
            <Scrollbar className="navbar__scroll" style={{ width: '100%', height: '100%' }}>
                {window.innerWidth < 991 && !isAuth &&
                    <div className="navbar__wrapper">
                        <div className="navbar__btns-item btn btn--gray" onClick={handleSignInOpen}>Log in</div>
                        <div className="navbar__btns-item btn btn--gray" onClick={handleSignUpOpen}>Sign up</div>
                    </div>
                }
                {window.innerWidth < 991 && isAuth &&
                    <div className="navbar__wrapper">
                        <Link to="/profile" className="navbar__user">
                            <div className="navbar__user-img">
                                {avatar ? <img src={avatar} alt="" /> : <img src={defaultAvatarImg} alt="" />}
                            </div>
                            <div className="navbar__user-text">Edit Profile</div>
                        </Link>
                        <Link to="/make" className="btn">Make a topic</Link>
                    </div>
                }
                <div className="navbar__text">
                    Post your video, meme, etcetera, or any video that already exists online. Every week the most popular post of the month will receive <span className="navbar__text--red">100 USD</span> from us! Press "Make a Post" to begin.
                </div>
                <div className="navbar__links">
                    {
                        tabs.map((item, index) => {
                            return (
                                <Link key={index} className={classNames('navbar__links-item', {
                                    'active': item.link === activeTab
                                })} to={`/${item.link}${activeSort ? `/${activeSort}` : ''}`}>
                                    <div className="navbar__links-item-box">
                                        {
                                            item.link === activeTab ? <img src={require(`../../assets/img/tabs/${item.link}-active.svg`)} alt="" /> : <img src={require(`../../assets/img/tabs/${item.link}.svg`)} alt="" />
                                        }
                                    </div>
                                    <span>{item.text}</span>
                                </Link>
                            )
                        })
                    }
                </div>
                {/* <div className="navbar__topics navbar__subs">
                    <div className="navbar__topics-title">subscribe</div>
                    {
                        subs.map((item, index) => {
                            return (
                                <Link key={index} className="navbar__topics-item" to={`/topic/${item.link}`}>
                                    <span className="navbar__topics-item-text">{item.text}</span>
                                </Link>
                            )
                        })
                    }
                </div> */}
                <div className="navbar__topics">
                    <div className="navbar__topics-title">tags</div>
                    {
                        tags.map((item, index) => {
                            return (
                                <Link key={index} className="navbar__topics-item" to={`/${activeTab}/${item.link}`}>
                                    <div className="navbar__topics-item-img"></div>
                                    <span className="navbar__topics-item-text">{item.text}</span>
                                </Link>
                            )
                        })
                    }
                </div>
                <div className="navbar__more">
                    <div className="navbar__more-title">MORE BEEF DOT WORLD</div>
                    <Link to="/community" className="navbar__more-link">Community</Link>
                    <Link to="/terms" className="navbar__more-link">Terms</Link>
                    <Link to="/privacy" className="navbar__more-link">Privacy</Link>
                    <a href="/" className="navbar__more-link">Contact Us</a>
                </div>
            </Scrollbar>
        </div>
    );
}

export default Navbar;
