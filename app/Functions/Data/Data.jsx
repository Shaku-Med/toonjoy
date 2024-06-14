'use client';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import Objects from './Objects';
import { Connect } from '../Connect';

let Data = ({ rl, setrl, k, id }) => {
    const { setowner, owner, posts, setposts, db } = useContext(Connect);
    const [ld, setld] = useState(null);

    let getLikCmt = async (next_page) => {
        try {
            let date = new Date();
            let obj = { id };
            let ax = await axios.post(`https://backend.toonjoy.org/lk/${uuid().toUpperCase().split('-').join('')}`, {
                d: Objects.encDec(JSON.stringify(obj), `${k.a}+${window.navigator.userAgent.split(/\s+/).join('').slice(0, 6)}`),
                type: `comment`,
                next_page: next_page
            }, {
                headers: {
                    p: Objects.encDec(JSON.stringify({
                        exp: date.setSeconds(date.getSeconds() + 5)
                    }), `${window.navigator.userAgent.split(/\s+/).join('').slice(0, 6)}+${k.g}`),
                }
            });

            let dM = Objects.encDec(ax.data.d, `${id}+${k.a}+${window.navigator.userAgent.split(/\s+/).join('')}`, true, true)

            if (dM && dM.includes('{')) {
                let d = JSON.parse(dM);
                setposts((prevPosts) => {
                    const updatedPosts = prevPosts.map(post => {
                        const relatedComments = d.data.filter(comment => comment.postId === post.id);
                        if (relatedComments.length > 0) {
                            const updatedComments = relatedComments.filter(comment => !post.comments.some(c => c.id === comment.id));
                            return { ...post, comments: [...post.comments, ...updatedComments] };
                        }
                        return post;
                    });
                    return updatedPosts;
                });

            if (d.next_page) {
                getLikCmt(d.next_page);
            } else {
                setld(null);
            }
            }
        } catch (e) {
            setTimeout(() => getLikCmt(next_page), 2000);
        }
    };

    let dataget = async (next_page) => {
        try {
            let date = new Date();
            let obS = { exp: date.setSeconds(date.getSeconds() + 4), id: id };
            let ax = await axios.post(`https://backend.toonjoy.org/data/${uuid()}`, {
                data: { d: Objects.encDec(JSON.stringify(obS), k.a) },
                next_page: next_page
            });
            let d = JSON.parse(Objects.encDec(ax.data.v, `${id}`, true, true));
            setowner([d.owner]);

            let ownerObj = {
                db: `owner_cache`,
                name: `owner`,
                id: `own`,
                data: { id: `own`, value: [d.owner] }
            };
            db(ownerObj, null, null, true);

            setposts((prevPosts) => {
                const updatedPosts = prevPosts.map(post => {
                    const updatedPost = d.data.find(p => p.id === post.id);
                    return updatedPost ? { ...post, ...updatedPost } : post;
                });
                const newPosts = d.data.filter(po => !prevPosts.some(v => v.id === po.id));
                const allPosts = [...updatedPosts, ...newPosts];

                let postObj = {
                    db: `post_cache`,
                    name: `posts`,
                    id: `post`,
                    data: { id: `post`, value: allPosts }
                };
                db(postObj, null, null, true);

                return allPosts;
            });

            setld(uuid());

            if (d.next_page) {
                dataget(d.next_page);
            }
            else {
                setTimeout(dataget, 60000)
            }
        } catch {
            setTimeout(() => dataget(next_page), 2000);
        }
    };

    useEffect(() => {
        dataget();
    }, [rl]);

    useEffect(() => {
        if (ld) {
            getLikCmt();
        }
    }, [ld]);

    return null; // Return null or JSX if you need to render something
};

export default Data;
