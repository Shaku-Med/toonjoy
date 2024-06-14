import "./globals.css";
import React from "react";
import dotenv from 'dotenv'
import { Metadata, Viewport } from "next";
import Head from "next/head";
import Script from "next/script";
dotenv.config()

const inter = {
  className: "inter-font-class"
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ececec' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0f0f' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: 'Toon Joy - All the Comedy Videos You Love',
  description: 'Toon Joy offers a collection of the funniest comedy videos on the internet. Join us for endless laughter and joy.',
  keywords: 'Toon Joy, comedy videos, funny clips, humor, laughter, entertainment',
  authors: [{
    name: `Medzy Amara`,
    url: `https://facebook.com/medzy.amara.1`
  }],
  icons: [
    { rel: 'shortcut icon', url: `../favicon.ico`, media: `(prefers-color-scheme: dark)`, type: `image/x-icon` },
    { rel: 'shortcut icon', url: `../favicon1.ico`, media: `(prefers-color-scheme: light)`, type: `image/x-icon` },
    { rel: 'apple-touch-icon', url: `../favicon.ico` }
  ],
  // siteName: 'Toon Joy',
  // canonicalUrl: 'https://toonjoy.org',
  // faviconDark: '../favicon.ico',
  // faviconLight: '../favicon1.ico',
  // themeColorLight: '#ececec',
  // themeColorDark: '#0f0f0f',
  manifest: `../manifest.json`,
  twitter: {
    card: 'summary_large_image',
    title: 'Toon Joy - All the Comedy Videos You Love',
    description: 'Toon Joy offers a collection of the funniest comedy videos on the internet. Join us for endless laughter and joy.',
    images: './fav.png',
  },
  openGraph: {
    type: 'website',
    url: 'https://toonjoy.org',
    title: 'Toon Joy - All the Comedy Videos You Love',
    description: 'Toon Joy offers a collection of the funniest comedy videos on the internet. Join us for endless laughter and joy.',
    images: './fav.png',
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
  //   { href: '../favicon.ico', as: 'image' },
  //   { href: '../favicon1.ico', as: 'image' },
  //   { href: 'https://proxy-sie9.onrender.com', as: 'image', crossorigin: 'anonymous' },
  // ],
};


let RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>{children}</main>

        <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossOrigin="anonymous"></Script>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossOrigin="anonymous"></Script>

      </body>
    </html>
  );
};

export default RootLayout