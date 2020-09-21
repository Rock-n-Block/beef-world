import React from 'react';
import { Link } from 'react-router-dom';

import { SearchInput, Navbar } from '../../components';

import './Header.scss'

import navbarOpenImg from '../../assets/img/navbar-open.svg';
import navbarCloseImg from '../../assets/img/navbar-close.svg';
import logoImg from '../../assets/img/logo.svg';

const Header = () => {
    const navbarRef = React.useRef();
    const btnRef = React.useRef()

    const [isNavbarOpen, setIsNavbarOpen] = React.useState(false)


    const outsideClick = (e) => {
        const path = e.path || (e.composedPath && e.composedPath())
        if (!path.includes(navbarRef.current) && !path.includes(btnRef.current)) {
            setIsNavbarOpen(false)
        }
    }

    React.useEffect(() => {
        document.body.addEventListener('click', outsideClick)
        return () => {
            document.body.removeEventListener('click', outsideClick)
        };
    }, []);

    return (
        <header className="header">
            <div className="header__row">
                <div className="header__wrapper">
                    <div className="header__navbar-toggle" ref={btnRef}>
                        {isNavbarOpen ? <img onClick={() => {setIsNavbarOpen(false)}} src={navbarCloseImg} alt="" /> : <img onClick={() => setIsNavbarOpen(true)} src={navbarOpenImg} alt="" />}
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
            <Navbar isOpen={isNavbarOpen} navbarRef={navbarRef} />
        </header>
    );
}

export default Header;
