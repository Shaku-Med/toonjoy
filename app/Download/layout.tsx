import React from "react";
import dotenv from 'dotenv'
import { Metadata, Viewport } from "next";
dotenv.config()

const inter = {
  className: "inter-font-class"
};

export const metadata: Metadata  = {
  title: 'Toon Joy - Download anything on the internet',
  description: 'Toon Joy downloads. You can now download anything on the internet on toonjoy.org/download, just copy your target link and paste on toonjoy.org/download input and wait for us to work the magic.',
  manifest: `https://toonjoy.org/manifest.json`,
};

let layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>{children}</>
  );
};

export default layout