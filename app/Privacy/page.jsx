import React from 'react';
import Tags from '../Function/Tag'

export const metadata = {
    title: `ToonJoy | Security | Privacy`,
    description: ` At Toon Joy, we take your privacy and security seriously. This page outlines how we collect, use, and protect your personal information.`
}

const PrivacyPage = () => {
    return (
        <div className=" fixed flex flex-col items-center top-0 left-0 w-full h-full overflow-auto">
            {/* Navigation Bar (optional) */}
            <nav className="navbar sticky w-full top-0 left-0 z-[10000000000] bd navbar-expand-lg navbar-light  bg-[var(--d)] shadow-sm">
                <div className="container flex p-2 items-center">
                    <a className="navbar-brand" href="#">
                        <img src="../favicon1.ico" alt="Toon Joy" width="30" height="30" className="d-inline-block align-top" />
                    </a>
                    <span>ToonJoy | Security | Privacy</span>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mt-4 w-full flex items-center justify-center p-2">
                <div className=" bg-[var(--d)] p-6 rounded-lg shadow-md w-full">
                    <h1 className="text-2xl font-bold mb-4">Privacy and Security</h1>
                    <p className="mb-4 p-2">
                        At Toon Joy, we take your privacy and security seriously. This page outlines how we collect, use, and protect your personal information.
                    </p>

                    <h2 className="text-3xl font-semibold mb-3">Data Collection and Usage</h2>
                    <p className="mb-4 flex items-start gap-2 flex-col p-2">
                        We collect information when you use our website, such as your IP address, browser type, and usage patterns. This helps us improve our services and provide personalized content.
                        <br />
                        Also, We generate a unique Identification when you visit our application. Using our application doesn't require an account.
                    </p>

                    <h2 className="text-3xl font-semibold mb-3">Cookies</h2>
                    <div className="mb-4">
                        We do not use cookies to identify you.
                        <br />
                        <strong>Ways we Identify you are:</strong>
                        <ul>
                            <div className="uad  p-3 flex items-start gap-2 flex-col">
                                <li>* IP ADDRESS</li>
                            <li>* Internet Provider</li>
                            <li>* Device Resolution</li>
                            <li>* Device Type</li>
                            <li>* Device Name</li>
                            <li>* Browser Name</li>
                            <li>* Access Time (Session)</li>
                            <li>* Request Data</li>
                            </div>
                        </ul>
                    </div>

                    <h2 className="text-3xl font-semibold mb-3">Data Security</h2>
                    <div className="mb-4 p-2">
                        We implement various security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
                        <br />
                        <hr className=' p-2 mt-3' />
                        Any data being sent or responded to are encrypted (100%). You are given the ability to surff the application anonymously. Any Request made to an external endpoint using our application will hide your IP, Location, Internet Provider and more.
                    </div>

                    <h2 className="text-3xl font-semibold mb-3">Third-party Links</h2>
                    <p className="mb-4 p-2">
                        NOT IN USE FOR NOW.
                    </p>

                    <h2 className="text-3xl font-semibold mb-3">Contact Us</h2>
                    <p className="mb-4 p-2">
                        If you have any questions or concerns regarding our privacy and security practices, please contact us at <a href="mailto:jujubelt124@gmail.com">jujubelt124@gmail.com</a>.
                    </p>

                    <Tags/>
                </div>
            </div>
        </div>
    );
}

export default PrivacyPage;
