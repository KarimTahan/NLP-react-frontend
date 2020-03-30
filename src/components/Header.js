import React from 'react';
//Linker 
import { Switch, Route,BrowserRouter as Router } from 'react-router-dom';
//Components NOTE class extending React.Components
import Nav from './NavBar';
import Title from './Title';
import About from './About';
import OurAuthors from './OurAuthors';
import App from '.././index';
//Style
import '.././stylesheets/Header.css';
import '.././stylesheets/index.css';


class Header extends React.Component {
    render(){
    return ( 
        <div class="header">
            <Router>
                <div>
                    <Nav/>
                    <Switch>
                        <Route exact path="/" component={App} pattern="/Home" />
                        <Route path="/About" component={About} pattern="/About" />
                        <Route path="/OurAuthors" component={OurAuthors} pattern="/OurAuthors" />
                    </Switch>
                </div>
            </Router>
            <Title/>
        
            <br/>
        </div>
    );
    }
}

export default Header;