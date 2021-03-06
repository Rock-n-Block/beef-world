import React from 'react';
import { UploadField } from '@navjobs/upload'
import { useSelector, useDispatch } from 'react-redux';

import { ProfileForm } from '../../modules';
import { Logout } from '../../components';
import refreshTokenWrapper from '../../utils/refreshTokenWrapper';
import { userApi } from '../../utils/api';
import { userActions } from '../../redux/actions';

import './Profile.scss';

import defaultAvatar from '../../assets/img/default-avatar.svg';

const ProfilePage = () => {
    const dispatch = useDispatch()

    const onUploadAvatar = newAvatar => {
        let formData = new FormData()
        formData.append("avatar", newAvatar[0])
        refreshTokenWrapper(userApi.uploadAvatar, () => { }, () => { }, formData)
            .then(({ data }) => {
                dispatch(userActions.setUserPhoto(data.avatar))
            })
            .catch(err => {
                console.log(err)
            })
    }

    const { username, email, avatar } = useSelector(({ user }) => {
        return {
            username: user.username,
            email: user.email,
            avatar: user.avatar
        }
    })

    return (
        <div className="profile">
            <div className="profile__row">
                <div className="profile__avatar">
                    <div className="profile__avatar-box">
                        <img src={avatar ? avatar : defaultAvatar} alt="" />
                    </div>
                    <div className="profile__avatar-upload">
                        <UploadField onFiles={file => { onUploadAvatar(file) }} uploadProps={{ accept: '.jpg, .jpeg, .png' }}>
                            <div className="profile__avatar-upload-btn btn btn--gray">LOAD AVATAR</div>
                        </UploadField>
                    </div>
                </div>
                <div className="profile__head">
                    <div className="profile__title">Profile</div>
                    <Logout>
                        <div className="btn btn--gray profile__logout">Log out</div>
                    </Logout>
                </div>
                <div className="profile__form">
                    <ProfileForm username={username} email={email} />
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
