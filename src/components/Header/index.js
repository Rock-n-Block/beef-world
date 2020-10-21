import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Popover } from 'antd';

import { SearchInput, Navbar, Logout } from '../../components';
import { modalActions } from '../../redux/actions';

import './Header.scss'

import navbarOpenImg from '../../assets/img/navbar-open.svg';
import navbarCloseImg from '../../assets/img/navbar-close.svg';
import logoImg from '../../assets/img/logo.svg';
import defaultAvatarImg from '../../assets/img/default-avatar.svg';

const Header = ({ history }) => {

    const dispatch = useDispatch();

    const navbarRef = React.useRef();
    const btnRef = React.useRef()

    const [isNavbarOpen, setIsNavbarOpen] = React.useState(false)

    const [isSearchOpen, setIsSearchOpen] = React.useState(false)


    const outsideClick = (e) => {
        const path = e.path || (e.composedPath && e.composedPath())
        if (!path.includes(navbarRef.current) && !path.includes(btnRef.current)) {
            setIsNavbarOpen(false)
        }
    }

    const handleSignInOpen = () => {
        dispatch(modalActions.toggleSignInModal(true))
        setIsNavbarOpen(false)
    }

    const handleSignUpOpen = () => {
        dispatch(modalActions.toggleSignUpModal(true))
        setIsNavbarOpen(false)
    }

    React.useEffect(() => {
        document.body.addEventListener('click', outsideClick)
        return () => {
            document.body.removeEventListener('click', outsideClick)
        };
    }, []);


    const { isAuth, photo } = useSelector((state) => {
        return {
            ...state.user
        }
    })


    history.listen(() => {
        if (window.innerWidth < 901) {
            setIsNavbarOpen(false)
        }
    });

    return (
        <>
            <header className="header">
                <div className="header__row">
                    <div className="header__wrapper">
                        <div className="header__navbar-toggle" ref={btnRef}>
                            {isNavbarOpen ? <img onClick={() => { setIsNavbarOpen(false) }} src={navbarCloseImg} alt="" /> : <img onClick={() => setIsNavbarOpen(true)} src={navbarOpenImg} alt="" />}
                        </div>
                        {!isSearchOpen && <Link to="/" className="header__logo">
                            <img src={logoImg} alt="" />
                        </Link>}
                    </div>
                    <SearchInput handleOpenSearchInput={(value) => setIsSearchOpen(value)} />
                    {window.innerWidth > 991 && <div className="header__wrapper">
                        {!isAuth &&
                            <>
                                <div className="header__login" onClick={handleSignInOpen}>Log in</div>
                                <div className="header__btn btn btn--gray" onClick={handleSignUpOpen}>Sign up</div>
                            </>
                        }
                        {
                            isAuth && <Popover placement="bottom" trigger="hover" content={
                                <Logout><div className="header__user-logout">Log Out</div></Logout>
                            }>
                                <Link to="/profile" className="header__user">
                                    <img src={photo || defaultAvatarImg} alt="" />
                                </Link>
                            </Popover>
                        }
                        {isAuth && <Link to="/make" className="header__btn btn">Make a topic</Link>}
                    </div>}
                </div>
                <Navbar isOpen={isNavbarOpen} navbarRef={navbarRef} isAuth={isAuth} avatar={photo} handleSignInOpen={handleSignInOpen} handleSignUpOpen={handleSignUpOpen} />
            </header>
        </>
    );
}

export default withRouter(Header);
