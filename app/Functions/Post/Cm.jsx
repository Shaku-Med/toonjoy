'use client';
import Img from "../Img/Img";
import { motion } from 'framer-motion'
import { useContext, useState } from "react";
import Preview from "./Preview";
import Modal from "../Moda/Modal";
import { Connect } from "../Connect";
import axios from 'axios'
import {v4 as uuid} from 'uuid'
import Objects from "../Data/Objects";

let Cm = ({ val, reply, setreply, post }) => {
    const { selid, setselid, vl, setvl, posts, setposts, dv, k, db } = useContext(Connect);
    const [edit, setedit] = useState(null)
    const [sub, setsub] = useState(null)

    let handleEdit = async () => {
        try {
            let px = [...posts]
            let f = px.find((e) => e.id === post.id)
            if (f) {
                let c = f.comments.find((e) => e.id === val.id && e.ownerid.id === dv)
                if (c) {

                    // 
                    c.edit_history = c.edit_history ? c.edit_history : []
                    c.edit_history.push({
                        text: c.text,
                        date: new Date().getTime()
                    })
                    //

                    c.text = edit.split('\n')
                    c.edited = true
                    setposts(px)
                    setedit(null)

                    let postObj = {
                        db: `post_cache`,
                        name: `posts`,
                        id: `post`,
                        data: { id: `post`, value: px }
                    };
                    db(postObj);

                    let date = new Date()
                    await axios.post(`http://192.168.1.231:3001/save/${uuid().toUpperCase().split('-').join('')}`, {
                        d: Objects.encDec(JSON.stringify({
                            id: dv,
                            comment: val.id,
                            text: edit.split('\n')
                        }), `${k.a}+${window.navigator.userAgent.split(/\s+/).join('').slice(0, 6)}`),
                        type: `comment`,
                        action: `edit`,
                        text: Objects.encDec(JSON.stringify(edit.trim().length > 0 ? edit.split('\n') : []), `${k.s}+${dv}`, null, true),
                    }, {
                        headers: {
                            p: Objects.encDec(JSON.stringify({
                                id: dv,
                                exp: date.setSeconds(date.getSeconds() + 5)
                            }), `${window.navigator.userAgent.split(/\s+/).join('').slice(0, 6)}+${k.g}`),
                        }
                    });

                }
            }
        }
        catch {
            alert(`Edit Failed.`)
        }
    };


    let handleDelete = async (l) => {
        try {
            let px = [...posts]
            let f = px.find((e) => e.id === post.id)
            if (f) {
                let c = f.comments.findIndex((e) => e.id === l.id && e.ownerid.id === dv)
                if (c !== -1) {
                    f.comments.splice(c, 1)
                    setposts(px)

                    let postObj = {
                        db: `post_cache`,
                        name: `posts`,
                        id: `post`,
                        data: { id: `post`, value: px }
                    };
                    db(postObj);
                    
                    let date = new Date()
                    await axios.post(`http://192.168.1.231:3001/save/${uuid().toUpperCase().split('-').join('')}`, {
                        d: Objects.encDec(JSON.stringify({
                            id: dv,
                            comment: l.id,
                        }), `${k.a}+${window.navigator.userAgent.split(/\s+/).join('').slice(0, 6)}`),
                        type: `comment`,
                        action: `delete`,
                    }, {
                        headers: {
                            p: Objects.encDec(JSON.stringify({
                                id: dv,
                                exp: date.setSeconds(date.getSeconds() + 5)
                            }), `${window.navigator.userAgent.split(/\s+/).join('').slice(0, 6)}+${k.g}`),
                        }
                    });
                }
            }
        }
        catch {
            alert(`Unable to delete`)
        }
    };


    try {
        if (val) {
            return (
                <>

                    <div className={`messageOne w-full p-2 flex items-center ${!val.hasOwnProperty('ownerid') ? ` justify-start` : ` justify-end`} msg_${val.id}`}>
                        <div className="messageItslef w-fit max-w-[90%] flex gap-2 items-center justify-start">
                            {
                                !reply && (
                                    <div className="dropD dropdown z-[10000000000]">
                                        <i id={`id_${val.id}`} data-bs-toggle="dropdown" aria-expanded="false" className={`bi cursor-pointer bi-three-dots-vertical h-7 w-7 brd min-w-7 flex items-center justify-center rounded-full`}></i>
                                                        
                                        <ul className="dropdown-menu brd">
                                            <div className={`dropdown-item text-sm flex items-center justify-start gap-2 cursor-pointer`}>
                                                <i className="bi bi-copy" />
                                                <span className=" pointer-events-none">Copy</span>
                                            </div>
                                            <div onClick={e => {
                                                setreply(val)
                                                let rp = document.querySelector('textarea')
                                                if (rp) {
                                                    rp.focus()
                                                }
                                            }} className={`dropdown-item text-sm flex items-center justify-start gap-2 cursor-pointer`}>
                                                <i className="bi bi-reply" />
                                                <span className=" pointer-events-none">Reply</span>
                                            </div>
                                            {
                                                val.hasOwnProperty('ownerid') ?
                                                    <div onClick={e => {
                                                        if (val.text.length > 0) {
                                                            setedit(val.text.join('\n'))
                                                        }
                                                    }} className={`dropdown-item text-sm flex items-center justify-start gap-2 cursor-pointer`}>
                                                        <i className="bi bi-pencil" />
                                                        <span className=" pointer-events-none">Edit</span>
                                                    </div> : ``
                                            }
                                            {/* <div className={`dropdown-item dangerText text-sm flex items-center justify-start gap-2 cursor-pointer`}>
                                                <i className="bi bi-exclamation-circle" />
                                                <span className=" pointer-events-none">report</span>
                                            </div> */}
                                            {
                                                val.hasOwnProperty('ownerid') ?
                                                    <div onClick={e => {
                                                        if (window.confirm(`Warning! ⚠️ You're about to parmanently delete your comments, Are you sure you want to proceed? (OK) to proceed and (CANCEL) to ignore.`)) {
                                                            handleDelete(val)
                                                        }
                                                    }} className={`dropdown-item dangerText text-sm flex items-center justify-start gap-2 cursor-pointer`}>
                                                        <i className="bi bi-trash" />
                                                        <span className=" pointer-events-none">Delete</span>
                                                    </div> : ``
                                            }
                                        </ul>
                                    </div>
                                )
                            }
                            <div className={`mxmtn relative flex flex-col justify-end ${val.hasOwnProperty('ownerid') ? `items-end` : ` items-start`}`}>
                                {
                                    val.reply.trim().length > 0 ?
                                        <>
                                            {
                                                post.comments.find(v => v.id === val.reply) && (
                                                    <>
                                                        
                                                        {
                                                            [post.comments.find(v => v.id === val.reply)].map((v, k) => {
                                                                return (
                                                                    <div key={k} onClick={e => {
                                                                        let sh = document.querySelector(`.msg_${v.id}`)
                                                                        if (sh) {
                                                                            sh.scrollIntoView({ behavior: 'smooth' })
                                                                            sh.classList.add('viewmsg')
                                                                            // 
                                                                            setTimeout(() => {
                                                                                sh.classList.remove('viewmsg')
                                                                            }, 2000)
                                                                        }
                                                                    }} className="postMsgs backdrop-blur-md bg-[#aa2a2a] text-white relative text-sm mb-1 cursor-pointer hover:scale-[1.1] transition-all brd rounded-full line-clamp-1 w-fit p-1">
                                                                        <span>{v.text.length > 0 ? v.text : 'Replied to a file only'}</span>
                                                                    </div>
                                                                );
                                                            })
                                                        }
                                                        <div className="lineS w-1 h-3 rounded-full opacity-[.5] bg-[#0084ff] top-5 right-0"></div>
                                                    </>
                                                )
                                            }
                                        </> : ''
                                }
                                {
                                    val.text.length > 0 && (
                                        <div onContextMenu={e => {
                                            e.preventDefault()
                                            // 
                                            let f = document.querySelector(`#id_${val.id}`)
                                            if (f) {
                                                f.click()
                                            }
                                        }} className={`messItself ${!val.hasOwnProperty('ownerid') ? ` bg-[var(--d)] rounded-tl-2xl rounded-br-2xl rounded-tr-2xl rounded-bl-md ` : `bg-[#0084ff] rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl rounded-br-md `} w-fit brd text-xs p-2 shadow-md`}>
                                            <div className="tms opacity-[.8]">
                                                {
                                                    edit ?
                                                        <textarea onChange={e => setedit(e.target.value)} autoFocus value={edit} className={`tarea`} /> :
                                                        <>
                                                            {
                                                                (!reply ? val.text : val.text.slice(0, 1) || []).map((v, k) => {
                                                                    return (
                                                                        <div key={k} className={`mdms ${reply ? ' line-clamp-1' : ''}`}>
                                                                            <span>{v}</span> <br />
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </>
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    val.file.length > 0 && (
                                        <>
                                            <div onContextMenu={e => {
                                                e.preventDefault()
                                                // 
                                                let f = document.querySelector(`#id_${val.id}`)
                                                if (f) {
                                                    f.click()
                                                }
                                            }} className="messItself w-fit mt-1">
                                                {
                                                    (val.file || []).map((v, k) => {
                                                        return (
                                                            <motion.div layoutId={!reply ? `comment_${v.time}` : `_reply_state`} onClick={e => {
                                                                setselid(!reply ? `comment_${v.time}` : `_reply_state`)
                                                                setvl(v)
                                                            }} key={k} className={`mdms cursor-pointer active:scale-[1.1] hover:scale-[.98] transition-all fileM w-fit brd h-fit ${!reply ? `max-w-[200px] overflow-hidden max-h-[200px] min-w-[200px] min-h-[200px]` : ` max-w-[50px] min-h-[50px] min-w-[50px]`} ${val.text.length > 0 ? ` ${val.hasOwnProperty('ownerid') ? ` rounded-tl-3xl rounded-bl-3xl rounded-tr-md rounded-br-3xl` : ` rounded-tr-3xl rounded-bl-3xl rounded-tl-md rounded-br-3xl`} ` : val.hasOwnProperty('ownerid') ? ` rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl rounded-br-md` : `rounded-tl-3xl rounded-br-3xl rounded-tr-3xl rounded-bl-md`} flex items-center justify-center relative`}>
                                                                <Img val={v} src={v.type.includes('image') ? v.url : v.thumbnail ? v.thumbnail.picture : ''} id={v.type.includes('image') ? `${v.time}` : v.thumbnail ? `${v.thumbnail.time}` : ''} loading={`lazy`} className={`h-full w-full absolute top-0 left-0 mvimg object-cover object-center bg-[black]`} />
                                                                {
                                                                    v.type.includes('video') && (
                                                                        <motion.div className="playBtn absolute z-[10000] top-0 left-0 w-full h-full flex items-center justify-center text-3xl bg-[var(--basebg)]">
                                                                            <i className="bi bi-play h-10 w-10 bg-[var(--basebg)] flex items-center justify-center rounded-full brd align-middle" />
                                                                        </motion.div>
                                                                    )
                                                                }
                                                            </motion.div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </>
                                    )
                                }
                                {
                                    !reply && (
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className={`smLts flex items-center ${val.hasOwnProperty('ownerid') ? ` justify-end` : ` justify-start w-full`}`}>
                                            <div title={new Date(val.time).toDateString()} className={`mTmn text-[10px] text-right dark:opacity-[.5] pr-1`}>{new Date(parseInt(val.time)).toLocaleTimeString().replace(/:\d{2}(?=\s[AP]M)/, '')}</div>
                                            {
                                                val.edited && (
                                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`mTmn flex items-center gap-2 w-fit text-[10px] text-right opacity-[.4] pr-1 hover:underline cursor-pointer`}>
                                                        <span>●</span>
                                                        <span>Edited</span>
                                                    </motion.div>
                                                )
                                            }
                                            <div className="received opacity-[.6]">
                                                <i className="bi bi-check2-all" />
                                            </div>
                                        </motion.div>
                                    )
                                }

                                {
                                    edit && (
                                        <div  className="editsmnl flex items-center gap-2">
                                            <div onClick={e => setedit(null)} className="cancAd hover:underline cursor-pointer text-sm text-red-500">Cancel</div>
                                            <div onClick={!sub ? edit.trim().length > 0 ? handleEdit : e => {} : e => {}} className={`cancAd hover:underline cursor-pointer text-sm text-green-600 ${edit.trim().length > 0 ? `` : `dis`}`}>Save</div>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </>
            )
        }
    }
    catch { return '' }
};

export default Cm
