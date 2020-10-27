import React from 'react';
import ReactPlayer from 'react-player'
import { Slider } from 'antd';
import { findDOMNode } from 'react-dom'
import screenfull from 'screenfull'
import classNames from 'classnames';

import './VideoPlayer.scss'

import playImg from '../../assets/img/play.svg';
import pauseImg from '../../assets/img/pause.svg';
import volumeImg from '../../assets/img/volume.svg';
import novolumeImg from '../../assets/img/no-volume.svg';
import fullscreenImg from '../../assets/img/fullscreen.svg';

const VideoPlayer = ({ video, type, errFnc }) => {

    const [isFullScreen, setIsFullScreen] = React.useState(false)

    const [isSeeking, setIsSeeking] = React.useState(false)
    const [played, setPlayed] = React.useState(0)
    const [volume, setVolume] = React.useState(0.5)
    const [playing, setPlaying] = React.useState(false)
    const [muted, setMuted] = React.useState(false)
    const [duration, setDuration] = React.useState('00:00')

    const playerBox = React.useRef()
    const player = React.useRef()


    const handleSeekMouseDown = e => {
        setIsSeeking(true)
    }

    const handleSeekChange = value => {
        player.current.seekTo(parseFloat(value))
        setPlayed(value)
    }

    const handleSeekMouseUp = e => {
        setIsSeeking(false)
        setPlaying(true)
    }

    const handleProgress = value => {
        setPlayed(value.played)
    }

    const handlePause = () => {
        setPlaying(false)
    }

    const handlePlay = () => {
        setPlaying(true)
    }

    const handleToggleMuted = () => {
        setMuted(!muted)
    }


    const handleDuration = (duration) => {
        setDuration(duration)
    }


    const handleClickFullscreen = () => {
        screenfull.toggle(findDOMNode(playerBox.current));
    }

    const handleVolumeChange = value => {
        setVolume(parseFloat(value))
    }


    const pad = (string) => {
        return ('0' + string).slice(-2)
    }

    const format = (seconds) => {
        const date = new Date(seconds * 1000)
        const hh = date.getUTCHours()
        const mm = date.getUTCMinutes()
        const ss = pad(date.getUTCSeconds())
        if (hh) {
            return `${hh}:${pad(mm)}:${ss}`
        }
        return `${mm < 10 ? '0' + mm : mm}:${ss}`
    }

    React.useEffect(() => {
        screenfull.on('change', () => {
            if (screenfull.isFullscreen) {
                setIsFullScreen(true)
            } else {
                setIsFullScreen(false)
            }
        });
    })


    return (
        <div className={classNames('v-player', {
            'fullscreen': isFullScreen,
            'makepost': type === 'makepost'
        })} ref={playerBox} >
            <ReactPlayer
                ref={player}
                style={{
                    width: '100%'
                }}
                controls={false}
                url={video}
                playing={playing}
                onProgress={handleProgress}
                onPause={handlePause}
                onPlay={handlePlay}
                onDuration={handleDuration}
                onError={errFnc || ((err) => console.log(err))}
                pip={false}
                volume={volume}
                muted={muted}
            />
            <div className={classNames('v-player__controls', {
                'hidden': (!playing && playing === 0)
            })}>
                <div className="v-player__controls-box">
                    <div className="v-player__controls-box-left">
                        <div className="v-player__controls-toggle">
                            {
                                playing ? <img className="v-player__controls-pause" onClick={handlePause} src={pauseImg} alt="" /> : <img className="v-player__controls-play" onClick={handlePlay} src={playImg} alt="" />
                            }
                        </div>
                        <div className={classNames('v-player__controls-volume', {
                            'active': !muted
                        })}>
                            <div className="v-player__controls-volume-img" onClick={handleToggleMuted}>
                                {
                                    muted ? <img src={novolumeImg} alt="" /> : <img src={volumeImg} alt="" />
                                }
                            </div>
                            {!muted && <Slider
                                className="v-player__controls-volume-bar"
                                tipFormatter={null}
                                onChange={handleVolumeChange}
                                value={volume}
                                max={1}
                                step="0.0001"
                            />}
                        </div>
                        <div className="v-player__controls-time">
                            {format(duration * played)} /   {format(duration)}
                        </div>
                    </div>
                    <div className="v-player__controls-box-right">
                        <img onClick={handleClickFullscreen} src={fullscreenImg} alt="" />
                    </div>
                </div>
                <Slider
                    className="v-player__progress"
                    onChange={handleSeekChange}
                    value={played}
                    tipFormatter={null}
                    max={1}
                    step="0.00001"
                    onMouseDown={handleSeekMouseDown}
                    onAfterChange={handleSeekMouseUp}
                />
            </div>
        </div>
    );
}

export default VideoPlayer;
