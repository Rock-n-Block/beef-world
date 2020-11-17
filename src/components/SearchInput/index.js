import React from 'react';
import { Select } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import classNames from 'classnames';

import { topicApi } from '../../utils/api';

import searchImg from '../../assets/img/search.svg';
import searchRedImg from '../../assets/img/search-red.svg';
import closeImg from '../../assets/img/search-clean.svg';

import './SearchInput.scss'

const { Option } = Select;

const SearchInput = ({ handleOpenSearchInput }) => {

    const history = useHistory();
    const inputRef = React.useRef()

    const [searchText, setSearchText] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)
    const [searchData, setSearchData] = React.useState([])

    const [isOpen, setIsOpen] = React.useState(false)

    const [options, setOptions] = React.useState([])

    const onSearch = (value) => {
        setIsLoading(true)

        if (value) {

            topicApi.search(value)
                .then(({ data }) => {
                    setSearchData(data)


                    const topics = data.topics.length ? data.topics.map(item => <Option key={`${item.left_theme} vs ${item.right_theme}`}>
                        <Link className="s-input__link" to={`/topic/${item.id}`}>
                            <img src={searchRedImg} alt="" />
                            <span>{`${item.left_theme} vs ${item.right_theme}`}</span>
                        </Link>
                    </Option>) : [];

                    const posts = data.posts.length ? data.posts.map(item => <Option key={item.id + item.title}>
                        <Link className="s-input__link" to={`/topic/${item.id}/post/${item.id}`}>
                            <img src={searchRedImg} alt="" />
                            <span>{item.title}</span>
                        </Link>
                    </Option>) : [];
                    setOptions([...topics, ...posts])
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const onChangeSearch = (value) => {
        setSearchText(value)

    }

    const onSelectOption = (value) => {
        console.log(value)
        setSearchText('')
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchPage(e)
        }
    }

    const handleSearchPage = (e) => {
        if ((searchData.topics && searchData.topics.length) || (searchData.posts && searchData.posts.length)) {
            history.push(`/search/?to_search=${e.target.value}`)
        } else {
            inputRef.current.focus()
        }
    }

    const handleOpen = () => {
        if (!isOpen && window.innerWidth < 991) {

            setIsOpen(true)
            handleOpenSearchInput(true)
        }
    }

    const handleClose = () => {
        setIsOpen(false)
        handleOpenSearchInput(false)
    }

    return (
        <div className={classNames('s-input', {
            'active': isOpen
        })} id="s-input" onClick={handleOpen}>
            <div className="s-input__img" onClick={handleSearchPage}>
                <img src={searchImg} alt="" />
            </div>
            <div className="s-input__close" onClick={handleClose}>
                <img src={closeImg} alt="" />
            </div>
            <Select
                ref={inputRef}
                placeholder='Search'
                onSearch={onSearch}
                onChange={onChangeSearch}
                value={searchText}
                notFoundContent={null}
                className="s-input__input"
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                showSearch
                onBlur={() => setOptions([])}
                onSelect={onSelectOption}
                onKeyDown={handleKeyDown}
                loading={isLoading}
                getPopupContainer={() => document.getElementById('s-input')}
            >
                {options}
            </Select>
        </div>
    );
}

export default SearchInput;
