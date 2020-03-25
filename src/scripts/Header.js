import React from 'react';
import NavBar from './NavBar';
import '.././stylesheets/Header.css';

const Header = () => {
    return ( 
        <div class="header">
            <NavBar/>
            <h1>Novel Generator</h1>
        </div>
    );
}

export default Header;