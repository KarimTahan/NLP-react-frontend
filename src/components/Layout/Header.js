import React from 'react';
import '../.././stylesheets/index.css';
//Nav bar Component
class Header extends React.Component {
    render(){
        return (
            //nav bar JSX
            <div className="Title">
              <h2>Novel Generator</h2>
            </div>
        );
    }
}
export default Header;