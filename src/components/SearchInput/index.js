import React from 'react';
import { Select } from 'antd';
import { Link, useHistory } from 'react-router-dom';

import searchImg from '../../assets/img/search.svg';
import searchRedImg from '../../assets/img/search-red.svg';

import './SearchInput.scss'

const { Option } = Select;

const SearchInput = () => {

    const history = useHistory();
    const inputRef = React.useRef()

    const data = {
        topics: [
            {
                leftTheme: 'Roman Empire',
                rightTheme: 'Carthage',
                date: 'Fri Sep 18 2020 13:43:15 GMT+0300 (Москва, стандартное время)',
                subscribe: false,
                placet: '33.3k',
                against: '24k',
                id: '1'
            },
            {
                leftTheme: 'Roman Empire',
                rightTheme: 'Carthage',
                date: 'Fri Sep 18 2020 13:43:15 GMT+0300 (Москва, стандартное время)',
                subscribe: false,
                placet: '33.3k',
                against: '24k',
                id: '2'
            }
        ],
        posts: [
            {
                "avatar": "https://sun9-26.userapi.com/impf/RI0zS2_e7QuwGaNG2ji5sqYSgKNe950uz9a5fA/MJyaN_JHbvU.jpg?size=50x0&quality=88&crop=268,0,1535,1535&sign=025ed0b2dd6137a7d9b22daeacbeb330&ava=1",
                "name": "Profile name",
                "topicTitle": "Roman Empire vs Carthage",
                "postTitle": "Please do not RT this video",
                "date": "Thu Sep 17 2019 14:47:08",
                "img": "https://sun9-60.userapi.com/YrDO9d497x3HGKgbxMdLApdCk2LhEMiTG5_wTw/pGg1uxrvfg8.jpg",
                "text": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum consequuntur veritatis dicta eligendi, quibusdam exercitationem molestias asperiores numquam quisquam sapiente ipsa iste perferendis, sint nihil praesentium, maiores expedita molestiae unde!",
                "tags": [
                    "History",
                    "Romanempire",
                    "Carthage",
                    "Romanempire",
                    "Carthage",
                    "Romanempire",
                    "Carthage"
                ],
                "statistic": {
                    "count": 391,
                    "like": ""
                },
                "comments": 24,
                "topicname": "politics",
                id: '345'
            },
            {
                "avatar": "https://sun9-26.userapi.com/impf/RI0zS2_e7QuwGaNG2ji5sqYSgKNe950uz9a5fA/MJyaN_JHbvU.jpg?size=50x0&quality=88&crop=268,0,1535,1535&sign=025ed0b2dd6137a7d9b22daeacbeb330&ava=1",
                "postTitle": "Please do not RT this video",
                "name": "Profile name",
                "date": "Thu Sep 17 2020 14:47:01",
                "img": "https://sun9-12.userapi.com/9uHycz_uOrXv4-mlGdS_6ASC3C31Fvgsbh3xSg/VUa1Deizs8g.jpg",
                "tags": ["History", "Romanempire", "Carthage"],
                "statistic": {
                    "count": 391,
                    "like": ""
                },
                "comments": 24,
                "topicname": "politics",
                id: '45677'
            },
        ]
    }

    const [searchText, setSearchText] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)
    const [searchData, setSearchData] = React.useState([])

    const onSearch = (value) => {
        setIsLoading(true)
        setSearchData([...data.topics, ...data.posts])
    }

    const onChangeSearch = (value) => setSearchText(value)

    const onSelectOption = (value) => {
        console.log(value)
        setSearchText('')
    }

    const handleSearchPage = () => {
        if (searchData.length) {
            history.push({
                pathname: '/search',
                state: {
                    data: data
                }
            })
        } else {
            inputRef.current.focus()
        }
    }

    const options = searchData.map(item => <Option key={item.id}>
        <Link className="s-input__link" to="/">
            <img src={searchRedImg} alt="" />
            <span>{item.leftTheme ? `${item.leftTheme} vs ${item.rightTheme}` : item.postTitle}</span>
        </Link>
    </Option>);

    return (
        <div className="s-input" id="s-input">
            <div className="s-input__img" onClick={handleSearchPage}>
                <img src={searchImg} alt="" />
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
                onSelect={onSelectOption}
                loading={isLoading}
                getPopupContainer={() => document.getElementById('s-input')}
            >
                {options}
            </Select>
        </div>
    );
}

export default SearchInput;
