import React from "react";
import { css } from "@emotion/core";
import FadeLoader from "react-spinners/FadeLoader";
import '../.././stylesheets/WidgetLoader.css';
 
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
 
export default class WidgetLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
 
  render() {
    return (
        <div className="widget">
            <div className="sweet-loading">
                <FadeLoader	
                css={override}
                size={150}
                color={"#123abc"}
                loading={this.state.loading}
            />
            <h4 id="loadText">Generating Text...</h4>
        </div>
        
      </div>
    );
  }
}

