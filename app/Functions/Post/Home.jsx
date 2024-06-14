'use client';
import React, { useContext, useEffect, useState } from 'react'
import Toonjoy from '../Logo/Toonjoy';
import Post from './Post';
import { Connect } from '../Connect';

let Home = () => {
    const { setowner, owner, posts, setposts } = useContext(Connect);
    // 
    const [pt, setpt] = useState([])
    useEffect(() => {
        try {
            if (posts.length > 0) {

                let reA = [];

                let getFormattedDate = (timestamp) => {
                    const date = new Date(timestamp);
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    const year = date.getFullYear();
                    return `${month}-${day}-${year}`;
                };
                    
                posts.map(v => {
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
                    let srt = reA.sort((a, b) => new Date(a.dt) - new Date(b.dt))
                    setpt(srt.reverse())
                }
            }
        }
        catch { }
    }, [posts]);

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

    return (
        <>
            {
                pt.length < 1 ?
                    <></> :
                    <>
                        <div className="bodycnt w-full flex items-start justify-center flex-col">
                            {
                                (pt || []).map((v, k) => {
                                    return (
                                        <div key={k} className={`w-full p-2 flex items-center flex-col`}>
                                            <div className="posteddTime sticky top-0 z-[100000000] pointer-events-none">
                                                <div className="states brd p-2 rounded-2xl shadow-lg max-w-[200px] line-clamp-1">
                                                    {Fm(v.dt)}
                                                </div>
                                            </div>
                                            {
                                                v.data && (
                                                    <>
                                                        <div className={`gridImagepost w-full max-w-[1000px] p-2`}>
                                                            {
                                                                (v.data || []).map((val, key) => {
                                                                    return (
                                                                        <Post key={key} val={val} />
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <div className="cntName w-full pt-16 ">
                            <Toonjoy className={` w-full h-36`} />
                        </div>
                    </>
            }
        </>
    )
};

export default Home
