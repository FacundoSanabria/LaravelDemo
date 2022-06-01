import React from 'react'
import {Routes, BrowserRouter, Route} from 'react-router-dom'

import Home from './HomePage/Home';
import Other from './OtherPage/Other';
import Error404 from './Error404';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/other" element={<Other/>}/>
                <Route path="*" element={<Error404/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default Router;