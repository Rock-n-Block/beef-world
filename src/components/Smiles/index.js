import React from 'react';
import classNames from 'classnames';

import './Smiles.scss'

const Sliles = ({ values, choose, handleChooseReaction }) => {

    const smiles = [
        {
            text: 'Hate',
            img: 'hate'
        },
        {
            text: 'Confused',
            img: 'confused'
        },
        {
            text: 'Fail',
            img: 'fail'
        },
        {
            text: 'Fun',
            img: 'fun'
        },
        {
            text: 'GEEKY',
            img: 'geeky'
        },
        {
            text: 'Love',
            img: 'love'
        },
        {
            text: 'LOL',
            img: 'lol'
        },
        {
            text: 'OMG',
            img: 'omg'
        },
        {
            text: 'WIN',
            img: 'win'
        }
    ]

    const handleSmileClick = (smile) => {
        handleChooseReaction(smile)
    }

    return (
        <div className="smiles">
            {
                smiles.map((item, index) => {
                    return (
                        <div key={index} onClick={() => handleSmileClick(item.text)} className={classNames('smiles__item', {
                            'active': item.text === choose
                        })}>
                            <img src={require(`../../assets/img/smiles/${item.img}.svg`)} alt="" />
                            <div className="smiles__item-box">
                                <div className="smiles__item-count">{values[item.text]}</div>
                                <div className="smiles__item-text">{item.text}</div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Sliles;
