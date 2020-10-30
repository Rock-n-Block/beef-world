import React from 'react';
import { Input, Select, Form } from 'antd';
import classNames from 'classnames';

import './Make.scss'

import checkImg from '../../assets/img/check.svg';

const { TextArea } = Input
const { Option } = Select

const Make = ({ type, touched, errors, link, handleChange, handleBlur, values, first_oponent, second_oponent, title, descr, handleSubmit, choose }) => {

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

    const validateField = (key, touched, errors) => {
        if (touched[key]) {
            if (errors[key]) {
                return 'error'
            } else {
                return 'success'
            }
        } else {
            return ''
        }
    }

    const handlePostTitleChange = (e) => {
        if (e.target.value.length <= 100) {
            setPostTitle(e.target.value)
            handleChange(e)
        }
    }

    const handlePostDescriptionChange = (e) => {
        if (e.target.value.length <= 1000) {
            setPostDescr(e.target.value)
            handleChange(e)
        }
    }

    const handleTagsChange = (tag) => {
        console.log(tag)
    }


    return (
        // <div className="make">
        <Form
            name="make"
            className="make"
            initialValues={{ remember: true }}
            layout="vertical"
        >
            {/* <div className="make__box make__link">
                <span>https://</span>
                <Input type="text" className="make__input" placeholder="Past youtube video link" value={videoLink} />
            </div> */}
            <Form.Item
                name="link"
                className="make__box make__link"
                validateStatus={validateField('link', touched, errors)}
                help={!touched.link ? false : errors.link}
            >
                <Input
                    id="link"
                    className="profile__form-input"
                    onChange={handleChange}
                    placeholder="Past youtube video link"
                    size="large"
                    defaultValue={link}
                    onBlur={handleBlur}
                />
            </Form.Item>
            {/* {(!errors.link && touched.link && type === 'topic') && <VideoPlayer video={values.link} type="makepost" />} */}
            {
                type === 'topic' && (
                    <div className="make__box make__topic">
                        <div className="make__topic-item">
                            <Form.Item
                                name="first_oponent"
                                className="make__topic-item-input"
                                validateStatus={validateField('first_oponent', touched, errors)}
                                help={!touched.first_oponent ? false : errors.first_oponent}
                            >
                                <Input
                                    id="first_oponent"
                                    className="make__input"
                                    onChange={handleChange}
                                    placeholder="Topic Theme"
                                    size="large"
                                    defaultValue={first_oponent}
                                    onBlur={handleBlur}
                                />
                                <span>Example Roman Empire</span>
                            </Form.Item>
                            <label className="make__topic-item-choose-wrapper" htmlFor="is_left_side">
                                <div onClick={() => setMyChoose(0)} className={classNames('make__topic-item-choose', {
                                    'active': myChoose === 0
                                })}>
                                    <div className="make__topic-item-choose-img">
                                        <img src={checkImg} alt="" />
                                    </div>
                                    <span>My VOTE</span>
                                </div>
                                <input onChange={handleChange} type="radio" name="is_right_side" value="0" checked id="is_left_side" />
                            </label>
                        </div>
                        <div className="make__topic-vs">VS</div>
                        <div className="make__topic-item">
                            <Form.Item
                                name="second_oponent"
                                className="make__topic-item-input"
                                validateStatus={validateField('second_oponent', touched, errors)}
                                help={!touched.second_oponent ? false : errors.second_oponent}
                            >
                                <Input
                                    id="second_oponent"
                                    className="make__input"
                                    onChange={handleChange}
                                    placeholder="Topic Theme"
                                    size="large"
                                    defaultValue={second_oponent}
                                    onBlur={handleBlur}
                                />
                                <span>Example Roman Empire</span>
                            </Form.Item>
                            <label className="make__topic-item-choose-wrapper" htmlFor="is_right_side">
                                <div onClick={() => setMyChoose(1)} className={classNames('make__topic-item-choose', {
                                    'active': myChoose === 1
                                })}>
                                    <div className="make__topic-item-choose-img">
                                        <img src={checkImg} alt="" />
                                    </div>
                                    <span>My VOTE</span>
                                </div>
                                <input onChange={handleChange} type="radio" name="is_right_side" value="1" id="is_right_side" />
                            </label>
                        </div>
                    </div>
                )
            }
            <div className="make__box make__headline">
                <div className="make__box-title">
                    <Form.Item
                        name="title"
                        className="make__topic-item-input"
                        validateStatus={validateField('title', touched, errors)}
                        help={!touched.title ? false : errors.title}
                    >
                        <TextArea id="title" defaultValue={title} onBlur={handleBlur} autoSize={{ minRows: 1, maxRows: 20 }} size="large" type="text" className="make__input" placeholder="Title" value={postTitle} onChange={handlePostTitleChange} />
                        <span>{postTitle.length}/100</span>
                    </Form.Item>
                </div>
            </div>
            <div className="make__box make__descr">
                <div className="make__box-title">
                    <Form.Item
                        name="descr"
                        className="make__topic-item-input"
                        validateStatus={validateField('descr', touched, errors)}
                        help={!touched.descr ? false : errors.descr}
                    >
                        <TextArea id="descr" defaultValue={descr} onBlur={handleBlur} autoSize={{ minRows: 1, maxRows: 20 }} size="large" type="text" className="make__input" placeholder="Description" value={postDescr} onChange={handlePostDescriptionChange} />
                        <span>{postDescr.length}/1000</span>
                    </Form.Item>
                </div>
            </div>
            <div className="make__box make__tags" id="moke__box">

                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Tags"
                    onChange={handleTagsChange}
                    getPopupContainer={() => document.getElementById('moke__box')}
                >
                    {
                        tags.map((tag) => {
                            return <Option className="make__tags-item" key={tag.text}>#{tag.text}</Option>
                        })
                    }
                </Select>
            </div>
            <button type="submit" onClick={handleSubmit} className="make__btn btn" >POst</button>
        </Form>
    );
}

export default Make;
