"use client";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import Cm from "./Cm";
import Modal from "../Moda/Modal";
import axios from "axios";
import { v4 as uuid } from "uuid"
import { Connect } from "../Connect";
import Objects from "../Data/Objects";
import { useLocation } from "react-router-dom";
import { isIOS } from "react-device-detect"
// 
let Comments = ({ val, ispost, post }) => {
    const { dv, posts, setposts, k, audio, db } = useContext(Connect);
    const [input, setInput] = useState("");
    const [reply, setreply] = useState(null);
    // 
    const [sub, setsub] = useState(null);
    const [hasidinput, sethasidinput] = useState("");
    const [hasid, sethasid] = useState(null);
    // 
    const [file, setFile] = useState(null);
    const [isp, setisp] = useState(null);
    const [alerts, setalert] = useState(null);
    // 
    const [words, setwords] = useState(null);
    // 
    const [comments, setcomments] = useState([]);
    // 
    let reg = /[\r\n]+/;
    let loc = useLocation()

    let handleInput = (e) => {
        try {
            let bd = validateAndGetBadWords(e.target.value);
            let replaced = e.target.value;
        
            if (bd) {
                // bd.forEach(badWord => {
                //     let length = badWord.length;
                //     let start = badWord.slice(0, 1);
                //     let end = badWord.slice(-1);
                //     let ar = ["●", "*", "/", "🤬"]
                //     let middle = ar[Math.floor(Math.random() * ar.length)].repeat(Math.max(length - 2, 1));
                //     let censoredWord = start + middle + end;
                
                //     replaced = replaced.replace(new RegExp(`\\b${escapeRegExp(badWord)}\\b`, "gi"), censoredWord)
                // });
                setalert(`Bad${bd.length > 1 ? `words` : `word`} detected! Please be friendly in comment. \n Words found (${bd.join(`| `)})`)
                // 
                audio.src = `../../progress.mp3`
                audio.play()
            }
            else {
                setalert(null)
            }
        
            setInput(replaced);
        }
        catch { }
    }
    
    const handleFileChange = (e) => {
        if (words) {
            const selectedFile = e.target.files[0];
            if (selectedFile) {
                if (selectedFile.type.includes("image") || selectedFile.type.includes("video")) {
                    setFile(selectedFile);
                }
            }
        }
    };

    const removeFile = () => {
        setFile(null);
    };

    //
    
    useLayoutEffect(() => {
        try {
            let getBdW = async () => {
                try {
                    let ft = await fetch(`../badwords.json`)
                    let d = await ft.json()
                    if (d) {
                        setwords(d)
                    }
                }
                catch { }
            }
            getBdW()
            // 
            let comment_id = localStorage.getItem("comment_id")
            if (comment_id) {
                let dc = Objects.encDec(comment_id, `${window.navigator.userAgent.split(/\s+/).join("")}+${dv}`, true)
                if (dc) {
                    sethasid(JSON.parse(dc))
                }
                else {
                    alert(`We were unable to access your comment ID.`)
                }
            }

            loAdSScc();
        }
        catch { }
    }, [ispost]);

    let loAdSScc = () => {
        try {
            let sccinView = document.querySelector(".sccinView")
            if (sccinView) {
                sccinView.scrollIntoView({ behavior: "smooth" })
            }
            else {
                setTimeout(loAdSScc, 1000)
            }
        }
        catch {
            setTimeout(loAdSScc, 1000)
        }
    };

    useLayoutEffect(() => {
        try {
            if (val.length > 0) {
                
                let reA = [];

                let getFormattedDate = (timestamp) => {
                    const date = new Date(timestamp);
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const day = String(date.getDate()).padStart(2, "0");
                    const year = date.getFullYear();
                    return `${month}-${day}-${year}`;
                };
                    
                val.map(v => {
                    const formattedDate = getFormattedDate(parseInt(v.time));
                    const existingGroupIndex = reA.findIndex(group => group.date === formattedDate);
                    // 
                    if (existingGroupIndex !== -1) {
                        reA[existingGroupIndex].data.push(v);
                    } else {
                        reA.push({ date: formattedDate, data: [v], dt: parseInt(v.time) });
                    }
                });

                if (reA.length > 0) {
                    let srt = reA.sort((a, b) => new Date(b.dt) - new Date(a.dt))
                    setcomments(srt)
                }

            }
        }
        catch { }
    }, [val, posts])


    const validateAndGetBadWords = (value) => {
        try {
            if (!words || !words.badWord || !value) return null; // Return early if input data is missing or invalid
            // Previous Patttern -> `\\b(${words.badWord.map(word => escapeRegExp(word)).join("|")})\\b`,
            // Sp = `(?:^|[^\\w-])(${words.badWord.map(word => escapeRegExp(word)).join("|")})(?:$|[^\\w-])`
            // `(?:^|[^\\w-])(${words.badWord.map(word => escapeRegExp(word)).join("|")})(?=\\w|$)`,
            const badWordsPattern = new RegExp(
                `(?:^|[^\\w-])(${words.badWord.map(word => escapeRegExp(word)).join(`|`)})(?:$|[^\\w-])`,
                "gi"
            );

            const matches = value.match(badWordsPattern);

            if (matches && matches.length > 0) {
                return matches;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    };


    const escapeRegExp = (string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    };

    let tst = async () => {
        try {
            let formD = new FormData()
            formD.append("file", file)
            
        }
        catch { }
    }

    let handleSubmit = async () => {
        try {
            if (file || input.trim().length > 0) {
                let captureThumbnail = (source) => {
                    try {
                        return new Promise((resolve, reject) => {
                            const canvas = document.createElement("canvas");
                            const video = document.createElement("video");
                            const context = canvas.getContext("2d");

                            video.src = source;

                            let REUSE = async () => {
                                try {
                                    let wh = 300;
                                    canvas.width = wh;
                                    canvas.height = wh;
                                    context.drawImage(video, 0, 0, wh, wh);
                                    canvas.toBlob((blob) => {
                                        if (blob) {
                                            resolve(blob);
                                        } else {
                                            reject(new Error("Blob generation failed"));
                                        }
                                    }, "image/jpeg", 0.5);
                                } catch (e) {
                                    reject(e);
                                }
                            };

                            video.addEventListener("loadedmetadata", () => {
                                video.currentTime = 30;
                                video.addEventListener("seeked", REUSE);
                            });

                            video.onerror = (e) => {
                                reject(new Error(`Failed to load video: ${e.message}`));
                            };
                        });
                    }
                    catch (e) {
                        return null
                    }
                };

                let getFiles = async () => {
                    try {
                        if (file) {
                            let hasBL = file.type.includes("video") ? isIOS ? null : await captureThumbnail(URL.createObjectURL(file)) : null
                            let array = file.type.includes("video") ? hasBL ? [file, hasBL] : [file] : [file]
                            if (array.length > 0) {
                                // 
                                let obb
                                let arA = async (su) => {
                                    try {
                                        if (su <= array.length - 1) {
                                            let formD = new FormData()
                                            formD.append("file", array[su]);
                                            // 
                                            let date = new Date()
                                            let ft = await fetch(`http://192.168.1.231:3001/cfile/${uuid().toUpperCase().split("-").join("")}`, {
                                                method: `POST`,
                                                body: formD,
                                                headers: {
                                                    p: Objects.encDec(JSON.stringify({
                                                        id: dv,
                                                        exp: date.setSeconds(date.getSeconds() + 30)
                                                    }), `${window.navigator.userAgent.split(/\s+/).join("").slice(0, 6)}+${k.g}`),
                                                }
                                            })

                                            let ck = await ft.json()

                                            if (su < 1) {
                                                ck.name = file.name
                                                ck.size = array[su].size
                                                ck.type = array[su].type
                                                ck.thumbnail = null
                                                // 
                                                obb = ck
                                            }
                                            else {
                                                obb.thumbnail = {
                                                    picture: ck.url,
                                                    type: array[su].type,
                                                    time: ck.time
                                                }
                                            }

                                            return arA(su + 1)
                                        }
                                        else {
                                            setFile(null)
                                            setsub(null)
                                            // 
                                            return [obb]
                                        }
                                    }
                                    catch (e) {
                                        alert(`Upload Failed.`)
                                        return []
                                    }
                                }
                                return arA(0)
                            }
                            else {
                                setsub(null)
                                return []
                            }
                        }
                        else {
                            setsub(null)
                            return []
                        }
                    }
                    catch {
                        setsub(null)
                        return []
                    }
                };

                setsub(true);

                let gF = await getFiles()

                let obj = {
                    id: uuid().toUpperCase().split("-").join(""),
                    edited: false,
                    time: new Date().getTime(),
                    ownerid: hasid,
                    reply: reply ? reply.id : "",
                    reported: [],
                    adult: alerts ? true : false,
                    file: gF,
                    postId: post.id,
                    text: input.trim().length > 0 ? input.split("\n") : [],
                }

                let newPosts = [...posts]
                let f = newPosts.find(v => loc.pathname.includes(v.id))

                if (f) {
                    let updatedComments = [...f.comments, obj]
                    f.comments = updatedComments


                    //

                    let sccinView = document.querySelector(".sccinView")
                    if (sccinView) {
                        sccinView.scrollIntoView({ behavior: "smooth" })
                    }

                    setposts(newPosts)

                    setInput("")
                    setreply("")
                    sethasidinput("")
                    setalert(null)

                    let postObj = {
                        db: `post_cache`,
                        name: `posts`,
                        id: `post`,
                        data: { id: `post`, value: newPosts }
                    };
                    db(postObj, null, null, true);

                    // 
                    let date = new Date()
                    await axios.post(`http://192.168.1.231:3001/save/${uuid().toUpperCase().split("-").join("")}`, {
                        d: Objects.encDec(JSON.stringify(obj), `${k.a}+${window.navigator.userAgent.split(/\s+/).join("").slice(0, 6)}`),
                        type: `comment`,
                        action: `add`,
                        text: Objects.encDec(JSON.stringify(input.trim().length > 0 ? input.split("\n") : []), `${k.s}+${dv}`, null, true),
                    }, {
                        headers: {
                            p: Objects.encDec(JSON.stringify({
                                id: dv,
                                exp: date.setSeconds(date.getSeconds() + 5)
                            }), `${window.navigator.userAgent.split(/\s+/).join("").slice(0, 6)}+${k.g}`),
                        }
                    });

                    let vid = document.querySelectorAll("video")
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
                            audio.addEventListener("ended", e => {
                                vos.map(v => {
                                    vid[v.id].volume = v.volume
                                })
                            })
                        }
                    }
                } else {
                    alert(`Ouch! Something went wrong. We were unable to find your targeted post.`)
                }
            }
        } catch (error) {
            console.log(error)
        }
    };


    //

    let Fm = (time, type) => {
        let d = new Date(time);
        if (!type) {
            let today = new Date();
            if (d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear()) {
                return "Today";
            } else if (d.getDate() === today.getDate() - 1 && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear()) {
                return "Yesterday";
            } else {
                return d.toDateString();
            }
        } else {
            return d.toLocaleString();
        }
    };

    return (
        <>
            <div className={`mafs relative w-full h-full overflow-hidden`}>
                <div className={` w-full h-full absolute overflow-hidden top-0 left-0 flex items-center justify-between flex-col`}>
                    <div className={` cmtbgs ${ispost ? `text-sm h-full w-full overflow-x-hidden overflow-y-auto bg-[var(--basebg)]` : `comments overflow-x-hidden overflow-y-auto h-full w-full relative bg-[var(--dimbg)]`}`}>
                        {
                            val ? (
                                <>
                                    {
                                        comments.length > 0 ?
                                            (comments || []).map((v, k) => {
                                                return (
                                                    <div key={k} className="comDts w-full">
                                                        <div className="posteddTime w-full  flex items-center justify-center p-2 top-0 z-[100000000000000] pointer-events-none">
                                                            <div className="placces">
                                                                <span className={`opacity-[.6] w-fit min-w-fit`}>{Fm(v.dt)}</span>
                                                            </div>
                                                        </div>
                                                        {
                                                            v.data && (
                                                                <>
                                                                    {
                                                                        (v.data.sort((a, b) => new Date(a.time) - new Date(b.time)) || []).map((vl, kl) => {
                                                                            return (
                                                                                <Cm post={post} setreply={setreply} val={vl} key={kl} />
                                                                            )
                                                                        })
                                                                    }
                                                                </>
                                                            )
                                                        }
                                                    </div>
                                                )
                                            }) :
                                            <>
                                                <div className="cmts h-full w-full flex items-center justify-center gap-2 p-2 text-center uppercase opacity-[.6]">
                                                    Comment is empty for now, <br /> Be the first!
                                                </div>
                                            </>
                                    }
                                </>
                            ) :
                                <>
                                    <div className="cmts h-full w-full flex items-center justify-center gap-2 p-2 text-center uppercase opacity-[.6]">
                                        Comment is empty for now, <br /> Be the first!
                                    </div>
                                </>
                        }
                        <div className="sccinView h-20 p-2 w-full" />

                    </div>

                    {
                        reply ?
                            <div className="replycontainer w-full p-2 flex items-center justify-between gap-2">
                                <div onClick={e => setreply(null)} className="xlylz flex items-center justify-center bg-red-500 text-white cursor-pointer rounded-xl h-full w-20">
                                    <i className="bi bi-x-lg" />
                                </div>
                                <div className="replyBox w-full brd rounded-lg bg-[var(--basebg)]">
                                    <Cm setreply={setreply} reply={true} val={reply} />
                                </div>
                            </div> : ``
                    }

                    {
                        !hasid && (
                            <div className="cmidDetect p-2">
                                <div className="infoHere text-xs opacity-[.6] text-center bd p-1">
                                    Hey there! before you start typing, we would like you to create a one time <strong className={`uppercase`}>comment ID</strong> <mark><b>(PASSWORD)</b></mark> that will be verified by this device only.
                                </div>
                                <div className="input fields flex items-center justify-between gap-1 text-sm p-1">
                                    <input autoFocus value={hasidinput} onChange={e => sethasidinput(e.target.value.split(/\s+/).join(""))} placeholder={`Remember It.`} type="text" name="" id="" />
                                    <div className="btnS flex items-center justify-center gap-2">
                                        <div onClick={e => sethasidinput(uuid().split("-").join("").toUpperCase())} className="gbtn brd flex items-center justify-center h-10 rounded-lg p-1 cursor-pointer hover:opacity-[.6]">Generate</div>
                                        <div onClick={hasidinput.trim().length < 8 || hasidinput.trim().length > 35 ? e => { } : e => {
                                            if (!hasidinput.trim().length < 8 && hasidinput.trim().length > !35) {
                                                if (window.confirm(`Are you sure you will remember this? \n\n It will be linked with your device and cannot be changed \n\n \t We don"t need your email or contact, we authenticate you with your personal device. \n All your info"s are encrypted and secure. \n\n Press (OK) to continue or (CANCEL) to ignore.`)) {
                                                    let obj = {
                                                        password: hasidinput,
                                                        id: dv,
                                                        time: new Date().getTime()
                                                    }
                                                    let lok = Objects.encDec(JSON.stringify(obj), `${window.navigator.userAgent.split(/\s+/).join("")}+${dv}`)
                                                    localStorage.setItem(`comment_id`, lok)
                                                    sethasid(obj)
                                                }
                                            }
                                        }} className={`gbtn brd flex items-center justify-center bg-[#0073ff] text-white h-10 rounded-lg p-1 cursor-pointer hover:opacity-[.6] ${hasidinput.trim().length < 8 || hasidinput.trim().length > 35 ? `dim` : ``}`}>Done</div>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    {/*  */}
                    {
                        hasid && (
                            <>
                                {file && (
                                    <>
                                        {
                                            isp && (
                                                <Modal mClass={` flex items-center justify-center p-2`} hasDim={`bg-[var(--mainBg)]`} className={`bg-[var(--basebg)] brd overflow-auto w-full itemaidnalsin h-full`} select={isp} setselect={setisp}>
                                                    <div className="BigWa relative w-full h-full bg-[black]">
                                                        <i onClick={e => setisp(null)} className="bi bi-x-lg z-[10000000000] h-10 w-10 top-2 left-2 absolute bg-red-500 text-white cursor-pointer flex items-center justify-center rounded-full" />
                                                        {
                                                            file.type.includes("image") ?
                                                                <img className={`w-full h-full object-contain`} src={URL.createObjectURL(file)} alt={file.name} /> :
                                                                file.type.includes("video") ?
                                                                    <video controls playsInline className={`w-full h-full object-contain`} src={URL.createObjectURL(file)} alt={file.name} /> :
                                                                    <iframe frameBorder={0} className={`w-full h-full object-contain`} src={URL.createObjectURL(file)} alt={file.name} />
                                                        }
                                                    </div>
                                                </Modal>
                                            )
                                        }
                                        {/*  */}
                        
                                        <div className="fileUps w-full bd flex items-center justify-start gap-2 p-1">
                                            <div layoutId={file.name} onClick={e => setisp(file.name)} className="filtCtai min-w-10 h-10 w-10 overflow-hidden brd rounded-lg flex items-center justify-center">
                                                {
                                                    file.type.includes("image") ?
                                                        <img className={`w-full h-full object-cover`} src={URL.createObjectURL(file)} alt={file.name} /> :
                                                        <i className="bi bi-file-earmark" />
                                                }
                                            </div>
                                            <div title={`${file.name}`} className="onEf line-clamp-1">
                                                {file.name}
                                            </div>
                                            <div title={`Remove File`} className="Senig w-fit min-w-fit" onClick={removeFile}>
                                                <i className="bi h-10 w-10 flex items-center justify-center brd rounded-full hover:scale-[1.1] transition-all text-red-500 cursor-pointer bi-x-lg" />
                                            </div>
                                        </div>
                                    </>
                                )}
                                <div className={`postMsg text-xs w-full flex p-2 items-center justify-center gap-2 ${!words ? `dim` : ``}`}>
                                    {
                                        !file && (
                                            <div className={`filtBtn w-fit min-w-fit`}>
                                                <input accept={`image/*, video/*`} type="file" className="hidden" id="file" onChange={words ? handleFileChange : e => { }} />
                                                <label className={`cursor-pointer`} htmlFor="file">
                                                    <i className="bi bi-plus-lg bg-[var(--dimbg)] rounded-full h-7 flex items-center justify-center w-7" />
                                                </label>
                                            </div>
                                        )
                                    }
                                    <div className="WfLs w-full">
                                        <textarea onKeyDown={e => {
                                            if ((!e.ctrlKey && !e.shiftKey) && e.key.toLowerCase() === "enter") {
                                                e.preventDefault()
                                                if ((input.trim().length > 0 || file) && !sub) {
                                                    handleSubmit()
                                                }
                                            }
                                        }} autoFocus={!reply ? true : false} onChange={words ? handleInput : e => { }} value={input} layoutId={`txtarea`} placeholder={`Type a comment`} type="text" className={`w-full outline-none overflow-hidden ${reg.test(input) ? `  h-[80px] overflow-auto` : `overflow-hidden h-[30px]`} resize-none bg-[var(--basebg)] p-2 rounded-xl`} />
                                        {
                                            alerts && (
                                                <div className={`bg-warning max-h-[60%] overflow-auto flex items-center w-fit gap-1 rounded-lg p-1 text-white`}>
                                                    <i className="bi bi-exclamation-triangle h-6 w-6 flex items-center justify-center" />
                                                    <span>
                                                        {alerts}
                                                    </span>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div onClick={(input.trim().length > 0 || file) && !sub ? e => handleSubmit() : e => { }} className={`subNts w-fit min-w-fit cursor-pointer ${(input.trim().length > 0 || file) && !sub ? ` active:scale-[1.1]` : `dim`}`}>
                                        <i className="bi bi-send bg-[#0084ff] rounded-full rotate-[45deg] h-7 flex items-center justify-center w-7" />
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default Comments;
