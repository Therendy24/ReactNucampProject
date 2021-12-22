import React, { Component } from 'react';
import { Card, CardImg,CardBody,CardText,Breadcrumb, BreadcrumbItem ,Button,Modal,ModalHeader,ModalBody} from 'reactstrap';
//for React Router Parameter (will show in url) 
import {Link} from 'react-router-dom';
 import {LocalForm, Control,Errors} from 'react-redux-form';
 import {Loading} from './LoadingComponent';
 import {baseUrl} from  '../shared/baseUrl';
 import {FadeTransform, Fade, Stagger} from 'react-animation-components';




function RenderCampsite({campsite}){
return(
    <div className = "col-md-5 m1">
        <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
                        
                <Card>
                    <CardImg top src={baseUrl + campsite.image} alt = {campsite.name}/>
                    <CardBody>
                        
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                    

                </Card>
         </FadeTransform>
    </div>
);

}

function RenderComments({comments,postComment,campsiteId}){
    if(comments){
       return(
          <div className ="col-md-5 m-1">
           <h4>Comments</h4>
           <Stagger in>
           {comments.map((comments) => {
              return(
                  <Fade in key ={comments.id}>
                     
                    <div>
                        <p> {comments.text}<br/> {"--"}
                        {comments.author} 
                        {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}
                        </p>
                    </div>
                  </Fade>
              )
           
           
            }
           
           )}
           </Stagger>
            <CommentForm campsiteId = {campsiteId} postComment = {postComment} />
           </div>
       );

    }
    return < div/>;
}
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);
const required = val => val && val.length;

class CommentForm extends Component{

    constructor(props){
        super(props);

        this.state = {
            isModalOpen: false,
            author: '',
            text: '',
            feedback: '',
            touched:{
                author: false,
                text: false,
            }
        }
        //login Modal
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);    }
     //set state of to true 
    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    handleSubmit(values){
        console.log("Current state is: " + JSON.stringify(values));
        alert("Current state is: " + JSON.stringify(values));

    }

    render(){
       
        return( 
            <React.Fragment> 
             <Button  outline onClick={this.toggleModal}>
                <i className = "fa fa-pencil fa-lg" /> Submit CommentForm
            </Button>

        
        
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
            <ModalHeader toggle={this.toggleModal} > Submit Comment </ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={values => this.handleSubmit(values)}>
                    <div className = "form-group">
                        <label htmlFor = " rating">Rating</label>
                        <Control.select model =".rating" id="rating" name="rating" className="form-control">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Control.select>
                    </div>
                    <div className = "form-group">
                    <label htmlFor="author">Your Name</label>
                        <Control.text 
                         model = ".author" id = "author" name = "author" className="form-control" placeholder="Your Name"
                        validators = {{
                            required,
                            minLength : minLength(2),
                            maxLength: maxLength(15),
                        }}
                        />
                        <Errors
                        className="text-danger"
                        model= ".author"
                        show = "touched"
                        component = "div" 
                        messages ={{ 
                            required: 'Required',
                            minLength: "Must be at least 2 characters",
                            maxLength: "Must be 15 characters or less",
                        }}/>

                    </div>  
                    <div className="form-group">
                        <label htmlFor="text">Comment</label>
                        <Control.textarea
                               model = ".text" id="text" name="text" className="form-control" placeholder ="comment" rows="6"
                           />
                    </div>
                    <Button type = "submit" color="primary"> Submit</Button>
                </LocalForm>

            </ModalBody>

        </Modal>
        </React.Fragment>
          );
    }


}

//presentation component  //after you click one campsite 
function CampsiteInfo(props) {
    if(props.isLoading){
        return (
            <div className="container">
                <div className = "row">
                    <Loading />
                </div>
            </div>
        );
    }
    if(props.errMess){
        return (
            <div className = "container">
                <div className = "row">
                    <div className = "col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        )
    }

   
    if (props.campsite) {
        return (
            <div className="container">
                 <div className="row">
                        <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem>
                            <Link to="/directory">Directory</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active> 
                            {props.campsite.name}
                            </BreadcrumbItem>
                        </Breadcrumb>
                            <h2>{props.campsite.name}</h2>
                            <hr />
                        </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    {/* comments has its own array so dont need to put campsite */}
                    <RenderComments 
                        comments={props.comments}
                        postComment={props.postComment}
                        campsiteId={props.campsite.id}
                    />
                   
                </div>
            </div>
        );
    }
    return <div />;
}


export default CampsiteInfo;