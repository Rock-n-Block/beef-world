import React from 'react';
import format from 'date-fns/format'

import './TopicStatistic.scss'

const index = ({ posts, placet, against, date }) => {

    const formatDate = (date) => {
        return format(new Date(date), 'd MMM Y')
    }

    return (

        <div className="t-statistic">
            <div className="t-statistic__item">
                <div className="t-statistic__item-content">{posts}</div>
                <div className="t-statistic__item-head">Posts</div>
            </div>
            <div className="t-statistic__item">
                <div className="t-statistic__item-content placet">{placet}</div>
                <div className="t-statistic__item-head">Placet!</div>
            </div>
            <div className="t-statistic__item">
                <div className="t-statistic__item-content against">{against}</div>
                <div className="t-statistic__item-head">Against</div>
            </div>
            <div className="t-statistic__item">
                <div className="t-statistic__item-content">{formatDate(date)}</div>
                <div className="t-statistic__item-head">Created</div>
            </div>
        </div>
    );
}

export default index;
