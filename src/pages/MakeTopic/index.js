import React from 'react';

import { Make } from '../../components';

import './MakePost.scss'

const MakePostPage = (props) => {

    return (
        <div className="m-post">
            <div className="m-post__title">Make a Topic</div>
            <Make type="topic" />
        </div>
    );
}

export default MakePostPage;
