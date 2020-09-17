import React from 'react';
import { Link } from 'react-router-dom';

import { SearchInput, Navbar } from '../../components';

import './Header.scss'

import navbarOpenImg from '../../assets/img/navbar-open.svg';
import navbarCloseImg from '../../assets/img/navbar-close.svg';
import logoImg from '../../assets/img/logo.svg';

const Header = () => {

    const [isNavbarOpen, setIsNavbarOpen] = React.useState(false)

    return (
        <header className="header">
            <div className="header__row">
                <div className="header__wrapper">
                    <div className="header__navbar-toggle" onClick={() => setIsNavbarOpen(!isNavbarOpen)}>
                        {isNavbarOpen ? <img src={navbarCloseImg} alt="" /> : <img src={navbarOpenImg} alt="" />}
                    </div>
                    <Link to="/">
                        <img src={logoImg} alt="" />
                    </Link>
                </div>
                <SearchInput />
                <div className="header__wrapper">
                    <div className="header__login">Log in</div>
                    <div className="header__btn btn btn--gray">Sign up</div>
                    <div className="header__btn btn">Make a post</div>
                </div>
            </div>
            <Navbar isOpen={isNavbarOpen} />
        </header>
    );
}

export default Header;
