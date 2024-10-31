'use client'
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Logo from '../Functions/Logo/Logo';
import Bars from '../Functions/Logo/Bars';
import { v4 as uuid } from 'uuid'
import getOrCreateUniqueId from '../Function/GetId'
import {motion} from 'framer-motion'
import Modal from '../Functions/Moda/Modal';
import Prev from './Prev'
import CircularProgress from '@mui/material/CircularProgress';

const ClientD = () => {
    const [select, setSelect] = useState('media');
    const [input, setInput] = useState('');
    const [sl, setsl] = useState(null);
    const [sld, setsld] = useState(null);
    const [d, setd] = useState(null);
    const [erDD, seterDD] = useState(false);
    // 
    const [error, seterror] = useState(null);
    const [store, setstoage] = useState([]);
    const [st, setst] = useState([]);
    // 
    const [sub, setsub] = useState('');
    let reg = /^(ftp|http|https):\/\/[^ "]+$/

    const handleSubmit = async (e, erd) => {
        e.preventDefault();
        try {
            if (!sub) {
                setsub(true)
                if (((select === 'media' || select === 'website') && input.trim().length > 0) && reg.test(input)) {
                    let dMain = erd ? `https://pxapi.vercel.app` : `https://pxapi-tlo6.onrender.com`
                    let url = select === 'media' ? `${dMain}/all/download/?url=${input}` : `${dMain}/?proxy_med=${input}<>`
                    let ax = await fetch(url)
                    let d = select === 'media' ? await ax.json() : await ax.text()
                    // 
                    let id = uuid().split('-').join('').toUpperCase()
                    if (d) {
                        let GetStream = async (url) => {
                            try {
                                seterror(`info: Download time is based on your request size, Please wait for download to finish....`)
                                let fv = await fetch(url);
                                let stream = await fv.blob();
                                // 
                                if (stream) {
                                    seterror(`info: Download complete...`)
                                    setTimeout(() => seterror(null), 3000)
                                    // 
                                    let blob = new Blob([stream], {
                                        type: stream.type.trim().length > 0 ? stream.type.includes('application') ? 'video/mp4' : stream.type : `audio/mp3`
                                    })
                                    return blob
                                }
                            }
                            catch {
                                alert(`Proxy Failed.`)
                                return null
                            }
                        };

                        if (select === 'media') {
                            let rmUL = `https://pxapi-tlo6.onrender.com`
                            let gS = await GetStream(Array.isArray(d) ? erd ? `https://pxapi.vercel.app${d[0].proxy.split(`${rmUL}`)[1]}` : d[0].proxy : d.hasOwnProperty('id') ? d.music : erd ? `https://pxapi.vercel.app${d.proxy.split(`${rmUL}`)[1]}` : d.proxy)
                            if (gS) {
                                d.proxy = gS
                            }
                        }

                        let obj = select === 'media' ? { ...d, url: input, uid: id } : {
                            url: input,
                            uid: id,
                            proxy: new Blob([d], { type: `text/html` })
                        }

                        if (!obj.hasOwnProperty('id')) {
                            obj.id = id
                        }

                        let upl = new Date().getTime()
                        
                        let postObj = {
                            db: `download_cache`,
                            name: `download`,
                            id: id,
                            data: { ...obj, time: upl }
                        };

                        getOrCreateUniqueId(postObj, null, null, true);

                        setstoage((pev) => {
                            let pv = [...pev]
                            return [...pv, { ...obj, time: upl }]
                        })

                        setsub(null)
                    }
                    else {
                        setsub(null)
                    }
                }
                else {
                    seterror(`Please enter a valid URL`);
                    setTimeout(() => seterror(null), 2000)
                    setsub(null)
                }
            }
            else {
                seterror(`Please wait...`)
                setTimeout(() => seterror(null), 2000);
            }
        }
        catch {
            if(!erd){
                handleSubmit(e, true)
                seterDD(true)
            }
            else {
                seterror(`Something went wrong. Try again.`)
                setTimeout(() => seterror(null), 2000);
                setsub(null)
            }
        }
    };

    useLayoutEffect(() => {
        try {
            let getS = async () => {
                let postObj = {
                    db: `download_cache`,
                    name: `download`,
                };

                let gt = await getOrCreateUniqueId(postObj, null, true);
                setstoage(gt)
            }
            getS()
        }
        catch { }
    }, []);

    useEffect(() => {
        try {

            if (store.length > 0) {
                let reA = [];

                let getFormattedDate = (timestamp) => {
                    const date = new Date(timestamp);
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    const year = date.getFullYear();
                    return `${month}-${day}-${year}`;
                };
                    
                store.map(v => {
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
                    setst(srt)
                }
            }
            else {
                setst([])
            }

        }
        catch { }
    }, [store]);


    let Fm = (time, type) => {
        let d = new Date(time);
        if (!type) {
            let today = new Date();
            if (d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear()) {
                return 'Today';
            } else if (d.getDate() === today.getDate() - 1 && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear()) {
                return 'Yesterday';
            } else {
                return d.toDateString();
            }
        } else {
            return d.toLocaleString();
        }
    };

    let handleDelete = async (uid, id) => {
        try {

            let newStore = store.filter(item => item.uid !== uid);
            setstoage(newStore);

            let postObj = {
                db: `download_cache`,
                name: `download`,
                id: id
            };

            await getOrCreateUniqueId(postObj, null, null, null, true);

        }
        catch {
            alert(`failed to delete`)
        }
    }

    let downloD = (blob) => {
        try {
            setd(true)
            setTimeout(() => {
                let url = URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = `ToonJOY_😏😉😜_download${uuid().split('-').join('').toUpperCase()}`;
                a.click();
                // 
                setd(null)
            }, 2000)
        }
        catch {
            alert(`Download Failed. try again. Or view the file and download manually.`)
        }
    };

    // 
    const [title, settitle] = useState('')
    const [description, setdescription] = useState('')
    const [thumbnail, setthumbnail] = useState(null)
    const [file, setfile] = useState(null)

    function captureThumbnail(videoElement) {
        const canvas = document.createElement('canvas');
        // 
        const context = canvas.getContext('2d');

        let REUSE = async() => {
            try {
                canvas.width = videoElement.videoWidth;
                canvas.height = videoElement.videoHeight;
                context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                let tB = await fetch(canvas.toDataURL())
                let b = await tB.blob()
                // 
                setthumbnail(b)
            } catch (e) {}
        }

        videoElement.currentTime = 20
        videoElement.addEventListener('seeked', REUSE);

    }


    // 

    async function submitFormData(formData, pmt) {
        try {
            let aw = await fetch('https://toonjoy-backend.onrender.com/upload', {
                method: 'POST',
                body: formData,
                headers: {
                    p: pmt
                }
            });
            // 
            let d = await aw.json();
            if (d.success === true) {
                return true
            } else {
                alert('Upload Failed.')
                return null
            }
        } catch (e) {
            return null
        }
    }

    let handlePush = () => {

        let arr = [file, thumbnail]
        let uid = uuid();
        // 
        let subRst = async(index, pmt) => {
            try {
                if (index <= arr.length - 1) {
                    let d = arr[index]
                    console.log(d)
                    if (d) {
                        const formData = new FormData();
                        formData.append('title', title);
                        formData.append('description', description);
                        formData.append('password', localStorage.getItem('password'));
                        formData.append('file', d);
                        formData.append('id', uid);
                        formData.append('index', index);
                        formData.append('type', d.type);
                        formData.append('time', new Date().getTime());
                        
                        let hasdonw = await submitFormData(formData, pmt);
                        if (hasdonw) {
                            subRst(index + 1, pmt)
                        } else {
                            console.error(`Failed, Re-uploading`)
                            setTimeout(() => subRst(index, pmt), 2000)
                        }
                    }
                } else {
                    alert(`Upload completed`)
                    setsub(null)
                    window.location.reload()
                    
                }
            } catch (e) {
                console.log(e)
                alert(`something went wrong, We can't upload your data.`)
            }
        };

        subRst(0, window.navigator.userAgent)

    };
    

    let handeUPload = async (uid, id) => {
        try {
            setsub(true)
            let postObj = {
                db: `download_cache`,
                name: `download`,
            };

            let dt = await getOrCreateUniqueId(postObj, null, true, null, null);
            if(dt && dt.length > 0){
                let allowedTypes = /^(audio|image|video)\//i;
                let filteredBlobs = dt.filter(v => allowedTypes.test(v.proxy.type.toLowerCase()));
                // 
                if( filteredBlobs && filteredBlobs.length > 0 && !erDD){
                    let f = filteredBlobs.find(v => v.id === id)
                    if(f){
                       if(f.hasOwnProperty('album') || f.proxy.type.toLowerCase().includes('audio')){
                         let ft = await fetch(f.thumbnail)
                         let d = await ft.blob()
                        //  
                        setthumbnail(d)
                        setfile(f.proxy)
                        // 
                        setdescription(`${f.album}`)
                        settitle(`${f.title} | ${f.artists}`)
                        // 
                       }
                       else {
                         let getTitle = window.prompt(`Would you like to type in your title: `)
                         let getDescription = window.prompt(`Would you like to type in the description: `)
                        //  
                        // if(getDescription && getTitle) {
                            if(f.hasOwnProperty('thumbnail')){
                                let ft = await fetch(f.thumbnail)
                                let d = await ft.blob()
                                //  
                                setthumbnail(d)
                             }
                             else {
                                let nrl = URL.createObjectURL(f.proxy)
                                let video = document.createElement('video')
                                video.src = nrl
                                video.addEventListener('loadedmetadata', () => {
                                    video.width = 400
                                    video.height = 500
                                //  
                                video.currentTime = 50
                                captureThumbnail(video)
                                })
                             }
    
                            setfile(f.proxy)
                            // 
                            setdescription(`${getDescription}`)
                            settitle(`${getTitle}`);
                        // }
                       }
                    }
                    else {
                        setsub(null)
                        alert(`Sorry, we did not find your targeted file to send to toonjoy.org. This might happen because the target file type is not in these categories. (image,video and audio) (file required). Please try using one of those categories.`)
                    }
                }
            }
            else {
                setsub(null)
                alert(`It looks like your download folder is empty. Try getting a link online and trying our sufff.`)
            }
        }
        catch {
            setsub(null)
            alert(`Upload failed. Something went wrong on our end. \n Try again in 30 Minutes \n We will fix it. \n We promise.`)
        }
    }


    useLayoutEffect(() => {
        // && description.trim().length > 0 && title.trim().length > 0
        if(thumbnail && file){
            handlePush()
        }
    }, [thumbnail, file, description, title])


    try {
        return (
        <>
            <link rel="preload" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" as="style" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossOrigin="anonymous" />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />



            <div className="welCm text-center fixed top-0 left-0">
                <div className="bgDesign fixed top-0 left-0 w-full h-full">
                    {/* Placeholder content */}
                    <Bars className="w-full h-full fixed top-0 left-0" />
                    <Bars type="c" className="w-[200px] h-[200px] fixed top-0 right-0" />
                    <Bars type="o" className="w-[300px] h-[300px] fixed bottom-0 left-0" />
                    <img alt={`design_image.png`} src={`../line.png`} className="w-[50%] opacity-[.3] h-fit object-contain fixed top-2 left-[25%] rotate-[180deg]" />
                    {/* End of placeholder content */}
                    <div className="BoxLeft fixed top-0 left-0 w-full h-full z-[10000] opacity-[.5] pointer-events-none" />
                    <div className="Boxright fixed top-0 left-0 w-full h-full z-[10000] opacity-[.5] pointer-events-none" />
                    <div className="MastR fixed top-0 left-0 w-full h-full z-[10000] opacity-[.3] pointer-events-none" />
                </div>
            </div>
            <div className="contA fixed z-[10000000000] top-0 left-0 w-full h-full overflow-auto">

                {
                    sl && (
                        <Modal isDrag={true} mClass={`  flex items-center justify-center h-full w-full fixed top-0 left-0 `} hasDim={`bg-[var(--mainBg)] h-full w-full`} className={` bg-[black] w-full h-full absolute top-0 `} select={sl} setselect={setsl}>
                            <Prev val={sld} />
                        </Modal>
                    )
                }

                <div className="UppPath flex items-center justify-center flex-col w-full p-2 text-center">
                    <div className="boldT capitalize w-full p-2 mt-5">
                        <h1 className={`text-8xl max-[800px]:text-6xl p-2 font-bold transition-all`}>Download Anything</h1>
                        <p className='p-2 opacity-[.6]'>Just copy and paste in your target Website or URL, and allow us do the magic</p>
                    </div>
                </div>
                <div className="UppPath z-[1000000] flex items-center justify-center flex-col w-full p-2 text-center sticky top-0">
                    <form onSubmit={handleSubmit} className="inputPaths max-[350px]:flex-col sticky top-0 bg-[var(--mainBg)] brd rounded-xl shadow-lg overflow-hidden max-w-[800px] w-full flex items-center justify-center gap-2 p-2">
                        <div className="selectpath max-[350px]:w-full w-fit min-w-fit brd relative rounded-xl overflow-hidden p-2">
                            <select className={`outline-none w-full h-full p-1 rounded-lg bg-[var(--d)] top-0 left-0`} value={select} onChange={(e) => setSelect(e.target.value)}>
                                <option value={`media`}>Social Media</option>
                                <option value={`website`}>Website</option>
                            </select>
                        </div>
                        <div className="inputF w-full brd rounded-2xl overflow-hidden">
                            <input required placeholder={`Paste your link here.`} inputMode={`url`} type={`url`} className="" id="" value={input} onChange={(e) => {
                              let valUU = e.target.value
                              if(valUU.includes(`youtube.com`)){
                                  valUU = valUU?.split(`&`)[0]
                                  setInput(valUU)
                              }
                                else {setInput(e.target.value)}
                            }} />
                            {
                                error ?
                                    <div className={`errmsgs ${error.includes('info:') ? `text-[#0084ff]` : `text-red-500`}`}>
                                        {error.replace(/info:+/g, '')}
                                    </div> : ''
                            }
                        </div>
                        <button type="submit" className={`subBtns max-[350px]:w-full relative w-fit min-w-10 flex items-center justify-center brd h-full rounded-lg p-1 ${(((select === 'media' || select === 'website') && input.trim().length > 0) && reg.test(input)) && !sub ? `` : `dis`}`}>
                            {
                                sub ?
                                    <CircularProgress size={20} className={` h-8 w-8 min-h-8 min-w-8`} /> :
                                    <i className="bi bi-send rotate-[41deg]" />
                            }
                        </button>
                    </form>
                </div>
                {
                    st.length > 0 && (
                        <div className="inalsy flex  flex-col w-full text-center p-2 items-center justify-center">
                            <div className={`text-2xl uppercase`}>Stored on your device.</div>
                            <p className={` opacity-[.6] p-2`}>It stays here till you clear your cache or delete it your self.</p>
                        </div>
                    )
                }
                {
                    st.length < 1 && (
                        <div className="inalsy flex  flex-col w-full text-center p-2 items-center justify-center">
                            <div className={`text-2xl uppercase`}>Your Results will be saved here...</div>
                            <p className={` opacity-[.6] p-2 bd`}>Non of your results are being shared outside your device. Enjoy and stay safe.</p>
                            <p className={` opacity-[.6] capitalize p-2 text-[#406de8]`}>For Now, You have nothing in your storage.</p>
                        </div>
                    )
                }
                {
                    st && (
                        (st || []).map((v, k) => {
                            let dddt = (v.data || []).sort((a, b) => new Date(b.time) - new Date(a.time))
                            return (
                                <div key={k} className="bas_ptd p-2">
                                    <div className="posteddTime w-full flex items-center justify-center pointer-events-none">
                                        <motion.div initial={{ scale: 2, marginLeft: 50 }} animate={{ scale: 1, marginLeft: 0 }} style={{
                                            color: `rgb(${Math.floor(Math.random() * 300)},${Math.floor(Math.random() * 300)},${Math.floor(Math.random() * 300)})`
                                        }} className={`p-2 w-full flex items-center justify-center text-center text-2xl uppercase font-bold`}>
                                            {Fm(v.dt)}
                                        </motion.div>
                                    </div>
                                        
                                    <div className="gridImagepost p-2 w-full">
                                        {
                                            (dddt || []).map((vl, kl) => {
                                                return (
                                                    <motion.div layoutId={vl.uid} initial={{ scale: .6, marginLeft: 20 }} animate={{ scale: 1, marginLeft: 0, transition: { delay: `${kl < 9 ? `.${kl}` : k}` } }} key={kl} className=" flex items-center justify-between flex-col bg-[var(--d)] w-full brd rounded-2xl shadow-lg overflow-hidden p">
                                                        <motion.div onClick={e => {
                                                            setsld(vl)
                                                            setsl(vl.uid)
                                                        }} className={`pictue_here h-full ${!Array.isArray(vl) && !vl.hasOwnProperty('artists') ? ` bg-[var(--basebg)]` : `bd max-h-[200px]`} cursor-pointer min-h-[200px] w-full overflow-hidden`}>
                                                            {
                                                                Array.isArray(vl) ?
                                                                    <>
                                                                        <div className="fileS">
                                                                            <i className="bi bi-file-earmark" />
                                                                            <span>No given info</span>
                                                                        </div>
                                                                    </>
                                                                    : vl.hasOwnProperty('artists') ?
                                                                        <>
                                                                            <img src={`${vl.thumbnail}`} className={` h-full bg-black object-contain object-center min-h-[200px] w-full`} alt="" />
                                                                        </>
                                                                        : <>
                                                                            <div className="fileS h-full w-full gap-2 opacity-[.6] flex items-center justify-center flex-col">
                                                                                <i className="bi bi-file-earmark text-5xl" />
                                                                                <span className={` capitalize mt-2`}>Click to see.</span>
                                                                            </div>
                                                                        </>
                                                            }
                                                        </motion.div>
                                                        {
                                                            Array.isArray(vl) ?
                                                                <></>
                                                                : vl.hasOwnProperty('artists') ?
                                                                    <>
                                                                        <div className="title_if  w-full text-center line-clamp-3 p-1 bd">
                                                                            {vl.title} | {vl.album}
                                                                        </div>
                                                                        <div className="infos_d w-full  text-center opacity-[.6] text-sm line-clamp-3 p-2">
                                                                            {vl.artists}
                                                                        </div>
                                                                    </>
                                                                    : <></>
                                                        }
                                                        <div className="splt_s flex items-center bt justify-center w-full">
                                                            <div onClick={d ? e => { } : e => { downloD(vl.proxy) }} className={`left_btM cursor-pointer w-full flex items-center justify-center min-w-fit text-center transition-all gap-2 p-2 hover:bg-[#800040] ${d ? `dis` : ``}`}>
                                                                {
                                                                    d ?
                                                                        <CircularProgress size={20} className={` h-full w-full min-h-5 min-w-5`} /> :
                                                                        <>
                                                                            <i className="bi bi-download" />
                                                                            <span>Download</span>
                                                                        </>
                                                                }
                                                            </div>
                                                            {
                                                                sub ?
                                                                    <CircularProgress size={20} className={` h-8 w-8 min-h-8 min-w-8`} /> :
                                                            <>
                                                                <div onClick={e => {
                                                                    if (window.confirm(`Are you sure you want to delete? \n It will be removed from your cache also \n\n (OK) to proceed or (CANCEL) to ignore.`)) {
                                                                        handleDelete(vl.uid, vl.id)
                                                                    }
                                                                }} className="left_btM cursor-pointer w-full flex items-center justify-center min-w-fit text-center transition-all gap-2 p-2 bl hover:bg-[#db4646] hover:text-white  text-red-500">
                                                                    <i className="bi bi-trash" />
                                                                    <span>Delete</span>
                                                                </div>
                                                                <div onClick={e => {
                                                                    handeUPload(vl.uid, vl.id)
                                                                }} className={`left_btM ${erDD ? `dis pointer-events-none opacity-[.3]` : `cursor-pointer `} w-full flex items-center justify-center min-w-fit text-center transition-all gap-2 p-2 bl hover:bg-[#db4646] hover:text-white  text-red-500`}>
                                                                    <i className="bi bi-upload" />
                                                                    <span>Upload</span>
                                                                </div>
                                                            </>
                                                            }
                                                            
                                                        </div>

                                                        <div className={`px-2 py-2 text-center line-clamp-1 dis`}>{new Date(parseInt(vl.time)).toLocaleTimeString()}</div>
                                                    </motion.div>
                                                );
                                            })
                                        }
                                    </div>
                                        
                                </div>
                            );
                        })
                    )
                }
            </div>
        </>
    );
}
    catch {
        return "An error occurred, Please refresh this page or clear your cache to fix. (jujubelt124@gmail.com) Report issue."
}
};

export default ClientD;
