'use client';
import React, { useLayoutEffect } from 'react'
import getOrCreateUniqueId from './Function/GetId'
import Objects from './Function/Objects'
import GetK from './Function/GetK'
import Key from './Function/Keys'
import Firebase from './Function/Firebase'
// 
import Cookies from 'js-cookie'

let Home = () => {
    let c = async () => {
        try {
            let id = await getOrCreateUniqueId()
            if (id) {
                let gk = await GetK(id)
                if (gk) {
                    let k = await Key(gk, id)
                    if (k) {
                        Cookies.set(`id`, id, {
                            expires: 1,
                            secure: process.env.NODE_ENV === "production",
                            sameSite: "strict"
                        })
                    }
                }
            }
        }
        catch (e) {
            console.log(e)
        }
    };
    
    useLayoutEffect(() => {
        c()
    }, [])
    
    return (
        <div>
            <Firebase/>
        </div>
    )
};

export default Home
