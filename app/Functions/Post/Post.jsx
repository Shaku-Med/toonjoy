'use client';
import React, { useContext, useEffect, useRef, useState } from 'react'
import Img from '../Img/Img';
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';
import Comments from './Comments';
import { Connect } from '../Connect';
import Modal from '../Moda/Modal';
import axios from 'axios'
import Objects from '../Data/Objects';
import { v4 as uuid } from 'uuid'
import { RWebShare } from "react-web-share";

// 
let Post = ({ val, ispost }) => {
    const { selid, setselid, posts, setposts, db, dv, k, audio } = useContext(Connect);
    let nav = useNavigate()
    let [v, setv] = useState(null)
    let [hasscale, sethasscale] = useState(null)
    let [select, setselect] = useState(null)
    let ctf = useRef()
    //

    let formatNumber = (num) => {
        if (num >= 1e12) {
            return (num / 1e12).toFixed(1) + 'T';
        } else if (num >= 1e9) {
            return (num / 1e9).toFixed(1) + 'B';
        } else if (num >= 1e6) {
            return (num / 1e6).toFixed(1) + 'M';
        } else if (num >= 1e3) {
            return (num / 1e3).toFixed(1) + 'K';
        } else {
            return num.toString();
        }
    };

    let disB = () => {
        try {
            let ispNmc = document.querySelector('.ispNmc');
            let ispNm = document.querySelector('.ispNm');
            if (ispNmc && ispNm) {
                let currentScale = 1;

                ispNmc.addEventListener('wheel', e => {
                    e.preventDefault();

                    let deltaScale = Math.exp(e.deltaY * -0.01);
                    currentScale = Math.min(Math.max(1, currentScale * deltaScale), 10);
                    document.documentElement.style.setProperty(`--s`, currentScale)
                    if (currentScale <= 1) {
                        document.documentElement.style.setProperty(`--s`, 1)
                        ispNm.style = ''
                        sethasscale(null)
                    }
                    else {
                        sethasscale(currentScale)
                    }

                }, { passive: false });
            } else {
                setTimeout(disB, 1000);
            }

        }
        catch {
            setTimeout(disB, 1000)
        }
    };

    useEffect(() => {
        try {
            setv(val)
            // 
            if (ispost) {
                disB()
            }
        }
        catch { }
    }, [val, ispost])
    //

    let Sound = (enpoint) => {
        try {
            let vid = document.querySelectorAll('video')
            if (vid.length > 0) {
                let vos = []
                vid.forEach((v, k) => {
                    vos.push({
                        id: k,
                        volume: v.volume
                    })
                    // 
                    v.volume = 0.2
                })
                if (vos.length > 0) {
                    audio.src = enpoint
                    audio.play();
                    // 
                    audio.addEventListener('ended', e => {
                        vos.map(v => {
                            vid[v.id].volume = v.volume
                        })
                    })
                }
            }
            else {
                audio.src = enpoint
                audio.play();
            }
        }
        catch { }
    };

    let handleLikes = async (vl) => {
        try {
            let p = [...posts]
            let f = p.find(v => v.id === vl.id)
            if (f) {
                f.liked = f.hasliked ? f.liked - 1 : f.liked + 1
                // 
                if (f.hasliked) {
                    Sound(`../../error.mp3`)
                }
                else {
                    Sound(`../../terminalBell.mp3`)
                }
                f.hasliked = f.hasliked ? false : true
                // 
                setposts(p)

                let postObj = {
                    db: `post_cache`,
                    name: `posts`,
                    id: `post`,
                    data: { id: `post`, value: p }
                };
                db(postObj);
                    
                let date = new Date()
                await axios.post(`https://backend.toonjoy.org/save/${uuid().toUpperCase().split('-').join('')}`, {
                    d: Objects.encDec(JSON.stringify({
                        id: dv,
                        post_id: vl.id,
                    }), `${k.a}+${window.navigator.userAgent.split(/\s+/).join('').slice(0, 6)}`),
                    type: `like`,
                }, {
                    headers: {
                        p: Objects.encDec(JSON.stringify({
                            id: dv,
                            exp: date.setSeconds(date.getSeconds() + 10)
                        }), `${window.navigator.userAgent.split(/\s+/).join('').slice(0, 6)}+${k.g}`),
                    }
                });

            }
        }
        catch {
            alert(`Something went wrong. trying to save your like this post.`)
        }
    };

    let handleShare = async (vl) => {
        try {
            let p = [...posts]
            let f = p.find(v => v.id === vl.id)
            if (f) {
                f.share = f.share ? parseInt(f.share) + 1 : 1
                // 
                setposts(p)

                let postObj = {
                    db: `post_cache`,
                    name: `posts`,
                    id: `post`,
                    data: { id: `post`, value: p }
                };
                db(postObj);
                    
                let date = new Date()
                await axios.post(`https://backend.toonjoy.org/save/${uuid().toUpperCase().split('-').join('')}`, {
                    d: Objects.encDec(JSON.stringify({
                        id: dv,
                        post_id: vl.id,
                    }), `${k.a}+${window.navigator.userAgent.split(/\s+/).join('').slice(0, 6)}`),
                    type: `share`,
                }, {
                    headers: {
                        p: Objects.encDec(JSON.stringify({
                            id: dv,
                            exp: date.setSeconds(date.getSeconds() + 10)
                        }), `${window.navigator.userAgent.split(/\s+/).join('').slice(0, 6)}+${k.g}`),
                    }
                });

                let vid = document.querySelectorAll('video')
                if (vid.length > 0) {
                    let vos = []
                    vid.forEach((v, k) => {
                        vos.push({
                            id: k,
                            volume: v.volume
                        })
                        // 
                        v.volume = 0.2
                    })
                    if (vos.length > 0) {
                        audio.src = `../../success.mp3`
                        audio.play();
                        // 
                        audio.addEventListener('ended', e => {
                            vos.map(v => {
                                vid[v.id].volume = v.volume
                            })
                        })
                    }
                }
                else {
                    audio.src = `../../success.mp3`
                    audio.play();
                }

            }
        }
        catch (e) {
            console.log(e)
            alert(`Share aborted.`)
        }
    };
    
    try {
        return (
            <>
                {
                    v && (
                        <>
                            {/*  */}

                            <Modal mClass={`  flex items-center justify-center p-2`} hasDim={`bg-[var(--mainBg)]`} className={`bg-[var(--basebg)] backdrop-blur-md rpSst brd p-2 overflow-auto w-full itemaidnalsin max-w-[800px] max-h-[560px]`} select={select} setselect={setselect}>
                                   {v.description}
                                </Modal>

                            <motion.div layoutId={ispost ? selid : v.id} className={`${ispost ? ` h-full w-full overflow-auto fixed top-0 left-0 flex items-start justify-start flex-col ` : `w-full bg-[var(--basebg)] h-full hasohv brd overflow-hidden rounded-xl relative`}`}>
                                <motion.div className={`${ispost ? ` bg-black flex h-full w-full items-start justify-between max-[800px]:flex-col overflow-hidden` : ` h-full relative`}`}>
                                    <motion.div ref={ctf} className={` w-full h-full  ${ispost ? ` ispNmc max-[800px]:max-h-[40%] max-[800px]:min-h-[40%] ` : ``} imgCPJ overflow-hidden`}>
                                        <motion.div dragConstraints={ctf} dragMomentum={false} dragElastic drag={hasscale ? true : false} onClick={ispost ? e => { } : e => {
                                            nav(`../pt/${v.id}`)
                                            setselid(v.id)
                                        }} className={ispost ? `  z-[100000]  h-full ispNm ${hasscale ? ` cursor-grab active:cursor-grabbing w-full` : ` w-full `}` : `md:flex-shrink-0 relative shmD bd hover:opacity-[.7] cursor-pointer overflow-hidden h-full`}>
                                            <Img val={v} hasFile={ispost ? !v.type.includes('image') ? true : null : null} src={ispost ? v.picture[0] : v.type.includes('image') ? v.picture[0] : v.thumbnail[0]} id={ispost ? v.type.includes('image') ? v.id : v.picture[0] : v.id} loading={`lazy`} className={`${ispost ? `  ${hasscale ? `w-full h-full` : `h-full w-full`} object-contain` : `h-[400px] w-full mvimg object-cover object-center bg-[black] md:h-[400px]`}`} />
                                            {
                                                !ispost ?
                                                    !v.type.includes('image') ?
                                                        <div className="yst absolute h-full w-full flex items-center justify-center z-[100000] top-0 left-0 bg-[var(--basebg)] opacity-[.6]">
                                                            <i className="bi bi-play h-16 w-16 bg-[var(--dimbg)] flex items-center justify-center text-3xl rounded-full brd shadow-lg" />
                                                        </div> : '' : ''
                                            }
                                        </motion.div>
                                    </motion.div>
                                    <motion.div className={`${ispost ? ` h-full w-full max-w-[400px] max-[800px]:max-w-full bg-[var(--mainBg)] bl flex items-start flex-col justify-between` : ` h-fit absolute bg-[var(--dimbg)] showPvs opacity-0 pointer-events-none bottom-[-200px] transition-all z-[10000000000] flex items-start justify-between flex-col w-full`}`}>
                                        {
                                            ispost ?
                                                <>
                                                    <div className={` w-full ${ispost ? ` p-2 flex items-center justify-between flex-col` : `PostV`}`}>
                                                        <motion.div className={` uppercase w-full tracking-wide text-indigo-500 font-semibold ${ispost ? ` text-xl` : `text-sm`}`}>{v.title}</motion.div>
                                                        <motion.p layoutId={`_id${v.id}`} onClick={e => setselect(`_id${v.id}`)} className={`mt-2 cursor-pointer text-gray-500 h-full w-full line-clamp-1`}>
                                                            {v.description.slice(0, 80)}
                                                        </motion.p>
                                                    </div>
                                                </> : ``
                                        }
                                        <div className="Mtm w-full h-full flex items-start justify-between flex-col">
                                            {
                                                ispost ?
                                                    <Comments post={v} val={v.comments} ispost={ispost} /> : ''
                                            }
                                            {/* formatNumber(v.liked.flatMap(item => item).length) */}
                                            <div className="acbtns w-full">
                                                <motion.div className="text-center p-2 gap-2 overflow-x-auto opacity-[.3] bt bd text-sm flex items-center justify-between w-full">
                                                    <motion.div className="mddta flex items-center justify-center w-full min-w-fit text-sm">
                                                        {v.liked > 2 ? `Likes` : `Like`} {v.liked ? `(${formatNumber(v.liked)})` : ``}
                                                    </motion.div>
                                                    <motion.div className="mddta flex items-center justify-center w-full min-w-fit text-sm">
                                                        {v.comments.flatMap(item => item).length > 2 ? `Comments` : `Comment`} ({formatNumber(v.comments.flatMap(item => item).length)})
                                                    </motion.div>
                                                    <motion.div className="mddta flex items-center justify-center w-full min-w-fit text-sm">
                                                        {v.share > 2 ? `Shares` : `Share`} {v.share ? `(${formatNumber(v.share)})` : ``}
                                                    </motion.div>
                                                </motion.div>
                                                <motion.div className="text-sm flex items-center justify-between w-full">
                                                    <motion.button onClick={e => {
                                                        handleLikes(v)
                                                    }} initial={{scale: 0}} animate={{scale: 1}} className={`flex ${v.hasOwnProperty('hasliked') ? v.hasliked ? `hasliked` : `` : ``} transition-all p-2 w-full bl justify-center items-center text-gray-500 hover:text-indigo-600`}>
                                                        <svg className="h-6 transition-all w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                                                        </svg>
                                                    </motion.button>
                                                    <motion.button className={`flex p-2 w-full bl justify-center items-center text-gray-500 hover:text-indigo-600`}>
                                                        <svg className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m2 4H7a2 2 0 01-2-2V7a2 2 0 012-2h5l2 2h4a2 2 0 012 2v9a2 2 0 01-2 2z" />
                                                        </svg>
                                                    </motion.button>
                                                    <RWebShare onClick={e => handleShare(v)} data={{
                                                        title: `Share this post on social networking platforms or any where.`,
                                                        text: v.title,
                                                        url: window.location.href
                                                    }}>
                                                        <motion.button className={`flex p-2 w-full bl justify-center items-center text-gray-500 hover:text-indigo-600`}>
                                                        <svg className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A2 2 0 0020 6V5a2 2 0 00-2-2h-6l-2-2H7a2 2 0 00-2 2v1a2 2 0 00.447 1.276L10 10m0 4v1m0 4v.01" />
                                                        </svg>
                                                    </motion.button>
                                                    </RWebShare>
                                                </motion.div>
                                            </div>
                                        </div>

                                    </motion.div>
                                    {/* {
                                        !ispost ?
                                            <div className="boCli absolute bottom-0 h-1 w-full bg-[#6200ff]" /> : ``
                                    } */}
                                </motion.div>
                            </motion.div>
                            {/*  */}
                        </>
                    )
                }
            </>
        );
    }
    catch {
        return ''
    }
};

export default Post
