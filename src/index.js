//React Libraries
import React from 'react';
import ReactDOM from 'react-dom';
//Components
import Home from './components/Home';

//Index stylee sheet
import './stylesheets/index.css';

//NOTE: Nav bar is within header
//main app function rendering to web page
class App extends React.Component {
  render(){
  return (
    <div className="App">
        <Home/>
    </div>
  );
  }
}
//Render to root from index.html
ReactDOM.render(<App/>,document.getElementById('root'));
export default App;//exporting  App;
