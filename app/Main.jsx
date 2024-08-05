'use client';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {AnimatePresence, motion} from 'framer-motion'
import Modal from './Functions/Moda/Modal';
import Nav from './Functions/Nav/Nav';
import Logo from './Functions/Logo/Logo';
// import Post from './Functions/Post/Post';
import Bars from './Functions/Logo/Bars';
import Data from './Functions/Data/Data';
import { Connect } from './Functions/Connect';
import CircularProgress from '@mui/material/CircularProgress';
import Routing from './Router';
import { useLocation, useNavigate } from 'react-router-dom';
import Preview from './Functions/Post/Preview';


const App = ({ k, dv, db, KeepQuiet }) => {
  // const [leftWidth, setLeftWidth] = useState(400);
  let audio = new Audio()
  // 
  const [selid, setselid] = useState(null);
  const [isnav, setisnav] = useState(null);
  const [vl, setvl] = useState(null);
  // 
  const [posts, setposts] = useState([]);
  const [owner, setowner] = useState([]);
  const [imgF, setimgF] = useState([]);
  const [scrolls, setscrolls] = useState([]);
  // 
  const [rl, setrl] = useState(0);
  let loc = useLocation()
  let nav = useNavigate()

  let CImg = async (id) => {
    try {
      let f = imgF.find(v => v.id === id)
      if (f) {
        return f.url
      } else {
        let obj = {
          db: `file_cache`,
          name: `storage`,
          id: id
        };
        let gdb = await db(obj, true);
        return URL.createObjectURL(gdb)
      }
    } catch {
      return null
    }
  }

  let goBack = () => {
    const previousURL = document.referrer;
    const previousAnchor = document.createElement('a');
    previousAnchor.href = previousURL;
    const currentDomain = window.location.hostname;

    if (previousAnchor.hostname === currentDomain) {
      window.history.back();
    } else {
      nav(`../`)
    }
  };

  useEffect(() => {
    try {
      if (loc) {
        let pt = loc.pathname ? loc.pathname.toLowerCase() : ''
        setisnav(pt.includes(`/pt/`) ? true : null)
        // 
      }
    }
    catch { }
  }, [loc]);

  useEffect(() => {
    try {
      if (loc) {
        let grDbt = document.querySelector(`.grDbt`)
        if (grDbt) {
          let stoe = localStorage.getItem('scrolls')
          let sc = scrolls.length > 0 ? scrolls : stoe ? JSON.parse(stoe) : []
          let ft = sc.find(v => v.id === loc.pathname)

          let trip = () => {
            grDbt.scrollTo({
              top: ft.position,
              behavior: 'smooth'
            });
          };

          if (ft) {
            trip()
            setTimeout(trip, 500)
          }
        }
      }
    }
    catch { }
  }, [loc, owner]);

  useLayoutEffect(() => {
    let gtAs = async () => {
      try {
        let obj = {
          db: `post_cache`,
          name: `posts`,
          id: `post`,
        };
        let own = {
          db: `owner_cache`,
          name: `owner`,
          id: `own`,
        };
        
        let o = await db(own, true)
        let p = await db(obj, true)

        setposts(p ? p : [])
        setowner(o ? o : [])
      }
      catch { }
    };

    gtAs()
  }, []);

  return (
    <>
      
      <meta name="format-detection" content="telephone=no"></meta>
      <meta name="msapplication-tap-highlight" content="no" ></meta>

      <meta name="apple-mobile-web-app-capable" content="yes" ></meta>
      <meta name="apple-mobile-web-app-title" content="Toon Joy" ></meta>
      <meta name="apple-mobile-web-app-status-bar-style" content="black" ></meta>
      
      <link rel="apple-touch-icon" href="https://toonjoy.org/favicon.ico"></link>
      <link rel="shortcut icon" href="https://toonjoy.org/favicon.ico" type="image/x-icon" media="(prefers-color-scheme: dark)"></link>
      <link rel="shortcut icon" href="https://toonjoy.org/favicon1.ico" type="image/x-icon" media="(prefers-color-scheme: light)"></link>

      <link rel="preload" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" as="style"></link>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossOrigin="anonymous"></link>
      
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>

      <Connect.Provider value={{ KeepQuiet, audio, k, vl, setvl, db, dv, imgF, setimgF, CImg, owner, setowner, posts, setposts, selid, setselid }}>
        <AnimatePresence>
          <Data id={dv} k={k} setrl={setrl} posts={posts} rl={rl} setposts={setposts} />

          {
            (selid && selid !== '_id_nav_top' && vl) && (
              <>
                {
                  selid.includes('comment_') && (
                    <Modal isDrag={true} mClass={`  flex items-center justify-center h-full w-full fixed`} hasDim={`bg-[var(--mainBg)] h-full w-full`} className={` bg-[black] w-full h-full absolute top-0 `} select={selid} setselect={setselid}>
                      <Preview val={vl} />
                    </Modal>
                  )
                }
              </>
            )
          }

          {
            owner.length < 1 ?
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
                      <h1 className="smTX text-5xl max-[600px]:text-4xl max-[400px]:text-3xl">
                        Welcome to <strong>ToonJoy</strong> 😜
                      </h1>
                      <p className="tPs text-sm max-[600px]:text-xs opacity-[.6]">
                        Heng tight while we securly connect your to our server. Your security and privacy keeps our application running 🫡
                      </p>
                      <div className="mtM p-2">
                        <CircularProgress color={`success`} />
                      </div>
                    </div>
                  </div>
                </div>
              </> :
              (owner || []).map((v, k) => {
                return (
                  <motion.div key={k} className="grid_point fixed top-0 left-0 w-full h-full flex items-center justify-start">

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

                    <motion.div layoutId='layid' className="rightPoints fixed top-0 left-0 z-[1000000000000000000]  h-full w-full flex items-start justify-between flex-col">

                      {
                        !isnav ?
                          <>
                            {
                              selid && selid === '_id_nav_top' ?
                                <Modal isDrag={true} mClass={`  flex items-center justify-center p-2`} hasDim={`bg-[var(--mainBg)]`} className={`bg-[var(--basebg)] rpSst brd p-2 overflow-auto w-full itemaidnalsin max-w-[800px] h-full max-h-[560px]`} select={selid} setselect={setselid}>
                                  <Nav />
                                </Modal> : ''
                            }
                            <motion.div layoutId={`nav`} className="rpSst z-[100000] w-full absolute p-2 flex items-center justify-center">
                              <motion.div className="tableft overflow-hidden shadow-lg  max-w-[800px] rounded-full brd flex items-center justify-center gap-2 w-full bg-[var(--dimbg)] backdrop-blur-lg">
                                <motion.div className="mssst min-w-fit">
                                  <Logo className={` w-12 h-12`} />
                                </motion.div>
                                <motion.div className="tj  min-w-fit w-full text-xl uppercase flex items-center justify-center gap-2">
                                  <span>Toon Joy</span>
                                </motion.div>
                                <motion.div onClick={e => setselid(`_id_nav_top`)} layoutId={`_id_nav_top`} className="sin  min-w-10 min-h-fit bl flex items-center justify-center text-2xl p-2 cursor-pointer h-full w-12">
                                  <i className="bi bi-plus h-full w-full" />
                                </motion.div>
                                <motion.div onClick={e => nav(`../Download`)} className="sin  min-w-10 min-h-fit bl flex items-center justify-center text-2xl p-2 cursor-pointer h-full w-12">
                                  <i className="bi bi-download h-full w-full" />
                                </motion.div>
                              </motion.div>
                            </motion.div>
                          </> :
                          <>
                            <motion.div  onClick={e => nav(`../`)} className={`goBak fixed ${selid && selid !== '_id_nav_top' ? `` : `z-[100000]`} w-10 flex items-center justify-center h-10 min-w-10 transition-all brd rounded-full top-3 left-3 cursor-pointer bg-[var(--dimbg)] opacity-[.3] hover:opacity-[1]`}>
                              <i className="bi bi-house" />
                            </motion.div>
                            <motion.div layoutId='nav' onClick={e => goBack()} className={`goBak fixed ${selid && selid !== '_id_nav_top' ? `` : `z-[100000]`} w-10 flex items-center justify-center h-10 min-w-10 transition-all brd rounded-full top-3 left-14 cursor-pointer bg-[var(--dimbg)] opacity-[.3] hover:opacity-[1]`}>
                              <i className="bi bi-arrow-left" />
                            </motion.div>
                          </>
                      }

                      <motion.div onScroll={e => {
                        let stoe = localStorage.getItem('scolls')
                        let sc = scrolls.length > 0 ? scrolls : stoe ? JSON.parse(stoe) : []
                        let ft = sc.find(v => v.id === loc.pathname)
                        if (ft) {
                          ft.position = e.target.scrollTop
                          setscrolls(sc)
                          localStorage.setItem(`scrolls`, JSON.stringify(sc))
                        }
                        else {
                          let np = {
                            id: loc.pathname,
                            position: e.target.scrollTop
                          }
                          sc.push(np)
                          setscrolls(sc)
                          localStorage.setItem(`scrolls`, JSON.stringify(sc))
                        }
                      }} initial={{ scale: .5 }} layoutId={selid} animate={{ scale: 1 }} className={`grDbt ${!isnav ? `pt-16` : ` fixed top-0 left-0`} h-full overflow-x-hidden overflow-y-auto w-full`}>
                        <Routing />
                      </motion.div>
            
                    </motion.div>
                  </motion.div>
                )
              })
          }
        </AnimatePresence>
      </Connect.Provider>
      
    </>
  );
};

export default App;
