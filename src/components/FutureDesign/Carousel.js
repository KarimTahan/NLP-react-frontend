import React from 'react';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import '.././stylesheets/OurAuthors.css';
/**
 * Carousel designed to use to display Authors on Our Author page.
 * Future Design... Create page, routes are complete
 */

export default class AuthorCarousel extends React.Component {
   
  render() {
  
    return (
      //Carousel Class
      <Carousel arrows>
        <div className="shake">
          <h2 id="sp" >William Shakespeare</h2>
          <img alt="William Shakespeare" src='https://thumbs.dreamstime.com/z/william-shakespeare-portrait-7268686.jpg' />
        </div>
      <div className="authors">
        <h2 className="name">Homer Simpson</h2>
        <img alt="Homer Simpson" scr="../img/6976071.jpeg"/>
      </div>
      </Carousel>
    );
  }
}