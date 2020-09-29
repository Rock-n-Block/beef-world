import React from 'react';
import { UploadField } from '@navjobs/upload'

import { ProfileForm } from '../../modules';
import { Logout } from '../../components';

import './Profile.scss';

import defaultAvatar from '../../assets/img/default-avatar.svg';

const ProfilePage = () => {

    const [avatar, setAvatar] = React.useState(defaultAvatar)

    const onUploadAvatar = newAvatar => {
        console.log((newAvatar))
        setAvatar(newAvatar[0])
    }

    return (
        <div className="profile">
            <div className="profile__row">
                <div className="profile__avatar">
                    <div className="profile__avatar-box">
                        <img src={avatar} alt="" />
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
                    <ProfileForm />
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
