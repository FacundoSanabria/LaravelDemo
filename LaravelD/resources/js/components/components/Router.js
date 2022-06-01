import React from 'react'
import {Routes, BrowserRouter, Route} from 'react-router-dom'

import Home from './HomePage/Home';
import Other from './OtherPage/Other';
import Error404 from './Error404';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/public" element={<Home/>}/>
                <Route path="/public/other" element={<Other/>}/>
                <Route path="/public/*" element={<Error404/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default Router;