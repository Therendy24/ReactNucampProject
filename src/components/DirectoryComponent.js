import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle,Breadcrumb, BreadcrumbItem } from 'reactstrap';
//for React Router Parameter (will show in url) 
import {Link} from 'react-router-dom';
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

//presentation function compponent (LAYOUT)
function RenderDirectoryItem({campsite}) {
    return (
        <Card>
            {/* dynamic link using vanilla javasscript */}
            {/* this will open the comments and campsiteinfo */}
            <Link to ={`/directory/${campsite.id}`}>
                {/* week 5 tutorial with baseUrl */}
                <CardImg width="100%" src={baseUrl + campsite.image} alt={campsite.name} />
                <CardImgOverlay>
                    <CardTitle>{campsite.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

//presentation function component 
function Directory(props) {

    const directory = props.campsites.campsites.map(campsite => {
        return (
            <div key={campsite.id} className="col-md-5 m-1">
                <RenderDirectoryItem campsite={campsite}/>
            </div>
        );
    });
  if(props.campsites.isLoading){
      return(
          <div className = "conatiner">
              <div className = "row">
                  <Loading />
              </div>
          </div>
      );
  }
  if (props.campsites.errMess){
      return (
          <div className = "container">
              <div className= "row">
                  <div className = "col">
                      <h4>{props.campsites.errMess}</h4>
                  </div>
              </div>
          </div>
      );
  }
    return (
        <div className="container">
            <div className = "row">
                <div className = "col">
                <Breadcrumb>
                    <BreadcrumbItem>
                       <Link to="/home">Home</Link>
                     </BreadcrumbItem>
                     <BreadcrumbItem active> 
                      Directory
                     </BreadcrumbItem>
                </Breadcrumb>
                <h2>Directory</h2>
                 <hr/>
                </div>
            </div>
            <div className="row">
                {directory}
            </div>
        </div>
    );
}

export default Directory;
