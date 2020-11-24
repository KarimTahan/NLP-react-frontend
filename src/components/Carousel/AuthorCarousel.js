import React from 'react';
import 'antd/dist/antd.css';
import '../../stylesheets/carousel.css'
import Simpsons from '../../img/simpsons.png'
import EAP from '../../img/portrait-62996_1280.jpg'
import Shake from '../../img/william-shakespeare.jpg'
import '../../stylesheets/index.css';
import {Carousel } from 'antd';
import { PageHeader, Image } from 'antd';

var styles = {
  container:{
    alignItems:"center", 
  },

  PageHeaderStyle :{
    marginBottom:80,
    border: '1px solid rgb(235, 237, 240)',
  },


}

class AuthorCarousel extends React.Component{


  render() {
    return(
        <Carousel effect="fade" autoplay >
          <div >
            <PageHeader style={styles.PageHeaderStyle}
                title="William Shakespeare"
                subTitle="Model"
            />
            <div >
              <Image className="Image" height="600" width="400" src={Shake} alt="William Shakespeare"/>
            </div>
          </div>
          <div>
            <PageHeader style={styles.PageHeaderStyle}
                title="Edgar Allan Poe"
                subTitle="Model"
            />
            <div >
              <Image className="Image" height="600" width="400" src={EAP} alt="Edgar Allan Poe"/>
            </div>
          </div>
          <div style={styles.container}>
            <PageHeader style={styles.PageHeaderStyle}
                title="Homer Simpson"
                subTitle="Model"
            />
            <div>
              <Image  className="Image" height="300" width="500" src={Simpsons} alt="Simpsons"/>
            </div>
          </div>
          <div>
          <PageHeader style={styles.PageHeaderStyle}
                title="Unkown"
                subTitle="Model"
            />
          </div>
        </Carousel>
    );
  }
}
export default AuthorCarousel;