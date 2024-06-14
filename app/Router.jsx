import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Functions/Post/Home';
import Pt from './Functions/Post/Pt';

let Routing = () => {
    let location = useLocation();
    // location={location} key={location.pathname}
    return (
        <Routes>
            <Route path='*' element={<Home/>} />
            <Route path='/pt/:id' element={<Pt/>} />
        </Routes>
    )
};

export default Routing
