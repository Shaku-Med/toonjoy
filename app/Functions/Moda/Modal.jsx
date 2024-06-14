'use client';
import React, { useEffect } from 'react'
import {motion, useAnimation } from 'framer-motion'
// 
let Modal = ({ select, setselect, className, hasDim, mClass, children, isDrag }) => {
  // const [dragged, setDragged] = useState(false);
  const controls = useAnimation();

  let KEYEXIT = (e) => {
    try {
      if (e.key.toLowerCase() === 'escape') {
        setselect(null)
      }
    }
    catch { }
  };

  useEffect(() => {
    if (select) {
      controls.start({ opacity: .9 });
      // 
      document.addEventListener('keydown', KEYEXIT)
    } else {
      controls.start({ opacity: 0 });
      // 
      document.removeEventListener('keydown', KEYEXIT)
    }
  }, [select, controls]);

  return (
    <>
      {
        select && (
          <>
            <motion.div className={`mainBox morerep fixed top-0 left-0 w-full h-full z-[1000000000000000000000] ${mClass}`}>
              <motion.div onClick={e => {
                setselect(null)
              }} initial={{ opacity: 0 }} animate={controls} exit={{ opacity: 0 }} className={`dimLayouts fixed top-0 left-0 w-full cursor-pointer h-full ${hasDim}`} />
              <motion.div onDragEnd={(_, info) => {
                if (info.offset.y < -150 || info.offset.y > 150) {
                  setselect(null);
                }
              }} dragConstraints={{ top: 0, bottom: 0 }} dragElastic={.5} drag={isDrag ? null : 'y'} className={`z-[100000000000] ${className}`} layoutId={select}>
                {
                  isDrag ?
                    <motion.i title={` click to close or use the ESC key to close modal.`} onClick={e => {
                      setselect(null);
                    }} className="bi fixed top-3 right-5 bi-x-lg h-10 w-10 min-w-10 min-h-10 flex items-center justify-center brd rounded-xl shadow-md  z-[1000000000000] bg-[var(--baseBg)] hover:bg-[#c73a3a] hover:text-white cursor-pointer" /> : ''
                }
                {children}
              </motion.div>
            </motion.div>
          </>
        )
      }
    </>
  );
};

export default Modal
 