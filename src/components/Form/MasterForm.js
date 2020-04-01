import React from 'react';
import '../.././stylesheets/Form.css';
import Widget from '.././WidgetLoader';

import axios from 'axios';

/**
 * Master form class, component implementing a Form with multiples steps before user completes.
 * Also handles submit and POST request
 * Response is the generated text by the ML model
 * Text is then formatted and displayed to the user
 */
class MasterForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
          currentStep: 1,
          author:'',
		      length:'',
          seed: ''
      }
    }
    
    displayWidget = (props) =>{
      return (
        <Widget/>
      )

    };

  //handles all changes between states
    handleChange = event => {
      const {name, value} = event.target
      this.setState({
        [name]: value
      })    
    }
    
  // On submit event   
    handleSubmit = event => {
      event.preventDefault()//prevent page refresh
      const { author,length,seed} = this.state//state props
             
        //URL for POST Request     
        var url = 'http://localhost:5000/prediction';
        var generatedText; //save generated text from response in variable
        
        //Form Data obj
        const formData = new FormData(event.target);
        //append form data for multipart/form-data key:value
        formData.append("author", author)
        formData.append("length",length)
        formData.append("seed",seed)

        //POST Request when user submits data
        axios.post(url,formData)
        .then( response => {//then save response in generatedText
          
          generatedText = response;
          alert(generatedText.data.response); //DEBUG
        })
        .catch(error=> { //Catch Erorr print to console
          console.log(error);
        })
      }

    // **Functions keeping track of which step in the form the user is currently on 
    _next = () => {
      let currentStep = this.state.currentStep
      currentStep = currentStep >= 2? 3: currentStep + 1
      this.setState({
        currentStep: currentStep
      })
    }
      
    _prev = () => {
      let currentStep = this.state.currentStep
      currentStep = currentStep <= 1? 1: currentStep - 1
      this.setState({
        currentStep: currentStep
      })
    }
  
  /*
  * the functions for our button
  */
  previousButton() {
    let currentStep = this.state.currentStep;
    if(currentStep !==1){
      return (
        <button 
          id="previous"
          className="btn btn-secondary" 
          type="button" onClick={this._prev}>
        Previous
        </button>
      )
    }
    return null;
  }
  
  nextButton(){
    let currentStep = this.state.currentStep;
    if(currentStep <3){
      return (
        <button
          id="next" 
          className="btn btn-primary float-right" 
          type="button" onClick={this._next}>
        Next
        </button>        
      )
    }
    return null;
  }

  descriptionExample(){
    let currentStep = this.state.currentStep;
    if(currentStep===1){
      return (
        <div>
          <h4><u>Author:</u></h4>
          <p>[Required] Select an author you which to mimic writing style.</p>
          <p>Note: Author List is in drop down. If you which to read about our authors, visit Our Authors page.</p>
        </div>
      )
    }
    if(currentStep === 2){
      return (
        <div>
          <h4><u>Length</u></h4>
          <p>Note: The seed is the amount of characters you which to generate in the text.</p>
        </div>
      )
    }
    if(currentStep===3){
      return(
        <div>
          <h4><u>Seed</u></h4>
          <p>Note: Start the generated text off with your own words.</p>
        </div>
      )
    }
  }
    
    render() {    
      return (
        <React.Fragment>
  
        <form className="form" onSubmit={this.handleSubmit} encType="multipart/form-data">
        {/* 
          render the form steps and pass required props in
        */}
          <Step1 
            currentTitle='Choose Author'
            currentStep={this.state.currentStep} 
            handleChange={this.handleChange}
            author={this.state.author}
          />
          <Step2 
            currentTitle='Seed Length'
            currentStep={this.state.currentStep} 
            handleChange={this.handleChange}
            length={this.state.length}
          />
          <Step3 
            currentTitle='Starting Text'
            currentStep={this.state.currentStep} 
            handleChange={this.handleChange}
            seed={this.state.seed}
          />
           {this.descriptionExample()}
           {this.previousButton()}
           {this.nextButton()}
  
        </form>
        </React.Fragment>
      );
    }
  }
  
  function Step1(props) {
    if (props.currentStep !== 1) {
      return null
    } 
    return(
        <div className="form-group">
            <h3>Select Author</h3>
                <select id="author" name="author" onChange={props.handleChange}>
                    <option hidden disabled ="" >Select Author..</option>
                    <option value="shakespeare">Shakespear</option>
                    <option value="stephenKing">Stephen King</option>
                    <option value="EAP">Edgar Allan Poe</option>
                </select>
        </div>
    );
  }
  
  function Step2(props) {
    if (props.currentStep !== 2) {
      return null
    } 
    return(
        <div className="form-group">
            <h3>Seed Length</h3>
            <input type="number" id="length" name="length"  onChange={props.handleChange} placeholder="Seed Length"/>
        </div>
    );
  }
  
  function Step3(props) {
    if (props.currentStep !== 3) {
      return null
    } 
    return(
      <React.Fragment>
       <div className="steps">
              <div className="titles">
                  <h3>Starting Text</h3>
              </div>
                
              <textarea id="seed" name="seed" placeholder="Write something.." onChange={props.handleChange} style={{height:'100px'}}></textarea>
              <br/>
              <input type="submit" value="Submit"/>
              <br/>
              <br/>          
        </div>     
      </React.Fragment>
    );
  }
export default MasterForm;