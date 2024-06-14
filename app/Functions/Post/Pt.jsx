'use client';
import React, { useContext, useEffect, useState } from 'react'
import { Connect } from '../Connect'
import { useLocation } from 'react-router-dom';
import Post from './Post';

let Pt = () => {
    const { posts, setposts } = useContext(Connect);
    const loc = useLocation()
    const [data, setdata] = useState([])

    useEffect(() => {
        try {
            let ft = posts.find(v => v.id === loc.pathname.split('/pt/')[1])
            if (ft) {
                setdata([ft])
            }
            else {
                setdata([])
            }
        }
        catch {
            setdata([])
        }
    }, [loc.pathname, posts]);

  return (
      <>
          {
              data.length < 1 ?
                  <>
                      <div className="loads w-full flex items-center justify-center p-2 text-center uppercase font-bold text-2xl fixed top-0 left-0 h-full bg-[var(--basebg)]">
                          <div className="symts">
                              Unable to find post.
                          </div>
                      </div>
                  </> :
                  <>
                      {
                          (data || []).map((v, k) => {
                              return (
                                  <Post ispost={true} key={k} val={v}/>
                              )
                          })
                      }
                  </>
          }
      </>
  )
}

export default Pt
