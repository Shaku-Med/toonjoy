'use client';

const getCanvasFingerprint = () => {
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
};

const getWebGLFingerprint = () => {
    const canvas = document.createElement('canvas');
    const gl =
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl');
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const vendor = gl.getParameter(
        debugInfo.UNMASKED_VENDOR_WEBGL
    );
    const renderer = gl.getParameter(
        debugInfo.UNMASKED_RENDERER_WEBGL
    );
    return vendor + '|' + renderer;
};

const getFontFingerprint = () => {
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

    const fonts = [
        'Arial',
        'Courier New',
        'Georgia',
        'Times New Roman',
        'Verdana',
    ];
    const detectedFonts = [];
    fonts.forEach(font => {
        const span = document.createElement('span');
        span.style.fontSize = testSize;
        span.innerHTML = testString;
        span.style.fontFamily = font + ',' + baseFonts[0];
        document.body.appendChild(span);
        const matched =
            span.offsetWidth !== defaultWidth[baseFonts[0]] ||
            span.offsetHeight !== defaultHeight[baseFonts[0]];
        document.body.removeChild(span);
        if (matched) {
            detectedFonts.push(font);
        }
    });
    return detectedFonts.join(',');
};

const getDeviceCharacteristics = () => {
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
};

const hashString = str => {
    let hash = 0,
        i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
    }
    return hash;
};

const getOrCreateUniqueId = async (
    hasData,
    isadd,
    isall,
    shouldadd,
    isDelete
) => {
    try {
        const dbRequest = indexedDB.open(
            `${hasData ? hasData.db : 'deviceIdentifierDB'}`,
            1
        );

        return new Promise((resolve, reject) => {
            dbRequest.onupgradeneeded = event => {
                const db = event.target.result;
                db.createObjectStore(
                    `${hasData
                        ? hasData.name
                        : 'deviceIdentifierStore'
                    }`,
                    { keyPath: 'id' }
                );
            };

            dbRequest.onsuccess = event => {
                const db = event.target.result;
                const transaction = db.transaction(
                    `${hasData
                        ? hasData.name
                        : 'deviceIdentifierStore'
                    }`,
                    'readwrite'
                );
                const store = transaction.objectStore(
                    `${hasData
                        ? hasData.name
                        : 'deviceIdentifierStore'
                    }`
                );

                if (isDelete) {
                    const deleteRequest = store.delete(
                        `${hasData ? hasData.id : 'deviceId'}`
                    );
                    deleteRequest.onsuccess = () => {
                        resolve(`Deleted record with ID: ${hasData ? hasData.id : 'deviceId'}`);
                    };
                    deleteRequest.onerror = () => {
                        reject('Failed to delete device ID');
                    };
                } else if (!isall) {
                    const getRequest = store.get(
                        `${hasData ? hasData.id : 'deviceId'}`
                    );
                    getRequest.onsuccess = () => {
                        let uniqueId = getRequest.result
                            ? getRequest.result.value
                            : null;

                        if ((!uniqueId && !isadd) || shouldadd) {
                            const canvasFingerprint = getCanvasFingerprint();
                            const webGLFingerprint = getWebGLFingerprint();
                            const fontFingerprint = getFontFingerprint();
                            const deviceCharacteristics = getDeviceCharacteristics();

                            const combined =
                                canvasFingerprint +
                                '||' +
                                webGLFingerprint +
                                '||' +
                                fontFingerprint +
                                '||' +
                                deviceCharacteristics;
                            uniqueId = hashString(combined);

                            store.put(
                                hasData
                                    ? hasData.data
                                    : { id: 'deviceId', value: uniqueId }
                            );
                        }

                        resolve(uniqueId);
                    };

                    getRequest.onerror = () => {
                        reject('Failed to retrieve device ID');
                    };
                } else {
                    let data = [];
                    store.openCursor().onsuccess = event => {
                        const cursor = event.target.result;
                        if (cursor) {
                            data.push(cursor.value);
                            cursor.continue();
                        } else {
                            resolve(data);
                        }
                    };
                }
            };

            dbRequest.onerror = () => {
                reject('Failed to open IndexedDB');
            };
        });
    } catch (error) {
        console.error('Error in getOrCreateUniqueId:', error);
    }
};

export default getOrCreateUniqueId;
