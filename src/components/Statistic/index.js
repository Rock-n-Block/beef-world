import React from 'react';
import classNames from 'classnames';

import './Statistic.scss'

const Statistic = ({ count, like, handleLike, isAuth }) => {

    const [totalCount, setTotalCount] = React.useState(count)
    // const [isLiked, setIsLiked] = React.useState(isAuth ? like : null)

    // React.useEffect(() => {
    //     setIsLiked(isAuth ? like : null)
    // }, [isAuth])

    const onLike = () => {
        // if (like || !isAuth) return
        // let newCount
        // if (!isLiked && (isLiked === null || isLiked === '')) {
        //     newCount = totalCount + 1
        // } else {
        //     newCount = totalCount + 2
        // }
        // setIsLiked(true)
        // setTotalCount(newCount)
        handleLike({
            value: true
        })
    }
    const onDislike = () => {
        // if (like === false || !isAuth) return
        // let newCount
        // if (isLiked && (isLiked === null || isLiked === '')) {
        //     newCount = totalCount - 1
        // } else if (like !== false) {
        //     newCount = totalCount - 2
        // }
        // setIsLiked(false)
        // setTotalCount(newCount)
        handleLike({
            value: false
        })
    }
    return (
        <div className="stat">
            <div className="stat__controller" onClick={onLike}>

                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.22229 0.962171C4.62253 0.466996 5.37747 0.466996 5.77771 0.962171L9.74578 5.87138C10.2744 6.52532 9.80892 7.5 8.96807 7.5H1.03193C0.191082 7.5 -0.274355 6.52532 0.254219 5.87138L4.22229 0.962171Z" fill={like ? '#37E1C3' : 'white'} />
                </svg>
            </div>
            <div className={classNames('stat__count', {
                'isliked': like,
                'isdisliked': like === false,
            })}>{count}</div>
            <div className="stat__controller" onClick={onDislike}>
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.77771 7.03783C5.37747 7.533 4.62253 7.533 4.22229 7.03783L0.254219 2.12862C-0.274356 1.47468 0.191082 0.500001 1.03193 0.500001L8.96807 0.5C9.80892 0.5 10.2744 1.47468 9.74578 2.12862L5.77771 7.03783Z" fill={like === false ? '#D0A023' : 'white'} />
                </svg>
            </div>

        </div>
    );
}

export default Statistic;
