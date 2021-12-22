//imports = injecting functionality from some other location into this title 

import React from 'react'; //we can import from a node package or from a file 
import ReactDOM from 'react-dom';
import './index.css'; //import entire contents of a file 
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'typeface-lobster';
import 'typeface-open-sans';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap-social/bootstrap-social.css';
import App  from './App';// *ALWAYS GO LAST *



//This is responsible for rendering the Reacct Tree into our HTML document 
ReactDOM.render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
