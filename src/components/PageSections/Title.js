import React from 'react';
import '../.././stylesheets/NavBar.css';
import '../.././stylesheets/index.css';
//Nav bar Component
class Title extends React.Component {
    render(){
        return (
            //nav bar JSX
            <div className="Title">
              <h2>Novel Generator</h2>
            </div>
        );
    }
}
export default Title;