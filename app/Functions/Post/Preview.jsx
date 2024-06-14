'use client';
import React from 'react'
import Img from '../Img/Img'

let Preview = ({ val }) => {
    return (
        <>
            {
                val && (
                    <div className="moddivPt z-[100000000] w-full h-full flex items-center justify-center relative">
                        <Img hasFile={val.type.includes('image') ? null : true} val={val} src={val.url} id={`${val.time}`} loading={`lazy`} className={`h-full w-full  object-contain object-center bg-[black]`} />
                    </div>
                )
            }
        </>
    )
};

export default Preview
