import React from 'react';
import 'antd/dist/antd.css';
import '../../stylesheets/carousel.css'
import Simpsons from '../../img/simpsons.png'
import EAP from '../../img/portrait-62996_1280.jpg'
import Shake from '../../img/william-shakespeare.jpg'
import '../../stylesheets/index.css';
import {Carousel } from 'antd';
import { PageHeader } from 'antd';

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
        <Carousel effect="fade" >
          <div >
            <PageHeader style={styles.PageHeaderStyle}
                title="William Shakespeare"
                subTitle="Model"
            />
            <div >
              <img src={Shake} alt="William Shakespeare"/>
            </div>
          </div>
          <div>
            <PageHeader style={styles.PageHeaderStyle}
                title="Edgar Allan Poe"
                subTitle="Model"
            />
            <div >
              <img src={EAP} alt="Edgar Allan Poe"/>
            </div>
          </div>
          <div style={styles.container}>
            <PageHeader style={styles.PageHeaderStyle}
                title="Homer Simpson"
                subTitle="Model"
            />
            <div>
              <img  className="Simpsons"  src={Simpsons} alt="Simpsons"/>
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