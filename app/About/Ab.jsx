'use client'
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs/lib/anime.es.js';
import Modal from '../Functions/Moda/Modal';
import Tags from '../Function/Tag'


const Ab = () => {
    const [select, setselect] = useState(null);

    useEffect(() => {
        anime({
            targets: '.anime-text',
            translateY: [50, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            delay: anime.stagger(100)
        });
    }, []);


    return (
        <>
            
            <div className="min-h-screen fixed top-0 left-0 w-full h-full overflow-auto flex flex-col items-center justify-start px-4 py-8">
                {
                    select && (
                        <Modal mClass={`  flex items-center justify-center p-2`} hasDim={`bg-[var(--mainBg)]`} className={`bg-[transparent] rounded-xl rpSst overflow-auto w-fit h-fit itemaidnalsin max-w-[800px] max-h-[560px]`} select={select} setselect={setselect}>
                            {
                                select === 'mission' ? (
                                    <>
                                        <motion.div className="w-full  transition-all anime-text">
                                            <div className="bg-[var(--d)] brd shadow-lg rounded-lg p-6">
                                                <i className="bi bi-camera-reels-fill text-8xl p-2 w-full text-center text-yellow-500 mb-4"></i>
                                                <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
                                                <p className={``}>Toon Joy aims to bring smiles to millions by offering a curated collection of the funniest comedy videos on the internet. Our mission is
                                                    to spread happiness, one video at a time. We believe in the power of laughter to uplift spirits and connect people across the globe.
                                                    Through our carefully selected content, we strive to create a platform that celebrates humor in all its forms, from timeless classics to
                                                    cutting-edge viral sensations.</p>
                                            </div>
                                            <Tags/>
                                        </motion.div>
                                    </>
                                ) : select === 'choise' ? (
                                    <>
                                        <motion.div className="w-full  transition-all">
                                            <div className="bg-[var(--d)] brd shadow-lg rounded-lg p-6">
                                                <i className="bi bi-emoji-laughing-fill text-8xl p-2 text-center w-full text-red-500 mb-4"></i>
                                                <h2 className="text-2xl font-semibold mb-2">Why Choose Us?</h2>
                                                <p className={``}>At Toon Joy, we pride ourselves on delivering top-quality entertainment that guarantees laughs. Our team of passionate curators scours
                                                    the web to bring you the best comedy content available. Whether you're into timeless gags, clever satire, or the latest viral hits, Toon
                                                    Joy has something for everyone. Join us in celebrating the art of laughter and discover why millions of viewers choose us as their
                                                    go-to source for comedic relief and entertainment.</p>
                                                </div>
                                                <Tags/>
                                        </motion.div>
                                    </>
                                ) : (
                                    <motion.div className="w-full cursor-pointer  transition-all">
                                        <div className="bg-[var(--d)] brd shadow-lg rounded-lg p-6">
                                            <i className="bi bi-people-fill text-8xl text-center w-full p-2 text-green-500 mb-4"></i>
                                            <h2 className="text-2xl font-semibold mb-2">Join Our Community</h2>
                                            <p className={``}>Become a part of the Toon Joy community and connect with fellow comedy enthusiasts from around the world. Follow us on social media to
                                                stay updated on the latest trends and share your favorite funny moments with our growing community. Whether you're a casual viewer or a
                                                die-hard fan, Toon Joy offers a welcoming space where laughter knows no bounds. Join us today and let's spread joy together, one
                                                chuckle at a time.</p>
                                                </div>
                                                <Tags/>
                                    </motion.div>
                                )

                            }
                        </Modal>
                    )
                }
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center mb-8">
                        <motion.h1 className="text-4xl font-bold mb-4 anime-text">About Toon Joy</motion.h1>
                        <motion.p className="text-lg mb-6 anime-text">Your ultimate destination for endless laughter and joy!</motion.p>
                    </div>
                    <div className="flex flex-wrap justify-center">
                        <motion.div onClick={e => setselect('mission')} layoutId={`mission`} className="w-full cursor-pointer hover:brightness-200 transition-all md:w-1/2 lg:w-1/3 p-4 anime-text" whileHover={{ scale: 1.05 }}>
                            <div className="bg-[var(--d)] brd shadow-lg rounded-lg p-6">
                                <i className="bi bi-camera-reels-fill text-6xl text-yellow-500 mb-4"></i>
                                <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
                                <p className={`line-clamp-3`}>Toon Joy aims to bring smiles to millions by offering a curated collection of the funniest comedy videos on the internet. Our mission is to spread happiness, one video at a time.</p>
                            </div>
                        </motion.div>
                        <motion.div onClick={e => setselect('choise')} layoutId={`choise`} className="w-full cursor-pointer hover:brightness-200 transition-all md:w-1/2 lg:w-1/3 p-4 anime-text" whileHover={{ scale: 1.05 }}>
                            <div className="bg-[var(--d)] brd shadow-lg rounded-lg p-6">
                                <i className="bi bi-emoji-laughing-fill text-6xl text-red-500 mb-4"></i>
                                <h2 className="text-2xl font-semibold mb-2">Why Choose Us?</h2>
                                <p className={`line-clamp-3`}>At Toon Joy, we handpick the most hilarious clips, ensuring you get top-quality entertainment. From classic gags to the latest viral videos, we've got it all covered.</p>
                            </div>
                        </motion.div>
                        <motion.div onClick={e => setselect('join')} layoutId={`join`} className="w-full cursor-pointer hover:brightness-200 transition-all md:w-1/2 lg:w-1/3 p-4 anime-text" whileHover={{ scale: 1.05 }}>
                            <div className="bg-[var(--d)] brd shadow-lg rounded-lg p-6">
                                <i className="bi bi-people-fill text-6xl text-green-500 mb-4"></i>
                                <h2 className="text-2xl font-semibold mb-2">Join Our Community</h2>
                                <p className={`line-clamp-3`}>Become a part of the Toon Joy community. Follow us on social media, share your favorite videos, and connect with other comedy lovers around the world.</p>
                            </div>
                        </motion.div>
                    </div>
                    <Tags/>
                </div>
            </div>
        </>
    );
};

export default Ab;
