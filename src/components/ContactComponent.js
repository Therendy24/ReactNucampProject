import React from 'react';
// import {Breadcrumb, BreadcrumbItem,Button,Form,Label,Input,Col,FormFeedback } from 'reactstrap';

//for Redux 
import { Breadcrumb, BreadcrumbItem,
    Button, Label, Col, Row } from 'reactstrap';
//for React Router Parameter (will show in url) 
import {Link} from 'react-router-dom';
import { Component } from 'react';
// import {Control,LocalForm} from 'react-redux-form';
import {Control,Form,Errors} from 'react-redux-form';
//------------------------------------------------------------------------------
//react-rodux-form 
//this is for validation 
//required recieves a value as an argument and its a string because all inputs are recived as strings 
//it will check if val is falsy and make sure the length is greater than zero. 
//if it returns true if the function has something in it and false if it doesnt. id it doesnt 
//the function fails 
const required = val => val && val.length;

//2 arrow functions in one 
//the first arrow function takes the maximum length and the second takes the value (input string)
//returns true if the maximum input has not been exceeded !val will return true
//this function will fell if theres no input (val) or the input is too long
const maxLength = len => val => !val || (val.length <= len);

//it has failed the test for min length , if the input is too short
const minLength = len => val => val && (val.length >= len);
//if the input is not not a number 
const isNumber = val => !isNaN(+val);
//this  .test will test if it matchest the redux pattern
const validEmail = val => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
//------------------------------------------------------------------------------

 class Contact extends  Component{
    constructor(props){
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            phoneNum: '',
            email: '',
            agree: false, //for the person submitting this form agrees to be contacted or not 
            contactType: 'By Phone',
            feedback: '',
            touched:{
                firstName: false,
                lastName: false,
                phoneNum: false,
                email: false
            }
        };
        //this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
//------------------------------------------------------------------------------

    //without Redux
    // validate(firstName, lastName, phoneNum,email){

    //     const errors = {
    //         firstName: '',
    //         lastName: '',
    //         phoneNum: '',
    //         email: ''
    //     };

    //     if(this.state.touched.firstName){
    //         if(firstName.length < 2){
    //             errors.firstName = 'First name must be at least 2 characters.';
    //         }else if (firstName.length > 15)
    //             errors.firstName = 'First name must be 15 or less characters.';
    //     }
    //     if(this.state.touched.lastName){
    //         if(lastName.length < 2){
    //             errors.lastName = 'last name must be at least 2 characters.';
    //         }else if (lastName.length > 15)
    //             errors.lastName = 'last name must be 15 or less characters.';
    //     }

    //     const reg = /^\d+$/;
    //     if (this.state.touched.phoneNum && !reg.test(phoneNum)) {
    //         errors.phoneNum = 'The phone number should contain only numbers.';
    //     }
    //     if (this.state.touched.email && !email.includes('@')) {
    //         errors.email = 'Email should contain a @';
    //     }
    //     return errors;
    // }
//------------------------------------------------------------------------------

      //dont need to bind this handler because its an arrow function 
    //  handleBlur = (field =>  () =>{
    //     this.setState({
    //        touched: {...this.state.touched, [field]: true}
    //     });
    //  } )
    
    // handleInputChange(event){
    //     const target = event.target;
    //     const name = target.name;
    //     const value = target.type === 'checkbox' ? target.checked : target.value;

    //     this.setState({
    //        [name]: value
    //     })
    // }

    // handleSubmit(event){
    //     console.log("Current state is: " + JSON.stringify(this.state));
    //     alert("Current state is: " + JSON.stringify(this.state));
    //     event.preventDefault();
    // }

    handleSubmit(values) {
        // console.log('Current state is : ' + JSON.stringify(values));
        // alert('Current State is: ' + JSON.stringify(values));
        this.props.postFeedback(values)
        this.props.resetFeedbackForm();
    }
    
//------------------------------------------------------------------------------

    render(){
         //without redux form 
        // const errors = this.validate(this.state.firstName,this.state.lastName,this.state.phoneNum,this.state.email)
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem>
                        <Link to="/home">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active> 
                        Contact Us
                        </BreadcrumbItem>
                    </Breadcrumb>
                        <h2>Contact Us</h2>
                        <hr />
                    </div>
                </div>

                <div className="row row-content align-items-center">
                    <div className="col-sm-4">
                        <h5>Our Address</h5>
                        <address>
                            1 Nucamp Way<br />
                            Seattle, WA 98001<br />
                            U.S.A.
                        </address>
                    </div>
                    <div className="col">
                        <a role="button" className="btn btn-link" href="tel:+12065551234"><i className="fa fa-phone" /> 1-206-555-1234</a><br />
                        <a role="button" className="btn btn-link" href="mailto:fakeemail@fakeemail.co"><i className="fa fa-envelope-o" /> campsites@nucamp.co</a>
                    </div>
                </div>

                
                
                <div className="row row-content">
                    <div className="col-12">
                        <h2>Send us your Feedback</h2>
                        <hr />
                    </div>
    {/* ------------------------------------------------------------------------------------------------------------------------------- */}
                    <div className="col-md-10">
                        {/* without redux from  */}
                        {/* <Form onSubmit={this.handleSubmit}> */}
                        <Form model="feedbackForm" onSubmit={values => this.handleSubmit(values)}>
                            {/* <FormGroup row> */}
                            < Row className = "form-group" >
                                {/* md =  equivalent to col-md-10  */}
                                <Label htmlFor="firstName" md={2}>First Name</Label>
                                 <Col md={10}>  
                                 {/* equivalent to col-md-10  */}
                                    {/* <Input type="text" id="firstName" name="firstName" */}
                                    <Control.text model = ".firstName" id="firstName" name="firstName"
                                        placeholder="First Name"
                                        //line 158 for redux 
                                        className = "form-control"
                                        validators ={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }} 
                                    />
                                        <Errors
                                          className="text-danger"
                                          model = ".firstName"
                                          show = "touched"
                                          component = "div"
                                          messages = {{
                                              required: 'Required',
                                              minLength: 'Must be at least 2 characters',
                                              maxLength: 'Must be 15 characters or Less'

                                          }}
                                        //before redux form 
                                        // value={this.state.firstName}
                                        // invalid = {errors.firstName}
                                        // onBlur={this.handleBlur("firstName")}
                                        // onChange={this.handleInputChange} 
                                        />
                                        {/* <FormFeedback>{errors.firstName}</FormFeedback> */}
                                </Col>
                            </Row>
                            {/* </FormGroup> */}
                            < Row className = "form-group" >
                                <Label htmlFor="lastName" md={2}>Last Name</Label>
                                <Col md={10}>
                                    {/* <Input type="text" id="lastName" name="lastName" */}
                                    <Control.text model = ".lastName" id="lastName" name="lastName"
                                        placeholder="Last Name"
                                        className = "form-control"
                                        validators ={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                          <Errors
                                          className="text-danger"
                                          model = ".lastName"
                                          show = "touched"
                                          component = "div"
                                          messages = {{
                                              required: 'Required',
                                              minLength: 'Must be at least 2 characters',
                                              maxLength: 'Must be 15 characters or Less'

                                          }}
                                        // value={this.state.lastName}
                                        // invalid={errors.lastName}
                                        // onBlur={this.handleBlur("lastName")}
                                        // onChange={this.handleInputChange} 
                                    />
                                        {/* <FormFeedback>{errors.lastName}</FormFeedback> */}
                                </Col>                        
                            </Row>
                               < Row className = "form-group" >
                                <Label htmlFor="phoneNum" md={2}>Phone</Label>
                                <Col md={10}>
                                    {/* <Input type="tel" id="phoneNum" name="phoneNum" */}
                                      <Control.text model = ".phoneNum" id="phoneNum" name="phoneNum"
                                        placeholder="Phone number"
                                        className = "form-control"
                                        validators ={{
                                            required,
                                            minLength: minLength(10),
                                            maxLength: maxLength(15),
                                            isNumber
                                        }}
                                     />
                                         <Errors
                                          className="text-danger"
                                          model = ".phoneNum"
                                          show = "touched"
                                          component = "div"
                                          messages = {{
                                              required: 'Required',
                                              minLength: 'Must be at least 10 numbers',
                                              maxLength: 'Must be 15 numbers or Less',
                                              isNumber: 'Must be a number'

                                          }}
                                        // value={this.state.phoneNum}
                                        // invalid={errors.phoneNum}
                                        // onBlur={this.handleBlur("phoneNum")}
                                        // onChange={this.handleInputChange} 
                                     />
                                    {/* <FormFeedback>{errors.phoneNum}</FormFeedback> */}
                                </Col>
                            </Row>
                            <Row className = "form-group">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    {/* <Input type="email" id="email" name="email" */}
                                    <Control.text model = ".email" id="email" name="email"
                                        placeholder="Email"
                                        className = "form-control"
                                        validators ={{
                                            required,
                                            validEmail
                                        }}
                                        // value={this.state.email}
                                        // invalid={errors.email}
                                        // onBlur={this.handleBlur("email")}
                                        // onChange={this.handleInputChange} 
                                    />
                                    <Errors
                                          className="text-danger"
                                          model = ".email"
                                          show = "touched"
                                          component = "div"
                                          messages = {{
                                              required: 'Required',
                                              validEmail: 'Invalid email address'

                                          }}
                                    />
                                     {/* <FormFeedback>{errors.email}</FormFeedback> */}
                                </Col>
                            </Row>
                            <Row className = "form-group">
                                <Col md={{size: 4, offset: 2}}>
                                    {/* <FormGroup check> */}
                                    <div className = "form-check">
                                        <Label check>
                                            {/* <Input type="checkbox" */}
                                             <Control.checkbox model=".agree"
                                                name="agree"
                                                className = "form-check-input"
                                                //instead of value you use checked 
                                                // checked={this.state.agree}
                                                // onChange={this.handleInputChange} 
                                            /> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    {/* <Input type="select" name="contactType" */}
                                    <Control.select model = ".contactType" name="contactType"
                                            // value={this.state.contactType}
                                            // onChange={this.handleInputChange}
                                            className = "form-control">
                                        <option>By Phone</option>
                                        <option>By Email</option>
                                    {/* </Input> */}
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className = "form-group">
                                <Label htmlFor="feedback" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    {/* <Input type="textarea" id="feedback" name="feedback" */}
                                    {/* control.textarea is a self closing tag  */}
                                    <Control.textarea  model = ".feedback"id="feedback" name="feedback"
                                        rows="12"
                                        className="form-control"
                                        // value={this.state.feedback}
                                        // onChange={this.handleInputChange}
                                    />
      
                                </Col>
                            </Row>
                            <Row className = "form-group">
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        {/* </Form> */}
                        </Form>
                    </div>
    {/* ------------------------------------------------------------------------------------------------------------------------------- */}
            
                </div>
            </div>


           
        );
        }
}

export default Contact;