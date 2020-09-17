import React from 'react';

import searchImg from '../../assets/img/search.svg';
import searchClearImg from '../../assets/img/search-clean.svg';

import './SearchInput.scss'

const SearchInput = () => {

    const [searchText, setSearchText] = React.useState('')

    return (
        <div className="s-input">
            <div className="s-input__img">
                <img src={searchImg} alt="" />
            </div>
            <input type="text" className="s-input__input" placeholder="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            {searchText && <img src={searchClearImg} alt="" className="s-input__img-clear" onClick={() => setSearchText('')} />}
        </div>
    );
}

export default SearchInput;
