'use client';
import React, { useContext } from 'react'
import { Player} from 'video-react'
import "video-react/dist/video-react.css";
import { Connect } from '../Connect';


let Vid = ({ im, setim, className, val }) => {
    const { db, KeepQuiet } = useContext(Connect);
    try {
        KeepQuiet()
        if (val) {
            let mediaSessions = () => {
                try {
                    if ("mediaSession" in navigator) {
                        let mg = val.thumbnail ? Array.isArray(val.thumbnail) ? val.thumbnail[0] : val.thumbnail.picture : ``

                        navigator.mediaSession.metadata = new MediaMetadata({
                            title: val.hasOwnProperty('url') ? `Playing a video from comments.` : val.title,
                            artist: val.hasOwnProperty('url') ? `Video has no artist. (Anonymous)` : val.description.slice(0, 100),
                            album: `Playing on ToonJoy 😉`,
                            artwork: [
                                {
                                    src: mg,
                                    sizes: "96x96",
                                    type: "image/png",
                                },
                                {
                                    src: mg,
                                    sizes: "128x128",
                                    type: "image/png",
                                },
                                {
                                    src: mg,
                                    sizes: "192x192",
                                    type: "image/png",
                                },
                                {
                                    src: mg,
                                    sizes: "256x256",
                                    type: "image/png",
                                },
                                {
                                    src: mg,
                                    sizes: "384x384",
                                    type: "image/png",
                                },
                                {
                                    src: mg,
                                    sizes: "512x512",
                                    type: "image/png",
                                },
                            ],
                        });
                    }

                }
                catch { }
            }
            return (
                <>
                    {/* <div className={`playCtainer ${className}`}>
                <Player videoId={`videoid`} autoPlay playsInline src={im} className={`video ${className}`} />
                </div> */}
                    <video onTimeUpdate={async e => {
                        let v = document.querySelector(`.vid_${val.hasOwnProperty('id') ? val.id :val.time}`)
                        if (v) {
                            if (v.currentTime > 0) {

                                let go = {
                                    db: `play_cache`,
                                    name: `play`,
                                    id: `pl`,
                                };
                                let d = await db(go, true)
                                let gt = d ? d : [];
                                
                                let f = gt.find(v => v.id === val.hasOwnProperty('id') ? val.id :val.time)
                                if (f) {
                                    f.playState = v.currentTime
                                }
                                else {
                                    gt.push({
                                        id: val.hasOwnProperty('id') ? val.id :val.time,
                                        playState: v.currentTime
                                    })
                                }
                                
                                let postObj = {
                                    db: `play_cache`,
                                    name: `play`,
                                    id: `pl`,
                                    data: {
                                        id: `pl`, value: gt
                                    }
                                };
                                db(postObj, null, null, true);

                            }
                        }
                    }} onLoadedData={async e => {
                        let v = document.querySelector(`.vid_${val.hasOwnProperty('id') ? val.id :val.time}`)
                        if (v) {
                            let go = {
                                db: `play_cache`,
                                name: `play`,
                                id: `pl`,
                            };
                            // 
                            let d = await db(go, true)
                            let gt = d ? d : [];
                            // 
                            let f = gt.find(v => v.id === val.hasOwnProperty('id') ? val.id :val.time)
                            if (f) {
                                v.currentTime = f.playState
                            }
                        }
                    }}  loop poster={val.thumbnail ? Array.isArray(val.thumbnail) ? val.thumbnail[0] : val.thumbnail.picture : ``} onLoadedMetadata={mediaSessions} onPlay={mediaSessions} onPause={mediaSessions} controls onError={e => setim(null)} autoPlay playsInline src={im} className={`video vid_${val.hasOwnProperty('id') ? val.id :val.time} ${className} w-full h-full bg-black`} />
                </>
            )
        }
        else {
            return ''
        }
    }
    catch {
        return ''
    }
};

export default Vid
