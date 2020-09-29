import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Popover } from 'antd';

import { SearchInput, Navbar, Modal, Logout } from '../../components';
import { SignInForm, SignUpForm } from '../../modules';
import { modalActions } from '../../redux/actions';

import './Header.scss'

import navbarOpenImg from '../../assets/img/navbar-open.svg';
import navbarCloseImg from '../../assets/img/navbar-close.svg';
import logoImg from '../../assets/img/logo.svg';
import defaultAvatarImg from '../../assets/img/default-avatar.svg';

const Header = () => {

    const dispatch = useDispatch();

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


    const { isOpenSignIn, isOpenSignUp, isAuth, photo } = useSelector((state) => {
        return {
            isOpenSignIn: state.modal.isOpenSignIn,
            isOpenSignUp: state.modal.isOpenSignUp,
            ...state.user
        }
    })

    const handleOkSignInModal = () => {
        dispatch(modalActions.toggleSignInModal(false))
    }
    const handleOkSignUpModal = () => {
        dispatch(modalActions.toggleSignUpModal(false))
    }

    return (
        <>
            <header className="header">
                <div className="header__row">
                    <div className="header__wrapper">
                        <div className="header__navbar-toggle" ref={btnRef}>
                            {isNavbarOpen ? <img onClick={() => { setIsNavbarOpen(false) }} src={navbarCloseImg} alt="" /> : <img onClick={() => setIsNavbarOpen(true)} src={navbarOpenImg} alt="" />}
                        </div>
                        <Link to="/">
                            <img src={logoImg} alt="" />
                        </Link>
                    </div>
                    <SearchInput />
                    <div className="header__wrapper">
                        {!isAuth &&
                            <>
                                <div className="header__login" onClick={() => dispatch(modalActions.toggleSignInModal(true))}>Log in</div>
                                <div className="header__btn btn btn--gray" onClick={() => dispatch(modalActions.toggleSignUpModal(true))}>Sign up</div>
                            </>
                        }
                        {
                            isAuth && <Popover ov placement="bottom" trigger="hover" content={
                                <Logout><div className="header__user-logout">Log Out</div></Logout>
                            }>
                                <Link to="/profile/1" className="header__user">
                                    <img src={photo || defaultAvatarImg} alt="" />
                                </Link>
                            </Popover>
                        }
                        {isAuth && <Link to="/make" className="header__btn btn">Make a topic</Link>}
                    </div>
                </div>
                <Navbar isOpen={isNavbarOpen} navbarRef={navbarRef} />
            </header>
            <Modal isOpen={isOpenSignIn} handleOk={handleOkSignInModal}>
                <SignInForm />
            </Modal>
            <Modal isOpen={isOpenSignUp} handleOk={handleOkSignUpModal}>
                <SignUpForm />
            </Modal>
        </>
    );
}

export default Header;
