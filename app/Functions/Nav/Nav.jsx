'use client';
import React, { useState } from 'react'
import { motion } from 'framer-motion';
// 
let Nav = () => {
    return (
        <>
         <div className="ma_box min-h-[300px] relative h-full w-full">
{/*             <i className="bi bi-x-lg brd top-2 right-2 bg-danger shadow-lg w-10 h-10 flex items-center justify-center text-lg absolute z-[10000000000]" /> */}
         <iframe className=' w-full h-full min-h-full absolute top-0 left-0' src="https://backend.toonjoy.org/admin" frameborder="0" />
         </div>
        </>
    )
};

export default Nav
