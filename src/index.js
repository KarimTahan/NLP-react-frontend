//React Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Layout/Header';

import MasterForm from './components/Form/MasterForm'

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
    <div className="App Site">
      <div className="Site-content">
        <div className="App-header">
            <Header />
        </div>
        <div className="main">
            <MasterForm />
        </div>
        </div>

    </div>
  );
  }
}
//Render to root from index.html
ReactDOM.render(<App/>,document.getElementById('root'));
export default App;//exporting  App;
