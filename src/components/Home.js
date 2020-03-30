//React Libraries
import React from 'react';
//Components
import Header from './Header';
import Footer from './Footer';
import Content from './Content';

//Index stylee sheet
import '.././stylesheets/index.css';

//NOTE: Nav bar is within header
class Home extends React.Component{
    render(){
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
    }
}

export default Home;