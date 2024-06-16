'use client';
import React, { useEffect, useState } from 'react';
import Main from './Main'
import GetK from './Functions/Data/GetK';
import Key from './Functions/Data/Keys';
import { BrowserRouter } from 'react-router-dom';
import Bars from './Functions/Logo/Bars';
import Logo from './Functions/Logo/Logo';
import CircularProgress from '@mui/material/CircularProgress';



function getCanvasFingerprint() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.textBaseline = 'top';
  ctx.font = '14px Arial';
  ctx.fillStyle = '#f60';
  ctx.fillRect(125, 1, 62, 20);
  ctx.fillStyle = '#069';
  ctx.fillText('Hello, World!', 2, 15);
  ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
  ctx.fillText('Hello, World!', 4, 17);
  return canvas.toDataURL();
}

function getWebGLFingerprint() {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
  const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
  return vendor + '|' + renderer;
}

function getFontFingerprint() {
  const baseFonts = ['monospace', 'sans-serif', 'serif'];
  const testString = 'mmmmmmmmmmlli';
  const testSize = '72px';
  const testSpan = document.createElement('span');
  testSpan.style.fontSize = testSize;
  testSpan.innerHTML = testString;
  const defaultWidth = {};
  const defaultHeight = {};
  baseFonts.forEach(font => {
    testSpan.style.fontFamily = font;
    document.body.appendChild(testSpan);
    defaultWidth[font] = testSpan.offsetWidth;
    defaultHeight[font] = testSpan.offsetHeight;
    document.body.removeChild(testSpan);
  });

  const fonts = ['Arial', 'Courier New', 'Georgia', 'Times New Roman', 'Verdana'];
  const detectedFonts = [];
  fonts.forEach(font => {
    const span = document.createElement('span');
    span.style.fontSize = testSize;
    span.innerHTML = testString;
    span.style.fontFamily = font + ',' + baseFonts[0];
    document.body.appendChild(span);
    const matched = (span.offsetWidth !== defaultWidth[baseFonts[0]] || span.offsetHeight !== defaultHeight[baseFonts[0]]);
    document.body.removeChild(span);
    if (matched) {
      detectedFonts.push(font);
    }
  });
  return detectedFonts.join(',');
}

function getDeviceCharacteristics() {
  return [
    window.navigator.platform,
    window.navigator.language,
    window.screen.width,
    window.screen.height,
    window.screen.colorDepth,
    new Date().getTimezoneOffset(),
    window.navigator.hardwareConcurrency,
    window.navigator.maxTouchPoints,
  ].join('||');
}

function hashString(str) {
  let hash = 0,
    i, chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return hash;
}

let getOrCreateUniqueId = async(hasData, isadd, isall, shouldadd) => {
  try {
    const dbRequest = indexedDB.open(`${hasData ? hasData.db : `deviceIdentifierDB`}`, 1);

    return new Promise((resolve, reject) => {
      dbRequest.onupgradeneeded = event => {
        const db = event.target.result;
        db.createObjectStore(`${hasData ? hasData.name : `deviceIdentifierStore`}`, { keyPath: 'id' });
      };

      dbRequest.onsuccess = event => {
        const db = event.target.result;
        const transaction = db.transaction(`${hasData ? hasData.name : `deviceIdentifierStore`}`, 'readwrite');
        const store = transaction.objectStore(`${hasData ? hasData.name : `deviceIdentifierStore`}`);

        if (!isall) {
          const getRequest = store.get(`${hasData ? hasData.id : `deviceId`}`);
          getRequest.onsuccess = () => {
            let uniqueId = getRequest.result ? getRequest.result.value : null;

            if ((!uniqueId && !isadd) || shouldadd) {
              const canvasFingerprint = getCanvasFingerprint();
              const webGLFingerprint = getWebGLFingerprint();
              const fontFingerprint = getFontFingerprint();
              const deviceCharacteristics = getDeviceCharacteristics();

              const combined = canvasFingerprint + '||' + webGLFingerprint + '||' + fontFingerprint + '||' + deviceCharacteristics;
              uniqueId = hashString(combined);

              store.put(hasData ? hasData.data : { id: 'deviceId', value: uniqueId });
            }

            resolve(uniqueId);
          };

          getRequest.onerror = () => {
            reject('Failed to retrieve device ID');
          };
        } else {
          // const getAllRequest = store.getAll();
          // console.log(getAllRequest)
        }
      };

      dbRequest.onerror = () => {
        reject('Failed to open IndexedDB');
      };
    });
  } catch {}
};

const getKeys = async () => {
  try {
    let id = await getOrCreateUniqueId();
    if (id) {
      let gk = await GetK(id)
      if (gk) {
        let k = await Key(gk, id)
        if (k) {

          let KeepQuiet = () => {
            try {
              const mediaElements = document.querySelectorAll('video, audio');
              if (mediaElements.length > 0) {
                mediaElements.forEach(media => {
                  media.addEventListener('play', function () {
                    mediaElements.forEach(otherMedia => {
                      if (otherMedia !== media && !otherMedia.paused) {
                        otherMedia.pause();
                      }
                    });
                  });
                });
              } else {
                setTimeout(KeepQuiet, 1000)
              }
            } catch {
              setTimeout(KeepQuiet, 1000)
            }
          };

          setInterval(KeepQuiet, 200)

          return (
              <BrowserRouter>
                  <Main db={getOrCreateUniqueId} KeepQuiet={KeepQuiet} dv={id} k={k} />
              </BrowserRouter>
          );
        } else {
          return (
            <div className="cnts fixed flex-col gap-2 text-center p-2 top-0 left-0 w-full h-full flex items-center justify-center">
              <div className="bolTt text-xl text-center p-2 uppercase text-red-500">
                Verification Failed | Please try on a faster network.
              </div>
            </div>
          )
        }
      } else {
        return (
          <div className="cnts fixed flex-col gap-2 text-center p-2 top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="bolTt text-xl text-center p-2 uppercase text-red-500">
              Verification Failed |  Please try on a faster network.
            </div>
          </div>
        )
      }
    } else {
      return (
        <div className="cnts fixed flex-col gap-2 text-center p-2 top-0 left-0 w-full h-full flex items-center justify-center">
          Failed to auth.
        </div>
      )
    }
  } catch (e) {
    return (
      <div className="cnts fixed flex-col gap-2 text-center p-2 top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="bolTt text-xl text-center p-2 uppercase text-red-500">
          Sorry, We were unable to get your device unique ID
        </div>
        <div className="smt text-sm opacity-[.6] capitalize">
          We require that id to identify you. We do not use cookies as they can be modified. For high security, we require your device unique ID.
        </div>
      </div>
    )
  }
};

const Index = () => {
  const [component, setComponent] = useState(
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
  );

  useEffect(() => {
    (async () => {
      const comp = await getKeys();
      setComponent(comp);
    })();
  }, []);

  return component;
};

export default Index;
