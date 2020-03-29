import React from 'react';
import '.././stylesheets/NavBar.css';
import '.././stylesheets/index.css';

//Nav bar Component
const NavBar = () => {
    return (
        //nav bar JSX
        <div className="NavBar">
              <div class="topnav">
                <a class="active" href="index.js"><b>Home</b></a>
                <a href="About.html"><b>About</b></a>
                <a href="OurAuthors.html"><b>Our Authors</b></a>
            </div>
        </div>
    );
}

export default NavBar;