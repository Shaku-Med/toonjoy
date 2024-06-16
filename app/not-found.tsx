'use client';
import App from "./App"
import Page from "./Download/page"

let NotFound = () => {
  try {
    return (
      <>
        {
          window.location.href.toLowerCase().includes('download') || window.location.href.toLowerCase().includes('downloads') ?
            <Page /> :
            <App />
        }
      </>
    )
  }
  catch {
    return <App />
  }
};

export default NotFound
