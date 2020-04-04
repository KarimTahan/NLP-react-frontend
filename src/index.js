//React Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './components/Pages/Home';
import { Switch, Route,BrowserRouter as Router } from 'react-router-dom';
//Components
//Index stylee sheet
import './stylesheets/index.css';

//NOTE: Nav bar is within header
//main app function rendering to web page
//NOTE Route is set up for NavBar wihtin components/PageSection future development (everything is set up). TODO Create pages 
/**
 * Add to additional page route
 * <Route path="/About" component={} />
 * <Route path="/OurAuthors" component={} />
 */
class App extends React.Component {
  render(){
  return (
    <div className="App"> 
      <Router>  
        <Header/>
        <Switch>
            <Route exact path="/" component={Home}  />
        </Switch>
      </Router>

      <div className="Footer">
            <Footer/>
      </div>   
    </div>
  );
  }
}
//Render to root from index.html
ReactDOM.render(<App/>,document.getElementById('root'));
export default App;//exporting  App;
