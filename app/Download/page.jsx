'use client'
import React, { useState } from 'react';
import Logo from '../Functions/Logo/Logo';
import Bars from '../Functions/Logo/Bars';

const Page = () => {
    const [select, setSelect] = useState('media');
    const [input, setInput] = useState('');
    const [error, seterror] = useState(null);
    // 
    const [sub, setsub] = useState('');
    let reg = /^(ftp|http|https):\/\/[^ "]+$/

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!sub) {
                setsub(true)
                if (((select === 'media' || select === 'website') && input.trim().length > 0) && reg.test(input)) {
                    let url = `https://pxapi-tlo6.onrender.com/all/download/?url=${input}`
                    let ax = await fetch(url)
                    let d = await ax.json()
                    // 
                    if (d) {
                       
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
                setsub(null)
            }
        }
        catch {
            seterror(`Something went wrong.`)
            setTimeout(() => seterror(null), 2000);
            setsub(null)
        }
    };

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
                <div className="UppPath flex items-center justify-center flex-col w-full p-2 text-center">
                    <div className="boldT capitalize w-full p-2 mt-5">
                        <h1 className={`text-8xl max-[800px]:text-6xl p-2 font-bold`}>Download Anything</h1>
                        <p className='p-2 opacity-[.6]'>Just copy and paste in your target Website or URL, and allow us do the magic</p>
                    </div>
                </div>
                <div className="UppPath flex items-center justify-center flex-col w-full p-2 text-center sticky top-0">
                    <form onSubmit={handleSubmit} className="inputPaths max-[350px]:flex-col sticky top-0 bg-[var(--mainBg)] brd rounded-xl shadow-lg overflow-hidden max-w-[800px] w-full flex items-center justify-center gap-2 p-2">
                        <div className="selectpath max-[350px]:w-full w-fit min-w-fit brd relative rounded-xl overflow-hidden p-2">
                            <select className={`outline-none w-full h-full p-1 rounded-lg bg-[var(--d)] top-0 left-0`} value={select} onChange={(e) => setSelect(e.target.value)}>
                                <option value={`media`}>Social Media</option>
                                <option value={`website`}>Website</option>
                            </select>
                        </div>
                        <div className="inputF w-full brd rounded-2xl overflow-hidden">
                            <input required placeholder={`Paste your link here.`} inputMode={`url`} type={`url`} className="" id="" value={input} onChange={(e) => setInput(e.target.value)} />
                            {
                                error ?
                                    <div className="errmsgs text-red-500">
                                        {error}
                                    </div> : ''
                            }
                        </div>
                        <button type="submit" className={`subBtns max-[350px]:w-full w-fit min-w-10 flex items-center justify-center brd h-full rounded-lg p-1 ${(((select === 'media' || select === 'website') && input.trim().length > 0) && reg.test(input)) && !sub ? `` : `dis`}`}>
                            <i className="bi bi-send rotate-[41deg]" />
                        </button>
                    </form>
                </div>
                <div className="gridPath">
                    {/* Placeholder content */}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit animi, neque assumenda sit sint eos culpa laborum repudiandae omnis vero temporibus aspernatur sed, iure, illum ipsam ut voluptate nulla ea?
                    {/* End of placeholder content */}
                </div>
            </div>
        </>
    );
};

export default Page;
