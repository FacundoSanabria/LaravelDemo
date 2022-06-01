import React from 'react'
import {Routes, BrowserRouter, Route} from 'react-router-dom'
import toast, {Toaster} from "react-hot-toast";

//Middleware 
import axios from 'axios';
import { Service } from 'axios-middleware';

const service = new Service(axios);

service.register({
  onRequest(config) {
    // console.log('onRequest', config);
    return config;
  },
  onRequestError(error) {
    // console.log('onRequestError', error)
  },
  onSync(promise) {
    // console.log('onSync', promise);
    return promise;
  },
  onResponse(response) {
    // console.log('onResponse', response);
    return response;
  },
  onResponseError(error) {
    if(error.response.status == 422){
      let data = JSON.parse(error.response.data)
      let errors = Object.values(data.errors)
      errors.forEach(e=>{
       e.forEach(txt=>{
         toast.error(txt)
       })
      })
    }
    if(error.response.status == 403){
      window.location.href = window.location.origin+"/admin/unauthorized";
    }
  }
});


import Home from './HomePage/Home';
import Other from './OtherPage/Other';
import Error404 from './Error404';

function Router() {
    return (
        <BrowserRouter>
            <Toaster
                position='bottom-right'
                reverseOrder='false'
            />
            <Routes>
                <Route path="/public" element={<Home/>}/>
                <Route path="/public/other" element={<Other/>}/>
                <Route path="/public/*" element={<Error404/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default Router;