import React from 'react'
import {Toaster} from 'react-hot-toast';

function Main(props) {
    return (
        <div id="main" className="main" style={{'minHeight': 'calc(100vh - 112px)'}}>
            <Toaster
                position='bottom-right'
                reverseOrder='false'
            />
            {props.children}
        </div>
    )
}
export default Main;