import React from 'react';
import '.././stylesheets/Form.css';
/**
 * Master form class, component implementing a Form with multiples steps before user completes.
 */

class MasterForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        
        currentStep: 1,
        currentTitle:'',
        author:'',
        seed: '',
        text: '', 
      }
    }
  //handles all changes between states
    handleChange = event => {
      const {name, value} = event.target
      this.setState({
        [name]: value
      })    
    }
  // On submit event   
    handleSubmit = event => {
      event.preventDefault()
      const { author,seed, text } = this.state
      alert(`Selected Properties: \n 
             Author: ${author} \n 
             Seed: ${seed} \n
             Text: ${text}`)
  
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
          <h4><u>Seed</u></h4>
          <p>Note: The seed is the amount of characters you which to generate in the text.</p>
        </div>
      )
    }
    if(currentStep===3){
      return(
        <div>
          <h4><u>Text</u></h4>
          <p>Note: Start the generated text off with your own words.</p>
        </div>
      )
    }
  }
    
    render() {    
      return (
        <React.Fragment>
  
        <form className="form" onSubmit={this.handleSubmit}>
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
            seed={this.state.seed}
          />
          <Step3 
            currentTitle='Starting Text'
            currentStep={this.state.currentStep} 
            handleChange={this.handleChange}
            text={this.state.text}
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
                    <option hidden disabled selected value >Select Author..</option>
                    <option value="shakespear">Shakespear</option>
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
            <input type="number" id="seed" name="seed"  onChange={props.handleChange} placeHolder="Seed Length"/>
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
                
              <textarea id="text" name="text" placeHolder="Write something.." onChange={props.handleChange} style={{height:'100px'}}></textarea>
              <br/>
              <input type="submit" value="Submit"/>
              <br/>
              <br/>          
        </div>     
      </React.Fragment>
    );
  }
export default MasterForm;