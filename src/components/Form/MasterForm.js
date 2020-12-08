import React from 'react';
import Widget from '../Widget/WidgetLoader';
import axios from 'axios';
import { Button, InputNumber, Form, Select, Steps, Card } from 'antd';

const { Option } = Select;
const { Step } = Steps;

/**
 * Master form class, component implementing a Form with multiples steps before user completes.
 * Also handles submit and POST request
 * Response is the generated text by the ML model
 * Text is then formatted and displayed to the user
 */
export default class MasterForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: true,
      isLoading: false,
      showText: false,
      generatedText: '',
      currentStep: 1,
      author: '',
      length: 0,
      seed: '',
    }
  }

  /**
   * Function that renders the widget, while awaiting response from flask api
   * Based on a flag set in the state props
   */
  renderWidget() {
    return (
      <Widget />
    )
  }

  renderSteps(){
    return (
      <div>
      <Steps current = {this.state.currentStep-1} progressDot>
          <Step title="Author" />
          <Step title="Word Length" />
          <Step title="Seed Text" />
          <Step title="Generate Text" />
      </Steps>
      <br/>
      <br/>
      <br/>
      </div>
    )
  }

  /**
    * Function that renders the form
    * Based on a flag set in the state props
    */
  renderForm() {
    return (
      <Form className="form" onSubmit={this.handleSubmit} encType="multipart/form-data">
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
          currentTitle='Word Length'
          currentStep={this.state.currentStep}
          handleChange={this.handleChange}
          length={this.state.length}
        />
        <Step3
          currentTitle='Starting Text'
          currentStep={this.state.currentStep}
          handleChange={this.handleChange}
          seed={this.state.seed}
          author={this.state.author}
        />
        {this.descriptionExample()}
        {this.previousButton()}
        &nbsp;&nbsp;
        {this.nextButton()}

      </Form>
    );
  }

  /**
   * Function that renders the generated text from the flask api
   * Based on a flag set in the state props
   */
  renderText() {
    return (
      <div className="output">
        <p>
          {this.state.generatedText.replace(/\\n/g, " ")}
        </p>
        <Button id="again" type="primary" onClick={this._again}>Again</Button>
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
  async getResponse(url, formData) {
    await axios.post(url, formData) //wait for response
      .then(response => {// then save response and set text visible and loading widget hidden
        var resp = response;
        this.setState({ generatedText: resp.data.response });
        this.setState({ showText: true, isLoading: false });
      });
  }

  /**
  * Class Function handle state props on change of form step
  * 
  */
  handleChange = name => value => {
      this.setState({
        [name]: value
      })
  }

  /**
   * Function that handles event once user clicks on submit
   * Append all fields in form to FormData format to send to Flask Api
   * Note: Flask API also accepts JSON format  
   */
  handleSubmit = event => {
    if (this.state.currentStep === 3 && this.state.seed != null) {
      this.setState({ isLoading: true, showForm: false, currentStep: 4 })

      event.preventDefault()//prevent page refresh

      const author = this.state.author
      const length = this.state.length
      const seed = this.state.seed
      //URL for POST Request     
      var url = 'http://localhost:5000/prediction';

      //Form Data obj
      var formData = new FormData();
      //append form data for multipart/form-data key:value
      formData.delete('seed')
      formData.append('author', author)
      formData.append('length', Math.round(length))
      formData.append('seed', seed)
      this.getResponse(url, formData)
    }
    event.preventDefault()
  }

  /**
   * Function to keep track of current step of the user
   */
  _next = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep >= 2 ? 3 : currentStep + 1
    this.setState({
      currentStep: currentStep
    })
  }

  _again = () => {
    window.location.reload();
    return false;
  }

  /**
   * Function keeping track of which step is the previous step
   */
  _prev = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep <= 1 ? 1 : currentStep - 1
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
    if (currentStep !== 1) {
      return (
        <Button id="previous" type="default" onClick={this._prev}>Previous</Button>
      )
    }
    return null;
  }

