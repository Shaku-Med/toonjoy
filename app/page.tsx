import React from 'react'
import App from './App'
import Objects from './Function/Objects'
import { cookies } from 'next/headers'
// 
import { Metadata, Viewport } from "next";
// 

export const metadata: Metadata = {
  title: 'Toon Joy - All the Comedy Videos You Love',
  description: 'Toon Joy offers a collection of the funniest comedy videos on the internet. Join us for endless laughter and joy.',
  keywords: 'Toon Joy, comedy videos, funny clips, humor, laughter, entertainment',
  authors: [{
    name: `Medzy Amara`,
    url: `https://facebook.com/medzy.amara.1`
  }],
  icons: [
    { rel: 'shortcut icon', url: `https://toonjoy.org/favicon.ico`, media: `(prefers-color-scheme: dark)`, type: `image/x-icon` },
    { rel: 'shortcut icon', url: `https://toonjoy.org/favicon1.ico`, media: `(prefers-color-scheme: light)`, type: `image/x-icon` },
    { rel: 'apple-touch-icon', url: `https://toonjoy.org/fav.png` }
  ],
  // siteName: 'Toon Joy',
  // canonicalUrl: 'https://toonjoy.org',
  // faviconDark: 'https://toonjoy.org/favicon.ico',
  // faviconLight: 'https://toonjoy.org/favicon1.ico',
  // themeColorLight: '#ececec',
  // themeColorDark: '#0f0f0f',
  manifest: `https://toonjoy.org/manifest.json`,
  twitter: {
    card: 'summary_large_image',
    title: 'Toon Joy - All the Comedy Videos You Love',
    description: 'Toon Joy offers a collection of the funniest comedy videos on the internet. Join us for endless laughter and joy.',
    images: 'https://toonjoy.org/fav.png',
  },
  openGraph: {
    type: 'website',
    url: 'https://toonjoy.org',
    title: 'Toon Joy - All the Comedy Videos You Love',
    description: 'Toon Joy offers a collection of the funniest comedy videos on the internet. Join us for endless laughter and joy.',
    images: 'https://toonjoy.org/fav.png',
    siteName: 'Toon Joy',
  },
  // apple: {
  //   mobileWebAppCapable: 'yes',
  //   mobileWebAppTitle: 'Toon Joy',
  //   mobileWebAppStatusBarStyle: 'black',
  // },
  // structuredData: {
  //   '@context': 'https://schema.org',
  //   '@type': 'Organization',
  //   name: 'Toon Joy',
  //   url: 'https://toonjoy.org',
  //   logo: 'https://toonjoy.org/favicon.ico',
  //   sameAs: [
  //     'https://www.facebook.com/toonjoy',
  //     'https://www.twitter.com/toonjoy',
  //     'https://www.instagram.com/toonjoy'
  //   ],
  // },
  // scripts: [
  //   { type: 'module', src: 'https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.esm.js' },
  //   { nomodule: true, src: 'https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.js' },
  // ],
  // stylesheets: [
  //   'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css',
  //   { href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css', integrity: 'sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN', crossorigin: 'anonymous' },
  //   'https://cdn.jsdelivr.net/npm/@ionic/core/css/ionic.bundle.css',
  // ],
  // preloads: [
  //   { href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css', as: 'style' },
  //   { href: 'https://toonjoy.org/favicon.ico', as: 'image' },
  //   { href: 'https://toonjoy.org/favicon1.ico', as: 'image' },
  //   { href: 'https://proxy-sie9.onrender.com', as: 'image', crossorigin: 'anonymous' },
  // ],
};

function page() {
  return (
    <div>
      <App />
    </div>
  )
}

export default page
