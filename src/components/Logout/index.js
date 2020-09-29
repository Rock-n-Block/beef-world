import React from 'react';
import { useDispatch } from 'react-redux';
import { facebookActions, userActions } from '../../redux/actions';
import { facebookApi } from '../../utils/api';

const Logout = ({ children }) => {

    const dispatch = useDispatch();

    const handleFacebookLogout = () => {
        facebookApi.logout().then(() => {
            dispatch(facebookActions.logout())
        })
    }

    const logout = () => {
        dispatch(userActions.logout())
        handleFacebookLogout()
    }

    return (
        <div className="logout" onClick={logout}>{children}</div>
    );
}

export default Logout;
