//React Libraries
import React from 'react';
import ReactDOM from 'react-dom';
//Components
import Header from './scripts/Header';
import Form from './scripts/Form';
//Index stylee sheet
import './stylesheets/index.css';

//NOTE: Nav bar is within header
//main app function rendering to web page
function App() {
  return (
    <div className="App">
        <div className="top">
            <Header/> 
            <br/>
            <div className="middle">
                <Form/>
            </div>
        </div>
        <br/>
        <div className="bottom">
    
        </div>
    </div>
  );
};
//Render to root from index.html
ReactDOM.render(<App/>,document.querySelector('#root'));
export default App;//exporting  App;
