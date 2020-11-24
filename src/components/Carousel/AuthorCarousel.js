import React from 'react';
import Homer_Simpson from '../../img/Homer_Simpson_2006.png';
import 'antd/dist/antd.css';
import '../../stylesheets/index.css';
import { Carousel } from 'antd';
import { PageHeader } from 'antd';

const PageHeaderStyle = {
  border: '1px solid rgb(235, 237, 240)',
}

class AuthorCarousel extends React.Component{


  render() {
    return(
        <Carousel effect="fade" autoplay>
          <div className="WS">
            <PageHeader style={PageHeaderStyle}
                title="William Shakespeare"
                subTitle="Model"
            />
          </div>
          <div className="EAP">
            <PageHeader style={PageHeaderStyle}
                title="Edgar Allan Poe"
                subTitle="Model"
            />
          </div>
          <div>
            <PageHeader style={PageHeaderStyle}
                title="Homer Simpson"
                subTitle="Model"
            />
          </div>
          <div>
          <PageHeader style={PageHeaderStyle}
                title="Unkown"
                subTitle="Model"
            />
          </div>
        </Carousel>
    );
  }
}
export default AuthorCarousel;