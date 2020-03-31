//React Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/PageSections/Header';
import Footer from './components/PageSections/Footer';
import Home from './components/Pages/Home';
import About from './components/Pages/About';
import OurAuthors from './components/Pages/OurAuthors';
import { Switch, Route,BrowserRouter as Router } from 'react-router-dom';
//Components
//Index stylee sheet
import './stylesheets/index.css';

//NOTE: Nav bar is within header
//main app function rendering to web page
class App extends React.Component {
  render(){
  return (
    <div className="App"> 
      <Router>
        <Header/>
        <Switch>
            <Route exact path="/" component={Home}  />
            <Route path="/About" component={About} />
            <Route path="/OurAuthors" component={OurAuthors} />
            <Route path="/submitted" pattern="/submitted"/>
        </Switch>
      </Router>
    <Footer/>   
    </div>
  );
  }
}
//Render to root from index.html
ReactDOM.render(<App/>,document.getElementById('root'));
export default App;//exporting  App;
