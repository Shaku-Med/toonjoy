import React from 'react'
import Bars from './Functions/Logo/Bars';
import Logo from './Functions/Logo/Logo';
import CircularProgress from '@mui/material/CircularProgress';



let loading = () => {
    return (
        <>
            <div className="welCm text-center fixed top-0 left-0">

                <div className="bgDesign fixed top-0 left-0 w-full h-full">
                    {/*  */}
                    <Bars className="w-full h-full fixed top-0 left-0" />
                    <Bars type="c" className="w-[200px] h-[200px] fixed top-0 right-0" />
                    <Bars type="o" className="w-[300px] h-[300px] fixed bottom-0 left-0" />
                    <img alt={`design_image.png`} src={`../line.png`} className="w-[50%] opacity-[.3] h-fit object-contain fixed top-2 left-[25%] rotate-[180deg]" />
                    {/*  */}
                    <div className="BoxLeft fixed top-0 left-0 w-full h-full z-[10000] opacity-[.5] pointer-events-none" />
                    <div className="Boxright fixed top-0 left-0 w-full h-full z-[10000] opacity-[.5] pointer-events-none" />
                    <div className="MastR fixed top-0 left-0 w-full h-full z-[10000] opacity-[.3] pointer-events-none" />
                </div>

                <div className="tomD fixed top-0 left-0 w-full h-full flex items-center justify-center p-2">
                    <div className="boldTxt flex items-center justify-center flex-col gap-2 ">
                        <Logo className={` w-40 h-40 rounded-full overflow-hidden`} />
                        <div className="smTX text-5xl max-[600px]:text-4xl max-[400px]:text-3xl">
                            Welcome to <strong>ToonJoy</strong> 😜
                        </div>
                        <div className="tPs text-sm max-[600px]:text-xs opacity-[.6]">
                            Heng tight while we securly connect your to our server. Your security and privacy keeps our application running 🫡
                        </div>
                        <div className="mtM p-2">
                            <CircularProgress color={`success`} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default loading
