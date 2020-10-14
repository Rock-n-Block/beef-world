import React from 'react';
import { Input, Select } from 'antd';
import classNames from 'classnames';

import { VideoPlayer } from '../../components';
import { youtubeApi } from '../../utils/api';

import './Make.scss'

import checkImg from '../../assets/img/check.svg';

const { TextArea } = Input
const { Option } = Select

const Make = ({ type }) => {

    const [videoLink, setVideoLink] = React.useState('')
    const [youtubeVideoTitle, setYoutubeVideoTitle] = React.useState('')
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

    const youtube_parser = (url) => {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
    }

    const handleInputLinkChange = (e) => {
        const id = youtube_parser(e.target.value)
        let value = e.target.value.replace('https://', '')
        value = value.replace('http://', '')

        if (id) {
            youtubeApi.get('/search', {
                params: {
                    q: id,
                }
            }).then(({ data }) => {
                setYoutubeVideoTitle(data.items[0].snippet.title)
                setVideoLink(value)
            })

        }

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
            <div className="make__box make__headline">
                <div className="make__box-title">
                    <TextArea autoSize={{ minRows: 1, maxRows: 20 }} size="large" type="text" className="make__input" placeholder="Title  (optional)" value={postTitle} onChange={handlePostTitleChange} />
                    <span>{postTitle.length}/100</span>
                </div>
            </div>
            {

                type === 'topic' && <div className="make__box make__descr">
                    <div className="make__box-title">
                        <TextArea autoSize={{ minRows: 1, maxRows: 20 }} size="large" type="text" className="make__input" placeholder="Description  (optional)" value={postDescr} onChange={handlePostDescriptionChange} />
                        <span>{postDescr.length}/1000</span>
                    </div>
                </div>
            }
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
