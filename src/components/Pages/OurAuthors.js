import React from 'react';
import '../.././stylesheets/OurAuthors.css';
import Carousel from '.././Carousel';



class OurAuthors extends React.Component {
  render(){
    return (
        <div className="OurAuthors">
           
          <Carousel/>

        </div>
    );
  }
}
  //Render to root from index.html
  export default OurAuthors;//exporting  App;