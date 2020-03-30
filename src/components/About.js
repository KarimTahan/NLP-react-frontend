import React from 'react';
//Components
import Header from './Header';
import Content from './Content';
import Footer from './Footer';


//About Class/Page
class About extends React.Component{
    render(){
        return (  
                <div className="App-header">
                    <div className="top">
                        <Header/>
                    </div>
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
export default About;