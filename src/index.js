//React Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './stylesheets/index.css';
import Home from './components/Pages/Home'
import OurAuthors from './components/Pages/OurAuthors'
import About from './components/Pages/About'
import {BrowserRouter,Route,Switch} from 'react-router-dom'


class App extends React.Component {
  state = { // Collapse menu
    collapsed: true,// Default start app with collapsed menu
  };

  toggle = () => {
    this.setState({ // setting collapsible state
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} />
          <Route path="/OurAuthors" component={OurAuthors} />
        </Switch>
     </BrowserRouter>
    );
  }
}

//Render to root from index.html
ReactDOM.render(<App/>,document.getElementById('app'));
export default App;//exporting  App;
