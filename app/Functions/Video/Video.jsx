'use client';
import React, { useRef, useState, useEffect } from 'react';

const Video = ({ im, setim, className }) => {
    const videoRef = useRef(null);
    const videoContainerRef = useRef(null);
    const timelineContainerRef = useRef(null);
    const previewImgRef = useRef(null);
    const thumbnailImgRef = useRef(null);
    const volumeSliderRef = useRef(null);
    const [isScrubbing, setIsScrubbing] = useState(false);
    // 
    const [wasPaused, setWasPaused] = useState(false);
    const [isplaying, setisplaying] = useState(false);
    // 
    const [playbackRate, setPlaybackRate] = useState(1);
    const [captionsMode, setCaptionsMode] = useState('hidden');
    const [volumeLevel, setVolumeLevel] = useState('high');
    const [currentTime, setCurrentTime] = useState('0:00');
    const [totalTime, setTotalTime] = useState('0:00');

    const togglePlay = () => {
        const video = videoRef.current;
        video.paused ? video.play() : video.pause();
        setisplaying(video.paused ? true : false)
    };

    const toggleMute = () => {
        const video = videoRef.current;
        video.muted = !video.muted;
    };

    const updateVolume = (e) => {
        const video = videoRef.current;
        video.volume = e.target.value;
        video.muted = e.target.value === 0;
    };

    const changePlaybackSpeed = () => {
        const video = videoRef.current;
        let newPlaybackRate = video.playbackRate + 0.25;
        if (newPlaybackRate > 2) newPlaybackRate = 0.25;
        video.playbackRate = newPlaybackRate;
        setPlaybackRate(newPlaybackRate);
    };

    const toggleMiniPlayerMode = () => {
        const videoContainer = videoContainerRef.current;
        const video = videoRef.current;
        if (videoContainer.classList.contains('mini-player')) {
            document.exitPictureInPicture();
        } else {
            video.requestPictureInPicture();
        }
    };

    const toggleTheaterMode = () => {
        const videoContainer = videoContainerRef.current;
        videoContainer.classList.toggle('theater');
    };

    const toggleFullScreenMode = () => {
        const videoContainer = videoContainerRef.current;
        if (document.fullscreenElement == null) {
            videoContainer.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    useEffect(() => {
        const video = videoRef.current;
        const captions = video.textTracks[0];

        const handleKeyDown = (e) => {
            const tagName = document.activeElement.tagName.toLowerCase();
            if (tagName === 'input') return;

            switch (e.key.toLowerCase()) {
                case ' ':
                    if (tagName === 'button') return;
                case 'k':
                    togglePlay();
                    break;
                case 'f':
                    toggleFullScreenMode();
                    break;
                case 't':
                    toggleTheaterMode();
                    break;
                case 'i':
                    toggleMiniPlayerMode();
                    break;
                case 'm':
                    toggleMute();
                    break;
                case 'arrowleft':
                case 'j':
                    skip(-5);
                    break;
                case 'arrowright':
                case 'l':
                    skip(5);
                    break;
                default:
                    break;
            }
        };

        const handleTimelineUpdate = (e) => {
            const rect = timelineContainerRef.current.getBoundingClientRect();
            const percent = Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width;
            // const previewImgNumber = Math.max(1, Math.floor((percent * video.duration) / 10));
            // const previewImgSrc = `assets/previewImgs/preview${previewImgNumber}.jpg`;
            // previewImgRef.current.src = previewImgSrc;
            timelineContainerRef.current.style.setProperty('--preview-position', percent);

            if (isScrubbing) {
                e.preventDefault();
                // thumbnailImgRef.current.src = previewImgSrc;
                // timelineContainerRef.current.style.setProperty('--progress-position', percent);
            }
        };

        const toggleScrubbing = (e) => {
            const rect = timelineContainerRef.current.getBoundingClientRect();
            const percent = Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width;
            const newScrubbing = (e.buttons & 1) === 1;
            setIsScrubbing(newScrubbing);

            if (newScrubbing) {
                setWasPaused(video.paused);
                video.pause();
            } else {
                video.currentTime = percent * video.duration;
                if (!wasPaused) video.play();
            }

            handleTimelineUpdate(e);
        };

        const formatDuration = (time) => {
            const seconds = Math.floor(time % 60);
            const minutes = Math.floor(time / 60) % 60;
            const hours = Math.floor(time / 3600);
            const leadingZeroFormatter = new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 });

            if (hours === 0) {
                return `${minutes}:${leadingZeroFormatter.format(seconds)}`;
            } else {
                return `${hours}:${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(seconds)}`;
            }
        };

        const updateCurrentTime = () => {
            setCurrentTime(formatDuration(video.currentTime));
            const percent = video.currentTime / video.duration;
            timelineContainerRef.current.style.setProperty('--progress-position', percent);
        };

        const updateTotalTime = () => {
            setTotalTime(formatDuration(video.duration));
        };

        const skip = (duration) => {
            video.currentTime += duration;
        };

        const handleVolumeChange = () => {
            volumeSliderRef.current.value = video.volume;
            let newVolumeLevel;
            if (video.muted || video.volume === 0) {
                volumeSliderRef.current.value = 0;
                newVolumeLevel = 'muted';
            } else if (video.volume >= 0.5) {
                newVolumeLevel = 'high';
            } else {
                newVolumeLevel = 'low';
            }
            setVolumeLevel(newVolumeLevel);
        };

        const handleFullscreenChange = () => {
            videoContainerRef.current.classList.toggle('full-screen', document.fullscreenElement);
        };

        const handleEnterPictureInPicture = () => {
            videoContainerRef.current.classList.add('mini-player');
        };

        const handleLeavePictureInPicture = () => {
            videoContainerRef.current.classList.remove('mini-player');
        };

        let plays = () => {
            videoContainerRef.current.classList.remove("paused")
        }
        let pause = () => {
            videoContainerRef.current.classList.add("paused")
        }

        document.addEventListener('keydown', handleKeyDown);
        timelineContainerRef.current.addEventListener('pointermove', handleTimelineUpdate);
        // timelineContainerRef.current.addEventListener('pointerdown', toggleScrubbing);
        document.addEventListener('pointerup', (e) => {
            if (isScrubbing) {
                toggleScrubbing(e)
                runCClear()
            };
        });
        document.addEventListener('pointermove', (e) => {
            if (isScrubbing) handleTimelineUpdate(e);
        });

        video.addEventListener('loadeddata', updateTotalTime);
        video.addEventListener('timeupdate', updateCurrentTime);
        // 
        video.addEventListener('play', plays);
        video.addEventListener('pause', pause);
        // 
        video.addEventListener('volumechange', handleVolumeChange);
        video.addEventListener('enterpictureinpicture', handleEnterPictureInPicture);
        video.addEventListener('leavepictureinpicture', handleLeavePictureInPicture);
        document.addEventListener('fullscreenchange', handleFullscreenChange);

        let runCClear = () => { 
            document.removeEventListener('keydown', handleKeyDown);
            timelineContainerRef.current.removeEventListener('pointermove', handleTimelineUpdate);
            timelineContainerRef.current.removeEventListener('pointerdown', toggleScrubbing);
            // document.removeEventListener('pointerup', toggleScrubbing);
            document.removeEventListener('pointermove', handleTimelineUpdate);
            video.removeEventListener('loadeddata', updateTotalTime);
            // 
            video.removeEventListener('play', plays);
            video.removeEventListener('pause', pause);
            // 
            video.removeEventListener('timeupdate', updateCurrentTime);
            video.removeEventListener('volumechange', handleVolumeChange);
            video.removeEventListener('enterpictureinpicture', handleEnterPictureInPicture);
            video.removeEventListener('leavepictureinpicture', handleLeavePictureInPicture);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        }

        return () => {
            runCClear()
        };
    }, [isScrubbing, wasPaused]);

    return (
        <div ref={videoContainerRef} className={`video-container ${className} paused`} data-volume-level={volumeLevel}>
            <div className="video-controls-container">
                <div ref={timelineContainerRef} className="timeline-container">
                    <div className="timeline">
                        <img ref={previewImgRef} className="preview-img" />
                        <div className="thumb-indicator"></div>
                    </div>
                </div>
                <div className="controls">
                    <button className="play-pause-btn" onClick={togglePlay}>
                        <svg class="play-icon" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                        </svg>
                        <svg class="pause-icon" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
                        </svg>
                    </button>
                    <div className="volume-container">
                        <button className="volume-btn" onClick={toggleMute}>
                            <svg class="volume-high-icon" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
                            </svg>
                            <svg class="volume-low-icon" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z" />
                            </svg>
                            <svg class="volume-muted-icon" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" />
                            </svg>
                        </button>
                        <input
                            ref={volumeSliderRef}
                            className="volume-slider"
                            type="range"
                            min="0"
                            max="1"
                            step="any"
                            defaultValue="1"
                            onInput={(e) => updateVolume(e)}
                        />
                    </div>
                    <div className="duration-container">
                        <div className="current-time">{currentTime}</div> / <div className="total-time">{totalTime}</div>
                    </div>
                    <button className="speed-btn" onClick={changePlaybackSpeed}>
                        {playbackRate}x
                    </button>
                    <button className="mini-player-btn" onClick={toggleMiniPlayerMode}>
                        <svg viewBox="0 0 24 24">
                            <path fill="currentColor" d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z" />
                        </svg>
                    </button>
                    <button className="theater-btn" onClick={toggleTheaterMode}>
                        <svg class="tall" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z" />
                        </svg>
                        <svg class="wide" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z" />
                        </svg>
                    </button>
                    <button className="full-screen-btn" onClick={toggleFullScreenMode}>
                        <svg class="open" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                        </svg>
                        <svg class="close" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                        </svg>
                    </button>
                </div>
            </div>
            <video autoPlay playsInline ref={videoRef} src={im} className="video" onClick={togglePlay} />
        </div>
    );
};

export default Video;
