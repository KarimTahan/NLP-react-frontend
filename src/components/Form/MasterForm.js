import React from 'react';
import '../.././stylesheets/Form.css';
import Widget from '../FutureDesign/WidgetLoader';
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
          showForm : true,
          showWidget : false,
          showText : false,
          generatedText: '',
          currentStep: 1,
          author:'',
		      length:'',
          seed: ''
      }
    }
  
    /**
     * Class Function handle state props on change of form step
     * 
     */
    handleChange = event => {
      const {name, value} = event.target
      this.setState({
        [name]: value
      })    
    }
    /**
     * Function that renders the widget, while awaiting response from flask api
     * Based on a flag set in the state props
     */
    renderWidget(){
      return(
          <Widget/>
      )
    }
   /**
     * Function that renders the form
     * Based on a flag set in the state props
     */
    renderForm(){
      return (
        <form className="form" onSubmit={this.handleSubmit} encType="multipart/form-data">
        {/* 
          render steps
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
      );

    }
    /**
     * Function that renders the generated text from the flask api
     * Based on a flag set in the state props
     */
    renderText(){
      return(
        <div className="form">
            <h3>Generated text...</h3>
        </div>
      );
    }

    /**
     * Function that send post request and sets the response(generated text) in the state props
     * Also sets flags for which div to render from state props
     * Async function
     * @param {*} url 
     * @param {*} formData 
     */
    async getReponse(url,formData){
      let response = await axios.post(url,formData)//POST Request and Await response(Async)
      let {text} = response.data;//store data in text
      this.setState({generatedText : text, showText:true, showWidget:false})//set state prop
    }
    
  /**
   * Function that handles event once user clicks on submit
   * Append all fields in form to FormData format to send to Flask Api
   * Note: Flask API also accepts JSON format  
   */   
    handleSubmit = event => {
      this.setState({showWidget:true, showForm:false})
        
      event.preventDefault()//prevent page refresh
      const { author,length,seed} = this.state//state props
             
        //URL for POST Request     
        var url = 'http://localhost:5000/prediction';
        
        //Form Data obj
        const formData = new FormData(event.target);
        //append form data for multipart/form-data key:value
        formData.append("author", author)
        formData.append("length",length)
        formData.append("seed",seed)

        this.getReponse(url,formData)
        
        
      }

    /**
     * Function to keep track of current step of the user
     */
    _next = () => {
      let currentStep = this.state.currentStep
      currentStep = currentStep >= 2? 3: currentStep + 1 
      this.setState({
        currentStep: currentStep
      })
    }
    /**
     * Function keeping track of which step is the previous step
     */
    _prev = () => {
      let currentStep = this.state.currentStep
      currentStep = currentStep <= 1? 1: currentStep - 1
      this.setState({
        currentStep: currentStep
      })
    }
  
  /*
  * Function used to render the previous button
  * will not be rendrered if step is 1
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
   /*
  * Function used to render the next button
  * will not be rendrered if step is 3
  */
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
  /**
   * Function meant to display form requirement/ examples the user must fill
   */
  descriptionExample(){
    let currentStep = this.state.currentStep;
    if(currentStep===1){ //Author
      return (
        <div>
          <h4><u>Author:</u></h4>
          <p>[Required] Select an author you which to mimic writing style.</p>
          <p>Note: Author List is in drop down. If you which to read about our authors, visit Our Authors page.</p>
        </div>
      )
    }
    if(currentStep === 2){//Length
      return (
        <div>
          <h4><u>Length</u></h4>
          <p>Note: The seed is the amount of characters you which to generate in the text.</p>
        </div>
      )
    }
    if(currentStep===3){//Seed
      return(
        <div>
          <h4><u>Seed</u></h4>
          <p>Note: Start the generated text off with your own words.</p>
        </div>
      )
    }
  }
  /**
   * Main render, will render the div on which is flagged true
   */
    render() {    
      return (
        <React.Fragment>
          {this.state.showText && this.renderText()} {/**Generated Text*/ }
          {this.state.showForm && this.renderForm()} {/**Form */}
          {this.state.showWidget && this.renderWidget()}{/**Loading Widget */}
        </React.Fragment>
        
      );
    }
  }
  /**
   * Prompts the user to select Author in which writting style they want the ML model to generate
   * [Required Field]
   * @param {*} props 
   */
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
                    <option value="simpson">Homer Simpson</option>
                    <option value="eap">Edgar Allan Poe</option>
                </select>
        </div>
    );
  }
  /**
   * Function will prompt user to select the length of the text in chars generated in response from the Flask API
   * [Required fields]
   * @param {*} props 
   */
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
  /**
   * Function allowing the user to generate the first sentence/sentences of the text
   * [Required Field]
   * @param {*} props 
   */
  function Step3(props) {
    if (props.currentStep !== 3) {
      return null
    } 
    return(
      <React.Fragment>
       <div className="form-group">
          <h3>Starting Text</h3>   
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