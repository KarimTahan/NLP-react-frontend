import React from 'react';
import MasterForm from './MasterForm';
import '.././stylesheets/Form.css';

class Content extends React.Component{
    render(){
        return ( 
            <div className="form-div">
                <MasterForm/>
            </div>
        );
    }
}

export default Content;