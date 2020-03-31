import React from 'react';
//Components NOTE class extending React.Components
import Nav from './NavBar';
import Title from './Title';
//Style
import '../.././stylesheets/Header.css';
import '../.././stylesheets/index.css';


class Header extends React.Component {
    render(){
    return ( 
        <div className="header">
            <div>
                <Nav/>
            </div>
            <Title/>
        
            <br/>
        </div>
    );
    }
}
export default Header;