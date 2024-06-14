'use client';
import React, { useContext, useEffect, useRef, useState } from 'react'
import {v4 as uuid} from 'uuid'
import Objects from '../Data/Objects'
import { Connect } from '../Connect'
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import {motion} from 'framer-motion'
import Vid from '../Video/Vid';

let Img = ({ loading, onLoad, className, src, id, hasFile, ispost, val}) => {
    const { db, imgF, CImg, setimgF} = useContext(Connect);
    // 
    const [im, setim] = useState(null)
    const [rl, setrl] = useState(0)

    let GI = async (isd) => {
        try {
            if (isd) {
                setim(isd)
            }
            else {
                let gt = await fetch(`https://pxapi-tlo6.onrender.com/?proxy_med=${src}`)
                // 
                let bf = await gt.blob()
                let b = URL.createObjectURL(bf)
                setim(b)
                // 
                let ab = imgF
                let ob = {
                    id: id,
                    url: b
                }
                ab.push(ob)
                setimgF(ab)
                // 
                let obj = {
                    db: `file_cache`,
                    name: `storage`,
                    id: id,
                    data: {
                        id: id,
                        value: bf
                    }
                }
                db(obj)
            }
        }
        catch (e) {
            console.log(e)
            setim(null)
            // setrl(uuid())
        }
    };

    let gsS = async () => {
        try {
            let N = await CImg(id)
            GI(N)
        }
        catch { }
    };

    useEffect(() => {
        try {
            if (src) {
                gsS()
            }
            else {
                setim(undefined)
            }
        }
        catch (er) {
            setim(undefined)
        }
    }, [rl, src, id, imgF]);


    return (
        <>
            {
                im ?
                    <>
                        {
                            hasFile ?
                                <>
                                    <Vid val={val} setim={setim} im={im} className={className}/>
                                </> :
                                <motion.img onError={e => { setim(undefined) }} src={im} loading={loading} onLoad={onLoad} className={className} />
                        }
                    </> :
                    <>
                        <div className={`${className} bg-[var(--basebg)] min-w-10 min-h-10 flex items-center justify-center`}>
                            {
                                im === undefined ?
                                    '' :
                                    <div className="loading">
                                        <CircularProgress color={`success`} />
                                    </div>
                            }
                        </div>
                    </>
            }
        </>
    );
};

export default Img