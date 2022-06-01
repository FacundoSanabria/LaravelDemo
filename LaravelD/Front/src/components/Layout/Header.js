import React from 'react'

function Header() {
    return (
        <div id='header'>
            <div className="row w-100">
                <div className="col text-center border">
                    <a className="nav-link" href="/">HOME</a>
                </div>
                <div className="col text-center border">
                    <a className="nav-link" href="/Other">OTHER PAGE</a>
                </div>
            </div>
        </div>
    )
}
export default Header;