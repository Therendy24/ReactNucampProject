import React, { Component } from 'react';
//components
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';

import { TransitionGroup,CSSTransition } from 'react-transition-group';

//for redux stuff
import { postFeedback,postComment, fetchCampsites, fetchComments, fetchPromotions, fetchPartners } from '../redux/ActionCreators';
//Routers 
import {Switch,Route, Redirect,withRouter} from 'react-router-dom';
//we are transfering all the application data to react-redux store
import { connect } from 'react-redux';
import {actions} from 'react-redux-form';

const mapStateToProps = state => {
    return{
        campsites: state.campsites,
        comments: state.comments,
        partners: state.partners,
        promotions: state.promotions 
    }
}
//week 4 and week 5 tutorials 
const mapDispatchToProps = {
    postComment: (campsiteId, rating, author, text) => (postComment(campsiteId, rating, author, text)),
    postFeedback:(feedback) =>(postFeedback(feedback)),
    fetchCampsites: () => (fetchCampsites()),
    resetFeedbackForm: () => (actions.reset('feedbackForm')),
    fetchComments: () => (fetchComments()),
    fetchPromotions: () => (fetchPromotions()),
    fetchPartners: () =>(fetchPartners())
};


//class component with a class inheritance "extends". Component is the parent class provided by the React library 
class Main extends Component {
//----------------------------------------------------------------------------------------------------------------------
    //inside the class body is a constructor method which is required in two classes when you are storing local state inside the App component,
    //and you wish to bind methods
    //when a constructor method is used, it must take props as an argument. Props is short for properties
    //The first line must be super(props), so that the props are communicated to the base constructor in the parent component. 
    //if using state, this.state must be set equal to an object 
//     constructor(props){
//         //props is an object of data, passed from my parent component
//         //props is read only information 
//         super(props);
//         //this holds the campsite.js data and is being passed down to directory compnent which is the child 
//         this.state = {
//             campsites : CAMPSITES
//             comments : COMMENTS,
//             partners : PARTNERS,
//             promotions : PROMOTIONS
//         };
// //----------------------------------------------------------------------------------------------------------------------

//     }
// week 4 and week 5 tutorials 
componentDidMount() {
    this.props.fetchCampsites();
    this.props.fetchComments();
    this.props.fetchPromotions();
    this.props.fetchPartners();
}
    



    //render is a required function in class-based components
    //render functions return JSX structure (XML )
    // doesnt display the actual content but shows what the conetent will have and how it will arrange.
    //its a blue print 
    //cant have two returns 
    render() {
        
        //this homepage component is written with an arrow function instead of a function declaration 
        // because of a featured of arrow functions
        //ARROW FUNCTIONS INHERIT THE THIS OF THEIR PARENT SCOPE  
        //we need to use the arrow function so we can get easilt get the data from the main component state
        const HomePage = () => {
            return (
                // passing three props one we would like to feature on the homepage
                //any array or objects with the feature property set to true will return a new array
                //should only return one object from each array  
                // array index 0 will pull that object
                //passing to the home component as props 
                <Home
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
                    campsitesLoading={this.props.campsites.isLoading}
                    campsitesErrMess={this.props.campsites.errMess}
                    promotion={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
                    promotionsLoading={this.props.promotions.isLoading}
                    promotionsErrMess={this.props.promotions.errMess}
                    partner={this.props.partners.partners.filter(partner => partner.featured)[0]}
                    partnersLoading={this.props.partners.isLoading}
                    partnersErrMess={this.props.partners.errMess}

                />

                       
            );
        };
       //-----------------------------------------------------------------------------
        // + converts a string to a number 
       const CampsiteWithId = ({match}) =>{
           return(
               <CampsiteInfo 
               // array index 0 will pull that object
                campsite ={this.props.campsites.campsites.filter(campsite => campsite.id === 
                +match.params.campsiteId)[0]}
                isLaoding = {this.props.campsites.isLoading}
                errMess = {this.props.campsites.errMess}
                //wont use index 0 because I want the whole array 
                comments={this.props.comments.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}

                
                />
           );
       }

       //-----------------------------------------------------------------------------

        return (
            <div>
                <Header />
                
                
                {/*------------------------------------------------------------------------------  */}
                   <TransitionGroup> 
                       <CSSTransition key={this.props.location.key} classNames="page" timeout={300}> 
                            <Switch>
                            
                            <Route path = '/home' component={HomePage} />
                        {/* use this render syntax to pass data  */}
                            < Route exact path= '/directory' render ={() => <Directory campsites ={this.props.campsites} /> } />
                            
                            {/*the colon means what follows this forward slash is a paramter of a property Id*/}
                            {/* The Route component would be able to use the back and forth buttons on the browser  */}
                            <Route path= '/directory/:campsiteId' component ={CampsiteWithId}/>
                        
                        {/* use this syntax when not passing data */}
                            < Route exact  path = '/contactus' render ={() => <Contact resetFeedbackForm = {this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>} />
                            
                            {/* use this render syntax to pass data  */}
                            <Route exact  path = '/aboutus' render = {() => <About partners = {this.props.partners} /> } />
                            
                            <Redirect to = '/home' /> 

                            
                            </Switch>
                            </CSSTransition>
                    </TransitionGroup>
                 {/*------------------------------------------------------------------------------  */}
                
               
               
                <Footer />
            </div>
        );
    };
}
//takes the state form the redux store
//use router so that the react router will still be able to function 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));