/*
 * Function used to render the next button
 * will not be rendrered if step is 3
 */
  nextButton() {
    let currentStep = this.state.currentStep;
    if (currentStep === 2 && this.state.length === "") { //if user doesn't enter the text length, value 0 or less. Next button will not appear
      return null;
    }
    else if (currentStep === 1 && this.state.author === "") { // if no author is selected, user will not see next step button
      return null;
    }
    else if(currentStep === 3 && this.state.seed <= 0) // If the text area(seed length) is less or equal to 0.. user cannot move on
      return null;
    else if (currentStep === 3) { // if text area is filled then show Submit button
      return (
        <Button id="next" type="primary" onClick={this.handleSubmit}>Submit</Button>
      )
    }
    else if (currentStep > 2) { // Do not show next button if we are on step 3
      return null;
    }
    else if (currentStep === 2 && this.state.length <= 0) { // if step 2 number entered is 0 or less do not show next button
      return null;
    }
    else { // any other case, where the steps form are filled, show next button
      return (
        <Button id="next" type="primary" onClick={this._next}>Next</Button>
      )
    }
  }

  /**
   * Function meant to display form requirement/ examples the user must fill
   */
  descriptionExample() {
    let currentStep = this.state.currentStep;
    if (currentStep === 1) { //Author
      return (
        <div>
          <h4><u>Author:</u></h4>
          <p>[Required] Select an author you wish to mimic.</p>
          <p>Note: The drop down contains a list of authors. If you wish to read about our authors, visit the 'Our Authors' page.</p>
        </div>
      )
    }
    if (currentStep === 2) {//Length
      return (
        <div>
          <h4><u>Length</u></h4>
          <p>Description: Define the length of the resulting document in the amount of words you would like generated.</p>
          <p>NOTE: This may take longer depending on the amount of words to be generated.</p>
        </div>
      )
    }
    if (currentStep === 3) {//Seed
      return (
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
        {this.renderSteps()}
        <Card>
        {this.state.showText && this.renderText()} {/**Generated Text*/}
        {this.state.showForm && this.renderForm()} {/**Form */}
        {this.state.isLoading && this.renderWidget()}{/**Loading Widget */}
        </Card>
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
  return (
    <div className="form-group">
      <h3>Author</h3>
      <Select defaultValue="" id="author" name="author" size="large" style={{ width: "100%" }} placeholder="Select Author..." required onChange={props.handleChange("author")}>
        <Option disabled hidden value=""> -- Select Author -- </Option>
        <Option value="shakespeare">Shakespeare</Option>
        <Option value="simpsons">The Simpsons</Option>
        <Option value="poe">Edgar Allan Poe</Option>
        <Option value="doyle">Arthur Conan Doyle</Option>
        <Option value="twain">Mark Twain</Option>
      </Select>
      <br />
      <br />
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
  return (
    <div className="form-group">
      <h3>Doc Length</h3>
      <InputNumber type="number" style={{ width: "100%" }} size="large" id="length" name="length" min={0} placeholder="Word Length" onChange={props.handleChange("length")} required />
      <br />
      <br />
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
  if(props.author  === 'shakespeare'){
    return (
      <React.Fragment>
        <div className="form-group">
          <h3>Starting Text</h3>
                <Select defaultValue="" id="seed" name="seed" size="large" style={{ width: "100%" }} placeholder="Select Seed" required onChange={props.handleChange("seed")}>
                  <Option disabled hidden value="">-- Select a Seed --</Option>
                  <Option disabled hidden value="" >-- Select a Seed --</Option>
                  <Option value="all that glitter is not gold ">All that glitters is not gold.</Option>
                  <Option value="hell is empty and all the_devil are here . ">Hell is empty. And all the devils are here.</Option>
                  <Option value="by the pricking of my thumb something wicke this way come . ">By the pricking of my thumbs, Something wicked this way comes.</Option>
                  <Option value="the lady doth protest too_much methink . ">The lady doth protest too much, methinks.</Option>
                  <Option value="what in a name ? a rose by any other name would smell as sweet .">What's in a name? A rose by any other name would smell as sweet;</Option>
                  <Option value="friend romans countryman lend_me your ear ">Friends, Romans, countrymen, lend me your ears;</Option>
               
                </Select>
          <br />
          <br />
        </div>
      </React.Fragment>
    );
  } else if (props.author === 'poe') {
    return (
      <React.Fragment>
        <div className="form-group">
          <h3>Starting Text</h3>
                <Select defaultValue="" id="seed" name="seed" size="large" style={{ width: "100%" }} placeholder="Select Seed" required onChange={props.handleChange("seed")}>
                  <Option disabled hidden value="" >-- Select a Seed --</Option>
                  <Option value="those_who dream by day are cognizant of many things ">Those who dream by day are cognizant of many things.</Option>
                  <Option value="i have great faith in fool self confidence my friend will call it ">I have great faith in fool self confidence, my friend will call it.</Option>
                  <Option value="once upon a midnight dreary while i ponder weak and weary ">Once upon a midnight dreary, while I pondered, weak and weary.</Option>
                  <Option value="sleep those little slice of death how i loathe them ">Sleep: Those little slices of death, how I loathe them.</Option>
                  <Option value="it_was many and many a year_ago in a kingdom by the sea ">It was many and many a year ago, in a kingdom by the sea.</Option>
                  <Option value="the true genius shudder at incompleteness ">The true genius shudders at incompleteness.</Option>
                </Select>
          <br />
          <br />
        </div>
      </React.Fragment>
    );
  } else if (props.author === 'simpsons'){
    return (
      <React.Fragment>
        <div className="form-group">
          <h3>Starting Text</h3>
                <Select defaultValue="" id="seed" name="seed" size="large" style={{ width: "100%" }} placeholder="Select Seed" required onChange={props.handleChange("seed")}>
                  <Option disabled hidden value="" >-- Select a Seed --</Option>
                  <Option value="we_were go_to keep the gray one but the mother eat her ">We were going to keep the gray one but the mother ate her.</Option>
                  <Option value="you see class my lyme disease turn_out to be psychosomatic ">You see, class, my Lyme disease turned out to be psychosomatic.</Option>
                  <Option value="alright alright spill milk spill milk spill milk ... ">Alright, alright, spilled milk, spilled milk, spilled milk...</Option>
                  <Option value="would you like something to eat ? i have get dry apricot ... ">Would you like something to eat? I've got dried apricots.</Option>
                  <Option value="wait a_minute this unkempt youngster just may_be on to something ">Wait a minute. This unkempt youngster just may be on to something.</Option>
                  <Option value="earth base this_is commander bart mccool . we are under attack by the zorrinid brain changer ! ">Earth base, this is Commander Bart McCool. We are under attack by the Zorrinid brain changers.</Option>
                </Select>
          <br />
          <br />
        </div>
      </React.Fragment>
    );
  } else if (props.author === 'doyle'){
    return (
      <React.Fragment>
        <div className="form-group">
          <h3>Starting Text</h3>
                <Select defaultValue="" id="seed" name="seed" size="large" style={{ width: "100%" }} placeholder="Select Seed" required onChange={props.handleChange("seed")}>
                  <Option disabled hidden value="">-- Select a Seed --</Option>
                  <Option value="elementary my dear watson ">Elementary, my dear Watson.</Option>
                  <Option value="when I have eliminated all which is impossible ">When I have eliminated all which is impossible.</Option>
                  <Option value="there is nothing more deceptive than an obvious fact ">There is nothing more deceptive than an obvious fact.</Option>
                  <Option value="you see but you do not observe ">You see but you do not observe.</Option>
                  <Option value="take a community of dutchman of the type of those who defend themselves ">Take a community of dutchman of the type of those who defend themselves.</Option>
                  <Option value="my name is sherlock holmes ">My name is Sherlock Holmes.</Option>
                </Select>
          <br />
          <br />
        </div>
      </React.Fragment>
    );
  } else if(props.author === 'twain'){
    return (
      <React.Fragment>
        <div className="form-group">
          <h3>Starting Text</h3>
                <Select defaultValue="" id="seed" name="seed" size="large" style={{ width: "100%" }} placeholder="Select Seed" required onChange={props.handleChange("seed")}>
                  <Option disabled hidden value="">-- Select a Seed --</Option>
                  <Option value="it is a time when one 's spirit is subdued and sad ">It is a time when one's spirit is subdued and sad...</Option>
                  <Option value="if_you should rear a duck in the heart of the sahara ">If you should rear a duck in the heart of the Sahara...</Option>
                  <Option value="now and then we have a hope that if we live and were good ">Now and then we had a hope that if we lived and were good...</Option>
                  <Option value="the mississippi_river town are comely clean well built and pleasing to the eye ">The Mississippi River towns are comely, clean, well built, and pleasing to the eye...</Option>
                  <Option value="all_right then i will go to hell ">All right, then, I'll go to hell.</Option>
                  <Option value="if_you tell the truth you do_not need a good memory ">If you tell the truth you do not need a good memory.</Option>
                </Select>
          <br />
          <br />
        </div>
      </React.Fragment>
    );
  }
}
