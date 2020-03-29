import React from 'react';
import NavBar from './NavBar';
import '.././stylesheets/Header.css';
import '.././stylesheets/index.css';
import Title from './Title';

const Header = () => {
    return ( 
        <div class="header">
            <NavBar/>
            <Title/>
            <br/>
        </div>
    );
}

export default Header;