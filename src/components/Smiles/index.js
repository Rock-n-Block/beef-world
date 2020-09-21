import React from 'react';
import classNames from 'classnames';

import './Smiles.scss'

const Sliles = ({ values, choose }) => {
    const [activeSmile, setActiveSmile] = React.useState(choose || null)
    const [statistic, setStatistic] = React.useState(values)

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
        const newStatistic = statistic

        newStatistic[activeSmile] -= 1
        newStatistic[smile] += 1

        setActiveSmile(smile)
        setStatistic(newStatistic)
    }

    return (
        <div className="smiles">
            {
                smiles.map((item, index) => {
                    return (
                        <div key={index} onClick={() => handleSmileClick(item.img)} className={classNames('smiles__item', {
                            'active': item.img === activeSmile
                        })}>
                            <img src={require(`../../assets/img/smiles/${item.img}.svg`)} alt="" />
                            <div className="smiles__item-box">
                                <div className="smiles__item-count">{statistic[item.img]}</div>
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
