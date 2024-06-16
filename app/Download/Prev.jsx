import React, { useLayoutEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Prev = ({ val }) => {
    const [url, setUrl] = useState(null);
    const [d, setd] = useState(null);

    useLayoutEffect(() => {
        let blobUrl = null;

        try {
            if (val) {
                blobUrl = val.proxy.type.includes('text') ? `https://pxapi-tlo6.onrender.com/?proxy_med=${val.url}<>` : URL.createObjectURL(val.proxy);
                const obj = {
                    url: blobUrl,
                    type: val.proxy.type
                };
                setUrl(obj);
            }
        } catch (e) {
            if (blobUrl) {
                URL.revokeObjectURL(blobUrl);
            }
        }

        return () => {
            if (blobUrl) {
                URL.revokeObjectURL(blobUrl);
            }
        };
    }, [val]);

    return (
        <div className={`relative w-full`}>
            {url ? (
                <>
                    <div className="body fixed top-0 left-0 w-full">
                        {url.type.includes('image') ? (
                            <img
                                loading={`lazy`}
                                src={`${url.url}`}
                                className={`w-full h-full fixed top-0 left-0 object-contain object-center bg-[black]`}
                                alt="Preview"
                            />
                        ) : url.type.includes('video') ? (
                            <video
                                src={`${url.url}`}
                                controls
                                playsInline
                                className={`w-full h-full fixed top-0 left-0 object-contain object-center bg-[black]`}
                            />
                        ) : (
                            <iframe
                                className={`fixed top-0 left-0 w-full h-full`}
                                src={`${url.url}`}
                                frameBorder="0"
                            />
                        )}
                    </div>
                </>
            ) : (
                <div className="loading fixed top-0 left-0 w-full flex items-center justify-center h-full">
                    <CircularProgress />
                </div>
            )}
        </div>
    );
};

export default Prev;
