import React from 'react';
import { Input } from 'antd';
import classNames from 'classnames';

import { VideoPlayer } from '../../components';

import './MakePost.scss'

import checkImg from '../../assets/img/check.svg';

const { TextArea } = Input

const MakePostPage = (props) => {
    const [videoLink, setVideoLink] = React.useState('')
    const [topicTitle, setTopicTitle] = React.useState('')
    const [postTitle, setPostTitle] = React.useState('')
    const [postDescr, setPostDescr] = React.useState('')

    const [postType, setPostType] = React.useState('placet')
    const [topicId, setTopicId] = React.useState('')

    const handleInputLinkChange = (e) => {
        let value = e.target.value.replace('https://', '')
        value = value.replace('http://', '')
        setVideoLink(value)
    }

    const handlePostTitleChange = (e) => {
        if (e.target.value.length <= 100) {
            setPostTitle(e.target.value)
        }
    }

    const handlePostDescriptionChange = (e) => {
        if (e.target.value.length <= 1000) {
            setPostDescr(e.target.value)
        }
    }

    React.useEffect(() => {
        const params = window
            .location
            .search
            .replace('?', '')
            .split('&')
            .reduce(
                function (p, e) {
                    var a = e.split('=');
                    p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                    return p;
                },
                {}
            );
        params['type'] && setPostType(params['type'])
        params['topic'] && setTopicId(params['topic'])
    }, [])

    return (
        <div className="m-post">
            <div className="m-post__title">Make a post</div>
            <div className="m-post__box m-post__link">
                <span>https://</span>
                <Input type="text" className="m-post__input" placeholder="Past youtube video link" value={videoLink} onChange={handleInputLinkChange} />
            </div>
            {videoLink && <VideoPlayer video={videoLink} type="makepost" />}
            <div className="m-post__box m-post__topic">
                <div className="m-post__topic-box">
                    <div className="m-post__box-title">Topic</div>
                    <Input type="text" className="m-post__input" placeholder="Topic Name" value={topicTitle} onChange={(e) => setTopicTitle(e.target.value)} />
                </div>
                <div className="m-post__topic-type">
                    <div onClick={() => setPostType('placet')} className={classNames('m-post__topic-type-item m-post__topic-type-item--placet', {
                        'active': postType === 'placet'
                    })}>
                        <div className="m-post__topic-type-item-img">
                            <img src={checkImg} alt="" />
                        </div>
                        <div className="m-post__topic-type-item-text">Placet</div>
                    </div>
                    <div onClick={() => setPostType('worst')} className={classNames('m-post__topic-type-item m-post__topic-type-item--worst', {
                        'active': postType === 'worst'
                    })}>
                        <div className="m-post__topic-type-item-img">
                            <img src={checkImg} alt="" />
                        </div>
                        <div className="m-post__topic-type-item-text">Worst</div>
                    </div>
                </div>
            </div>
            <div className="m-post__topic-example m-post__box-title">Example Roman Empire vs Carthage</div>

            <div className="m-post__box m-post__headline">
                <div className="m-post__box-title">
                    <span>Title  (optional)</span>
                    <span>{postTitle.length}/100</span>
                </div>
                <TextArea autoSize={{ minRows: 1, maxRows: 20 }} size="large" type="text" className="m-post__input" placeholder="Post Title" value={postTitle} onChange={handlePostTitleChange} />
            </div>
            <div className="m-post__box m-post__descr">
                <div className="m-post__box-title">
                    <span>Description  (optional)</span>
                    <span>{postDescr.length}/1000</span>
                </div>
                <TextArea autoSize={{ minRows: 1, maxRows: 20 }} size="large" type="text" className="m-post__input" placeholder="Post Description" value={postDescr} onChange={handlePostDescriptionChange} />
            </div>
        </div>
    );
}

export default MakePostPage;
