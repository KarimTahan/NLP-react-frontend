//React Libraries
import React from 'react';
import MasterForm from '../Form/MasterForm';
//Index stylee sheet
import '../.././stylesheets/index.css';

//NOTE: Nav bar is within header
class Home extends React.Component{
    render(){
        return (  
            <div className="App">
                <div className="middle">
                    <MasterForm/>
                </div>
            </div>
          );
    }
}
export default Home;