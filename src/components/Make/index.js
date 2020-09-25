import React from 'react';
import { Input, Select } from 'antd';
import classNames from 'classnames';

import { VideoPlayer } from '../../components';

import './Make.scss'

import checkImg from '../../assets/img/check.svg';

const { TextArea } = Input
const { Option } = Select

const Make = ({ type }) => {

    const [videoLink, setVideoLink] = React.useState('')
    const [firstOponent, setFirstOponent] = React.useState('')
    const [secondOponent, setSecondOponent] = React.useState('')
    const [postTitle, setPostTitle] = React.useState('')
    const [postDescr, setPostDescr] = React.useState('')

    const [myChoose, setMyChoose] = React.useState(0)

    const tags = [
        {
            text: 'Animals',
            id: 1
        },
        {
            text: 'Music',
            id: 2
        },
        {
            text: 'News and Politics',
            id: 3
        }
    ]

    // const [postType, setPostType] = React.useState('placet')

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

    const handleTagsChange = (tag) => {
        console.log(tag)
    }

    return (
        <div className="make">
            <div className="make__box make__link">
                <span>https://</span>
                <Input type="text" className="make__input" placeholder="Past youtube video link" value={videoLink} onChange={handleInputLinkChange} />
            </div>
            {(videoLink && type === 'topic') && <VideoPlayer video={videoLink} type="makepost" />}
            {
                type === 'topic' && (
                    <div className="make__box make__topic">
                        <div className="make__topic-item">
                            <div className="make__topic-item-input">
                                <Input type="text" className="make__input" placeholder="Topic" value={firstOponent} onChange={(e) => setFirstOponent(e.target.value)} />
                                <span>Example Roman Empire</span>
                            </div>
                            <div onClick={() => setMyChoose(0)} className={classNames('make__topic-item-choose', {
                                'active': myChoose === 0
                            })}>
                                <div className="make__topic-item-choose-img">
                                    <img src={checkImg} alt="" />
                                </div>
                                <span>My VOTE</span>
                            </div>
                        </div>
                        <div className="make__topic-vs">VS</div>
                        <div className="make__topic-item">
                            <div className="make__topic-item-input">
                                <Input type="text" className="make__input" placeholder="Topic" value={secondOponent} onChange={(e) => setSecondOponent(e.target.value)} />
                                <span>Carthage</span>
                            </div>
                            <div onClick={() => setMyChoose(1)} className={classNames('make__topic-item-choose', {
                                'active': myChoose === 1
                            })}>
                                <div className="make__topic-item-choose-img">
                                    <img src={checkImg} alt="" />
                                </div>
                                <span>My VOTE</span>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* {type === 'post' && (
                <>
                    <div className="make__box make__post">
                        <div className="make__post-box">
                            <div className="make__box-title">Topic</div>
                            <Input type="text" className="make__input" placeholder="Topic Name" value={topicTitle} onChange={(e) => setTopicTitle(e.target.value)} />
                        </div>
                        <div className="make__post-type">
                            <div onClick={() => setPostType('placet')} className={classNames('make__post-type-item make__post-type-item--placet', {
                                'active': postType === 'placet'
                            })}>
                                <div className="make__post-type-item-img">
                                    <img src={checkImg} alt="" />
                                </div>
                                <div className="make__post-type-item-text">Placet</div>
                            </div>
                            <div onClick={() => setPostType('worst')} className={classNames('make__post-type-item make__post-type-item--worst', {
                                'active': postType === 'worst'
                            })}>
                                <div className="make__post-type-item-img">
                                    <img src={checkImg} alt="" />
                                </div>
                                <div className="make__post-type-item-text">Worst</div>
                            </div>
                        </div>
                    </div>
                    <div className="make__post-example make__box-title">Example Roman Empire vs Carthage</div>
                </>
            )
            } */}

            <div className="make__box make__headline">
                <div className="make__box-title">
                    <TextArea autoSize={{ minRows: 1, maxRows: 20 }} size="large" type="text" className="make__input" placeholder="Title  (optional)" value={postTitle} onChange={handlePostTitleChange} />
                    <span>{postTitle.length}/100</span>
                </div>
            </div>
            <div className="make__box make__descr">
                <div className="make__box-title">
                    <TextArea autoSize={{ minRows: 1, maxRows: 20 }} size="large" type="text" className="make__input" placeholder="Description  (optional)" value={postDescr} onChange={handlePostDescriptionChange} />
                    <span>{postDescr.length}/1000</span>
                </div>
            </div>
            <div className="make__box make__tags">

                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Tags"
                    onChange={handleTagsChange}
                >
                    {
                        tags.map((tag) => {
                            return <Option className="make__tags-item" key={tag.text}>#{tag.text}</Option>
                        })
                    }
                </Select>
            </div>
            <div className="make__btn btn">POst</div>
        </div>
    );
}

export default Make;
