'use client';
import React, { useEffect, useState } from 'react'

let Logo = ({className}) => {
    const [im, setim] = useState(null)
    useEffect(() => {
        let m = window.matchMedia(`(prefers-color-scheme: dark)`)
        m.addEventListener('change', e => {
            if (m.matches) {
                setim(`../icon.png`)
            }
            else { setim(`../icon_dark.png`) }
        })
        // 
        if (m.matches) {
            setim(`../icon.png`)
        }
        else { setim(`../icon_dark.png`) }
    }, []);
    // 
    return (
        <>
            {
                im && (
                    <>
                        <img className={className} loading={`lazy`} src={im} alt="logo" />
                    </>
                )
            }
        </>
    )
};

export default Logo