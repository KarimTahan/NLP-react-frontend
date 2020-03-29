//React Libraries
import React from 'react';
import ReactDOM from 'react-dom';
//Components
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';

//Index stylee sheet
import './stylesheets/index.css';

//NOTE: Nav bar is within header
//main app function rendering to web page
function App() {
  return (
    <div className="App">
        <div className="top">
            <Header/> 
        </div>
        <br/>
        <div className="middle">
            <Content/>
        </div>
      
        <div className="Footer">
              <Footer/>
        </div>
    </div>
  );
};
//Render to root from index.html
ReactDOM.render(<App/>,document.getElementById('root'));
export default App;//exporting  App;
