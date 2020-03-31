import React from 'react';
import '../.././stylesheets/NavBar.css';
import '../.././stylesheets/index.css';
import { Link } from 'react-router-dom';
//Nav bar Component
class NavBar extends React.Component {
    render(){
        return (
            //nav bar JSX
            <div className="NavBar">
                  <div className="topnav">
                    <Link  name="tab" className="active" to="/"><b>Home</b></Link>
                    <Link  name="tab" to="/About"><b>About</b></Link>
                    <Link name="tab" to="/OurAuthors"><b>Our Authors</b></Link>
                </div>
                
            </div>
        );
    }
}
export default NavBar;